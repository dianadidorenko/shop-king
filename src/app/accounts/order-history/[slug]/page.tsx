"use client";

import { Ellipsis } from "lucide-react";
import React, { ReactNode, useEffect, useState } from "react";
import { format } from "date-fns";
import { useParams } from "next/navigation";

import { axiosInstance } from "@/lib/axiosInstance";
import OrderDetails from "@/components/Dashboard/Orders/OrderDetails";

const OrderHistoryPage = () => {
  const params = useParams();
  const [data, setData] = useState([]);

  const fetchOrder = async () => {
    await axiosInstance.get(`/orders/${params.slug}`).then((data) => {
      if (data?.data?.status) {
        setData(data.data.data);
      }
    });
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const cancelOrder = async (id: string) => {
    await axiosInstance
      .put(`/orders/${id}`, { orderStatus: "Cancelled" })
      .then((data) => {
        if (data?.data?.status) {
          alert("Order Cancelled");
          fetchOrder();
        }
      });
  };

  return (
    <main className="w-full px-4 pb-6">
      <h1 className="text-2xl font-semibold text-orange-500 mb-6">
        Order Details
      </h1>
      <div className="bg-white shadow-md rounded-lg pb-6">
        <OrderDetails from="user" fetchOrder={fetchOrder} {...data} />
      </div>
    </main>
  );
};

export default OrderHistoryPage;
