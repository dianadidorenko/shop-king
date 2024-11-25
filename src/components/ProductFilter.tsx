"use client";

import { useState } from "react";
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";

const ProductFilter = () => {
  const [sortBy, setSortBy] = useState<string>("");
  const [size, setSize] = useState<string>("");

  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);

  const handleMultiRangeChange = ({
    min,
    max,
  }: {
    min: number;
    max: number;
  }) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Sort By</h3>
        <div>
          <label htmlFor="sort" className="flex items-center gap-3 mb-2">
            <input
              type="radio"
              name="sort"
              id="sort"
              value="newest"
              onChange={() => setSortBy("newest")}
            />
            Newest
          </label>
          <label htmlFor="sort" className="flex items-center gap-3 mb-2">
            <input
              type="radio"
              name="sort"
              id="priceLowToHigh"
              value="low-to-high"
              onChange={() => setSortBy("price-low-to-high")}
            />
            Price: Low to High
          </label>
          <label htmlFor="sort" className="flex items-center gap-3 mb-2">
            <input
              type="radio"
              name="sort"
              id="priceHighToLow"
              value="low-to-high"
              onChange={() => setSortBy("price-high-to-low")}
            />
            Price: High to Low
          </label>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Price</h3>
        <div className="flex items-center gap-3 mb-2">
          <input
            type="text"
            readOnly
            className="w-1/2 p-1 border rounded mr-2 focus:outline-none"
          />
          <input
            type="text"
            readOnly
            className="w-1/2 p-1 border rounded focus:outline-none"
          />
        </div>
        <MultiRangeSlider
          min={0}
          max={10000}
          step={10}
          ruler={false}
          label={true}
          preventWheel={false}
          minValue={minPrice}
          maxValue={maxPrice}
          className="!shadow-none !border-none !bg-white"
          barLeftColor="white"
          barRightColor="white"
          thumbLeftColor="#f34d13"
          thumbRightColor="#f34d13"
          barInnerColor="white"
          onInput={(e: ChangeResult) => {
            handleMultiRangeChange(e);
          }}
        />
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Brand</h3>
        <div>
          <label htmlFor="brand" className="flex items-center gap-3 mb-2">
            <input
              type="checkbox"
              name="brand"
              id="brand"
              value="newest"
              onChange={() => setSortBy("newest")}
            />
            Reebok
          </label>
          <label htmlFor="brand" className="flex items-center gap-3 mb-2">
            <input
              type="checkbox"
              name="brand"
              id="brand"
              value="low-to-high"
              onChange={() => setSortBy("price-low-to-high")}
            />
            Levis
          </label>
          <label htmlFor="brand" className="flex items-center gap-3 mb-2">
            <input
              type="checkbox"
              name="brand"
              id="brand"
              value="low-to-high"
              onChange={() => setSortBy("price-high-to-low")}
            />
            Puma
          </label>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Color</h3>
        <div>
          <label htmlFor="color" className="flex items-center gap-3 mb-2">
            <input
              type="checkbox"
              name="color"
              id="color"
              value="newest"
              onChange={() => setSortBy("newest")}
            />
            Red
          </label>
          <label htmlFor="color" className="flex items-center gap-3 mb-2">
            <input
              type="checkbox"
              name="color"
              id="color"
              value="low-to-high"
              onChange={() => setSortBy("price-low-to-high")}
            />
            White
          </label>
          <label htmlFor="color" className="flex items-center gap-3 mb-2">
            <input
              type="checkbox"
              name="color"
              id="color"
              value="low-to-high"
              onChange={() => setSortBy("price-high-to-low")}
            />
            Blue
          </label>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Size</h3>
        <div>
          <label htmlFor="size" className="flex items-center gap-3 mb-2">
            <input
              type="checkbox"
              name="size"
              id="size"
              value="s"
              onChange={() => setSize("s")}
            />
            S
          </label>
          <label htmlFor="size" className="flex items-center gap-3 mb-2">
            <input
              type="checkbox"
              name="size"
              id="size"
              value="m"
              onChange={() => setSize("m")}
            />
            M
          </label>
          <label htmlFor="size" className="flex items-center gap-3 mb-2">
            <input
              type="checkbox"
              name="size"
              id="size"
              value="l"
              onChange={() => setSize("l")}
            />
            L
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
