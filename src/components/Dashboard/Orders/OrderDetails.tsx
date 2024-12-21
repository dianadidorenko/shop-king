import React from "react";
import { Clock } from "lucide-react";
import { format } from "date-fns";

import { axiosInstance } from "@/lib/axiosInstance";

interface OrderItem {
  productName: string;
  variant: string;
  price: number;
  productImage: string;
  size: string;
  color: string;
  quantity: string;
}

interface Address {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
}

interface OrderDetailsProps {
  from?: string;
  _id: string;
  fetchOrder: () => void;
  orderId: string;
  orderTime: string;
  paymentType: string;
  orderType: string;
  orderStatus: string;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  subtotal: string;
  tax: string;
  discount: string;
  shippingCharge: string;
  total: string;
  createdAt: string;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({
  _id,
  from,
  orderId,
  createdAt,
  paymentType,
  orderType,
  orderStatus,
  items,
  shippingAddress,
  billingAddress,
  subtotal,
  tax,
  discount,
  shippingCharge,
  total,
  fetchOrder,
}) => {
  const acceptOrder = async () => {
    await axiosInstance
      .put(`/orders/${_id}`, { orderStatus: "Accepted" })
      .then((data) => {
        if (data?.data?.status) {
          alert("Order accepted");
          fetchOrder();
        }
      });
  };

  const cancelOrder = async () => {
    await axiosInstance
      .put(`/orders/${_id}`, { orderStatus: "Cancelled" })
      .then((data) => {
        if (data?.data?.status) {
          alert("Order accepted");
          fetchOrder();
        }
      });
  };

  const changeOrderStatus = async (e: any) => {
    await axiosInstance
      .put(`/orders/${_id}`, { orderStatus: e.target.value })
      .then((data) => {
        if (data?.data?.status) {
          alert("Order Status Updated");
          fetchOrder();
        }
      });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
      {/* Order Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-semibold">
            Order ID: <span className="font-normal">{orderId}</span>
          </h1>
          <div className="flex space-x-2 mt-4">
            <span className="bg-red-200 text-red-600 text-xs font-semibold px-2 py-1 rounded">
              {orderStatus}
            </span>
            <span className="bg-yellow-200 text-yellow-600 text-xs font-semibold px-2 py-1 rounded">
              {orderType}
            </span>
          </div>
          <div className="flex flex-col gap-2 space-x-2 mt-5">
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Clock size={18} />
              {createdAt && !isNaN(new Date(createdAt).getTime())
                ? format(new Date(createdAt), "dd MMM yyyy, hh:mm a")
                : "Invalid Date"}
            </span>
            <span className="text-xs text-gray-500">
              Payment Type: {paymentType}
            </span>
            <span className="text-xs text-gray-500">
              Order Type: {orderType}
            </span>
          </div>
        </div>

        {from !== "user" && (
          <div className="flex space-x-4 mb-4">
            {orderStatus === "Pending" ? (
              <>
                <button
                  onClick={cancelOrder}
                  className="bg-red-500 text-sm text-white px-4 py-2 rounded flex items-center"
                >
                  Reject
                </button>
                <button
                  onClick={acceptOrder}
                  className="bg-green-500 text-sm text-white px-4 py-2 rounded flex items-center"
                >
                  Accept
                </button>
              </>
            ) : (
              <select
                name="orderStatus"
                onChange={changeOrderStatus}
                className="border rounded-md shadow p-2"
                defaultValue={orderStatus}
              >
                <option value="Delivered">Delivered</option>
                <option value="On the Way">On the Way</option>
                <option value="Shipped">Shipped</option>
              </select>
            )}
          </div>
        )}
        {from === "user" && orderStatus && orderStatus === "Pending" && (
          <button
            onClick={cancelOrder}
            className="bg-red-500 text-sm text-white px-4 py-2 rounded flex items-center"
          >
            Reject
          </button>
        )}
      </div>

      {/* Order Details */}
      <div className="flex gap-4">
        <div className="w-full">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Order Details</h2>
            {items?.map((item, index) => (
              <div key={index} className="flex items-center mb-4">
                <img
                  src={item.productImage}
                  alt={`Product image of ${item.productName}`}
                  className="w-16 h-16 rounded mr-4"
                />
                <div>
                  <h3 className="text-sm font-semibold">{item.productName}</h3>
                  <p className="text-sm text-gray-500">
                    {item.size +
                      ", " +
                      item.color +
                      ", " +
                      item.quantity +
                      " pc."}
                  </p>
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
          <p>{shippingAddress?.fullName}</p>
          <p>{shippingAddress?.email}</p>
          <p>{shippingAddress?.phone}</p>
          <p>
            {shippingAddress?.city},{shippingAddress?.state},
            {shippingAddress?.zipcode},{shippingAddress?.country}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md w-full">
          <h2 className="text-lg font-semibold mb-4">Billing Address</h2>
          <p>{billingAddress?.fullName}</p>
          <p>{billingAddress?.email}</p>
          <p>{billingAddress?.phone}</p>
          <p>
            {billingAddress?.city},{billingAddress?.state},
            {billingAddress?.zipcode},{billingAddress?.country}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
