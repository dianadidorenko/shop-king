"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { axiosInstance } from "@/lib/axiosInstance";

const CategoryCarousel = () => {
  const [categories, setCategories] = useState([]);

  const fecthCategories = async () => {
    await axiosInstance.get("/category").then((data) => {
      if (data?.data?.status) {
        setCategories(data.data.data);
      }
    });
  };

  useEffect(() => {
    fecthCategories();
  }, []);

  const sliderRef = useRef();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container category-carousel  mx-auto overflow-hidden px-2 lg:px-4 my-4 mt-10">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-xl lg:text-4xl">Browse By Categories</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={() => sliderRef.current.slickPrev()}
            className="bg-gray-200 w-8 lg:w-10 h-8 lg:h-10 rounded-full px-1 lg:px-2 py-1"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => sliderRef.current.slickNext()}
            className="bg-gray-200 w-8 lg:w-10 h-8 lg:h-10 rounded-full px-1 lg:px-2 py-1"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
      <div className="mt-5">
        <Slider ref={sliderRef} {...settings}>
          {categories?.map((item, index) => (
            <div
              key={index}
              className="flex pe-3 justify-center items-center gap-3 rounded-t-md"
            >
              <img
                src={item.image}
                className="w-full rounded-tr-md rounded-tl-md cursor-pointer"
                alt={item.name}
              />
              <h5 className="text-center font-bold mt-3">
                {item.category + " " + item.subcategory}
              </h5>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CategoryCarousel;
