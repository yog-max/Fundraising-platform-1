import React from "react";
import Sidebar from "./UserSidebar";
import AuthLayout from "@/layout/AuthLayout";

const Layout = ({ children }) => {
  return (
    <AuthLayout>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6 bg-white">{children}</main>
      </div>
    </AuthLayout>
  );
};

export default Layout;
