"use client";

import React from "react";

const PromotionCards = () => {
  const [promotions, setPromotions] = React.useState([
    { image: "/winter_exclusive_for_man-cover.png", alt: "promotion1" },
    { image: "/winter_exclusive_for_woman-cover.png", alt: "promotion2" },
    { image: "/winter_exclusive_for_kids-cover.png", alt: "promotion3" },
  ]);

  return (
    <div className="container px-2 xl:px-4 mx-auto my-16">
      <div className="flex lg:flex-nowrap justify-between gap-3 lg:space-x-4 items-center">
        {promotions?.map((item, index) => (
          <div key={index} className="w-full lg:w-1/3">
            <img
              src={item.image}
              className="w-full rounded-xl"
              alt={item.alt}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromotionCards;
