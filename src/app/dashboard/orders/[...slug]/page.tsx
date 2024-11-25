import OrderDetails from "@/components/Dashboard/Orders/OrderDetails";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const ViewOrders = () => {
  const orderData = {
    orderId: "2110246",
    orderTime: "04:45 AM, 21-10-2024",
    paymentType: "Cash On Delivery",
    orderType: "Delivery",
    orderStatus: {
      paid: "Unpaid",
      delivery: "Pending",
    },
    orderItems: [
      {
        name: "DailyRun Leggings",
        color: "Black",
        price: 40.0,
        image: "https://placehold.co/60x60",
      },
      {
        name: "Camo Hoodie",
        color: "White",
        price: 140.0,
        image: "https://placehold.co/60x60",
      },
    ],
    shippingAddress: {
      name: "Will Smith",
      email: "customer@example.com",
      phone: "+880123333444",
      addressLine:
        "House 30, Road 13, Block A, Dhanmondi 32, Dhaka, Bangladesh 1209",
    },
    billingAddress: {
      name: "Will Smith",
      email: "customer@example.com",
      phone: "+880123333444",
      addressLine:
        "House 30, Road 13, Block A, Dhanmondi 32, Dhaka, Bangladesh 1209",
    },
    subtotal: "180.0",
    tax: "41.0",
    discount: "50.0",
    shippingCharge: "10.0",
    total: "181.0",
  };

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
        <OrderDetails {...orderData} />
      </div>
    </div>
  );
};

export default ViewOrders;
