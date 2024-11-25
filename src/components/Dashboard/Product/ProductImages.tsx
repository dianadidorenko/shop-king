"use client";

import { Leaf, Plus } from "lucide-react";
import React, { useState } from "react";

const ProductImages: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  return (
    <div className="flex flex-col items-start p-4 space-y-4 bg-white">
      <div className="flex items-center justify-center w-full space-x-2 rounded-md p-2 mb-10">
        <label className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded cursor-pointer">
          <Plus className="text-gray-600 w-8 h-8" />
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        <span className="text-gray-600 text-lg">Add photo(s)</span>
      </div>

      <div className="flex items-center w-full justify-center space-x-2">
        <Leaf className="text-gray-600 w-5 h-5" />
        <span className="text-gray-600 text-lg">Product</span>
      </div>

      {/* Display uploaded images */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-4 w-full">
        {images.length === 0 ? (
          <div className="flex items-center justify-center">
            <p>No images uploaded yet.</p>
          </div>
        ) : (
          images.map((src, index) => (
            <div key={index} className="relative">
              <img
                src={src}
                alt={`Uploaded image ${index + 1}`}
                className="w-52 h-52 rounded"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductImages;
