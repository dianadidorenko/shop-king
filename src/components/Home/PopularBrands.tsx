"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { axiosInstance } from "@/lib/axiosInstance";

const PopularBrands = () => {
  const [brands, setBrands] = useState([]);

  const fetchBrands = async () => {
    axiosInstance.get("/brands").then((data) => {
      if (data?.data?.status) {
        setBrands(data?.data?.data);
      }
    });
  };

  useEffect(() => {
    fetchBrands();
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
    <div className="container px-2 xl:px-5 mx-auto mt-10">
      <div className="flex justify-between items-center">
        <h3 className="text-4xl font-bold">Popular Brands</h3>
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
      <div className="mt-5 overflow-hidden">
        <Slider ref={sliderRef} {...settings}>
          {brands?.map((item, index) => (
            <div
              key={index}
              className="p-4 h-[230px] flex flex-col justify-center items-center shadow-md mx-3 bg-white my-1"
            >
              <img
                src={item.image}
                className="mx-auto p-4 mb-3"
                alt={item.name}
              />
              <h5 className="text-center font-bold">{item.name}</h5>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default PopularBrands;
