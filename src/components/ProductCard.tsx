import { Heart, Star } from "lucide-react";
import Link from "next/link";

import { Product } from "@/lib/type";

interface ProductCardProps {
  data: Product[];
  isWishlisted?: string[] | [];
  wishlistClick?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  data,
  isWishlisted = [],
  wishlistClick,
}) => {

  return (
    <div className="relative grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-4">
      {data?.map((item, index) => (
        <Link
          key={index}
          href={`/products/${item?.slug}`}
          className="bg-white rounded-lg shadow-md p-2"
        >
          <div className="w-full">
            <div className="relative">
              {data?.map((item) => item.offer) && (
                <span className="absolute top-3 left-3 z-[9] bg-blue-900 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Flash Sale
                </span>
              )}
              <Heart
                size={34}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  wishlistClick?.(item._id);
                }}
                className="absolute top-4 right-4 bg-white p-[10px] rounded-full z-10"
                color={isWishlisted.includes(item._id) ? "#ff4800" : "#d1d5db"}
                fill={isWishlisted.includes(item._id) ? "#ff4800" : "#d1d5db"}
              />
              <div className="overflow-hidden">
                <img
                  src={item?.images?.[0]}
                  className="rounded-md w-full transform scale-95 hover:scale-100 transition duration-500 ease-in-out"
                  alt={item?.name}
                />
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold">{item?.name}</h2>
              <div className="my-2 flex items-center">
                <Star className="text-yellow-500" />
                <Star className="text-yellow-500" />
                <Star className="text-yellow-500" />
                <Star className="text-yellow-500" />
                <Star className="text-yellow-500" />
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-black">
                  ${item?.buyingPrice}
                </span>
                <span className="ms-2 line-through text-red-500">
                  ${item?.sellingPrice}
                </span>
              </div>
              <p>{item?.subcategory}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductCard;
