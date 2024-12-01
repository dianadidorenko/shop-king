"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { Edit, Plus, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaRandom } from "react-icons/fa";
import * as Yup from "yup";
import { axiosInstance } from "@/lib/axiosInstance";
import { useParams } from "next/navigation";

interface Variation {
  color: string;
  size: string;
  price: string;
  sku: string;
  quantity: number;
  _id: string;
}

const initialVariations: Variation[] = [];

const ProductVariations: React.FC = () => {
  const [variations, setVariations] = useState<Variation[]>(initialVariations);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [currentVariation, setCurrentVariation] = useState<Variation | null>(
    null
  );
  const params = useParams();

  const fetchVariations = async () => {
    try {
      const response = await axiosInstance.get(
        `/products/${params?.slug?.[1]}/variations`
      );
      setVariations(response.data.data);
    } catch (error) {
      console.error("Error fetching variations:", error);
    }
  };

  useEffect(() => {
    fetchVariations();
  }, []);

  const openPopup = (variation: Variation | null = null) => {
    setCurrentVariation(variation);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setCurrentVariation(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance
        .delete(`/products/${params?.slug?.[1]}/variations/${id}`)
        .then((data) => {
          if (data?.data?.status) {
            alert("Variation deleted");
            fetchVariations();
          }
        });
    } catch (error) {
      console.error("Error deleting variation:", error);
    }
  };

  const handleSubmit = async (values: Variation, { setSubmitting }: any) => {
    try {
      if (currentVariation) {
        await axiosInstance
          .put(
            `/products/${params?.slug?.[1]}/variations/${currentVariation?._id}`,
            values
          )
          .then((data) => {
            if (data?.data?.status) {
              alert("Variation Updated");
              fetchVariations();
            }
          });
      } else {
        await axiosInstance
          .post(`/products/${params?.slug?.[1]}/variations`, values)
          .then((data) => {
            if (data?.data?.status) {
              alert("Added variation to the Product");
            }
          });

        setVariations([...variations, { ...values }]);
      }
      closePopup();
    } catch (error) {
      console.error("Failed to save variation", error);
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object({
    color: Yup.string().required("Color is required"),
    size: Yup.string().required("Size is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive"),
    sku: Yup.string().required("SKU is required"),
    quantity: Yup.number()
      .positive("Quantity muse be positive")
      .required("Quantity is required"),
  });

  return (
    <>
      <div className="bg-white shadow-md rounded-md">
        <div className="flex justify-between items-center py-4 px-6 shadow-md mb-4">
          <h1 className="text-xl font-semibold">Variation</h1>
          <button
            onClick={() => openPopup(null)}
            className="bg-red-500 text-white px-4 py-2 rounded flex items-center hover:bg-red-600 transition"
          >
            <Plus />
            Add Variation
          </button>
        </div>

        <div className="space-y-2 px-4 pb-4">
          {variations.map((variation, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white p-4 rounded shadow"
            >
              <div>
                Color: {variation.color} › Size: {variation.size} › Price:
                {variation.price} › Qty: {variation.quantity}
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => openPopup(variation)}
                  className="bg-green-100 text-green-600 p-2 rounded hover:bg-green-200 transition"
                >
                  <Edit size={15} />
                </button>
                <button
                  onClick={() => handleDelete(variation._id)}
                  className="bg-red-100 text-red-600 p-2 rounded hover:bg-red-200 transition"
                >
                  <Trash size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">
              {currentVariation ? "Edit" : "Add"} Variations
            </h2>

            <Formik
              initialValues={
                currentVariation || {
                  color: "",
                  size: "",
                  price: "",
                  sku: "",
                  quantity: 0,
                }
              }
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {({ isSubmitting }) => (
                <Form>
                  {/* Поле Color */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Color
                    </label>
                    <Field
                      as="select"
                      name="color"
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Select Color</option>
                      <option value="White">White</option>
                      <option value="Black">Black</option>
                    </Field>
                    <ErrorMessage
                      name="color"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  {/* Поле Size */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Size
                    </label>
                    <Field
                      as="select"
                      name="size"
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Select Size</option>
                      <option value="S">Small</option>
                      <option value="M">Medium</option>
                      <option value="L">Large</option>
                    </Field>
                    <ErrorMessage
                      name="size"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  {/* Поле Price */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Price *
                    </label>
                    <Field
                      type="text"
                      name="price"
                      className="w-full p-2 border rounded"
                      placeholder="Enter price"
                    />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  {/* Поле SKU */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      SKU *
                    </label>
                    <div className="relative flex items-center">
                      <Field
                        type="text"
                        name="sku"
                        className="w-full p-2 border rounded"
                        placeholder="Enter SKU"
                        disabled={!!currentVariation}
                      />
                      <FaRandom className="absolute right-2 text-gray-400" />
                    </div>
                  </div>
                  {/* Поле Quantity */}
                  <div className="mt-5">
                    <label className="block text-sm font-medium mb-1">
                      Quantity *
                    </label>
                    <Field
                      type="number"
                      name="quantity"
                      className="w-full p-2 border rounded"
                      placeholder="Enter quantity"
                    />
                  </div>
                  {/* Кнопки Save и Close */}
                  <div className="flex justify-end space-x-4 mt-6">
                    <button
                      type="button"
                      onClick={closePopup}
                      className="bg-gray-200 text-gray-600 px-4 py-2 rounded"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-orange-500 text-white px-4 py-2 rounded"
                    >
                      Save
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductVariations;
