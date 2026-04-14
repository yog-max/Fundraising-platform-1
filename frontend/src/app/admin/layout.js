"use client";

import axios from "@/utils/axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Sidebar from "./AdminSidebar";

const Layout = ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/user/check-auth");
        response.data.role !== "admin" && router.push("/");
      } catch (error) {
        console.error("Error checking authentication", error);
        router.push("/profile/campaigns");
      } finally {
      }
    };

    checkAuth();
  }, []);
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-white">{children}</main>
    </div>
  );
};

export default Layout;
