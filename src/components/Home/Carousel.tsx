"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const slides = [
    { image: "/baner1.png", alt: "slider 1" },
    { image: "/banner2.png", alt: "slider 2" },
    { image: "/banner3.png", alt: "slider 3" },
  ];
  return (
    <div className="container mx-auto overflow-hidden px-2 lg:px-4 my-4 banner">
      <Slider {...settings}>
        {slides.map((item, index) => (
          <div key={index} className="h-full">
            <img
              src={item?.image}
              alt={item?.alt}
              className="w-full h-full rounded-md"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
