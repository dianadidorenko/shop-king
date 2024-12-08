"use client";

import React, { useEffect, useState } from "react";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";

import CustomTable from "@/components/Dashboard/Components/CustomTable";
import { axiosInstance } from "@/lib/axiosInstance";
import BrandForm from "@/components/Dashboard/Brand/BrandForm";

const DashboardBrandsPage = () => {
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const fetchBrands = async () => {
    await axiosInstance.get("/brands").then((data) => {
      if (data?.data?.status) {
        setBrands(data.data.data);
      }
    });
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleEdit = async (id: string) => {
    axiosInstance.put(`/brands/${id}`).then((data) => {
      if (data?.data?.status) {
        setBrand(data.data.data);
        setIsEdit(true);
        setDrawerOpen(true);
      }
    });
  };

  const handleDelete = async (id: string) => {
    axiosInstance.delete(`/brands/${id}`).then((data) => {
      if (data?.data?.status) {
        alert("Brand Deleted");
        fetchBrands();
      }
    });
  };

  const headers = [
    { key: "id", label: "Id" },
    { key: "name", label: "Name" },
    { key: "image", label: "Image" },
    { key: "status", label: "Status" },
    { key: "action", label: "Action" },
  ];

  const data = brands?.map((item, index) => {
    return {
      id: index + 1,
      name: item?.name,
      status: (
        <span
          className={`p-1 rounded ${
            item?.status === "Active"
              ? "bg-green-200 text-green-600"
              : "bg-red-200 text-red-600"
          }`}
        >
          {item?.status}
        </span>
      ),
      image: (
        <img src={item?.image} alt={item?.category} className="w-25 h-20" />
      ),
      action: (
        <div className="flex items-center gap-2">
          <Link
            href="void:0"
            onClick={() => handleEdit(item?._id)}
            className="bg-yellow-100 flex items-center justify-center p-1 rounded w-8 h-8"
          >
            <Pencil
              size={18}
              className="text-yellow-500 hover:text-yellow-700"
            />
          </Link>
          <Link
            href="void:0"
            onClick={() => handleDelete(item?._id)}
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
          setBrand("");
          setIsEdit(false);
        }}
        title="Brands"
        headers={headers}
        data={data}
      />
      <BrandForm
        edit={isEdit}
        setIsEdit={setIsEdit}
        data={brand}
        fetchBrands={fetchBrands}
        open={isDrawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
    </div>
  );
};

export default DashboardBrandsPage;
