import { View } from "lucide-react";
import Link from "next/link";
import React from "react";

import CustomTable from "@/components/Dashboard/Components/CustomTable";

const ReturnOrdersPage = () => {
  const headers = [
    { key: "orderId", label: "Order ID" },
    { key: "orderType", label: "Order Type" },
    { key: "customer", label: "Customer" },
    { key: "amount", label: "Amount" },
    { key: "date", label: "Date" },
    { key: "status", label: "Status" },
    { key: "action", label: "Action" },
  ];

  const orders = [
    {
      orderId: "0110243",
      orderType: "Delivery",
      customer: "Will Smith",
      amount: "$278.00",
      date: "07:45 PM, 01-10-2024",
      status: (
        <span className="bg-yellow-200 text-yellow-600 p-1 rounded">
          Pending
        </span>
      ),
      action: (
        <div className="flex items-center gap-2">
          <Link
            href="/view/[id]"
            as={`/view/${"0110243"}`}
            className="bg-yellow-100 flex items-center justify-center p-1 rounded w-8 h-8"
          >
            <View size={18} className="text-yellow-500 hover:text-yellow-700" />
          </Link>
        </div>
      ),
    },
    {
      orderId: "0110242",
      orderType: "Delivery",
      customer: "Will Smith",
      amount: "$720.00",
      date: "07:45 PM, 01-10-2024",
      status: (
        <span className="bg-green-200 text-green-600 p-1 rounded">
          Delivered
        </span>
      ),
      action: (
        <div className="flex items-center gap-2">
          <Link
            href="/view/[id]"
            as={`/view/${"0110243"}`}
            className="bg-yellow-100 flex items-center justify-center p-1 rounded w-8 h-8"
          >
            <View size={18} className="text-yellow-500 hover:text-yellow-700" />
          </Link>
        </div>
      ),
    },
    {
      orderId: "0110241",
      orderType: "Delivery",
      customer: "Will Smith",
      amount: "$415.20",
      date: "07:45 PM, 01-10-2024",
      status: (
        <span className="bg-green-200 text-green-600 p-1 rounded">
          Delivered
        </span>
      ),
      action: (
        <div className="flex items-center gap-2">
          <Link
            href="/view/[id]"
            as={`/view/${"0110243"}`}
            className="bg-yellow-100 flex items-center justify-center p-1 rounded w-8 h-8"
          >
            <View size={18} className="text-yellow-500 hover:text-yellow-700" />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div>
      <CustomTable
        isBtnNeeded={false}
        headers={headers}
        data={orders}
        title={"Return"}
      />
    </div>
  );
};

export default ReturnOrdersPage;
