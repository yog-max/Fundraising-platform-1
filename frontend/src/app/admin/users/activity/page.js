"use client";

import axios from "@/utils/axios"; // Ensure this imports your axios instance correctly
import React, { useEffect, useState } from "react";

const ActivitiesPage = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get("/admin/activity");
        setActivities(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load activities. Please try again later.");
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchActivities();
  }, []);

  const renderActivities = () => {
    if (activities.length === 0) {
      return <p className="text-center">No activities found.</p>;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <div
            key={activity._id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h3 className="font-semibold">{activity.actor.name} performed:</h3>
            <p>{activity.action}</p>
            <p className="text-sm text-gray-500">
              {new Date(activity.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Activity Log
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        {loading ? (
          <div className="text-center text-lg font-medium">
            <div className="loader"></div>
            <p>Loading activities...</p>
          </div>
        ) : error ? (
          <div className="text-center text-lg font-medium text-red-600">
            {error}
          </div>
        ) : (
          renderActivities()
        )}
      </div>
    </div>
  );
};

export default ActivitiesPage;
