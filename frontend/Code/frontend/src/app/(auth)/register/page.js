"use client";

// pages/register.js
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/utils/axios"; // Import the Axios instance
import { toast } from "react-toastify";

const RegisterPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post("/user/register", {
        name,
        email,
        password,
      });
      console.log(response);

      // Redirect to login page on successful registration
      router.push("/profile/campaigns");
    } catch (error) {
      console.log(error);
      // Handle registration error
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
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-semibold">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
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
              Register
            </button>
          </form>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-green-500 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
