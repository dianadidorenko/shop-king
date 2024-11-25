import React, { useState, useEffect } from "react";
import { Check, Clock, X } from "lucide-react";

interface OrderItem {
  name: string;
  variant: string;
  price: number;
  image: string;
}

interface Address {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface OrderDetailsProps {
  orderId: string;
  orderTime: string;
  paymentType: string;
  orderType: string;
  orderStatus: {
    paid: string;
    delivery: string;
  };
  orderItems: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  subtotal: string;
  tax: string;
  discount: string;
  shippingCharge: string;
  total: string;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({
  orderId,
  orderTime,
  paymentType,
  orderType,
  orderStatus,
  orderItems,
  shippingAddress,
  billingAddress,
  subtotal,
  tax,
  discount,
  shippingCharge,
  total,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
      {/* Order Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-semibold">
            Order ID: <span className="font-normal">#{orderId}</span>
          </h1>
          <div className="flex space-x-2 mt-4">
            <span className="bg-red-200 text-red-600 text-xs font-semibold px-2 py-1 rounded">
              {orderStatus.delivery}
            </span>
            <span className="bg-yellow-200 text-yellow-600 text-xs font-semibold px-2 py-1 rounded">
              {orderStatus.paid}
            </span>
          </div>
          <div className="flex flex-col gap-2 space-x-2 mt-5">
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Clock size={18} />
              {orderTime}
            </span>
            <span className="text-xs text-gray-500">
              Payment Type: {paymentType}
            </span>
            <span className="text-xs text-gray-500">
              Order Type: {orderType}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-4 mb-4">
          <button className="bg-red-500 text-sm text-white px-4 py-2 rounded flex items-center">
            Reject
          </button>
          <button className="bg-green-500 text-sm text-white px-4 py-2 rounded flex items-center">
            Accept
          </button>
        </div>
      </div>

      {/* Order Details */}
      <div className="flex gap-4">
        <div className="w-full">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Order Details</h2>
            {orderItems.map((item, index) => (
              <div key={index} className="flex items-center mb-4">
                <img
                  src={item.image}
                  alt={`Product image of ${item.name}`}
                  className="w-16 h-16 rounded mr-4"
                />
                <div>
                  <h3 className="text-sm font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.variant}</p>
                  <p className="text-sm font-semibold">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full">
          <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex flex-col gap-3">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <p className="text-sm text-gray-500">Subtotal: ${subtotal}</p>
            <p className="text-sm text-gray-500">Tax: ${tax}</p>
            <p className="text-sm text-gray-500">Discount: ${discount}</p>
            <p className="text-sm text-gray-500">
              Shipping Charge: ${shippingCharge}
            </p>
            <p className="text-sm font-semibold">Total: ${total}</p>
          </div>
        </div>
      </div>

      {/* Addresses */}
      <div className="flex gap-4 ">
        <div className="bg-white p-4 rounded-lg shadow-md mb-4 w-full">
          <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
          <p>{shippingAddress.name}</p>
          <p>{shippingAddress.email}</p>
          <p>{shippingAddress.phone}</p>
          <p>{shippingAddress.address}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md w-full">
          <h2 className="text-lg font-semibold mb-4">Billing Address</h2>
          <p>{billingAddress.name}</p>
          <p>{billingAddress.email}</p>
          <p>{billingAddress.phone}</p>
          <p>{billingAddress.address}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
