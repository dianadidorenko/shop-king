import Carousel from "@/components/Home/Carousel";
import CategoryCarousel from "@/components/Home/CategoryCarousel";
import PopularBrands from "@/components/Home/PopularBrands";
import PromotionCards from "@/components/Home/PromotionCards";
import ProductCard from "@/components/ProductCard";
import { Headset, Heart, Lock, Ship } from "lucide-react";

export default function Home() {
  const products = [
    {
      title: "Brown Jacket",
      image: "/goods/1-cover.png",
      price: "$50",
      originalPrice: "$70",
    },
    {
      title: "Brown Jacket",
      image: "/goods/1-cover.png",
      price: "$50",
      originalPrice: "$70",
    },
    {
      title: "Brown Jacket",
      image: "/goods/1-cover.png",
      price: "$50",
      originalPrice: "$70",
    },
    {
      title: "Brown Jacket",
      image: "/goods/1-cover.png",
      price: "$50",
      originalPrice: "$70",
    },
  ];

  const services = [
    {
      icon: <Headset size={30} className="text-center text-[#f23e14]" />,
      title: "Professional Service",
      description: "Efficient customer support from passionate team",
    },
    {
      icon: <Lock size={30} className="text-center text-[#f23e14]" />,
      title: "Secure Payment",
      description: "Different secure payment methods",
    },
    {
      icon: <Ship size={30} className="text-center text-[#f23e14]" />,
      title: "Fast Delivery",
      description: "Fast and convenient door to door delivery",
    },
    {
      icon: <Heart size={30} className="text-center text-[#f23e14]" />,
      title: "Quality & Savings",
      description: "Comprehensive quality control and affordable prices",
    },
  ];
  return (
    <div className="mb-8">
      <Carousel />
      <CategoryCarousel />
      <PromotionCards />
      <div className="container px-2 xl:px-4 mt-10 mx-auto">
        <h2 className="text-4xl font-bold mb-4">Trendy Collections</h2>
        <ProductCard isWishlisted={false} data={products} />
      </div>
      <PopularBrands />
      <div className="conatiner mx-auto px-2 xl:px-4 mt-10">
        <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between items-center p-3 md:p-8">
          {services?.map((item, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-around mb-3">
                {item?.icon}
              </div>
              <h3 className="font-bold text-lg">{item?.title}</h3>
              <p className="text-sm">{item?.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
