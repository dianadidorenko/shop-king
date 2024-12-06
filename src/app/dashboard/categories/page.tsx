"use client";

import React, { useEffect, useState } from "react";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";

import CustomTable from "@/components/Dashboard/Components/CustomTable";
import CategoryForm from "@/components/Dashboard/Category/CategoryForm";
import { axiosInstance } from "@/lib/axiosInstance";

const DashboardCategoriesPage = () => {
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const fetchCategories = async () => {
    await axiosInstance.get("/category").then((data) => {
      if (data?.data?.status) {
        setCategories(data.data.data);
      }
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = async (id: string) => {
    setIsEdit(true);
    axiosInstance.put(`/category/${id}`).then((data) => {
      if (data?.data?.status) {
        setCategory(data.data.data);
        setDrawerOpen(true);
      }
    });
  };

  const handleDelete = async (id: string) => {
    axiosInstance.delete(`/category/${id}`).then((data) => {
      if (data?.data?.status) {
        fetchCategories();
      }
    });
  };

  const headers = [
    { key: "id", label: "Id" },
    { key: "category", label: "Category" },
    { key: "subCategory", label: "Sub Category" },
    { key: "status", label: "Status" },
    { key: "action", label: "Action" },
  ];

  const data = categories?.map((item, index) => {
    return {
      id: index + 1,
      category: item?.category,
      subCategory: item?.subcategory,
      status: (
        <span className="bg-green-200 text-green-600 p-1 rounded">
          item?.status
        </span>
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
        btnAction={() => setDrawerOpen(!isDrawerOpen)}
        title="Categories"
        headers={headers}
        data={data}
      />
      <CategoryForm
        edit={isEdit}
        setIsEdit={setIsEdit}
        data={category}
        fetchCategories={fetchCategories}
        open={isDrawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
    </div>
  );
};

export default DashboardCategoriesPage;
