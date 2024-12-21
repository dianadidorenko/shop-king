import { axiosInstance } from "@/lib/axiosInstance";
import { ChevronDown, ShoppingCart } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiBars3BottomLeft } from "react-icons/hi2";

interface DashBoardHeaderProps {
  openSidebar: boolean;
  setOpenSidebar: (open: boolean) => void;
}

const Header: React.FC<DashBoardHeaderProps> = ({
  openSidebar,
  setOpenSidebar,
}) => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    await axiosInstance.get("/user").then((data) => {
      if (data?.data?.status) {
        setUser(data.data.user);
      }
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex px-4 bg-white shadow-md sticky top-0 w-full z-50 items-center justify-between">
      <Link href={"/"} className="flex items-center space-x-3 py-4">
        <ShoppingCart className="hidden lg:flex text-3xl text-[#f76411]" />
        <div className="font-bold">
          <span className="text-3xl text-[#f23e14]">S</span>
          <span className="text-2xl text-orange-600">hop</span>
          <span className="text-3xl text-gray-800">K</span>
          <span className="text-2xl text-gray-800">ing</span>
        </div>
      </Link>
      <div className="flex items-center space-x-4">
        <div className="relative group me-4 py-4">
          <div className="flex items-center space-x-2 cursor-pointer">
            <img src="/english.png" className="h-5" alt="english" />
            <span>English</span>
            <ChevronDown className="text-xl ms-3 " />
          </div>
          <div className="absolute top-14 left-[1px] w-48 bg-white rounded shadow-md hidden group-hover:block gap-3 first-letter:-3">
            <div className="flex items-center p-2 gap-3 cursor-pointer">
              <img src="/english.png" className="h-5" alt="english" />
              <span>English</span>
            </div>
            <div className="flex items-center p-2 gap-3 cursor-pointer">
              <img src="/english.png" className="h-5" alt="english" />
              <span>English</span>
            </div>
          </div>
        </div>
        {/* <div className="bg-orange-100 p-2 rounded">
          <TbHttpPost className="text-[#f34d13]"/>
        </div> */}
        <div
          onClick={() => setOpenSidebar(!openSidebar)}
          className="bg-red-100 cursor-pointer p-2 rounded"
        >
          <HiBars3BottomLeft className="text-[#f34d13]" />
        </div>

        <div className="flex items-center space-x-2 p-2">
          <img
            src="/admin-photo.jpeg"
            alt="user icon"
            className="h-12 w-8 rounded-md"
          />
          <div className="flex flex-col">
            <span className="text-sm">Hello</span>
            <span className="text-sm font-bold">{user?.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
