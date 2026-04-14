"use client";

import axios from "@/utils/axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AuthLayout = ({
  children,
}) => {
  const router = useRouter();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("/user/check-auth");
        router.push("/profile/campaigns");
      } catch (error) {
        console.error("Error checking authentication", error);
      } finally {
      }
    };

    checkAuth();
  }, []);

  return <div>{children}</div>;
};

export default AuthLayout;
