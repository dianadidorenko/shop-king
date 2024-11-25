"use client";

import React, { useState } from "react";
import { Pencil, Trash } from "lucide-react";
import CustomTable from "@/components/Dashboard/Components/CustomTable";
import Link from "next/link";
import CategoryForm from "@/components/Dashboard/Category/CategoryForm";

const DashboardCategoriesPage = () => {
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);

  const headers = [
    { key: "id", label: "Id" },
    { key: "category", label: "Category" },
    { key: "subCategory", label: "Sub Category" },
    { key: "status", label: "Status" },
    { key: "action", label: "Action" },
  ];

  const data = [
    {
      id: 1,
      category: "Men",
      subCategory: "Hats",
      status: (
        <span className="bg-green-200 text-green-600 p-1 rounded">Active</span>
      ),
      action: (
        <div className="flex items-center gap-2">
          <Link
            href="/view/[id]"
            as={`/view/${1}`}
            className="bg-yellow-100 flex items-center justify-center p-1 rounded w-8 h-8"
          >
            <Pencil
              size={18}
              className="text-yellow-500 hover:text-yellow-700"
            />
          </Link>
          <Link
            href="/view/[id]"
            as={`/view/${1}`}
            className="bg-red-200 flex items-center p-1 justify-center rounded w-8 h-8"
          >
            <Trash size={18} className="text-red-500 hover:text-red-700" />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div>
      <CustomTable
        btnAction={() => setDrawerOpen(!isDrawerOpen)}
        title="Categories"
        headers={headers}
        data={data}
      />
      <CategoryForm open={isDrawerOpen} setDrawerOpen={setDrawerOpen} />
    </div>
  );
};

export default DashboardCategoriesPage;
