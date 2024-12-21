"use client";

import { ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import ProductCard from "@/components/ProductCard";
import ProductFilter from "@/components/ProductFilter";
import { axiosInstance } from "@/lib/axiosInstance";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const params = useSearchParams();
  const [filters, setFilters] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const subcategory = params.get("subcategory");
    if (subcategory) {
      setFilters({ subcategory });
    } else {
      setFilters(null);
    }
  }, [params]);

  // Функция для загрузки всех товаров
  const fetchAllProducts = async () => {
    try {
      const response = await axiosInstance.get("/products", {
        params: {
          ...filters,
          page: currentPage,
          limit: itemsPerPage,
        },
      });

      if (response?.data?.status) {
        setProducts(response.data.data);
        setTotalProducts(response.data.totalCount);
      }
    } catch (err) {
      console.error("Error fetching all products:", err);
    }
  };

  // Функция для загрузки товаров с фильтрами
  const fetchFilteredProducts = async () => {
    try {
      const response = await axiosInstance.get("/products", {
        params: filters,
      });
      if (response?.data?.status) {
        setProducts(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching filtered products:", err);
    }
  };

  useEffect(() => {
    if (filters) {
      fetchFilteredProducts();
    } else {
      fetchAllProducts();
    }
  }, [filters, currentPage]);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  console.log(products);

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
            {/* Пагинация */}
            <div className="flex justify-center mt-6">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 mx-1 rounded-md ${
                    currentPage === index + 1
                      ? "bg-[#ff4500] text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
