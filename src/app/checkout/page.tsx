"use client";

import React, { useEffect, useState } from "react";
import { FaTag } from "react-icons/fa";
import { AiOutlineLeft, AiOutlineSave } from "react-icons/ai";

import AddressForm from "@/components/AddressForm";
import { axiosInstance } from "@/lib/axiosInstance";

interface Address {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
}

interface ShippingInfoProps {
  shippingAddress: Address;
  billingAddress: Address;
  onEditAddress: () => void;
  onAddNewAddress: () => void;
  onSaveAndPay: () => void;
  total: number;
  subtotal: number;
  tax: number;
  shippingCharge: number;
  discount: number;
}

const ShippingInfo: React.FC<ShippingInfoProps> = ({
  shippingAddress,
  showBillingAddress,
  setShowBillingAddress,
  billingAddress,
  onEditAddress,
  onAddNewAddress,
  onSaveAndPay,
  total,
  subtotal,
  tax,
  shippingCharge,
  discount,
  items,
}) => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-xl fone-semibold mb-2">
        Provide Your Shipping Information
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Check Your Information Before You Continue
      </p>

      {/* Progress Bar */}
      <div className="flex items-center mb-6">
        <ProgressStep stepNumber={1} label="Cart" isComplete />
        <ProgressStep stepNumber={2} label="Checkout" isComplete />
        <ProgressStep stepNumber={3} label="Payment" />
      </div>

      {/* Delivery/Pick Up Toggle */}
      <div className="flex mb-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-l">
          Delivery
        </button>
      </div>

      {/* Shipping Address Section */}
      <AddressSection
        title="Shipping Address"
        address={shippingAddress}
        onEditAddress={onEditAddress}
        onAddNewAddress={onAddNewAddress}
      />

      {/* Billing Address Section */}
      {!showBillingAddress ? (
        <AddressSection
          title="Billing Address"
          address={billingAddress}
          onEditAddress={onEditAddress}
          onAddNewAddress={onAddNewAddress}
        />
      ) : (
        ""
      )}

      {/* Save Shipping Address Checkbox */}
      <div className="flex items-center mb-6">
        <input
          type="checkbox"
          onChange={(e) => setShowBillingAddress(e?.target?.checked)}
          className="mr-2"
        />
        <label>Save shipping address as a billing address</label>
      </div>

      <div className="mb-6">
        {items.map((item, index: number) => (
          <div
            key={index}
            className="bg-white shadow-md p-4 rounded-md flex items-center gap-3"
          >
            <div>
              <img
                src={item?.productId?.images?.[0]}
                alt={item?.productId?.name}
                className="w-20 h-20 rounded-md shadow"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold">{item.productId?.name}</h2>
              <p className="flex gap-1 text-sm font-medium">
                <b>Size:</b> {item?.variation?.size}
              </p>
              <p className="flex gap-1 text-sm font-medium">
                <b>Color:</b> {item?.variation?.color}
              </p>
              <p className="flex gap-1 text-sm font-medium">
                <b>Quantity:</b> {item?.quantity}
              </p>
              <p className="flex gap-1 text-sm font-medium">
                <b>Price:</b> ${item?.variation?.price * Number(item?.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <CartSummary
        subtotal={subtotal}
        tax={tax}
        shippingCharge={shippingCharge}
        discount={discount}
        total={total}
      />

      {/*  Action Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6">
        <button
          onClick={onSaveAndPay}
          className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center"
        >
          <AiOutlineSave className="mr-2" /> Save and Pay
        </button>
      </div>
    </div>
  );
};

const ProgressStep: React.FC<{
  stepNumber: number;
  label: string;
  isComplete?: boolean;
}> = ({ stepNumber, label, isComplete }) => (
  <div className="flex-1">
    <div className="flex relative items-center justify-center">
      <div
        className={`relative z-[15] w-8 h-8 rounded-full flex items-center justify-center ${
          isComplete ? "bg-green-500 text-white" : "bg-gray-300 text-black"
        }`}
      >
        {stepNumber}
      </div>
      {stepNumber === 1 && (
        <div
          className={`absolute left-[50%] z-10 w-full flex-1 h-1 ${
            isComplete ? "bg-green-500" : "bg-gray-300"
          }`}
        ></div>
      )}
      {stepNumber === 2 && (
        <div
          className={`absolute z-10 w-full flex-1 h-1 ${
            isComplete ? "bg-green-500" : "bg-gray-300"
          }`}
        ></div>
      )}
      {stepNumber === 3 && (
        <div
          className={`absolute right-[50%] z-10 w-full flex-1 h-1 ${
            isComplete ? "bg-green-500" : "bg-gray-300"
          }`}
        ></div>
      )}
    </div>
    <p
      className={`text-center text-sm mt-2 ${
        isComplete ? "text-green-500" : "text-gray-500"
      }`}
    >
      {label}
    </p>
  </div>
);

const AddressSection: React.FC<{
  title: string;
  address: Address;
  onEditAddress: () => void;
  onAddNewAddress: () => void;
}> = ({ title, address, onEditAddress, onAddNewAddress }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="p-4 bg-gray-100 rounded-lg mb-4">
        <p>{address?.fullName}</p>
        <p>{address?.phone}</p>
        <p>{address?.email}</p>
        <p>{address?.addressLine1}</p>
        {address?.addressLine2 && <p>{address?.addressLine2}</p>}
        <p>
          {address?.city}
          {address && ", "}
          {address?.state}
        </p>
        <p>
          {address?.zipcode}
          {address && ", "}
          {address?.country}
        </p>
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => onEditAddress(title)}
          className="bg-gray-500 text-white px-4 py-2 rounded-md flex items-center"
        >
          <AiOutlineLeft className="mr-2" /> Edit
        </button>
        <button
          onClick={() => onAddNewAddress(title)}
          className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center"
        >
          <AiOutlineSave className="mr-2" /> Add New
        </button>
      </div>
    </div>
  );
};

const CartSummary: React.FC<{
  subtotal: number;
  tax: number;
  shippingCharge: number;
  discount: number;
  total: number;
}> = ({ subtotal, tax, shippingCharge, discount, total }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <button className="bg-blue-100 text-blue-500 px-4 py-2 rounded mb-6 flex items-center">
        <FaTag className="mr-2" /> Apply Coupon Code
      </button>
      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between mb-2">
          <p>Subtotal</p>
          <p>${subtotal}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>Tax</p>
          <p>${tax}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>Shipping Charge</p>
          <p>${shippingCharge}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>Discount</p>
          <p>${discount}</p>
        </div>
        <div className="flex justify-between font-semibold">
          <p>Total</p>
          <p>${total}</p>
        </div>
      </div>
    </div>
  );
};

const CheckoutPage: React.FC = () => {
  const [orderSummary, setOrderSummary] = useState({});

  function generateOrderSummary(
    items,
    taxRate = 0.3,
    shippingCharge = 10,
    discountRate = 0
  ) {
    const subtotal = items.reduce(
      (total, item) => total + item.variation.price * item.quantity,
      0
    );

    const tax = subtotal * taxRate;
    const discount = subtotal * discountRate;
    const total = subtotal + tax + shippingCharge - discount;

    return {
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      shippingCharge: shippingCharge.toFixed(2),
      discount: discount.toFixed(2),
      total: total.toFixed(2),
    };
  }

  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);

  const [addresses, setAddresses] = useState({
    billingAddress: {},
    shippingAddress: {},
  });

  const [addressType, setAddressType] = useState("");
  const [items, setItems] = useState([]);
  const [showBillingAddress, setShowBillingAddress] = useState(false);

  const handleAddNewAddress = (title: string) => {
    setAddressType(title);
    setIsAddressFormOpen(true);
  };

  const fetchAddress = async () => {
    axiosInstance.get("/user").then((data) => {
      if (data?.data?.status) {
        setAddresses({
          shippingAddress: data?.data.user?.shippingAddress,
          billingAddress: data?.data.user?.billingAddress,
        });
      }
    });
  };

  const fetchCart = async () => {
    await axiosInstance.get("/cart").then((data) => {
      if (data?.data?.status) {
        setItems(data?.data?.data?.items);
        setOrderSummary(generateOrderSummary(data?.data?.data?.items));
      }
    });
  };

  useEffect(() => {
    fetchAddress();
    fetchCart();
  }, []);

  const handleSaveAndPay = () => {
    const data = {
      paymentType: "Card",
      orderType: "Delivery",
      shippingAddress: addresses?.shippingAddress,
      billingAddress: addresses?.billingAddress,
      total: orderSummary?.total,
      shippingCharge: orderSummary?.shippingCharge,
      discount: orderSummary?.discount,
      tax: orderSummary?.tax,
      subtotal: orderSummary?.subtotal,
      items: items.map((item) => {
        return {
          productName: item?.productId?.name,
          productImage: item?.productId?.images?.[0],
          price: item?.variation?.price,
          color: item?.variation?.color,
          size: item?.variation?.size,
          quantity: item?.quantity,
          sku: item?.variation?.sku,
        };
      }),
    };
    axiosInstance.post("/orders", data).then((data) => {
      alert("Order Placed Successfully");
    });
  };

  return (
    <>
      <ShippingInfo
        items={items}
        fetchAddress={fetchAddress}
        showBillingAddress={showBillingAddress}
        setShowBillingAddress={setShowBillingAddress}
        shippingAddress={addresses.shippingAddress}
        billingAddress={addresses.billingAddress}
        onEditAddress={handleAddNewAddress}
        onAddNewAddress={handleAddNewAddress}
        onSaveAndPay={handleSaveAndPay}
        subtotal={orderSummary?.subtotal}
        tax={orderSummary?.tax}
        shippingCharge={orderSummary?.shippingCharge}
        discount={orderSummary?.discount}
        total={orderSummary?.total}
      />
      {isAddressFormOpen && (
        <AddressForm
          title={addressType}
          onClose={() => setIsAddressFormOpen(false)}
          showBillingAddress={showBillingAddress}
          billingAddress={addresses?.billingAddress}
          shippingAddress={addresses?.shippingAddress}
        />
      )}
    </>
  );
};

export default CheckoutPage;
