"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaConciergeBell, FaDonate } from "react-icons/fa";
import { MdAccountCircle, MdCampaign } from "react-icons/md";
import { GrDashboard } from "react-icons/gr";
import { CgAdd } from "react-icons/cg";
import { BsActivity } from "react-icons/bs";
import { BiDonateHeart, BiMoney, BiMoneyWithdraw } from "react-icons/bi";

const Sidebar = () => {
  const router = useRouter();
  const [active, setActive] = useState("");

  const menuItems = [
    {
      href: "/admin",
      title: "Dashboard",
      icon: <GrDashboard />,
      sublist: false,
    },
    {
      href: "/admin/users",
      title: "Users",
      icon: <MdAccountCircle />,
      sublist: false,
    },
    {
      href: "/admin/users/activity",
      title: "Users Activity",
      icon: <BsActivity />,
      sublist: true,
    },
    {
      href: "/admin/campaigns",
      title: "Campaigns",
      icon: <MdCampaign />,
      sublist: false,
    },
    {
      href: "/admin/campaigns/campaignsrequest",
      title: "Campaigns Requests",
      icon: <BiMoneyWithdraw />,
      sublist: true,
    },
    {
      href: "/admin/campaigns/withdrawalrequests",
      title: "Withdrawal Requests",
      icon: <BiMoneyWithdraw />,
      sublist: true,
    },
    {
      href: "/admin/contributors",
      title: "contributors",
      icon: <BiDonateHeart />,
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
      </div>
    </aside>
  );
};

export default Sidebar;
