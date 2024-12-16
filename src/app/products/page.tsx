"use client";

import { ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import ProductCard from "@/components/ProductCard";
import ProductFilter from "@/components/ProductFilter";
import { axiosInstance } from "@/lib/axiosInstance";

const ProductsPage = () => {
  const [products, setProducts] = React.useState([]);
  const params = useSearchParams();
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const subcategory = params.get("subcategory");
    setFilters((prevFilters) => ({
      ...prevFilters,
      subcategory: subcategory,
    }));
  }, [params]);

  const fetchProducts = async () => {
    const isClient = typeof window !== "undefined";
    if (isClient) {
      await axiosInstance.get("/products", { params: filters }).then((data) => {
        if (data?.data?.status) {
          setProducts(data.data.data);
        }
      });
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  return (
    <div className="container mx-auto px-2 xl:px-4 py-12">
      <div className="flex items-center space-x-3">
        <p>Home</p> <ChevronRight size={15} /> <p>Products</p>
      </div>
      <div className="flex items-center justify-between mt-2 gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold mb-0">Explore All Products</h1>
          <span className="text-xl ms-2">
            ({products?.length} Products Found)
          </span>
        </div>
        <div>
          <button
            onClick={() => setFilters({})}
            className="bg-[#ff4500] text-white p-3 rounded-md"
          >
            Clear Filter
          </button>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex space-x-3">
          <div className="w-1/4">
            <ProductFilter
              onFilterChange={handleFilterChange}
              filters={filters}
            />
          </div>
          <div className="w-full">
            <ProductCard isWishlisted={false} data={products} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
