"use client";

import { useEffect, useState } from "react";

import ProductCard from "@/components/ProductCard";
import { axiosInstance } from "@/lib/axiosInstance";

const OffersPage = () => {
  const [flashSaleProducts, setFlashSaleProducts] = useState([]);

  const fetchFlashSales = async () => {
    await axiosInstance.get("/products/flash-sales").then((data) => {
      if (data?.data?.status) {
        setFlashSaleProducts(data.data.data);
      }
    });
  };

  useEffect(() => {
    fetchFlashSales();
  }, []);

  return (
    <div className="container px-2 xl:px-4 py-12 mx-auto">
      <div className="flex items-center">
        <h1 className="text-xl xl:text-4xl font-bold mb-0">Offer Prpducts</h1>
        <span className="text-md xl:text-xl ms-2 relative top-[1px]">
          ({flashSaleProducts?.length} Products Found)
        </span>
      </div>
      <div className="mt-5">
        <ProductCard isWishlisted={false} data={flashSaleProducts} />
      </div>
    </div>
  );
};

export default OffersPage;
