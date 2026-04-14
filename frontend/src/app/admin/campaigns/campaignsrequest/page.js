"use client";

import { useState, useEffect } from "react";
import axios from "@/utils/axios"; // Assuming you have axios configured here
import Link from "next/link";
import { toast } from "react-toastify";

const CampaignsList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get("/admin/campaigns"); // Fetching campaigns from admin endpoint
        setCampaigns(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Error fetching campaigns");
        setLoading(false);
        toast.error("Failed to load campaigns.");
      }
    };

    fetchCampaigns();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.patch(`/admin/campaigns/${id}`, {
        ...campaigns,
        status: "Approved",
      });
      toast.success("Campaign approved successfully.");
      setCampaigns(campaigns.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Error approving campaign:", error);
      toast.error("Failed to approve the campaign.");
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.patch(`/admin/campaigns/${id}`, {
        ...campaigns,
        status: "Rejected",
      });
      toast.success("Campaign rejected successfully.");
      setCampaigns(campaigns.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Error rejecting campaign:", error);
      toast.error("Failed to reject the campaign.");
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

  // Filter campaigns to only show those with "Pending" status
  const pendingCampaigns = campaigns.filter(
    (campaign) => campaign.status === "Pending"
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Pending Campaigns
      </h1>
      {pendingCampaigns.length === 0 ? (
        <p className="text-center text-lg font-medium text-gray-600">
          No pending campaigns found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingCampaigns.map((campaign) => (
            <div
              key={campaign._id}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
            >
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{campaign.title}</h2>
              <p className="text-gray-700 mb-4 line-clamp-3">
                {campaign.description}
              </p>
              <div className="mb-4">
                <p className="text-gray-600">Goal: ₹{campaign.goalAmount}</p>
                <p className="text-gray-600">
                  Current: ₹{campaign.currentAmount}
                </p>
                <p className="text-gray-600">
                  Withdrawn: ₹{campaign.withdrawnAmount}
                </p>
                <p className="text-gray-600">
                  Status:{" "}
                  <span className="font-semibold text-yellow-500">
                    {campaign.status}
                  </span>
                </p>
              </div>

              <div className="flex space-x-4 mb-4">
                <button
                  onClick={() => handleApprove(campaign._id)}
                  className="bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700 transition"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(campaign._id)}
                  className="bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-700 transition"
                >
                  Reject
                </button>
              </div>

              <Link href={`/campaign/${campaign._id}`} legacyBehavior>
                <a className="inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition">
                  View Details
                </a>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CampaignsList;
