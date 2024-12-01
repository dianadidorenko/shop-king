"use client";

import { Leaf, Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { axiosInstance } from "@/lib/axiosInstance";

const ProductImages: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const params = useParams();

  const getImages = async () => {
    if (Array.isArray(params?.slug)) {
      const productId = params.slug[1];
      const response = await axiosInstance.get(`/products/${productId}/images`);
      if (response?.data?.status) {
        setImages(response?.data?.data);
      }
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.currentTarget.files) return false;

    const formData = new FormData();
    formData.append("image", event.currentTarget.files[0]);

    axiosInstance
      .post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response?.data) {
          if (Array.isArray(params?.slug)) {
            const productId = params.slug[1];
            axiosInstance
              .post(`/products/${productId}/images`, {
                imageUrl: response?.data?.file_url,
              })
              .then((data) => {
                if (data?.data?.status) {
                  alert("Image Added to the Product");
                }
              });
          }
        }
      })
      .catch((error) => {
        console.error("Error uploading the image", error);
      });
  };

  const handleDelete = (url: string) => {
    if (Array.isArray(params?.slug)) {
      const productId = params.slug[1];
      axiosInstance
        .delete(`/products/${productId}/images`, { data: { imageUrl: url } })
        .then((data) => {
          if (data?.data?.status) {
            alert("Image Deleted");
            setImages((prev) => prev.filter((image) => image !== url));
          }
        })
        .catch((error) => {
          console.error("Error deleting the image", error);
        });
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
            onChange={handleFileUpload}
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
          images.map((url, index) => (
            <div key={index} className="relative">
              <img
                src={url}
                alt={`Uploaded image ${index + 1}`}
                className="w-60 h-52 rounded-lg"
              />
              <X
                onClick={() => handleDelete(url)}
                size={40}
                color="white"
                className="absolute right-2 top-2 bg-red-600 rounded-full p-1"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductImages;
