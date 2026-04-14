"use client";

import axios from "@/utils/axios";
import React, { useEffect, useState } from "react";

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCampaigns: 0,
    totalInvestments: 0,
    totalPendingWithdrawals: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/admin/dashboard/stats");
        setStats(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load statistics.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-center text-lg font-medium">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-lg font-medium text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Dashboard Statistics
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-3xl font-bold text-gray-700">{stats.totalUsers}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Total Campaigns</h2>
          <p className="text-3xl font-bold text-gray-700">
            {stats.totalCampaigns}
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Total Investments</h2>
          <p className="text-3xl font-bold text-gray-700">
            {stats.totalInvestments}
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Pending Withdrawals</h2>
          <p className="text-3xl font-bold text-gray-700">
            {stats.totalPendingWithdrawals}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
