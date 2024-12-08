import React, { useEffect, useState } from "react";
import { Trash, X } from "lucide-react";
import { Transition } from "@headlessui/react";

import { axiosInstance } from "@/lib/axiosInstance";

interface CartSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface CartItem {
  productId: {
    _id: string;
    name: string;
    buyingPrice: number;
  };
  quantity: number;
  variationId: string;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, setIsOpen }) => {
  const [cart, setCart] = useState<{ items: CartItem[] }>({ items: [] });

  const fetchCart = async () => {
    try {
      const { data } = await axiosInstance.get(`/cart`);
      if (data?.status) {
        setCart(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch cart", error);
    }
  };

  const updateQuantity = async (
    variationId: string,
    productId: string,
    quantity: number
  ) => {
    try {
      await axiosInstance.put(`/cart`, { variationId, productId, quantity });
      fetchCart();
    } catch (error) {
      console.error("Failed to update cart quantity", error);
    }
  };

  // Quantity actions
  const handleDecrease = (
    variationId: string,
    productId: string,
    currentQuantity: number
  ) => updateQuantity(variationId, productId, currentQuantity - 1);

  const handleIncrease = (
    variationId: string,
    productId: string,
    currentQuantity: number
  ) => {
    if (currentQuantity > 1) {
      updateQuantity(variationId, productId, currentQuantity + 1);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 flex justify-end z-20 ${
        isOpen ? "block translate-x-100" : "hidden translate-x-0"
      } `}
    >
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 opacity-50 bg-black"
        ></div>
      )}
      <Transition
        show={isOpen}
        enter="transform transition ease-in-out duration"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition ease-in-out duration"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div className="w-80 bg-white h-full shadow-lg transform overflow-y-auto">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Your Cart</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-600 hover:text-gray-900 duration-300"
            >
              <X />
            </button>
          </div>

          {/* Cart Items */}
          <div className="p-4">
            <div className="flex flex-col">
              {cart?.items?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-full flex items-center border-b pb-4"
                  >
                    <img
                      src={item?.productId?.iamges?.[0] || "/men-thumb.png"}
                      alt="cart item"
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="ml-4 flex w-full justify-between items-start">
                      <div className="flex-1 w-1/2">
                        <h3 className="text-sm font-semibold">
                          {item?.productId?.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          $ {item?.productId?.buyingPrice}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <button
                            onClick={() =>
                              handleDecrease(
                                item?.variationId,
                                item.productId._id,
                                item.quantity
                              )
                            }
                            className="text-gray-600 border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="text-sm font-medium">
                            {item?.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleIncrease(
                                item?.variationId,
                                item.productId._id,
                                item.quantity
                              )
                            }
                            className="text-gray-600 border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div>
                        <button className="w-full">
                          <Trash
                            size={20}
                            className="hover:text-red-500 duration-300"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-4 border-t border-gray-200">
            <button className="w-full bg-[#ff450070] text-white p-3 rounded-lg hover:bg-[#ff4500] transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default CartSidebar;
