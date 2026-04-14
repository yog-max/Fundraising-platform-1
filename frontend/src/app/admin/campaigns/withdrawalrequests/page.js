"use client";

import { useState, useEffect } from "react";
import axios from "@/utils/axios"; // Assuming you have axios configured here
import { toast } from "react-toastify";

const CampaignsList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
  const [withdrawalIndex, setWithdrawalIndex] = useState(0);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get("/admin/campaigns");
      setCampaigns(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Error fetching campaigns");
      setLoading(false);
      toast.error("Failed to load campaigns.");
    }
  };
  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleTransfer = (campaign, withdrawal, index) => {
    setSelectedCampaign(campaign);
    setSelectedWithdrawal(withdrawal);
    setWithdrawalIndex(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedWithdrawal(null);
    setSelectedCampaign(null);
  };

  const confirmWithdraw = async () => {
    // Find the specific withdrawal request by index and update its status and approval date
    const updatedCampaign = {
      ...selectedCampaign,
      withdrawnAmount:
        selectedCampaign.withdrawnAmount + selectedWithdrawal.requestedAmount,
      withdrawalRequests: selectedCampaign.withdrawalRequests.map(
        (request, i) =>
          i === withdrawalIndex
            ? { ...request, status: "Approved", approvalDate: Date.now() }
            : request
      ),
    };

    try {
      // Send updated campaign data to the server
      await axios.patch(
        `/admin/campaigns/${selectedCampaign._id}`,
        updatedCampaign
      );
      toast.success("Transfer successful.");
      window.location.reload();
      closeModal();
    } catch (error) {
      toast.error("Failed to complete transfer.");
    }
  };

  const rejectWithdraw = async () => {
    let reason = window.prompt("Please enter the reason for rejection:");
    if (!reason) {
      toast.error("Enter Reason to reject request.");
      return;
    }
    // Call withdrawal API here and pass campaign and withdrawal IDs
    // Find the specific withdrawal request by index and update its status and approval date
    const updatedCampaign = {
      ...selectedCampaign,
      withdrawalRequests: selectedCampaign.withdrawalRequests.map(
        (request, i) =>
          i === withdrawalIndex
            ? {
                ...request,
                status: "Rejected",
                approvalDate: Date.now(),
                rejectionReason: reason,
              }
            : request
      ),
    };

    try {
      // Send updated campaign data to the server
      await axios.patch(
        `/admin/campaigns/${selectedCampaign._id}`,
        updatedCampaign
      );
      toast.success("Transfer successful.");
      window.location.reload();
      closeModal();
    } catch (error) {
      toast.error("Failed to complete transfer.");
    }
  };

  if (loading) {
    return (
      <p className="text-center text-lg font-medium">Loading campaigns...</p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-lg font-medium text-red-600">{error}</p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Pending Withdrawals
      </h1>

      {campaigns.length === 0 ? (
        <p className="text-center text-lg font-medium text-gray-600">
          No campaigns found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full ">
          {campaigns.map((campaign) => (
            <div>
              {campaign.withdrawalRequests.map((withdrawal, index) => (
                <div>
                  {withdrawal.status === "Pending" && (
                    <>
                      <div
                        key={campaign._id}
                        className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
                      >
                        <h2 className="text-xl font-semibold mb-2">
                          {campaign.title}
                        </h2>
                        <p className="text-gray-700 mb-4">
                          {campaign.description}
                        </p>

                        <div className="mb-4">
                          <p className="text-gray-600">
                            Goal: ₹{campaign.goalAmount}
                          </p>
                          <p className="text-gray-600">
                            Current: ₹{campaign.currentAmount}
                          </p>
                        </div>
                      </div>
                      <div
                        key={index}
                        className="bg-gray-100 p-4 rounded-lg mb-4"
                      >
                        <p className="font-semibold mb-2">
                          Withdrawal Request: ₹{withdrawal.requestedAmount}
                        </p>
                        {withdrawal.status === "Pending" && (
                          <button
                            className="bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700 transition"
                            onClick={() =>
                              handleTransfer(campaign, withdrawal, index)
                            }
                          >
                            Transfer
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalIsOpen && selectedWithdrawal && selectedCampaign && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <h2 className="text-xl font-semibold mb-4">
              Bank Details for {selectedCampaign.title}
            </h2>
            <p className="mb-2">
              <span className="font-semibold">Bank Name:</span>{" "}
              {selectedCampaign.bankDetails.bankName}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Account Number:</span>{" "}
              {selectedCampaign.bankDetails.accountNumber}
            </p>
            <p className="mb-2">
              <span className="font-semibold">IFSC Code:</span>{" "}
              {selectedCampaign.bankDetails.ifscCode}
            </p>
            <p className="mb-4">
              <span className="font-semibold">Amount to Transfer:</span> ₹
              {selectedWithdrawal.requestedAmount}
            </p>

            <div className="flex justify-around space-x-4">
              <button
                className="bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700 transition"
                onClick={confirmWithdraw}
              >
                Confirm Transfer
              </button>
              <button
                className="bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-700 transition"
                onClick={rejectWithdraw}
              >
                Reject Transfer
              </button>
            </div>
            <button
              className="w-full mt-5 bg-yellow-500 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-600 transition"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignsList;
