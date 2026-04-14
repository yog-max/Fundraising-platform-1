"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaConciergeBell } from "react-icons/fa";
import { MdAccountCircle, MdCampaign } from "react-icons/md";
import { GrDashboard } from "react-icons/gr";
import { CgAdd } from "react-icons/cg";
import { BiLogOut, BiMoneyWithdraw } from "react-icons/bi";
import axios from "@/utils/axios";
import { PiHandWithdraw } from "react-icons/pi";

const Sidebar = () => {
  const router = useRouter();
  const [active, setActive] = useState("");

  const menuItems = [
    {
      href: "/profile/campaigns",
      title: "Your Campaigns",
      icon: <MdCampaign />,
      sublist: false,
    },
    {
      href: "/profile/campaigns/new",
      title: "New Campaign",
      icon: <CgAdd />,
      sublist: true,
    },
    {
      href: "/profile/withdraw-requests",
      title: "Withdraw Requests",
      icon: <BiMoneyWithdraw />,
      sublist: true,
    },
    {
      href: "/profile/contributions",
      title: "Your Contributions",
      icon: <MdCampaign />,
      sublist: false,
    },
    {
      href: "/profile/update-profile",
      title: "Profile Management",
      icon: <MdAccountCircle />,
      sublist: false,
    },
  ];

  useEffect(() => {
    // Set the initial active state based on the current pathname
    setActive(window.location.pathname);
  }, []);

  const changeRoute = (href) => {
    router.push(href);
    setActive(href); // Set active immediately based on the clicked href
  };

  const logout = async (e) => {
    e.preventDefault();
    await axios.post("/user/logout");
    router.push("/login");
    window.location.reload();
  };

  return (
    <aside className="bg-white text-dark w-64 p-4 border-r-2">
      <div className="flex flex-col space-y-4">
        {menuItems.map(({ href, title, icon, sublist }) => (
          <div
            key={title}
            onClick={() => changeRoute(href)}
            className="cursor-pointer"
          >
            {!sublist ? (
              <div
                className={`flex items-center p-2 rounded-lg transition-colors ${
                  active === href
                    ? "bg-primary text-white"
                    : "hover:bg-primaryHover hover:text-white"
                }`}
              >
                <span className="mr-3">{icon}</span>
                {title}
              </div>
            ) : (
              <div
                className={`ml-4 flex items-center p-2 rounded-lg transition-colors ${
                  active === href
                    ? "bg-primary text-white"
                    : "hover:bg-primaryHover hover:text-white"
                }`}
              >
                <span className="mr-3">{icon}</span>
                {title}
              </div>
            )}
          </div>
        ))}
        <div
          onClick={(e) => logout(e)}
          className={`cursor-pointer flex items-center p-2 rounded-lg transition-colors hover:text-white hover:bg-primaryHover "
          }`}
        >
          <span className="mr-3">
            <BiLogOut />
          </span>
          Logout
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
