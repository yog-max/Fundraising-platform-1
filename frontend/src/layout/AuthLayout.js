"use client";

import axios from "@/utils/axios";
import { useRouter } from "next/navigation";
import React, { Children, useEffect, useState } from "react";

const AuthLayout = ({
  children,
}) => {
  const router = useRouter();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("/user/check-auth");
      } catch (error) {
        console.error("Error checking authentication", error);
        router.push("/login");
      } finally {
      }
    };

    checkAuth();
  }, []);

  return <div>{children}</div>;
};

export default AuthLayout;
