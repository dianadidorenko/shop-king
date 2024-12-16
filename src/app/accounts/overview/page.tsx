"use client";

import { axiosInstance } from "@/lib/axiosInstance";
import {
  CheckCircleIcon,
  Ellipsis,
  ShoppingBag,
  Undo,
  Wallet,
} from "lucide-react";
import React, { ReactNode, useEffect, useState } from "react";

interface DropdownProps {
  children: ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          id="dropdownButton"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-red-500 text-white p-2 rounded-full focus:outline-none"
        >
          <Ellipsis />
        </button>
      </div>
      {isOpen && (
        <div className="bg-white origin-top-right absolute z-40 right-0 mt-2 w-56 rounded-md shadow-lg border">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="dropdownButton"
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

const OverviewPage = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    await axiosInstance.get("/orders").then((data) => {
      if (data?.data?.status) {
        setOrders(data.data.data);
      }
    });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  console.log(orders);
  return (
    <main className="w-full px-4 pb-6">
      <div className="container mx-auto p-4 mb-10">
        <h1 className="text-2xl font-bold text-orange-500 mb-4">Overview</h1>
        <p className="text-gray-700 mb-8">Welcome Back, Will Smith!</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center mb-4 text-pink-500">
              <ShoppingBag />
            </div>
            <div className="text-xl font-bold mb-2 text-pink-500">
              {orders?.length}
            </div>
            <div className="text-gray-500 mt-1">Total Orders</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center mb-4 text-orange-600">
              <CheckCircleIcon />
            </div>
            <div className="text-xl font-boldmb-2 text-orange-600">
              {
                orders?.filter((item) => item?.orderStatus === "Delivered")
                  .length
              }
            </div>
            <div className="text-gray-500 mt-1">Total Completed</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center mb-4 text-purple-700">
              <Undo />
            </div>
            <div className="text-xl font-bold mb-2 text-purple-700">
              {
                orders?.filter((item) => item?.orderStatus === "Returned")
                  .length
              }
            </div>
            <div className="text-gray-500 mt-1">Total Returned</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OverviewPage;
