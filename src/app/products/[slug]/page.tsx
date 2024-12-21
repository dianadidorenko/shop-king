"use client";

import { ChevronRight, Heart, Lock, Star } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

import ProductCard from "@/components/ProductCard";
import ProductTabs from "@/components/ProductTabs";
import { axiosInstance } from "@/lib/axiosInstance";

const ProductPage: React.FC = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const [selectedImage, setSelectedImage] =
    useState<string>("goods/1-cover.png");

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [variationId, setVariationId] = useState("");

  const fetchProducts = async () => {
    await axiosInstance.get(`/products`).then((data) => {
      if (data?.data?.status) {
        setProducts(data?.data?.data);
      }
    });
  };

  // Fetch Product
  const fetchProduct = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/products/${params?.slug}/byslug`
      );
      if (data?.status) {
        setProduct(data?.data);
        setSelectedImage(data?.data?.images[0] || "goods/1-cover.png");
      } else {
        toast.error("Failed to load product");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching the product");
    }
  };

  const fetchWishlist = async () => {
    await axiosInstance.get("/wishlist").then((data) => {
      if (data?.data?.status) {
        setWishlist(
          data.data.data.product.map((item: { _id: string }) => item?._id)
        );
      } else {
        console.log("Something went wrong");
      }
    });
  };

  useEffect(() => {
    fetchProduct();
    fetchProducts();
    fetchWishlist();
  }, []);

  // Slider settings
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesTocroll: 1,
    arrows: false,
  };

  // Quantity actions
  const handleDecrease = () =>
    setQuantity((preqQuantity) => (preqQuantity > 1 ? preqQuantity - 1 : 1));

  const handleIncrease = () => {
    setQuantity((preqQuantity) => preqQuantity + 1);
  };

  // Wishlist Actions
  const addToWishList = async () => {
    await axiosInstance
      .post("/wishlist", { product: product?._id })
      .then((data) => {
        if (data?.data?.status) {
          toast.success("Product added to wishlist");
        } else {
          toast.error("Product is not added to wishlist");
        }
      });
  };

  // Provide sizes by clicking color
  const sizesForSelectedColor = product?.variations
    ?.filter((item) => item.color === selectedColor)
    ?.filter(
      (item, index, self) =>
        index === self.findIndex((v) => v.size === item.size)
    );

  // Cart Actions
  const addToCart = async () => {
    if (variationId === "") {
      toast.error("Choose Size and Color First");
      return false;
    }
    axiosInstance
      .post("/cart", {
        productId: product?._id,
        variationId,
        quantity,
      })
      .then((data) => {
        if (data?.data?.status) {
          toast.success("Added to Cart Successfully");
        }
      });
  };

  return (
    <div className="container mx-auto px-2 xl:px-4 py-12">
      <div className="text-md flex items-center text-gray-500 mb-4">
        <Link href={"/products"}>Products</Link> <ChevronRight size={15} />
        <Link href={"#"}>{product?.name}</Link>
      </div>

      <div className="flex flex-col md:flex-row space-x-8">
        <div className="w-full md:w-1/3">
          <img
            src={selectedImage}
            className="mb-3 w-full h-[400px] aspect-square object-cover"
            alt="product image"
          />
          {product.images?.length > 0 && (
            <Slider {...settings}>
              {product.images.map((image: string, index: number) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className="w-1/2"
                >
                  <img
                    src={image}
                    className="border-2 cursor-pointer h-full"
                    alt={product.name}
                    onClick={() => setSelectedImage(image)}
                  />
                </div>
              ))}
            </Slider>
          )}
        </div>
        <div className="md:w-full">
          <h1 className="text-3xl font-bold mb-2">{product?.name}</h1>
          <p className="text-xl text-gray-700 mb-2">${product?.sellingPrice}</p>
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="text-yellow-500" />
            ))}
          </div>

          <div className="mb-4 flex flex-col gap-3">
            <span className="font-bold">Color:</span>
            <div className="flex items-center">
              {product?.variations
                ?.filter(
                  (item, index, self) =>
                    index ===
                    self.findIndex((v: string) => v?.color === item?.color)
                )
                .map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(item.color)}
                    className={`ms-2 px-3 py-2 text-md border rounded-full text-gray-700 ${
                      item.color === selectedColor
                        ? "bg-[#ff4500] text-white"
                        : "bg-[#f7f7fc]"
                    } `}
                  >
                    {item?.color}
                  </button>
                ))}
            </div>
            {selectedColor && (
              <div className="mb-4 flex flex-col gap-3">
                <span className="font-bold">
                  Available sizes for {selectedColor}:
                </span>
                <div className="flex items-center">
                  {sizesForSelectedColor.map((item) => (
                    <button
                      key={item._id}
                      onClick={() => setVariationId(item?._id)}
                      className={`ms-2 px-3 py-2 text-md border rounded-full text-gray-700 ${
                        variationId === item?._id
                          ? "bg-[#f45500] text-white"
                          : "bg-[#f7f7fc]"
                      } `}
                    >
                      {item.size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mb-8">
            <span className="font-bold">Quantity:</span>
            <div className="inline-flex items-center ms-2">
              <button
                onClick={handleDecrease}
                className="bg-black text-[#f7f7fc] px-[14px] text-[17px] py-1 border rounded-full "
              >
                -
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="w-12 text-center border-t border-b focus:outline-none"
              />
              <button
                onClick={handleIncrease}
                className="bg-black text-[#f7f7fc] px-3 py-1 border rounded-full "
              >
                +
              </button>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={addToCart}
              className="flex items-center text-white bg-[#94a3b8] px-4 py-2 border rounded-3xl"
            >
              <Lock className="mr-2" />
              Add To Cart
            </button>
            <button
              onClick={() => {
                addToWishList();
                fetchWishlist();
              }}
              className="flex items-center px-4 py-2 border rounded-3xl"
            >
              <Heart
                className="mr-2"
                color={wishlist.includes(product._id) ? "#ff4800" : "#d1d5db"}
                fill={wishlist.includes(product._id) ? "#ff4800" : "#d1d5db"}
              />
              Favourite
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <ProductTabs data={product} />
      </div>

      <div className="my-5">
        <h2 className="text-4xl font-bold">Related Products</h2>
      </div>
      <ProductCard isWishlisted={wishlist} data={products} />
    </div>
  );
};

export default ProductPage;
