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
        All Campaigns
      </h1>
      {campaigns.length === 0 ? (
        <p className="text-center text-lg font-medium text-gray-600">
          No campaigns found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
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
