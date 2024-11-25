"use client";

import { Edit, Plus, Trash } from "lucide-react";
import React, { useState } from "react";
import { FaRandom } from "react-icons/fa";

interface Variation {
  color: string;
  size: string;
  price: string;
  sku: string;
  quantity: number;
}

const initialVariations: Variation[] = [
  { color: "White", size: "S", price: "100.00", sku: "W-S-001", quantity: 4 },
  { color: "White", size: "M", price: "100.00", sku: "W-M-001", quantity: 2 },
  { color: "Black", size: "S", price: "100.00", sku: "B-S-001", quantity: 1 },
];

const ProductVariations: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [variations, setVariations] = useState<Variation[]>(initialVariations);
  const [currentVariation, setCurrentVariation] = useState<Variation | null>(
    null
  );

  const [formValues, setFormValues] = useState<Variation>({
    color: "",
    size: "",
    price: "",
    sku: "",
    quantity: 0,
  });

  const openPopup = (variation: Variation | null = null) => {
    setCurrentVariation(variation);
    setFormValues(
      variation || { color: "", size: "", price: "", sku: "", quantity: 0 }
    );
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setCurrentVariation(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = () => {
    if (currentVariation) {
      setVariations((prev) =>
        prev.map((v) => (v.sku === currentVariation.sku ? formValues : v))
      );
    } else {
      setVariations([...variations, { ...formValues }]);
    }
    closePopup();
  };

  const handleDelete = (sku: string) => {
    setVariations(variations.filter((variation) => variation.sku !== sku));
  };

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
          {initialVariations.map((variation, index) => (
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
                  onClick={() => handleDelete(variation.sku)}
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
              {currentVariation ? "Edit" : "Add"}Variations
            </h2>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Поле Color */}
              <div>
                <label className="block text-sm font-medium mb-1">Color</label>
                <select
                  name="color"
                  value={formValues.color}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Color</option>
                  <option value="White">White</option>
                  <option value="Black">Black</option>
                </select>
              </div>
              {/* Поле Size */}
              <div>
                <label className="block text-sm font-medium mb-1">Size</label>
                <select
                  name="size"
                  value={formValues.size}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Size</option>
                  <option value="S">Small</option>
                  <option value="M">Medium</option>
                  <option value="L">Large</option>
                </select>
              </div>
              {/* Поле Price */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Price *
                </label>
                <input
                  type="text"
                  name="price"
                  value={formValues.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter price"
                />
              </div>
              {/* Поле SKU */}
              <div>
                <label className="block text-sm font-medium mb-1">SKU *</label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    name="sku"
                    value={formValues.sku}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Enter SKU"
                    disabled={!!currentVariation}
                  />
                  <FaRandom className="absolute right-2 text-gray-400" />
                </div>
              </div>
            </form>

            <div className="mt-5">
              <label className="block text-sm font-medium mb-1">
                Quantity *
              </label>
              <input
                type="text"
                name="quantity"
                value={formValues.quantity}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="Enter quantity"
              />
            </div>

            {/* Кнопки Save и Close */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={closePopup}
                className="bg-gray-200 text-gray-600 px-4 py-2 rounded"
              >
                Close
              </button>
              <button
                onClick={handleSubmit}
                className="bg-orange-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductVariations;
