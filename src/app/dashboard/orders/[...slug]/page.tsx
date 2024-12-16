"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import OrderDetails from "@/components/Dashboard/Orders/OrderDetails";
import { axiosInstance } from "@/lib/axiosInstance";

const ViewOrders = () => {
  const [data, setData] = useState("");
  const params = useParams();

  const fetchOrder = async () => {
    await axiosInstance.get(`/orders/${params?.slug?.[1]}`).then((data) => {
      if (data?.data?.status) {
        setData(data.data.data);
      }
    });
  };

  useEffect(() => {
    fetchOrder();
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
      <div className="mt-4">
        <OrderDetails fetchOrder={fetchOrder} {...data} />
      </div>
    </div>
  );
};

export default ViewOrders;
