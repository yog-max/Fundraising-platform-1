"use client";
import axios from "@/utils/axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const CampaignPage = () => {
  const [campaign, setCampaign] = useState(null);
  const [investmentAmount, setInvestmentAmount] = useState(""); // Investment amount state
  const router = useRouter();
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false); // Modal state

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await axios.get(`/campaigns/campaignbyid/${id}`);
        console.log(response.data);
        setCampaign(response.data);
      } catch (error) {
        console.error("Error fetching campaign:", error);
      }
    };

    fetchCampaign();
  }, [id]);

  const handleInvest = async (e) => {
    e.preventDefault();
    if (!investmentAmount || isNaN(Number(investmentAmount))) {
      toast.error("Please enter a valid amount.");
      return;
    }
    if (
      Number(investmentAmount) >
      campaign.goalAmount - campaign.currentAmount
    ) {
      toast.error("Enter amount less than Goal.");
      return;
    }

    try {
      const response = await axios.post("/investment/create", {
        campaignId: campaign._id,
        amount: investmentAmount,
      });

      const { orderId, amount, currency, investment } = response.data;

      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!scriptLoaded) {
        toast.error("Failed to load Razorpay SDK. Please try again.");
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
    } catch (err) {
      console.error("Investment error:", err);
      toast.error(
        err.response.data.message || "Failed to initiate investment."
      );
    }
  };

  const loadRazorpayScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  if (!campaign) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      {/* Campaign Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-semibold text-gray-800 mb-4">
          {campaign.title}
        </h1>
        <img
          src={campaign.image}
          alt={campaign.title}
          className="w-full h-80 object-cover rounded-lg shadow-md mb-6"
        />
        <p className="text-gray-600 text-lg leading-relaxed">
          {campaign.description}
        </p>
      </div>

      {/* Invest Button */}
      {campaign.status === "Approved" && (
        <div className="flex justify-center mb-6 w-full">
          <button
            onClick={() => setShowModal(true)} // Clear investment amount before opening modal
            className="w-full px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
          >
            Contribute
          </button>
        </div>
      )}
      {/* Campaign Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Campaign Information
          </h2>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Goal Amount: </span>₹
            {campaign.goalAmount.toLocaleString()}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Current Amount: </span>₹
            {campaign.currentAmount.toLocaleString()}
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Bank Details
          </h2>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Bank Name: </span>
            {campaign.bankDetails.bankName}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Account Number: </span>
            {campaign.bankDetails.accountNumber}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">IFSC Code: </span>
            {campaign.bankDetails.ifscCode}
          </p>
        </div>
      </div>

      {/* Campaign Creator */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Campaign Creator
        </h2>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Name: </span>
          {campaign.creator.name}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Email: </span>
          {campaign.creator.email}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">
            Foundation establishment proof:{" "}
          </span>
          <a className="text-blue-500" href={campaign.proof} target="_blank">
            {campaign.proof || "Not Available"}
          </a>
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">
            Campaign authenticity document:{" "}
          </span>
          <a className="text-blue-500" href={campaign.proof} target="_blank">
            {campaign.document || "Not Available"}
          </a>
        </p>
      </div>

      {/* Investors Approached */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Investors Approached
        </h2>
        {campaign.investorsApproached &&
        campaign.investorsApproached.length > 0 ? (
          <ul className="space-y-4">
            {campaign.investorsApproached.map((investor) => (
              <li key={investor._id} className="border-b pb-4">
                <p className="text-gray-700">
                  <span className="font-semibold">Investor ID: </span>
                  {investor.investorId}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Amount: </span>₹
                  {investor.amount.toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No investors approached yet.</p>
        )}
      </div>

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
                max={campaign.goalAmount - campaign.currentAmount}
                required
              />
              <div className="flex justify-end">
                <button
                  onClick={() => setShowModal(false)} // Close modal on cancel
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

export default CampaignPage;
