"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/profile/campaigns");
  });
  return <div>redirecting....</div>;
};

export default page;
