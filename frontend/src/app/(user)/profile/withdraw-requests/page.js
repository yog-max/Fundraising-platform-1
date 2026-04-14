"use client";

import axios from "@/utils/axios";
import React, { useEffect, useState } from "react";
import moment from "moment"; // Optionally, for formatting dates

const WithdrawalRequestsPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [withdrawalRequests, setWithdrawalRequests] = useState([]);

  // Fetch authenticated user details and collect withdrawal requests
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/user/check-auth");
        const userData = response.data;

        // Collect all withdrawal requests from each campaign
        const allRequests = userData.campaignsCreated.flatMap((campaign) =>
          campaign.withdrawalRequests.map((request) => ({
            ...request, // Include request fields
            campaignTitle: campaign.title, // Include campaign title for reference
          }))
        );

        // Sort the withdrawal requests by requestDate in descending order
        allRequests.sort(
          (a, b) =>
            new Date(b.requestDate).getTime() -
            new Date(a.requestDate).getTime()
        );

        setWithdrawalRequests(allRequests);
        setUser(userData);
        setLoading(false);
      } catch (error) {
        console.error("Error checking authentication", error);
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Withdrawal Requests</h1>

      {withdrawalRequests.length > 0 ? (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 border px-4">Campaign Title</th>
              <th className="py-2 border px-4">Requested Amount</th>
              <th className="py-2 border px-4">Status</th>
              <th className="py-2 border px-4">Request Date</th>
            </tr>
          </thead>
          <tbody>
            {withdrawalRequests.map((request) => (
              <tr key={request._id}>
                <td className="py-2 border px-4">{request.campaignTitle}</td>
                <td className="py-2 border px-4">₹{request.requestedAmount}</td>
                <td className="py-2 border px-4 break-words whitespace-normal">
                  {request.status}
                  {request.status === "Rejected" &&
                    ` (${request.rejectionReason})`}
                </td>

                <td className="py-2 border px-4">
                  {moment(request.requestDate).format("DD MMM YYYY")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No withdrawal requests found.</p>
      )}
    </div>
  );
};

export default WithdrawalRequestsPage;
