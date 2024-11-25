import ProductCard from "@/components/ProductCard";
import ProductFilter from "@/components/ProductFilter";
import { ChevronRight } from "lucide-react";

const ProductsPage = () => {
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
      <div className="flex items-center space-x-3">
        <p>Home</p> <ChevronRight size={15} /> <p>Products</p>
      </div>
      <div className="flex items-center mt-2 gap-3">
        <h1 className="text-4xl font-bold mb-0">Explore All Products</h1>
        <span className="text-xl ms-2">(40 Products Found)</span>
      </div>
      <div className="mt-8">
        <div className="flex space-x-3">
          <div className="w-1/4">
            <ProductFilter />
          </div>
          <div className="w-full">
            <ProductCard isWishlisted={false} data={products} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
