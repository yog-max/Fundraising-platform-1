"use client";

// pages/campaigns.js
import { useState, useEffect } from "react";
import axios from "@/utils/axios";
import { toast } from "react-toastify"; // Import toast
import Link from "next/link";

const CampaignsList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestedAmount, setRequestedAmount] = useState<number>(1);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get("/campaigns/campaignsbycreator");
      setCampaigns(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      setError(err);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  // Function to handle withdrawal request
  const handleWithdrawal = async (e) => {
    e.preventDefault();
    if (requestedAmount <= 0) {
      toast.error("Please enter a valid withdrawal amount.");
      return;
    }
    if (
      requestedAmount >
      selectedCampaign.currentAmount - selectedCampaign.withdrawnAmount
    ) {
      toast.error("Please enter a valid withdrawal amount.");
      return;
    }

    try {
      const response = await axios.post(
        `/campaigns/withdrawal/${selectedCampaign._id}`,
        {
          requestedAmount,
        }
      );
      toast.success("Withdrawal request sent successfully.");
      setRequestedAmount(0);
      setIsModalOpen(false); // Close modal after successful withdrawal
      fetchCampaigns();
      console.log(response.data);
    } catch (error) {
      toast.error("Error while processing withdrawal.");
      console.log(error);
    }
  };

  // Function to open the modal and select the campaign
  const openModal = (campaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCampaign(null);
    setRequestedAmount(0);
  };

  if (loading) {
    return (
      <div className="text-center mt-8 text-lg font-medium text-gray-700">
        Loading campaigns...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-8 text-lg font-medium text-red-600">
        Error loading campaigns
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Your Campaigns
      </h1>
      {campaigns.length === 0 ? (
        <p className="text-center text-lg font-medium text-gray-600">
          You haven't created any campaigns yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <div
              key={campaign._id}
              className="bg-white shadow-md rounded-lg p-4"
            >
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-72 h-48 object-contain rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{campaign.title}</h2>
              <p className="text-gray-700 mb-4 line-clamp-3">
                {campaign.description}
              </p>
              <p className="text-gray-600 mb-2">
                Goal Amount: ₹{campaign.goalAmount}
              </p>
              <p className="text-gray-600 mb-4">
                Current Amount: ₹{campaign.currentAmount}
              </p>
              <p className="text-gray-600 mb-4">
                Available Amount: ₹
                {campaign.currentAmount - campaign.withdrawnAmount}
              </p>
              <p className="text-gray-600 mb-4">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    campaign.status === "Approved"
                      ? "text-green-500"
                      : campaign.status === "Rejected"
                      ? "text-red-500"
                      : campaign.status === "Completed"
                      ? "text-blue-500"
                      : "text-yellow-500"
                  }`}
                >
                  {campaign.status}
                </span>
              </p>
              <Link
                href={`/profile/campaigns/update/${campaign._id}`}
                legacyBehavior
              >
                <a className="text-blue-600 hover:underline">Update Details</a>
              </Link>

              {campaign.staus !== "Pending" && (
                <>
                  {/* Withdraw Button */}
                  {!campaign.withdrawalRequests.some(
                    (request) => request.status === "Pending"
                  ) ? (
                    <button
                      onClick={() => openModal(campaign)}
                      className="bg-blue-600 text-white py-2 px-4 rounded-md w-full mt-4 hover:bg-blue-700"
                    >
                      Withdraw
                    </button>
                  ) : (
                    <div className="text-center bg-gray-600 text-white py-2 px-4 rounded-md w-full mt-4 hover:bg-gray-700">
                      Request Pending
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal for Withdrawal */}
      {isModalOpen && selectedCampaign && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">
              Withdraw from {selectedCampaign.title}
            </h2>
            <form onSubmit={handleWithdrawal}>
              <input
                type="number"
                placeholder="Withdraw Amount"
                className="border border-gray-300 rounded-md p-2 w-full mb-4"
                value={requestedAmount}
                required
                max={
                  selectedCampaign.currentAmount -
                  selectedCampaign.withdrawnAmount
                }
                min={1}
                onChange={(e) => setRequestedAmount(Number(e.target.value))}
              />
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Confirm Withdrawal
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignsList;
