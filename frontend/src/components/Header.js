"use client";

// components/Header.js
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaSpinner } from "react-icons/fa"; // Import spinner icon
import axios from "@/utils/axios"; // Import your Axios instance
import { usePathname } from "next/navigation";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/user/check-auth");
        console.log(response);
        setIsLoggedIn(response.data ? true : false);
        setIsAdmin(response.data.role === "admin" ? true : false); // Assuming your API returns isAdmin
      } catch (error) {
        console.error("Error checking authentication", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const pathName = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/user/check-auth");
        console.log(response);
        setIsLoggedIn(response.data ? true : false);
        setIsAdmin(response.data.role === "admin" ? true : false); // Assuming your API returns isAdmin
      } catch (error) {
        console.error("Error checking authentication", error);
      }
    };

    checkAuth();
  }, [pathName]);

  return (
    <header className="bg-gray-800 text-white shadow-md z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">
          <Link href="/">Fundraiser Platform</Link>
        </h1>
        <nav className="hidden md:flex space-x-6">
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/about"
                className="hover:text-gray-400 transition-colors duration-200"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-gray-400 transition-colors duration-200"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/campaigns"
                className="hover:text-gray-400 transition-colors duration-200"
              >
                Campaigns
              </Link>
            </li>
            {isLoggedIn ? (
              <li>
                <Link
                  href="/profile/campaigns"
                  className="flex items-center text-white hover:text-gray-400 transition-colors duration-200"
                >
                  <FaUserCircle className="mr-2" size={20} />
                  <span>Profile</span>
                </Link>
              </li>
            ) : loading ? ( // Show spinner when loading
              <li>
                <span className="flex items-center">
                  <FaSpinner className="animate-spin mr-2" />
                  Loading...
                </span>
              </li>
            ) : (
              <li>
                <Link
                  href="/login"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
                >
                  Login
                </Link>
              </li>
            )}

            {isAdmin && (
              <li>
                <Link
                  href="/admin"
                  className="flex items-center text-white hover:text-gray-400 transition-colors duration-200"
                >
                  <MdAdminPanelSettings className="mr-2" size={20} />
                  <span>Admin</span>
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-gray-800 shadow-lg">
            <ul className="flex flex-col space-y-4 p-4">
              <li>
                <Link
                  href="/campaigns"
                  className="hover:text-gray-400 transition-colors duration-200"
                >
                  Campaigns
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-gray-400 transition-colors duration-200"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-gray-400 transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
              {isAdmin && (
                <li>
                  <Link
                    href="/admin"
                    className="hover:text-gray-400 transition-colors duration-200"
                  >
                    Admin
                  </Link>
                </li>
              )}
              {isLoggedIn ? (
                <li>
                  <Link
                    href="/profile/campaigns"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
                  >
                    Profile
                  </Link>
                </li>
              ) : loading ? (
                <li>
                  <span className="flex items-center">
                    <FaSpinner className="animate-spin mr-2" />
                    Loading...
                  </span>
                </li>
              ) : (
                <li>
                  <Link
                    href="/login"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
