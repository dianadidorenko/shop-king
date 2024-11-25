import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import JoditEditor from "jodit-react";
import { axiosInstance } from "@/lib/axiosInstance";

interface FormValues {
  name: string;
  sku: string;
  category: string;
  barcode: string;
  buyingPrice: number;
  sellingPrice: number;
  tax: number;
  brand: string;
  status: string;
  canPurchaseAble: string;
  showStockOut: string;
  refundable: string;
  maximumPurchaseQuantity: number;
  lowStockWarning: number;
  unit: string;
  weight: string;
  tags: string;
  description: string;
}

const ProductForm: React.FC = ({ data, open, setDrawerOpen }: any) => {
  const [editorContent, setEditorContent] = useState(data?.description || "");
  const [isEdit, setIsEdit] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!open);
  };

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
    if (data?.description) {
      setEditorContent(data?.description);
    }
  }, [data]);

  const formik = useFormik<FormValues>({
    initialValues: {
      name: data?.name || "",
      sku: data?.sku || "",
      category: data?.category || "",
      barcode: data?.barcode || "",
      buyingPrice: data?.buyingPrice || 0,
      sellingPrice: data?.sellingPrice || 0,
      tax: data?.tax || 0,
      brand: data?.brand || "",
      status: data?.status || "Active",
      canPurchaseAble: data?.canPurchaseAble ? "Yes" : "No",
      showStockOut: data?.showStockOut ? "Enable" : "Disable",
      refundable: data?.refundable ? "Yes" : "No",
      maximumPurchaseQuantity: data?.maximumPurchaseQuantity || 0,
      lowStockWarning: data?.lowStockWarning || 0,
      unit: data?.unit || "",
      weight: data?.weight || "",
      tags: data?.tags || "",
      description: data?.description || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      sku: Yup.string().required("SKU is required"),
      category: Yup.string().required("Category is required"),
      buyingPrice: Yup.number()
        .min(0, "Buying Price must be a positive number")
        .required("Buying Price is required"),
      maximumPurchaseQuantity: Yup.number()
        .min(1, "Must be at least 1")
        .required("Maximum Purchase Quantuty Price is required"),
      lowStockWarning: Yup.number()
        .min(1, "Must be at least 1")
        .required("Low Stock Warning is required"),
    }),
    onSubmit: (values) => {
      if (!isEdit) {
        axiosInstance
          .post("/products", {
            ...values,
            showStockOut: values?.showStockOut === "Enable" ? true : false,
            refundable: values?.refundable === "Yes" ? true : false,
            canPurchaseAble: values?.canPurchaseAble === "Yes" ? true : false,
          })
          .then((data) => {
            if (data?.data?.status) {
              alert("Product Uploaded");
              formik.resetForm({});
              setDrawerOpen(!open);
            }
          });
      } else {
        axiosInstance
          .put(`/products/${data?._id}`, {
            ...values,
            showStockOut: values?.showStockOut === "Enable" ? true : false,
            refundable: values?.refundable === "Yes" ? true : false,
            canPurchaseAble: values?.canPurchaseAble === "Yes" ? true : false,
          })
          .then((data) => {
            if (data?.data?.status) {
              alert("Product Updated");
              formik.resetForm({});
              setDrawerOpen(!open);
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
          className={`fixed w-[800px] top-0 z-50 right-0 h-[100vh] overflow-y-scroll overflow-x-hidden bg-white flex justify-end shadow-lg transform transition-transform 
                ${open ? "translate-x-0 block" : "translate-x-full hidden"}`}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {isEdit ? "Edit" : "Add"} Product
              </h2>
            </div>

            <form onSubmit={formik.handleSubmit}>
              {/* Форма */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                {/* SKU */}
                <div>
                  <label
                    htmlFor="sku"
                    className="block text-sm font-medium text-gray-700"
                  >
                    SKU *
                  </label>
                  <input
                    type="text"
                    name="sku"
                    onChange={formik.handleChange}
                    value={formik.values.sku}
                    onBlur={formik.handleBlur}
                    className="mt-1 block p-2 border border-gray-300 rounded-md w-full"
                  />
                  {formik.touched.sku && formik.errors.sku ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.sku}
                    </div>
                  ) : null}
                </div>

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
                    className="mt-1 block p-2 border border-gray-300 shadow-sm rounded-md w-full"
                  >
                    <option>--</option>
                    <option value="Category 1">Category 1</option>
                    <option value="Category 2">Category 2</option>
                  </select>
                </div>

                {/* BRAND */}
                <div>
                  <label
                    htmlFor="brand"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Brand *
                  </label>
                  <select
                    name="brand"
                    onChange={formik.handleChange}
                    value={formik.values.brand}
                    onBlur={formik.handleBlur}
                    className="mt-1 block p-2 border border-gray-300 shadow-sm rounded-md w-full"
                  >
                    <option>--</option>
                    <option value="Brand 1">Brand 1</option>
                    <option value="Brand 2">Brand 2</option>
                  </select>
                </div>

                {/* BARCODE */}
                <div>
                  <label
                    htmlFor="barcode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Barcode
                  </label>
                  <select
                    name="barcode"
                    onChange={formik.handleChange}
                    value={formik.values.barcode}
                    onBlur={formik.handleBlur}
                    className="mt-1 block p-2 border border-gray-300 shadow-sm rounded-md w-full"
                  >
                    <option>--</option>
                    <option value="Barcode 1">Barcode 1</option>
                    <option value="Barcode 2">Barcode 2</option>
                  </select>
                </div>

                {/* BUYING PRICE */}
                <div>
                  <label
                    htmlFor="buyingPrice"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Buying Price *
                  </label>
                  <input
                    type="number"
                    name="buyingPrice"
                    onChange={formik.handleChange}
                    value={formik.values.buyingPrice}
                    onBlur={formik.handleBlur}
                    className="mt-1 block p-2 border border-gray-300 shadow-sm rounded-md w-full"
                  />
                  {formik.touched.buyingPrice && formik.errors.buyingPrice ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.buyingPrice}
                    </div>
                  ) : null}
                </div>

                {/* SELLING PRICE */}
                <div>
                  <label
                    htmlFor="sellingPrice"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Selling Price *
                  </label>
                  <input
                    type="number"
                    name="sellingPrice"
                    onChange={formik.handleChange}
                    value={formik.values.sellingPrice}
                    onBlur={formik.handleBlur}
                    className="mt-1 block p-2 border border-gray-300 shadow-sm rounded-md w-full"
                  />
                  {formik.touched.sellingPrice && formik.errors.sellingPrice ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.sellingPrice}
                    </div>
                  ) : null}
                </div>

                {/* TAX */}
                <div>
                  <label
                    htmlFor="tax"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tax *
                  </label>
                  <input
                    type="number"
                    name="tax"
                    onChange={formik.handleChange}
                    value={formik.values.tax}
                    onBlur={formik.handleBlur}
                    className="mt-1 block p-2 border border-gray-300 shadow-sm rounded-md w-full"
                  />
                  {formik.touched.tax && formik.errors.tax ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.tax}
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

                {/* CAN PURCHASABLE */}
                <div>
                  <label
                    htmlFor="canPurchasable"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Can purchasable *
                  </label>
                  <div className="mt-1 flex">
                    <input
                      type="radio"
                      name="canPurchaseAble"
                      value="Yes"
                      checked={formik.values.canPurchaseAble === "Yes"}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    Yes
                    <input
                      type="radio"
                      name="canPurchaseAble"
                      value="No"
                      checked={formik.values.canPurchaseAble === "No"}
                      onChange={formik.handleChange}
                      className="ml-2 mr-2"
                    />
                    No
                  </div>
                </div>

                {/* SHOW STOCK OUT */}
                <div>
                  <label
                    htmlFor="showStockOut"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Show Stock Out *
                  </label>
                  <div className="mt-1 flex">
                    <input
                      type="radio"
                      name="showStockOut"
                      value="Enable"
                      checked={formik.values.showStockOut === "Enable"}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    Enable
                    <input
                      type="radio"
                      name="showStockOut"
                      value="Disable"
                      checked={formik.values.showStockOut === "Disable"}
                      onChange={formik.handleChange}
                      className="ml-2 mr-2"
                    />
                    Disable
                  </div>
                </div>

                {/* REFUDABLE */}
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Refundable *
                  </label>
                  <div className="mt-1 flex">
                    <input
                      type="radio"
                      name="refundable"
                      value="Yes"
                      checked={formik.values.refundable === "Yes"}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    Yes
                    <input
                      type="radio"
                      name="refundable"
                      value="No"
                      checked={formik.values.refundable === "No"}
                      onChange={formik.handleChange}
                      className="ml-2 mr-2"
                    />
                    No
                  </div>
                </div>

                {/* MAXIMUM PURCHASE QUANTITY */}
                <div>
                  <label
                    htmlFor="maximumPurchaseQuantity"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Maximum Purchase Quantity *
                  </label>
                  <input
                    type="number"
                    name="maximumPurchaseQuantity"
                    onChange={formik.handleChange}
                    value={formik.values.maximumPurchaseQuantity}
                    onBlur={formik.handleBlur}
                    className="p-2 border shadow-sm rounded w-full"
                  />
                  {formik.touched.maximumPurchaseQuantity &&
                  formik.errors.maximumPurchaseQuantity ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.maximumPurchaseQuantity}
                    </div>
                  ) : null}
                </div>

                {/* LOW STOCK WARNING */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Low Stock Quantity Warning *
                  </label>
                  <input
                    type="number"
                    name="lowStockWarning"
                    onChange={formik.handleChange}
                    value={formik.values.lowStockWarning}
                    onBlur={formik.handleBlur}
                    className="p-2 border rounded w-full"
                  />
                  {formik.touched.lowStockWarning &&
                  formik.errors.lowStockWarning ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.lowStockWarning}
                    </div>
                  ) : null}
                </div>

                {/* UNIT */}
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Unit
                  </label>
                  <select
                    name="unit"
                    onChange={formik.handleChange}
                    value={formik.values.unit}
                    onBlur={formik.handleBlur}
                    className="p-2 border rounded w-full"
                  >
                    <option>--</option>
                    <option value="Piece">Piece</option>
                    <option value="Kg">Kg</option>
                  </select>
                </div>

                {/* WEIGHT */}
                <div>
                  <label
                    htmlFor="weight"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Weight
                  </label>
                  <input
                    type="text"
                    name="weight"
                    onChange={formik.handleChange}
                    value={formik.values.weight}
                    onBlur={formik.handleBlur}
                    className="p-2 border rounded w-full"
                  />
                </div>
              </div>

              {/* TAGS */}
              <div className="mt-3">
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  onChange={formik.handleChange}
                  value={formik.values.tags}
                  onBlur={formik.handleBlur}
                  className="p-2 border rounded w-full"
                />
              </div>

              {/* Текстовый редактор Jodit */}
              <div className="my-3">
                <label htmlFor="description">Description</label>
                <JoditEditor
                  value={editorContent}
                  onChange={(newContent) => setEditorContent(newContent)}
                  className="border rounded"
                />
              </div>

              <div className="mt-4 flex justify-end space-x-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center"
                >
                  {isEdit ? "Update" : "Save"}
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

export default ProductForm;
