"use client";

import axios from "@/utils/axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ContributionsPage = () => {
  const [contributions, setContributions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await axios.get("/user/check-auth");
        console.log(response);
        setContributions(response.data.investmentsMade); // Assuming investmentMade holds contributions data
      } catch (error) {
        console.error("Error fetching contributions", error);
      }
    };

    fetchContributions();
  }, []);
  console.log(contributions);
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">My Contributions</h1>

      {contributions ? (
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Campaign ID</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {contributions.map((contribution) => (
              <tr key={contribution._id} className="border-b">
                <td className="px-4 py-2">
                  <a
                    className="text-blue-700"
                    href={`/campaign/${contribution.campaign}`}
                  >
                    {contribution.campaign}
                  </a>
                </td>
                <td className="px-4 py-2">₹{contribution.amount}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded ${
                      contribution.status === "Confirmed"
                        ? "bg-green-500 text-white"
                        : "bg-yellow-500 text-white"
                    }`}
                  >
                    {contribution.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {new Date(contribution.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No contributions found.</p>
      )}
    </div>
  );
};

export default ContributionsPage;
