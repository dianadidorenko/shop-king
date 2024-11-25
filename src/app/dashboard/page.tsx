"use client";

import {
  FaDollarSign,
  FaBox,
  FaUsers,
  FaClipboardList,
  FaClock,
  FaCheckCircle,
  FaBan,
  FaTruck,
  FaBoxOpen,
  FaTimesCircle,
  FaUndo,
} from "react-icons/fa";
import StatCard from "@/components/Dashboard/Components/StatCard";
import OrderStatCard from "@/components/Dashboard/Components/OrderStatCard";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

interface DashboardData {
  totalEarnings: string;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  orderStats: {
    totalOrders: number;
    pending: number;
    confirmed: number;
    ongoing: number;
    delivered: number;
    canceled: number;
    returned: number;
    rejected: number;
  };
}

const DashboardPage: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);

  const products = [
    {
      title: "DailyRun Leggings",
      price: 40.0,
      originalPrice: 80.0,
      image: "/goods/2-cover.png",
    },
    {
      title: "Denim Jacket",
      price: 120.0,
      originalPrice: 150.0,
      image: "/goods/3-cover.png",
    },
    {
      title: "Dri-Fit Crop Top",
      price: 96.0,
      originalPrice: 120.0,
      image: "/goods/4-cover.png",
    },
    {
      title: "Dri-Fit One",
      price: 80.0,
      originalPrice: 100.0,
      image: "/goods/5-cover.png",
    },
    {
      title: "Dri-Fit Pro",
      price: 96.0,
      originalPrice: 120.0,
      image: "/goods/6-cover.png",
    },
    {
      title: "Dri-Fit Striker",
      price: 55.0,
      originalPrice: 110.0,
      image: "/goods/7-cover.png",
    },
    {
      title: "Essential Hoodie",
      price: 80.0,
      originalPrice: 160.0,
      image: "/goods/8-cover.png",
    },
    {
      title: "Everyday Plus",
      price: 64.0,
      originalPrice: 80.0,
      image: "/goods/9-cover.png",
    },
    {
      title: "Denim Jacket",
      price: 120.0,
      originalPrice: 150.0,
      image: "/goods/1-cover.png",
    },
  ];

  useEffect(() => {
    const fetchData = () => {
      const dashboardData: DashboardData = {
        totalEarnings: "$1672.20",
        totalOrders: 4,
        totalCustomers: 2,
        totalProducts: 108,
        orderStats: {
          totalOrders: 0,
          pending: 0,
          confirmed: 0,
          ongoing: 0,
          delivered: 0,
          canceled: 0,
          returned: 0,
          rejected: 0,
        },
      };
      setData(dashboardData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-orange-500">Good Morning!</h1>
      <p className="text-xl text-black">Admin</p>
      <div className="mt-4">
        <div className="container mx-auto p-4">
          <h1 className="text-xl font-bold mb-4">Overview</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              icon={FaDollarSign}
              iconColor="text-pink-500"
              title="Total Earnings"
              value={data?.totalEarnings}
              bgColor={"bg-pink-500"}
              textColor="text-white"
            />
            <StatCard
              icon={FaBox}
              iconColor="text-purple-500"
              title="Total Orders"
              value={data?.totalOrders}
              bgColor={"bg-orange-500"}
              textColor="text-white"
            />
            <StatCard
              icon={FaUsers}
              iconColor="text-blue-500"
              title="Total Customers"
              value={data?.totalCustomers}
              bgColor={"bg-purple-500"}
              textColor="text-white"
            />
            <StatCard
              icon={FaClipboardList}
              iconColor="text-blue-500"
              title="Total Products"
              value={data?.totalProducts}
              bgColor={"bg-blue-500"}
              textColor="text-white"
            />
          </div>

          <h2 className="text-xl font-bold mb-4">Order Statistics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <OrderStatCard
              icon={FaBox}
              iconColor="text-red-500"
              title="Total Orders"
              value={data?.orderStats.totalOrders}
            />
            <OrderStatCard
              icon={FaClock}
              iconColor="text-yellow-500"
              title="Pending"
              value={data?.orderStats.pending}
            />
            <OrderStatCard
              icon={FaCheckCircle}
              iconColor="text-green-500"
              title="Confirmed"
              value={data?.orderStats.confirmed}
            />
            <OrderStatCard
              icon={FaTruck}
              iconColor="text-blue-500"
              title="Ongoing"
              value={data?.orderStats.ongoing}
            />
            <OrderStatCard
              icon={FaBoxOpen}
              iconColor="text-purple-500"
              title="Delivered"
              value={data?.orderStats.delivered}
            />
            <OrderStatCard
              icon={FaTimesCircle}
              iconColor="text-pink-500"
              title="Cancelled"
              value={data?.orderStats.canceled}
            />
            <OrderStatCard
              icon={FaUndo}
              iconColor="text-red-500"
              title="Returned"
              value={data?.orderStats.returned}
            />
            <OrderStatCard
              icon={FaBan}
              iconColor="text-orange-500"
              title="Rejected"
              value={data?.orderStats.rejected}
            />
          </div>
        </div>
      </div>
      {/* <div className="mt-4 flex justify-between gap-4">
        <div className="w-[50%] bg-white rounded-md shadow ">
          <div className="shadow-md p-4 flex justify-between items-center">
            <h3 className="font-bold">Sales Summary</h3>
          </div>
          <div className="mt-3 flex items-center justify-between p-4"></div>
        </div>
        <div className="w-[50%] bg-white rounded-md shadow ">
          <div className="shadow-md p-4 flex justify-between items-center">
            <h3 className="font-bold">Order Summary</h3>
          </div>
          <div className="mt-3 flex items-center justify-between p-4"></div>
        </div>
      </div> */}
      <div className="mt-4 bg-white">
        <div className="shadow-md p-4 flex justify-between items-center">
          <h3 className="font-bold">Top Products</h3>
        </div>
        <div className="mt-4">
          <ProductCard isWishlisted={false} data={products} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;