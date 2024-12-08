"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import JoditEditor from "jodit-react";

import { axiosInstance } from "@/lib/axiosInstance";

interface FormValues {
  name: string;
  description: string;
  image: string;
  status: string;
}

const BrandForm: React.FC = ({
  edit,
  setIsEdit,
  data,
  open,
  setDrawerOpen,
  fetchBrands,
}: any) => {
  const [editorContent, setEditorContent] = useState(data?.description || "");
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!open);
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      name: data?.name || "",
      description: data?.description || "",
      image: data?.image || "",
      status: data?.status || "Active",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      image: Yup.string().required("Image is required"),
      description: Yup.string().required("description is required"),
    }),
    onSubmit: async (values) => {
      try {
        if (edit) {
          const response = await axiosInstance.put(
            `/brands/${data?._id}`,
            values
          );
          if (response?.data?.status) {
            alert("Brand Updated");
            setDrawerOpen(!open);
            await fetchBrands();
          }
        } else {
          const response = await axiosInstance.post(`/brands`, values);
          if (response?.data?.status) {
            alert("Brand Added");
            formik.resetForm({});
            setDrawerOpen(!open);
            setIsEdit(false);
            await fetchBrands();
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
                {edit ? "Edit" : "Add"} Brand
              </h2>
            </div>

            <form
              onSubmit={formik.handleSubmit}
              className="px-6 py-4 flex flex-col gap-4"
            >
              {/* NAME */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  className="mt-1 block p-2 border border-gray-300 rounded-md w-full"
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.name}
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

              {/* Description*/}
              <div className="my-3">
                <label htmlFor="description">Description</label>
                <JoditEditor
                  value={formik.values.description}
                  onChange={(newContent) => {
                    formik.setFieldValue("description", newContent);
                    setEditorContent(newContent);
                  }}
                  className="border rounded"
                />
                {formik.touched.description && formik.errors.description ? (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.description}
                  </p>
                ) : null}
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

export default BrandForm;
