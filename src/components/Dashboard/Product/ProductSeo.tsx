import React, { useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import JoditEditor from "jodit-react";

interface ProductSeoValues {
  title: string;
  description: string;
  metaKeyword: string;
  image: File | null;
}

const ProductSeo: React.FC = () => {
  const editor = useRef(null);

  const formik = useFormik<ProductSeoValues>({
    initialValues: {
      title: "Snapback Hat",
      description: "Step your game up with this mid-depth",
      metaKeyword: "Hats",
      image: null,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      metaKeyword: Yup.string().required("Meta keyword cost is required"),
    }),
    onSubmit: (values) => {
      console.log("Form Values", values);
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      formik.setFieldValue("image", event.currentTarget.files[0]);
    }
  };

  return (
    <div className="mx-auto mt-10 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6 shadow py-4 px-6">SEO</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="px-6 py-4 flex flex-col gap-4"
      >
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

        {/* DESCRIPTION Field */}
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

        {/* META KEYWORD Field */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="metaKeyword"
          >
            META KEYWORD *
          </label>
          <input
            name="metaKeyword"
            type="text"
            value={formik.values.metaKeyword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.touched.metaKeyword && formik.errors.metaKeyword ? (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.metaKeyword}
            </p>
          ) : null}
        </div>

        {/* IMAGE Field */}
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
                src={URL.createObjectURL(formik.values.image)}
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductSeo;
