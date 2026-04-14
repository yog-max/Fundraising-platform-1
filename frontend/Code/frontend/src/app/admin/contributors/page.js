"use client";

import axios from "@/utils/axios";
import React, { useEffect, useState } from "react";

const InvestmentPage = () => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    async function fetchContributors() {
      try {
        const response = await axios("/admin/investments");
        setContributors(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchContributors();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Investment Contributions
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Investor Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Amount</th>
              <th className="py-3 px-6 text-left">Campaign</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {contributors.length > 0 ? (
              contributors.map((contributor) => (
                <tr
                  key={contributor._id}
                  className="border-b border-gray-300 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {contributor.investor.name}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {contributor.investor.email}
                  </td>
                  <td className="py-3 px-6 text-left">{contributor.amount}</td>
                  <td className="py-3 px-6 text-left">
                    <a
                      className="text-blue-700"
                      href={`/campaign/${contributor.campaign}`}
                    >
                      {contributor.campaign}
                    </a>
                  </td>
                  <td className="py-3 px-6 text-left">{contributor.status}</td>
                  <td className="py-3 px-6 text-left">
                    {new Date(contributor.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-3 px-6 text-center">
                  No contributors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvestmentPage;
