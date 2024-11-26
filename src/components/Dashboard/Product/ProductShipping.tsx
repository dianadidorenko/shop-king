import React, { useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Bold, Italic, Underline, Quote } from "lucide-react";
import JoditEditor from "jodit-react";
import { axiosInstance } from "@/lib/axiosInstance";
import { useParams } from "next/navigation";

interface ShippingFormValues {
  shippingType: string;
  isProductQuantityMultiply: string;
  shippingCost: string;
  shippingAndReturnPolicy: string;
}

const ProductShipping: React.FC = ({ shippingReturn }) => {
  const params = useParams();
  const editor = useRef(null);

  const formik = useFormik<ShippingFormValues>({
    initialValues: {
      shippingType: shippingReturn.shippingType || "Flat Rate",
      isProductQuantityMultiply: shippingReturn.isProductQuantityMultiply
        ? "Yes"
        : "No",
      shippingCost: shippingReturn.shippingCost.toString() || "",
      shippingAndReturnPolicy:
        shippingReturn.shippingAndReturnPolicy ||
        "We offer extended returns throughoit the holidayes season",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      shippingType: Yup.string().required("Shipping type is required"),
      isProductQuantityMultiply: Yup.string().required(
        "This field is required"
      ),
      shippingCost: Yup.string()
        .matches(
          /^[0-9]+(\.[0-9]{1,2})?$/,
          "Invalid cost format (e.g., 80 or 80.50)"
        )
        .required("Shipping cost is required"),
      shippingAndReturnPolicy: Yup.string().required(
        "Return policy is required"
      ),
    }),
    onSubmit: (values) => {
      if (Array.isArray(params?.slug)) {
        const productId = params.slug[1];
        axiosInstance
          .put(`/products/${productId}`, {
            shippingReturn: {
              ...values,
              isProductQuantityMultiply:
                values?.isProductQuantityMultiply === "Yes" ? true : false,
              shippingCost: Number(values.shippingCost),
            },
          })
          .then((data) => {
            if (data?.data?.status) {
              alert("Shipping and return policy updated successfully");
            } else {
              console.error("Something went wrong");
            }
          })
          .catch((error) => {
            console.error("Error updating shipping policy:", error);
          });
      } else {
        console.error("Invalid slug format or slug is missing.");
      }
    },
  });

  return (
    <div className="mx-auto mt-10 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6 shadow py-4 px-6">
        Shipping & Return
      </h1>
      <form
        onSubmit={formik.handleSubmit}
        className="px-6 py-4 flex flex-col gap-4"
      >
        {/* Shipping Type */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            SHIPPING TYPE <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="free"
              name="shippingType"
              value="Free"
              checked={formik.values.shippingType === "Free"}
              onChange={formik.handleChange}
              className="mr-2"
            />
            <label htmlFor="free" className="text-gray-700">
              Free
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="flatRate"
              name="shippingType"
              value="Flat Rate"
              checked={formik.values.shippingType === "Flat Rate"}
              onChange={formik.handleChange}
              className="mr-2"
            />
            <label htmlFor="flatRate" className="text-gray-700">
              Flat Rate
            </label>
          </div>
          {formik.errors.shippingType && formik.touched.shippingType && (
            <div className="text-red-500 text-sm">
              {formik.errors.shippingType}
            </div>
          )}
        </div>

        {/* Quantity Multiply */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            IS PRODUCT QUANTITY MULTIPLY <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="yes"
              name="isProductQuantityMultiply"
              value="Yes"
              checked={formik.values.isProductQuantityMultiply === "Yes"}
              onChange={formik.handleChange}
              className="mr-2"
            />
            <label htmlFor="yes" className="text-gray-700">
              Yes
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="no"
              name="isProductQuantityMultiply"
              value="No"
              checked={formik.values.isProductQuantityMultiply === "No"}
              onChange={formik.handleChange}
              className="mr-2"
            />
            <label htmlFor="no" className="text-gray-700">
              No
            </label>
          </div>
          {formik.errors.isProductQuantityMultiply &&
            formik.touched.isProductQuantityMultiply && (
              <div className="text-red-500 text-sm">
                {formik.errors.isProductQuantityMultiply}
              </div>
            )}
        </div>

        {/* Shipping Cost */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            SHIPPING COST <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="shippingCost"
            onChange={formik.handleChange}
            value={formik.values.shippingCost}
            className="border border-gray-300 p-2 w-full"
          />
          {formik.errors.shippingCost && formik.touched.shippingCost && (
            <div className="text-red-500 text-sm">
              {formik.errors.shippingCost}
            </div>
          )}
        </div>

        {/* Return Policy */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            SHIPPING & RETURN <span className="text-red-500">*</span>
          </label>
          <div className="border border-gray-300 p-4">
            <div className="flex items-center mb-2 space-x-2">
              <button type="button">
                <Bold className="w-4 h-4" />
              </button>
              <button type="button">
                <Italic className="w-4 h-4" />
              </button>
              <button type="button">
                <Underline className="w-4 h-4" />
              </button>
              <button type="button">
                <Quote className="w-4 h-4" />
              </button>
            </div>
            <JoditEditor
              ref={editor}
              value={formik.values.shippingAndReturnPolicy}
              onChange={(value) =>
                formik.setFieldValue("shippingAndReturnPolicy", value)
              }
            />
          </div>
          {formik.errors.shippingAndReturnPolicy &&
            formik.touched.shippingAndReturnPolicy && (
              <div className="text-red-500 text-sm">
                {formik.errors.shippingAndReturnPolicy}
              </div>
            )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ProductShipping;
