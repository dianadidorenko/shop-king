"use client";

import { useEffect, useState } from "react";
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";

const ProductFilter = ({ onFilterChange, filters }) => {
  const [sortBy, setSortBy] = useState<string>("");
  const [size, setSelectedSize] = useState<string>("");
  const [color, setSelectedColor] = useState<string>("");
  const [brand, setSelectedBrand] = useState<string>("");

  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000);

  useEffect(() => {
    if (filters && Object.keys(filters).length === 0) {
      setMinPrice(0);
      setMaxPrice(0);
      setSelectedBrand("");
      setSelectedColor("");
      setSelectedSize("");
      setSortBy("");
    }
  }, [filters]);

  const handleMaxPrice = (max) => {
    setMaxPrice(max);
    triggerFilterChange({ maxPrice: max });
  };

  const handleMinPrice = (min) => {
    setMinPrice(min);
    triggerFilterChange({ minPrice: min });
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    triggerFilterChange({ sortBy: sort });
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    triggerFilterChange({ brand: brand });
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    triggerFilterChange({ color: color });
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    triggerFilterChange({ size: size });
  };

  const triggerFilterChange = (updatedFilter) => {
    onFilterChange({
      sortBy,
      size,
      color,
      brand,
      minPrice,
      maxPrice,
      ...updatedFilter,
    });
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
              onChange={() => handleSortChange("newest")}
              checked={sortBy === "newest"}
            />
            Newest
          </label>
          <label htmlFor="sort" className="flex items-center gap-3 mb-2">
            <input
              type="radio"
              name="sort"
              id="priceLowToHigh"
              onChange={() => handleSortChange("price-low-to-high")}
              checked={sortBy === "price-low-to-high"}
            />
            Price: Low to High
          </label>
          <label htmlFor="sort" className="flex items-center gap-3 mb-2">
            <input
              type="radio"
              name="sort"
              id="priceHighToLow"
              onChange={() => handleSortChange("price-high-to-low")}
              checked={sortBy === "price-high-to-low"}
            />
            Price: High to Low
          </label>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Price</h3>
        <div className="flex items-center gap-3 mb-2">
          <input
            type="number"
            onChange={(e: any) => handleMinPrice(e.target.value)}
            className="w-1/2 p-1 border rounded mr-2 focus:outline-none"
          />
          <input
            type="number"
            onChange={(e: any) => handleMaxPrice(e.target.value)}
            className="w-1/2 p-1 border rounded focus:outline-none"
          />
        </div>

        {/* <MultiRangeSlider
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
        /> */}
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Brand</h3>
        <div>
          {["Reebok", "Levis", "Puma"].map((item) => (
            <label key={item} className="flex items-center gap-3 mb-2">
              <input
                type="radio"
                name="brand"
                onChange={() => handleBrandChange(item)}
                checked={brand === item}
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Color</h3>
        <div>
          {["Red", "White", "Blue"].map((item) => (
            <label key={item} className="flex items-center gap-3 mb-2">
              <input
                type="radio"
                onChange={() => handleColorChange(item)}
                checked={color === item}
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Size</h3>
        <div>
          {["S", "M", "L"].map((item) => (
            <label key={item} className="flex items-center gap-3 mb-2">
              <input
                type="radio"
                onChange={() => handleSizeChange(item)}
                checked={size === item}
              />
              {item}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
