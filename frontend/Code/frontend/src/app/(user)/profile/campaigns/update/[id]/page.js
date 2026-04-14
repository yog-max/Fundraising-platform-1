"use client";

// components/UpdateCampaign.js
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "@/utils/axios";
import { toast } from "react-toastify"; // Import toast

const UpdateCampaign = () => {
  const router = useRouter();
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      axios
        .get(`/campaigns/campaignbyid/${id}`)
        .then((res) => setCampaign(res.data))
        .catch((err) => {
          toast.error("Failed to load campaign data.");
          console.error("Error fetching campaign:", err);
        });
    }
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`/campaigns/update/${id}`, {
        title: campaign.title,
        description: campaign.description,
        goalAmount: campaign.goalAmount,
        image: campaign.image,
      });
      setLoading(false);
      toast.success("Campaign updated successfully!");
      router.push("/profile/campaigns");
    } catch (error) {
      setLoading(false);
      toast.error("Error updating campaign, please try again.");
      console.error("Error updating campaign:", error);
    }
  };

  if (!campaign) {
    return <div className="text-center mt-8">Loading campaign...</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Update Campaign
      </h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={campaign.title}
            onChange={(e) =>
              setCampaign({ ...campaign, title: e.target.value })
            }
            required
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={campaign.description}
            onChange={(e) =>
              setCampaign({ ...campaign, description: e.target.value })
            }
            required
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg h-28 resize-none"
          ></textarea>
        </div>

        {/* Goal Amount Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Goal Amount (₹)
          </label>
          <input
            type="number"
            disabled
            value={campaign.goalAmount}
            onChange={(e) =>
              setCampaign({ ...campaign, goalAmount: e.target.value })
            }
            required
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Image URL Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <img
            src={campaign.image}
            alt={campaign.title}
            className="w-full h-48 object-contain rounded-md mb-4 mt-4"
          />
          <input
            type="text"
            value={campaign.image}
            onChange={(e) =>
              setCampaign({ ...campaign, image: e.target.value })
            }
            required
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Campaign"}
        </button>
      </form>
    </div>
  );
};

export default UpdateCampaign;
