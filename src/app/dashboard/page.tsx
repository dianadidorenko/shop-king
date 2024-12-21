"use client";

import React, { useEffect, useState } from "react";
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
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";

import ProductCard from "@/components/ProductCard";
import StatCard from "@/components/Dashboard/Components/StatCard";
import OrderStatCard from "@/components/Dashboard/Components/OrderStatCard";
import { axiosInstance } from "@/lib/axiosInstance";
import SalesChart from "@/components/Dashboard/Components/SalesChart";
import DeliveryStatus from "@/components/Dashboard/Components/OrdersChart";
import CustomerStats from "@/components/Dashboard/Components/CustomerStats";

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
  const [dbMetrics, setDbMetrics] = useState(null);
  const [orderStats, setOrderStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [restData, setRestData] = useState(null);

  const fetchDbMetrics = async () => {
    await axiosInstance.get("/dashboard/metrics").then((data) => {
      if (data?.data?.status) {
        setDbMetrics(data.data.data);
      }
    });
    await axiosInstance.get("/dashboard/order-stats").then((data) => {
      if (data?.data?.status) {
        setOrderStats(data.data.data);
      }
    });
    await axiosInstance.get("/dashboard/summary").then((data) => {
      if (data?.data?.status) {
        setRestData(data.data.data);
      }
    });
    await axiosInstance.get("/products").then((data) => {
      if (data?.data?.status) {
        setProducts(data.data.data);
      }
    });
  };

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

  useEffect(() => {
    fetchDbMetrics();
  }, []);

  return (
    <div className="bg-gray-100 p-2">
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
              value={`$${dbMetrics?.totalEarning}` || 0}
              bgColor={"bg-pink-500"}
              textColor="text-white"
            />
            <StatCard
              icon={FaBox}
              iconColor="text-purple-500"
              title="Total Orders"
              value={dbMetrics?.totalOrders || 0}
              bgColor={"bg-orange-500"}
              textColor="text-white"
            />
            <StatCard
              icon={FaUsers}
              iconColor="text-blue-500"
              title="Total Customers"
              value={dbMetrics?.totalCustomers || 0}
              bgColor={"bg-purple-500"}
              textColor="text-white"
            />
            <StatCard
              icon={FaClipboardList}
              iconColor="text-blue-500"
              title="Total Products"
              value={dbMetrics?.totalProducts || 0}
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
              value={dbMetrics?.totalOrders || 0}
            />
            <OrderStatCard
              icon={FaClock}
              iconColor="text-yellow-500"
              title="Pending"
              value={
                orderStats?.find((item) => item?._id === "Pending")?.count || 0
              }
            />
            <OrderStatCard
              icon={FaCheckCircle}
              iconColor="text-green-500"
              title="Confirmed"
              value={
                orderStats?.find((item) => item?._id === "Accepted")?.count || 0
              }
            />
            <OrderStatCard
              icon={FaTruck}
              iconColor="text-blue-500"
              title="Ongoing"
              value={
                orderStats?.find((item) => item?._id === "On the Way")?.count ||
                0
              }
            />
            <OrderStatCard
              icon={FaBoxOpen}
              iconColor="text-purple-500"
              title="Delivered"
              value={
                orderStats?.find((item) => item?._id === "Delivered")?.count ||
                0
              }
            />
            <OrderStatCard
              icon={FaTimesCircle}
              iconColor="text-pink-500"
              title="Cancelled"
              value={
                orderStats?.find((item) => item?._id === "Cancelled")?.count ||
                0
              }
            />
            <OrderStatCard
              icon={FaUndo}
              iconColor="text-red-500"
              title="Returned"
              value={
                orderStats?.find((item) => item?._id === "Returned")?.count || 0
              }
            />
            <OrderStatCard
              icon={FaBan}
              iconColor="text-orange-500"
              title="Rejected"
              value={
                orderStats?.find((item) => item?._id === "Rejected")?.count || 0
              }
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-between gap-4">
        <div className="w-[50%] bg-white rounded-md shadow">
          <div className="shadow-md p-4 flex justify-between items-center">
            <h3 className="font-bold">Sales Summary</h3>
          </div>
          <div className="p-4">
            <SalesChart data={restData?.salesSummary} />
            {/* <DateRangePicker onChange={(e: any) => console.log(e)} /> */}
          </div>
        </div>
        <div className="w-[50%] bg-white rounded-md shadow">
          <div className="shadow-md p-4 flex justify-between items-center">
            <h3 className="font-bold">Order Summary</h3>
          </div>
          <div className="mt-3 h-full flex items-center justify-center">
            <DeliveryStatus data={restData?.orderSummary} />
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-between gap-4">
        <div className="w-[50%] bg-white rounded-md shadow">
          <div className="shadow-md p-4 flex justify-between items-center">
            <h3 className="font-bold">Customer Stats</h3>
          </div>
          <div className="mt-4 flex gap-2">
            <CustomerStats data={restData?.customerActivity} />
          </div>
        </div>
        <div className="w-[50%] bg-white rounded-md shadow">
          <div className="shadow-md p-4 flex justify-between items-center">
            <h3 className="font-bold">Top Customers</h3>
          </div>
          <div className="mt-4 flex gap-2 p-4">
            {restData?.topCustomers?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center justify-center flex-col gap-2"
                >
                  <img
                    src="https://placehold.co/600x800"
                    alt="profile img"
                    className="w-20 h-20"
                  />
                  <p className="font-semibold">{item?.fullName}</p>
                  <p className="text-white p-4 bg-blue-500 rounded-b-xl flex items-center">
                    {item?.totalOrders} Orders
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 bg-white">
        <div className="shadow-md p-4 flex justify-between items-center">
          <h3 className="font-bold">Top Products</h3>
        </div>
        <div className="mt-4">
          <ProductCard data={products} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
