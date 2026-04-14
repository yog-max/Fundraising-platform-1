"use client";

// pages/profile-update.js
import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import { toast } from "react-toastify"; // Import toast for notifications

const ProfileUpdate = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function FetchUserDetails() {
      const res = await axios.get("/user/check-auth");
      setName(res.data.name);
      setEmail(res.data.email);
      setLoading(false);
    }
    FetchUserDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        "/user/update",
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setPassword("");
      setLoading(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      setLoading(false);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Update Profile
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Name</label>
          <input
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter new password (optional)"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-500 text-white p-3 rounded-md font-semibold ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
          >
            {loading ? "Loading..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileUpdate;
