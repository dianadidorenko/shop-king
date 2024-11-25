"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PopularBrands = () => {
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

  const brands = [
    { name: "Camper", image: "/brands/camper-cover.png" },
    { name: "Chanel", image: "/brands/chanel-cover.png" },
    { name: "Dr. Martens", image: "/brands/dr._martens-cover.png" },
    { name: "Fila", image: "/brands/fila-cover.png" },
    { name: "Burberry", image: "/brands/burberry-cover.png" },
    { name: "Babymel", image: "/brands/babymel-cover.png" },
  ];

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
              className="p-4 flex flex-col justify-center items-center shadow-md mx-3 bg-white my-1"
            >
              <img
                src={item.image}
                className="mx-auto h-[80px] p-4 mb-3"
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