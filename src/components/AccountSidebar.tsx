"use client";

import React from "react";
import { History, Home, Lock, MapPinCheck, Undo, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AccountSidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-1/4 bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col items-center">
        <img
          alt="Profile picture"
          className="rounded-full mb-4"
          height="100"
          src="https://placehold.co/100x100"
          width="100"
        />
        <h2 className="text-xl font-semibold">Will Smith</h2>
        <p className="text-gray-500">+880125333344</p>
      </div>
      <nav className="mt-10">
        <Link
          href={"/accounts/overview"}
          className={`flex items-center mb-4 ${
            pathname === "/accounts/overview" ? "text-red-500" : "text-gray-500"
          } gap-2`}
        >
          <Home />
          Overview
        </Link>
        <Link
          href={"/accounts/order-history"}
          className={`flex items-center mb-4 ${
            pathname === "/accounts/order-history"
              ? "text-red-500"
              : "text-gray-500"
          } gap-2`}
        >
          <History /> Order History
        </Link>
        <Link
          href={"/accounts/return-orders"}
          className={`flex items-center mb-4 ${
            pathname === "/accounts/return-orders"
              ? "text-red-500"
              : "text-gray-500"
          } gap-2`}
        >
          <Undo /> Return Orders
        </Link>
        <Link
          href={"/accounts/account-info"}
          className={`flex items-center mb-4 ${
            pathname === "/accounts/account-info"
              ? "text-red-500"
              : "text-gray-500"
          } gap-2`}
        >
          <User /> Account Info
        </Link>
        <Link
          href={"/accounts/change-password"}
          className={`flex items-center mb-4 ${
            pathname === "/accounts/change-password"
              ? "text-red-500"
              : "text-gray-500"
          } gap-2`}
        >
          <Lock /> Change Password
        </Link>
        <Link
          href={"/accounts/address"}
          className={`flex items-center mb-4 ${
            pathname === "/accounts/address" ? "text-red-500" : "text-gray-500"
          } gap-2`}
        >
          <MapPinCheck />
          Address
        </Link>
      </nav>
    </aside>
  );
};

export default AccountSidebar;
