"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { axiosInstance } from "@/lib/axiosInstance";

interface FormValues {
  category: string;
  subcategory: string;
  image: string;
  status: string;
}

const CategoryForm: React.FC = ({
  edit,
  setIsEdit,
  data,
  open,
  setDrawerOpen,
  fetchCategories,
}: any) => {
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!open);
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      category: data?.category || "",
      subcategory: data?.subcategory || "",
      image: data?.image || "",
      status: data?.status || "Active",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      category: Yup.string().required("Category is required"),
      subcategory: Yup.string().required("Sub category is required"),
      image: Yup.string().required("Image is required"),
    }),
    onSubmit: async (values) => {
      try {
        if (edit) {
          const response = await axiosInstance.put(
            `/category/${data?._id}`,
            values
          );
          if (response?.data?.status) {
            alert("Category Updated");
            setDrawerOpen(!open);
            await fetchCategories();
          }
        } else {
          const response = await axiosInstance.post(`/category`, values);
          if (response?.data?.status) {
            alert("Category Added");
            formik.resetForm({});
            setDrawerOpen(!open);
            setIsEdit(false);
            await fetchCategories();
          }
        }
      } catch (error) {
        console.error("Error in onSubmit", error);
      }
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.currentTarget.files) return false;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", event.currentTarget.files[0]);

    axiosInstance
      .post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response?.data.file_url) {
          setImage(response.data.file_url);
          formik.setFieldValue("image", response.data.file_url);
        }
      })
      .catch((error) => {
        console.error("Error uploading the image", error);
      })
      .finally(() => setIsUploading(false));
  };

  return (
    <>
      <div className="p-4 sm:p-8">
        {/* Right Side Drawer */}
        <div
          style={{ zIndex: 1000 }}
          className={`fixed top-0 z-50 right-0 h-[90vh] overflow-y-scroll overflow-x-hidden bg-white flex justify-end shadow-lg transform transition-transform 
                ${open ? "translate-x-0 block" : "translate-x-full hidden"}`}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {edit ? "Edit" : "Add"} Category
              </h2>
            </div>

            <form onSubmit={formik.handleSubmit}>
              {/* Форма */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* CATEGORY */}
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category *
                  </label>
                  <select
                    name="category"
                    onChange={formik.handleChange}
                    value={formik.values.category}
                    onBlur={formik.handleBlur}
                    className="mt-1 block p-2 border border-gray-300 rounded-md w-full"
                  >
                    <option>--</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Juniors">Juniors</option>
                  </select>
                  {formik.touched.category && formik.errors.category ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.category}
                    </div>
                  ) : null}
                </div>

                {/* SUB CATEGORY */}
                <div>
                  <label
                    htmlFor="subcategory"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Sub Category *
                  </label>
                  <input
                    type="text"
                    name="subcategory"
                    onChange={formik.handleChange}
                    value={formik.values.subcategory}
                    onBlur={formik.handleBlur}
                    className="mt-1 block p-2 border border-gray-300 rounded-md w-full"
                  />
                  {formik.touched.subcategory && formik.errors.subcategory ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.subcategory}
                    </div>
                  ) : null}
                </div>

                {/* IMAGE */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    IMAGE
                  </label>
                  <div>
                    <input
                      type="file"
                      name="image"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700"
                    />
                  </div>
                  {formik.values.image && (
                    <div className="mt-4">
                      <img
                        src={formik.values.image}
                        alt="Preview"
                        className="w-24 h-24 object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* STATUS */}
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Status *
                  </label>
                  <div className="mt-1 flex">
                    <input
                      type="radio"
                      name="status"
                      value="Active"
                      checked={formik.values.status === "Active"}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    Active
                    <input
                      type="radio"
                      name="status"
                      value="Inactive"
                      checked={formik.values.status === "Inactive"}
                      onChange={formik.handleChange}
                      className="ml-2 mr-2"
                    />
                    Inactive
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end space-x-2">
                <button
                  type="submit"
                  disabled={isUploading}
                  className={`py-2 px-4 rounded font-bold focus:outline-none focus:shadow-outline ${
                    isUploading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-700 text-white"
                  }`}
                >
                  {isUploading ? "Please Wait..." : edit ? "Update" : "Save"}
                </button>
                <button
                  type="button"
                  onClick={toggleDrawer}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 flex items-center"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Background Overlay */}
        {open && (
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={toggleDrawer}
          ></div>
        )}
      </div>
    </>
  );
};

export default CategoryForm;
