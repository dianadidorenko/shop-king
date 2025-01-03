"use client";

import {
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";
import {
  FaQuestionCircle,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaHome,
  FaTags,
  FaExchangeAlt,
  FaShippingFast,
  FaRulerCombined,
  FaCookieBite,
  FaClipboard,
  FaUserAlt,
  FaFacebook,
} from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { SiAboutdotme } from "react-icons/si";
import { TiContacts } from "react-icons/ti";
import { HiOutlineShoppingBag } from "react-icons/hi2";

import MenuTabs from "./MenuTabs";
import Profile from "./Profile";
import CartSidebar from "../CartSidebar";
import Sidebar from "./Sidebar";
import { axiosInstance } from "@/lib/axiosInstance";
import { UserType } from "@/lib/type";

const Header = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [user, setUser] = useState<UserType>({});

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [cartItemsLength, setCartItemsLength] = useState<number>(0);

  const menuItems = [
    { link: "/", label: "Home", icon: FaHome },
    { link: "/offers", label: "Offers", icon: FaTags },
    { link: "/faq", label: "FAQ", icon: FaQuestionCircle },
    {
      link: "/return-exchange",
      label: "Return & Exchange",
      icon: FaExchangeAlt,
    },
    { link: "/shipping-policy", label: "Shipping", icon: FaShippingFast },
    { link: "/size-charts", label: "Size Charts", icon: FaRulerCombined },
    { link: "/cookie-policy", label: "Cookies Policy", icon: FaCookieBite },
    {
      link: "/term-conditions",
      label: "Terms & Conditions",
      icon: FaClipboard,
    },
    { link: "/privacy-policy", label: "Privacy Policy", icon: FaUserAlt },
    { link: "/about-us", label: "About Us", icon: SiAboutdotme },
    { link: "/contact-us", label: "Contact Us", icon: TiContacts },
  ];

  const socialLinks = [
    { icon: FaFacebook, url: "https://facebook.com" },
    { icon: FaTwitter, url: "https://twitter.com" },
    { icon: FaInstagram, url: "https://instagram.com" },
    { icon: FaYoutube, url: "https://youtube.com" },
  ];

  useEffect(() => {
    setIsLoggedIn(Cookies.get("token") || null);
  }, [Cookies.get("token")]);

  const fetchCartItemsLength = async () => {
    try {
      const response = await axiosInstance.get("/cart");
      if (response?.data?.status) {
        const itemsLength = response.data.data.items.length || 0;
        setCartItemsLength(itemsLength);
      }
    } catch (error) {
      console.log("Ошибка при получении длины корзины:", error);
      setCartItemsLength(0);
    }
  };

  useEffect(() => {
    fetchCartItemsLength();
  }, []);

  useEffect(() => {
    axiosInstance.get("/user").then((data) => {
      if (data?.data?.status) {
        setUser(data?.data.user);
      }
    });
  }, []);

  return (
    <>
      <Sidebar
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        menuItems={menuItems}
        socialLinks={socialLinks}
        language="English"
        address="House : 25, Road No: 2, Block A, Mirgur-1, Dhake 1216"
        email="info@inilabs.net"
        phone="1212232334"
      />
      <header className="bg-white shadow-md sticky top-0 z-20">
        <div className="container flex px-2 lg:px-4 items-center justify-between m-auto gap-x-10">
          <div className="flex items-center space-x-4 lg:space-x-8">
            <div className="block lg:hidden">
              <Menu
                className="block lg:hidden cursor-pointer text-2xl font-normal"
                onClick={() => setIsDrawerOpen(true)}
              />
            </div>

            <Link href={"/"} className="flex items-center space-x-3 py-4">
              <ShoppingCart className="hidden lg:flex text-3xl text-[#f76411]" />

              <div className="font-bold">
                <span className="text-3xl text-[#f23e14]">S</span>
                <span className="text-2xl text-orange-600">hop</span>
                <span className="text-3xl text-gray-800">K</span>
                <span className="text-2xl text-gray-800">ing</span>
              </div>
            </Link>
            <div className="hidden lg:flex items-center space-x-8 py-4">
              <Link
                href={"/"}
                className={`font-bold  text-xl ${
                  pathname === "/" ? "text-[#f76411]" : "text-black"
                }`}
              >
                Home
              </Link>
              <div className="relative group py-4">
                <button className="text-black font-bold text-xl flex items-center gap-2">
                  Categories <ChevronDown className="text-2xl" />
                </button>
                <div className="border absolute top-14 left-[-100px] w-[800px] bg-white rounded shadow-md hidden group-hover:block">
                  <MenuTabs />
                </div>
              </div>
              <Link
                href={"/offers"}
                className={`py-4 text-xl font-bold ${
                  pathname === "/offers" ? "text-[#f76411]" : "text-black"
                }`}
              >
                Offers
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-3 lg:space-x-6">
            <div className="relative hidden lg:flex">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr4 py-2 rounded-full focus:outline-none bg-gray-100 w-full"
              />
              <Search className="absolute left-3 top-1/2 text-gray-400 transform -translate-y-1/2" />
            </div>
            {/* <div className="relative group me-4 py-4">
              <div className="flex items-center space-x-2 cursor-pointer">
                <img src="/english.png" alt="flag" className="h-5" />
                <span>English</span>
                <ChevronDown className="text-xl ms-3" />
              </div>
              <div className="absolute top-14 left-[1px] w-48 bg-white border rounded shadow-lg hidden group-hover:block">
                <button className="flex items-center space-x-3">
                  <img src="/english.png" alt="flag" /> English
                </button>
              </div>
            </div> */}
            <Link href={"/wishlist"}>
              <Heart className="cursor-pointer text-black" fill="black" />
            </Link>
            <div className="relative group me-4 py-4">
              <div className="flex items-center space-x-2 cursor-pointer">
                <User className="cursor-pointer" fill="black" />
              </div>
              <div className="absolute top-14 right-0 w-52 p-3 bg-white rounded-md shadow-md hidden group-hover:block border">
                {!isLoggedIn ? (
                  <div className="flex flex-col py-3 items-center justify-center">
                    <Link
                      href={"/register"}
                      className="p-2 bg-[#ff4f0080] rounded-full text-white"
                    >
                      Register your account
                    </Link>
                    <p className="py-1 text-center">or</p>
                    <Link
                      href={"/login"}
                      className="p-2 block bg-[#ff4500] rounded-full text-white"
                    >
                      Login to your account
                    </Link>
                  </div>
                ) : (
                  <Profile
                    user={{
                      name: user?.name || "Name",
                      phone: user?.phone || "Phone",
                      avatarUrl: "/avatar.png",
                    }}
                  />
                )}
              </div>
            </div>
            <div
              className="bg-black p-2 rounded-full cursor-pointer relative"
              onClick={() => setIsOpen(true)}
            >
              <HiOutlineShoppingBag
                fill="white"
                size={cartItemsLength > 0 ? 35 : 30}
              />
              <p className="text-base font-bold absolute top-[19px] right-[21px]">
                {cartItemsLength > 0 && cartItemsLength}
              </p>
            </div>
          </div>
          <div className="lg:hidden">
            <Search className="text-2xl" />
          </div>
        </div>
      </header>
      <div>
        <CartSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </>
  );
};

export default Header;
