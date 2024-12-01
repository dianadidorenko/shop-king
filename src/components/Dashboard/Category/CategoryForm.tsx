import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { axiosInstance } from "@/lib/axiosInstance";

interface FormValues {
  category: string;
  subcategory: string;
  status: string;
}

const CategoryForm: React.FC = ({
  edit,
  data,
  open,
  setDrawerOpen,
  fetchCategories,
}: any) => {
  const toggleDrawer = () => {
    setDrawerOpen(!open);
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      category: data?.category || "",
      subcategory: data?.subcategory || "",
      status: data?.status || "Active",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      category: Yup.string().required("Category is required"),
      subcategory: Yup.string().required("Sub category is required"),
    }),
    onSubmit: (values) => {
      if (edit) {
        axiosInstance.put(`/category/${data?._id}`, values).then((data) => {
          if (data?.data?.status) {
            alert("Category Updated");
            setDrawerOpen(!open);
            fetchCategories();
          } else {
          }
        });
      } else {
        axiosInstance.post(`/category`, values).then((data) => {
          if (data?.data?.status) {
            alert("Category Added");
            formik.resetForm({});
            setDrawerOpen(!open);
            fetchCategories();
          }
        });
      }
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
                    <option value="Man">Man</option>
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
                  {edit ? "Update" : "Save"}
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
