import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaTimes } from "react-icons/fa";
import JoditEditor from "jodit-react";

interface FormValues {
  category: string;
  subCategory: string;
  status: string;
}

const CategoryForm: React.FC = ({ open, setDrawerOpen }: any) => {
  const toggleDrawer = () => {
    setDrawerOpen(!open);
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      category: "",
      subCategory: "",
      status: "Active",
    },
    validationSchema: Yup.object({
      category: Yup.string().required("Category is required"),
      subCategory: Yup.string().required("Sub category is required"),
    }),
    onSubmit: (values) => {
      console.log("Form Values", values);
    },
  });

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
              <h2 className="text-xl font-semibold">Add Product</h2>
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
                  <input
                    type="text"
                    name="category"
                    onChange={formik.handleChange}
                    value={formik.values.category}
                    onBlur={formik.handleBlur}
                    className="mt-1 block p-2 border border-gray-300 rounded-md w-full"
                  />
                  {formik.touched.category && formik.errors.category ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.category}
                    </div>
                  ) : null}
                </div>

                {/* SUB CATEGORY */}
                <div>
                  <label
                    htmlFor="subCategory"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Sub Category *
                  </label>
                  <input
                    type="text"
                    name="subCategory"
                    onChange={formik.handleChange}
                    value={formik.values.subCategory}
                    onBlur={formik.handleBlur}
                    className="mt-1 block p-2 border border-gray-300 rounded-md w-full"
                  />
                  {formik.touched.subCategory && formik.errors.subCategory ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.subCategory}
                    </div>
                  ) : null}
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
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center"
                >
                  Save
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
