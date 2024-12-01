"use client";

import CustomTable from "@/components/Dashboard/Components/CustomTable";
import ProductForm from "@/components/Dashboard/Product/AddProduct";
import { axiosInstance } from "@/lib/axiosInstance";
import { Eye, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const DashboardProducts = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const fetchProducts = async () => {
    await axiosInstance.get("/products").then((data) => {
      if (data?.data?.status) {
        setProducts(data.data.data);
      }
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete Product
  const deleteProduct = async (id: string) => {
    axiosInstance.delete(`/products/${id}`).then((data) => {
      if (data?.data.status) {
        alert("Product deleetd successfully");
        fetchProducts();
      }
    });
  };

  // Edit Product
  const editProduct = async (id: string) => {
    axiosInstance.get(`/products/${id}`).then((data) => {
      if (data?.data?.status) {
        setProduct(data?.data?.data);
        setDrawerOpen(true);
      }
    });
  };

  const headers = [
    { key: "name", label: "Name" },
    { key: "category", label: "Category" },
    { key: "buyingPrice", label: "Buying Price" },
    { key: "sellingPrice", label: "Selling Price" },
    { key: "status", label: "Status" },
    { key: "action", label: "Action" },
  ];

  const data = products?.map((product: any, index) => {
    return {
      id: index + 1,
      name: product.name,
      category: product.category,
      buyingPrice: product.buyingPrice,
      sellingPrice: product.sellingPrice,
      status: (
        <span className="bg-green-200 text-green-600 p-1 rounded">
          {product.status}
        </span>
      ),
      action: (
        <div className="flex items-center gap-2">
          <Link
            href={`/dashboard/products/view/${product._id}`}
            as={`/dashboard/products/view/${product._id}`}
            className="bg-blue-200 flex items-center justify-center p-1 rounded w-8 h-8"
          >
            <Eye size={18} className="text-blue-500 hover:text-blue-700" />
          </Link>
          <Link
            href="void:0"
            onClick={() => editProduct(product?._id)}
            className="bg-yellow-100 flex items-center justify-center p-1 rounded w-8 h-8"
          >
            <Pencil
              size={18}
              className="text-yellow-500 hover:text-yellow-700"
            />
          </Link>
          <Link
            href="void:0"
            onClick={() => deleteProduct(product?._id)}
            className="bg-red-200 flex items-center p-1 justify-center rounded w-8 h-8"
          >
            <Trash size={18} className="text-red-500 hover:text-red-700" />
          </Link>
        </div>
      ),
    };
  });

  return (
    <div>
      <CustomTable
        btnAction={() => {
          setDrawerOpen(!isDrawerOpen);
          setProduct([]);
        }}
        title="Products"
        headers={headers}
        data={data}
      />
      <ProductForm
        fetchProducts={fetchProducts}
        data={product}
        open={isDrawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
    </div>
  );
};

export default DashboardProducts;
