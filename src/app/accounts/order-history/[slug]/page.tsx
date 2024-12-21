"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { axiosInstance } from "@/lib/axiosInstance";
import OrderDetails from "@/components/Dashboard/Orders/OrderDetails";
import { OrderItem } from "@/lib/type";

const OrderHistoryPage = () => {
  const params = useParams();
  const [data, setData] = useState<OrderItem | null>(null);

  const fetchOrder = async () => {
    await axiosInstance.get(`/orders/${params.slug}`).then((data) => {
      if (data?.data?.status) {
        setData(data.data.data);
      }
    });
  };

  useEffect(() => {
    fetchOrder();
  }, [params.slug]);

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
