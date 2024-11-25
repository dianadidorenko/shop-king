"use client";

import {
  CheckCircleIcon,
  Ellipsis,
  ShoppingBag,
  Undo,
  Wallet,
} from "lucide-react";
import React, { ReactNode, useState } from "react";

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
            <div className="text-xl font-bold mb-2 text-pink-500">1</div>
            <div className="text-gray-500 mt-1">Total Orders</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center mb-4 text-orange-600">
              <CheckCircleIcon />
            </div>
            <div className="text-xl font-boldmb-2 text-orange-600">1</div>
            <div className="text-gray-500 mt-1">Total Completed</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center mb-4 text-purple-700">
              <Undo />
            </div>
            <div className="text-xl font-bold mb-2 text-purple-700">0</div>
            <div className="text-gray-500 mt-1">Total Returned</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center mb-4 text-blue-600">
              <Wallet />
            </div>
            <div className="text-xl font-bold  mb-2 text-blue-600">
              $0.00
            </div>
            <div className="text-gray-500 mt-1">Wallet Balance</div>
          </div>
        </div>
      </div>
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
            <tr className="border-t">
              <td className="py-4">
                0110243
                <br />
                <span className="text-gray-500 text-sm">
                  07:45 PM, 01-10-2024
                </span>
              </td>
              <td className="py-4">3 Product</td>
              <td className="py-4">
                <span className="bg-yellow-100 text-yellow-500 px-2 py-1 rounded">
                  Pending
                </span>
              </td>
              <td className="py-4">
                <span className="bg-red-100 text-red-500 px-2 py-1 rounded">
                  Unpaid
                </span>
              </td>
              <td className="py-4">₹278.00</td>
              <td className="py-4">
                <Dropdown>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 duration-300"
                  >
                    View Details
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 duration-300"
                  >
                    Cancel Order
                  </a>
                </Dropdown>
              </td>
            </tr>
            <tr className="border-t">
              <td className="py-4">
                0110242
                <br />
                <span className="text-gray-500 text-sm">
                  07:45 PM, 01-10-2024
                </span>
              </td>
              <td className="py-4">4 Product</td>
              <td className="py-4">
                <span className="bg-green-100 text-green-500 px-2 py-1 rounded">
                  Delivered
                </span>
              </td>
              <td className="py-4">
                <span className="bg-green-100 text-green-500 px-2 py-1 rounded">
                  Paid
                </span>
              </td>
              <td className="py-4">₹720.00</td>
              <td className="py-4">
                <Dropdown>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 duration-300"
                  >
                    View Details
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 duration-300"
                  >
                    Cancel Order
                  </a>
                </Dropdown>
              </td>
            </tr>
            <tr className="border-t">
              <td className="py-4">
                0110241
                <br />
                <span className="text-gray-500 text-sm">
                  07:45 PM, 01-10-2024
                </span>
              </td>
              <td className="py-4">4 Product</td>
              <td className="py-4">
                <span className="bg-green-100 text-green-500 px-2 py-1 rounded">
                  Delivered
                </span>
              </td>
              <td className="py-4">
                <span className="bg-green-100 text-green-500 px-2 py-1 rounded">
                  Paid
                </span>
              </td>
              <td className="py-4">₹415.20</td>
              <td className="py-4">
                <Dropdown>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 duration-300"
                  >
                    View Details
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 duration-300"
                  >
                    Cancel Order
                  </a>
                </Dropdown>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mt-4 text-gray-500">Showing 1 to 3 of 3 results</div>
      </div>
    </main>
  );
};

export default OverviewPage;
