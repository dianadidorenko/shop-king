"use client";

import { ChevronRight, View } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import CustomTable from "@/components/Dashboard/Components/CustomTable";
import { axiosInstance } from "@/lib/axiosInstance";

const OrdersPage = () => {
  const [data, setData] = useState([]);

  const headers = [
    { key: "orderId", label: "Order ID" },
    { key: "orderType", label: "Order Type" },
    { key: "customer", label: "Customer" },
    { key: "amount", label: "Amount" },
    { key: "date", label: "Date" },
    { key: "status", label: "Status" },
    { key: "action", label: "Action" },
  ];

  const fetchOrders = async () => {
    await axiosInstance.get("/orders").then((data) => {
      if (data?.data?.status) {
        setData(
          data.data.data.map((item) => {
            return {
              orderId: item?.orderId,
              orderType: item?.orderType,
              customer: item?.userId.name,
              amount: item?.total,
              date:
                new Date(item?.createdAt).toDateString() +
                " " +
                new Date(item?.createdAt).toLocaleTimeString(),
              status: (
                <span className="bg-yellow-200 text-yellow-600 p-1 rounded">
                  {item?.orderStatus}
                </span>
              ),
              action: (
                <div className="flex items-center gap-2">
                  <Link
                    href={`/dashboard/orders/view/${item?._id}`}
                    className="bg-yellow-100 flex items-center justify-center p-1 rounded w-8 h-8"
                  >
                    <View
                      size={18}
                      className="text-yellow-500 hover:text-yellow-700"
                    />
                  </Link>
                </div>
              ),
            };
          })
        );
      }
    });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  console.log(data);

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <Link href={"/dashboard"}>Dashboard</Link>
        <ChevronRight size={15} />
        <Link href={"/dashboard/orders"}>Orders</Link>
        <ChevronRight size={15} />
        <span>View</span>
      </div>

      <CustomTable
        isBtnNeeded={false}
        headers={headers}
        data={data}
        title={"Orders"}
      />
    </div>
  );
};

export default OrdersPage;
