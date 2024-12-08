"use client";

import ProductCard from "@/components/ProductCard";
import { axiosInstance } from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const router = useRouter();

  const fetchWishlist = async () => {
    await axiosInstance.get("/wishlist").then((data) => {
      if (data?.data?.status) {
        setWishlist(data.data.data);
      }
    });
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeFromWishlist = async (id: string) => {
    await axiosInstance.delete(`/wishlist/${id}`).then((data) => {
      if (data?.data?.status) {
        fetchWishlist();
      }
    });
  };

  const clearWishlist = async () => {
    await axiosInstance.delete(`/wishlist`).then((data) => {
      if (data?.data?.status) {
        fetchWishlist();
        toast.success("Wishlist is cleared");
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    });
  };

  return (
    <div className="container px-2 xl:px-4 py-12 mx-auto">
      <div className="flex items-center w-[50%]">
        <h1 className="text-xl xl:text-4xl font-bold mb-0">Wishlist</h1>
        <span className="text-md xl:text-xl ms-2 relative top-[1px]">
          ({wishlist?.product?.length} Products Found)
        </span>
      </div>
      <div className="w-full flex justify-end">
        <button
          onClick={clearWishlist}
          className="border rounded-md  px-3 py-2 bg-orange-500 text-white font-semibold"
        >
          Clear
        </button>
      </div>
      <div className="mt-5">
        {wishlist?.product?.length ? (
          <ProductCard
            isWishlisted={true}
            wishlistClick={removeFromWishlist}
            data={wishlist?.product}
          />
        ) : (
          <img
            src={"/empty-wishlist.jpg"}
            alt="empty wishlist"
            className="block mx-auto"
          />
        )}
      </div>
    </div>
  );
};

export default WishlistPage;