import ProductCard from "@/components/ProductCard";

const OffersPage = () => {
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
    <div className="container px-2 xl:px-4 py-12 mx-auto">
      <div className="flex items-center">
        <h1 className="text-xl xl:text-4xl font-bold mb-0">Offer Prpducts</h1>
        <span className="text-md xl:text-xl ms-2 relative top-[1px]">
          (40 Products Found)
        </span>
      </div>
      <div className="mt-5">
        <ProductCard isWishlisted={false} data={products} />
      </div>
    </div>
  );
};

export default OffersPage;
