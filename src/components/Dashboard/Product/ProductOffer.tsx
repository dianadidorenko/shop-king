"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Save } from "lucide-react";
import { axiosInstance } from "@/lib/axiosInstance";
import { useParams } from "next/navigation";

interface OfferFormValues {
  startDate: string;
  endDate: string;
  discount: string;
  flashSale: string;
}

const OfferForm: React.FC = ({ offer }) => {
  const params = useParams();

  const formik = useFormik<OfferFormValues>({
    initialValues: {
      startDate: offer?.startDate
        ? new Date(offer.startDate).toISOString().slice(0, 16)
        : new Date().toISOString().slice(0, 16),
      endDate: offer?.endDate
        ? new Date(offer.endDate).toISOString().slice(0, 16)
        : new Date(Date.now() + 86400000).toISOString().slice(0, 16),
      discount: offer?.discountPercentage || "",
      flashSale: offer?.flashSale ? "Yes" : "No",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      startDate: Yup.string().required("Start date is required"),
      endDate: Yup.string().required("End date is required"),
      discount: Yup.string()
        .matches(/^[0-9]+$/, "Only numbers are allowed")
        .required("Discount percentage is required"),
      flashSale: Yup.string().required("Flash sale selection is required"),
    }),
    onSubmit: (values) => {
      if (Array.isArray(params?.slug)) {
        const productId = params.slug[1];
        axiosInstance
          .put(`/products/${productId}`, {
            offer: {
              ...values,
              discountPercentage: Number(values.discount),
              flashSale: values?.flashSale === "Yes" ? true : false,
            },
          })
          .then((data) => {
            if (data?.data?.status) {
              alert("Offer created successfully");
            } else {
              console.error("Something went wrong");
            }
          });
      } else {
        console.error("Invalid slug format or slug is missing.");
      }
    },
  });

  return (
    <div className="mx-auto mt-10 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6 shadow py-4 px-6">Offer</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="px-6 py-4 flex flex-col gap-4"
      >
        {/* Offer Dates */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              OFFER START DATE <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              name="startDate"
              value={formik.values.startDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 block w-full border ${
                formik.touched.startDate && formik.errors.startDate
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm`}
            />
            {formik.touched.startDate && formik.errors.startDate && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.startDate}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              OFFER END DATE <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              name="endDate"
              value={formik.values.endDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 block w-full border ${
                formik.touched.endDate && formik.errors.endDate
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm`}
            />
            {formik.touched.endDate && formik.errors.endDate && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.endDate}
              </p>
            )}
          </div>
        </div>

        {/* Discount and Flash Sale */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              DISCOUNT PERCENTAGE <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="discount"
              value={formik.values.discount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 block w-full border ${
                formik.touched.discount && formik.errors.discount
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm`}
            />
            {formik.touched.discount && formik.errors.discount && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.discount}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              DO YOU WANT TO ADD IN THE FLASH SALE?{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="mt-2 flex items-center">
              <input
                type="radio"
                id="yes"
                name="flashSale"
                value="Yes"
                checked={formik.values.flashSale === "Yes"}
                onChange={formik.handleChange}
                className="form-radio h-4 w-4 text-orange-500 border-gray-300"
              />
              <label
                htmlFor="Yes"
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                Yes
              </label>
              <input
                type="radio"
                id="no"
                name="flashSale"
                value="No"
                checked={formik.values.flashSale === "No"}
                onChange={formik.handleChange}
                className="form-radio h-4 w-4 text-orange-500 border-gray-300 ml-6"
              />
              <label
                htmlFor="no"
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                No
              </label>
            </div>
            {formik.touched.flashSale && formik.errors.flashSale && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.flashSale}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            <Save className="w-5 h-5 mr-2" />
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default OfferForm;
