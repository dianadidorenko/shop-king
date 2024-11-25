"use client";

import ProductCard from "@/components/ProductCard";
import ProductTabs from "@/components/ProductTabs";
import { ChevronRight, Heart, Lock, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const ProductPage = () => {
  const [selectedImage, setSelectedImage] = useState("/goods/1-cover.png");
  const [quantity, setQuantity] = useState<number>(1);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesTocroll: 1,
    arrows: false,
  };

  const handleDecrease = () =>
    setQuantity((preqQuantity) => (preqQuantity > 1 ? preqQuantity - 1 : 1));
  const handleIncrease = () => {
    setQuantity((preqQuantity) => preqQuantity + 1);
  };

  const products = [
    {
      title: "DailyRun Leggings",
      price: 40.0,
      originalPrice: 80.0,
      image: "/goods/2-cover.png",
    },
    {
      title: "Denim Jacket",
      price: 120.0,
      originalPrice: 150.0,
      image: "/goods/3-cover.png",
    },
    {
      title: "Dri-Fit Crop Top",
      price: 96.0,
      originalPrice: 120.0,
      image: "/goods/4-cover.png",
    },
    {
      title: "Dri-Fit One",
      price: 80.0,
      originalPrice: 100.0,
      image: "/goods/5-cover.png",
    },
    {
      title: "Dri-Fit Pro",
      price: 96.0,
      originalPrice: 120.0,
      image: "/goods/6-cover.png",
    },
    {
      title: "Dri-Fit Striker",
      price: 55.0,
      originalPrice: 110.0,
      image: "/goods/7-cover.png",
    },
    {
      title: "Essential Hoodie",
      price: 80.0,
      originalPrice: 160.0,
      image: "/goods/8-cover.png",
    },
    {
      title: "Everyday Plus",
      price: 64.0,
      originalPrice: 80.0,
      image: "/goods/9-cover.png",
    },
    {
      title: "Denim Jacket",
      price: 120.0,
      originalPrice: 150.0,
      image: "/goods/1-cover.png",
    },
  ];

  return (
    <div className="container mx-auto px-2 xl:px-4 py-12">
      <div className="text-md flex items-center text-gray-500 mb-4">
        <Link href={"#"}>Menu</Link> <ChevronRight size={15} />
        <Link href={"#"}>Clothing</Link> <ChevronRight size={15} />
        <Link href={"#"}>Jackets</Link>
      </div>

      <div className="flex flex-col md:flex-row space-x-8">
        <div className="w-full md:w-1/3">
          <img
            src={selectedImage}
            className="mb-3 w-full h-[400px] aspect-square object-cover"
            alt="product image"
          />
          <Slider {...settings}>
            <div className="w-1/4">
              <img
                src={"/goods/2-cover.png"}
                className="border-2 cursor-pointer"
                alt="product image"
              />
            </div>
            <div className="w-1/4">
              <img
                src={"/goods/3-cover.png"}
                className="border-2 cursor-pointer"
                alt="product image"
              />
            </div>
            <div className="w-1/4">
              <img
                src={"/goods/4-cover.png"}
                className="border-2 cursor-pointer"
                alt="product image"
              />
            </div>
            <div className="w-1/4">
              <img
                src={"/goods/5-cover.png"}
                className="border-2 cursor-pointer"
                alt="product image"
              />
            </div>
            <div className="w-1/4">
              <img
                src={"/goods/6-cover.png"}
                className="border-2 cursor-pointer"
                alt="product image"
              />
            </div>
          </Slider>
        </div>
        <div className="md:w-full">
          <h1 className="text-3xl font-bold mb-2">Brown Jacket</h1>
          <p className="text-xl text-gray-700 mb-2">$130</p>
          <div className="flex items-center mb-4">
            <Star className="text-yellow-500" />
            <Star className="text-yellow-500" />
            <Star className="text-yellow-500" />
            <Star className="text-yellow-500" />
            <Star className="text-yellow-500" />
          </div>
          <div className="mb-4 flex items-center flex-wrap gap-3">
            <span className="font-bold">Color:</span>
            <button className="ms-2 px-3 py-2 text-md border rounded-full text-gray-700 bg-[#f7f7fc]">
              White
            </button>
            <button className="ms-2 px-3 py-2 text-md border rounded-full text-gray-700 bg-[#f7f7fc]">
              Black
            </button>
          </div>
          <div className="mb-8">
            <span className="font-bold">Quantity:</span>
            <div className="inline-flex items-center ms-2">
              <button
                onClick={handleDecrease}
                className="bg-black text-[#f7f7fc] px-[14px] text-[17px] py-1 border rounded-full "
              >
                -
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="w-12 text-center border-t border-b focus:outline-none"
              />
              <button
                onClick={handleIncrease}
                className="bg-black text-[#f7f7fc] px-3 py-1 border rounded-full "
              >
                +
              </button>
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="flex items-center text-white bg-[#94a3b8] px-4 py-2 border rounded-3xl">
              <Lock className="mr-2" />
              Add To Cart
            </button>
            <button className="flex items-center px-4 py-2 border rounded-3xl">
              <Heart className="mr-2" />
              Favourite
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <ProductTabs />
      </div>

      <div className="my-5">
        <h2 className="text-4xl font-bold">Related Products</h2>
      </div>
      <ProductCard isWishlisted={false} data={products} />
    </div>
  );
};

export default ProductPage;
