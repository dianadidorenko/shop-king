import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import JoditEditor from "jodit-react";
import { useParams } from "next/navigation";

import { axiosInstance } from "@/lib/axiosInstance";

interface SEOFormValues {
  title: string;
  description: string;
  metaKeywords: string;
  image: File | null;
}

const ProductSeo: React.FC = ({ seo }) => {
  const [image, setImage] = useState(null);
  const editor = useRef(null);
  const params = useParams();
  const [isUploading, setIsUploading] = useState(false);

  const formik = useFormik<SEOFormValues>({
    initialValues: {
      title: seo?.title || "",
      description: seo?.description || "",
      metaKeywords: seo?.metaKeywords || "",
      image: seo?.image || null,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      metaKeywords: Yup.string().required("Meta keyword is required"),
    }),
    onSubmit: (values) => {
      if (Array.isArray(params?.slug)) {
        const productId = params.slug[1];
        axiosInstance
          .put(`/products/${productId}`, {
            seo: values,
          })
          .then((data) => {
            if (data?.data?.status) {
              alert("Seo updated successfully");
            } else {
              console.error("Something went wrong");
            }
          })
          .catch((error) => {
            console.error("Error updating seo:", error);
          });
      } else {
        console.error("Invalid slug format or slug is missing.");
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
    <div className="mx-auto mt-10 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6 shadow py-4 px-6">SEO</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="px-6 py-4 flex flex-col gap-4"
      >
        {/* TITLE */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            TITLE *
          </label>
          <input
            name="title"
            type="text"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.touched.title && formik.errors.title ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
          ) : null}
        </div>

        {/* DESCRIPTION */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            DESCRIPTION *
          </label>
          <JoditEditor
            ref={editor}
            value={formik.values.description}
            onChange={(content) => formik.setFieldValue("description", content)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.touched.description && formik.errors.description ? (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.description}
            </p>
          ) : null}
        </div>

        {/* META KEYWORD */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="metaKeyword"
          >
            META KEYWORD *
          </label>
          <input
            name="metaKeywords"
            type="text"
            value={formik.values.metaKeywords}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.touched.metaKeywords && formik.errors.metaKeywords ? (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.metaKeywords}
            </p>
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
          {(formik.values.image || seo?.image) && (
            <div className="mt-4">
              <img
                src={formik.values.image || seo?.image}
                alt="Preview"
                className="w-24 h-24 object-cover"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isUploading}
            className={`py-2 px-4 rounded font-bold focus:outline-none focus:shadow-outline ${
              isUploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700 text-white"
            }`}
          >
            {isUploading ? "Please Wait..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductSeo;
