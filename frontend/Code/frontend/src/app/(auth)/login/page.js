"use client";

// pages/login.js
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/utils/axios"; // Import the Axios instance
import { toast } from "react-toastify";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      // Change the endpoint to /user/login
      const response = await axios.post("/user/login", {
        email,
        password,
      });

      // Redirect to home on successful login
      router.push("/profile/campaigns"); // You may want to redirect to a dashboard or specific page
    } catch (error) {
      // Handle login error
      toast.error(
        error?.response?.data.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <div>
      <section className="flex items-center justify-center py-40 bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-semibold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-1 text-sm font-semibold">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <a href="/register" className="text-green-500 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
