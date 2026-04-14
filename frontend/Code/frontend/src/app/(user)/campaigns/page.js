"use client";

import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const loadRazorpayScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // Modal state
  const [selectedCampaign, setSelectedCampaign] = useState(null); // Selected campaign
  const [investmentAmount, setInvestmentAmount] = useState(""); // Investment amount
  const router = useRouter();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get("/campaigns");
        setCampaigns(
          response.data.filter((campaign) => campaign.status === "Approved")
        );
      } catch (err) {
        setError("Failed to fetch campaigns");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const handleOpenModal = (campaign) => {
    setSelectedCampaign(campaign);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCampaign(null);
  };

  const handleInvest = async (e) => {
    e.preventDefault();
    if (!investmentAmount || isNaN(Number(investmentAmount))) {
      toast.error("Please enter a valid amount.");
      return;
    }
    console.log(selectedCampaign.goalAmount);
    if (
      Number(investmentAmount) >
      selectedCampaign.goalAmount - selectedCampaign.currentAmount
    ) {
      toast.error("Enter amount less than Goal.");
    }

    try {
      // Create an order by calling the /investment API
      const response = await axios.post("/investment/create", {
        campaignId: selectedCampaign._id,
        amount: investmentAmount,
      });

      const { orderId, amount, currency, investment } = response.data;

      const razorpayLoaded = await loadRazorpayScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!razorpayLoaded) {
        setError("Failed to load Razorpay SDK. Please try again.");
        return;
      }

      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency,
        name: "Crowdfunding Campaign",
        description: "Contribute to the campaign",
        order_id: orderId,
        handler: async (response) => {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;
          await axios.post("/investment/confirm", {
            razorpayPaymentId: razorpay_payment_id,
            razorpayOrderId: razorpay_order_id,
            razorpaySignature: razorpay_signature,
            investmentId: investment._id,
          });
          router.push("/profile/contributions");
        },
        prefill: {
          name: "Your Name",
          email: "your.email@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      handleCloseModal(); // Close the modal after opening Razorpay
    } catch (err) {
      if (err.status === 401) {
        toast.error("Kindly Login");
        router.push("/login");
      } else {
        console.error("Investment error:", err);
        toast.error(
          err.response.data.message || "Failed to initiate investment."
        );
      }
    }
  };

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Active Campaigns</h1>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search campaigns..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded w-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {loading && <p className="text-center">Loading campaigns...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {filteredCampaigns.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <li
              key={campaign._id}
              className="bg-white shadow-md rounded overflow-hidden"
            >
              <Link href={`/campaign/${campaign._id}`}>
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-48 object-cover cursor-pointer"
                />
              </Link>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{campaign.title}</h3>
                <p className="text-gray-700 mb-4">{campaign.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">
                    Goal: ₹{campaign.goalAmount}
                  </span>
                  <span className="font-semibold">
                    Current: ₹{campaign.currentAmount}
                  </span>
                </div>
                <button
                  onClick={() => handleOpenModal(campaign)}
                  className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200"
                >
                  Contribute
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No active campaigns available.</p>
      )}

      {/* Modal for entering investment amount */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <form onSubmit={handleInvest}>
            <div className="bg-white p-6 rounded shadow-md w-96">
              <h2 className="text-xl font-bold mb-4">
                Enter Investment Amount
              </h2>
              <input
                type="number"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                className="border border-gray-300 rounded w-full py-2 px-4 mb-4 focus:outline-none"
                placeholder="Enter amount in INR"
                max={
                  selectedCampaign.goalAmount - selectedCampaign.currentAmount
                }
                required
              />
              <div className="flex justify-end">
                <button
                  onClick={handleCloseModal}
                  className="mr-2 px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Invest
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CampaignsPage;
