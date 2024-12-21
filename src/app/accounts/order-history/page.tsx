"use client";

import { Ellipsis } from "lucide-react";
import React, { ReactNode, useEffect, useState } from "react";
import { format } from "date-fns";
import Link from "next/link";

import { axiosInstance } from "@/lib/axiosInstance";
import { OrderItem } from "@/lib/type";

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

const OrderHistoryPage = () => {
  const [data, setData] = useState<OrderItem[]>([]);

  const getOrders = async () => {
    await axiosInstance.get("/orders").then((data) => {
      if (data?.data?.status) {
        setData(data.data.data);
      }
    });
  };

  useEffect(() => {
    getOrders();
  }, []);

  const cancelOrder = async (id: string) => {
    await axiosInstance
      .put(`/orders/${id}`, { orderStatus: "Cancelled" })
      .then((data) => {
        if (data?.data?.status) {
          alert("Order Cancelled");
          getOrders();
        }
      });
  };

  return (
    <main className="w-full px-4 pb-6">
      <h1 className="text-2xl font-semibold text-orange-500 mb-6">
        Order History
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="pb-4">Order ID</th>
              <th className="pb-4">Products</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Payment</th>
              <th className="pb-4">Amount</th>
              <th className="pb-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => {
              return (
                <tr key={index} className="border-t">
                  <td className="py-4">
                    {item?.orderId}
                    <br />
                    <span className="text-gray-500 text-sm">
                      {item?.createdAt
                        ? format(
                            new Date(item?.createdAt),
                            "dd MMM yyyy, hh:mm a"
                          )
                        : "Invalid Date"}
                    </span>
                  </td>
                  <td className="py-4">
                    {item?.items?.length}{" "}
                    {item?.items?.length === 1 ? "Product" : "Products"}
                  </td>
                  <td className="py-4">
                    <span className="bg-yellow-100 text-yellow-500 px-2 py-1 rounded">
                      {item?.orderStatus}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className="bg-red-100 text-red-500 px-2 py-1 rounded">
                      {item?.paymentType}
                    </span>
                  </td>
                  <td className="py-4">${item?.total}</td>
                  <td className="py-4">
                    <Dropdown>
                      <Link
                        href={`/accounts/order-history/${item?._id}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 duration-300"
                      >
                        View Details
                      </Link>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          cancelOrder(item?._id);
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 duration-300"
                      >
                        Cancel Order
                      </a>
                    </Dropdown>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="mt-4 text-gray-500">
          Showing 1 to {data?.length} of {data?.length} results
        </div>
      </div>
    </main>
  );
};

export default OrderHistoryPage;
