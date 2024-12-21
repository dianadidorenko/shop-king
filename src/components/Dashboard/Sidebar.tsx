"use client";

import { Box, ChartBarStacked, ShoppingCart, Undo } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaThLarge } from "react-icons/fa";
import { RiRefund2Fill } from "react-icons/ri";
import { SiBrandfolder } from "react-icons/si";
import { TbLogout } from "react-icons/tb";
import Cookies from "js-cookie";

interface DashboardSidebarProps {
  openSidebar: boolean;
}

const Sidebar: React.FC<DashboardSidebarProps> = ({ openSidebar }) => {
  const pathname = usePathname();

  const sidebarSections = [
    {
      title: "Product & Stocks",
      items: [
        {
          icon: <ChartBarStacked />,
          label: "Categories",
          link: "/dashboard/categories",
        },
        {
          icon: <SiBrandfolder size={25} />,
          label: "Brands",
          link: "/dashboard/brands",
        },
        {
          icon: <Box />,
          label: "Products",
          link: "/dashboard/products",
        },
      ],
    },
    {
      title: "Orders",
      items: [
        {
          icon: <ShoppingCart />,
          label: "View Orders",
          link: "/dashboard/orders ",
        },
        // {
        //   icon: <Undo />,
        //   label: "Return Orders",
        //   link: "/dashboard/return",
        // },
        // {
        //   icon: <RiRefund2Fill size={25} />,
        //   label: "Return & Refunds",
        //   link: "/dashboard/return-refunds",
        // },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          icon: <TbLogout size={25} />,
          label: "Logout",
          link: "void:0",
        },
      ],
    },
  ];

  const handleLogout = async () => {
    Cookies.remove("token");
    window.location.assign("/");
  };

  return (
    <div className="h-full bg-white shadow-md w-64">
      <div className="p-4 scroll h-[90vh] overflow-x-hidden overflow-y-scroll">
        <Link
          href={"/dashboard"}
          className={`${
            pathname === "/dashboard"
              ? "bg-[#f34d13] text-white font-semibold"
              : ""
          } flex items-center space-x-2 p-2 rounded-md cursor-pointer`}
        >
          <FaThLarge />
          <span className={`${!openSidebar && "hidden"} md:inline`}>
            Dashboard
          </span>
        </Link>
        {sidebarSections?.map((item, index) => (
          <div className="mt-4" key={index}>
            <h2 className="text-xs text-gray-500 font-semibold">
              {item?.title}
            </h2>
            <div className="mt-2">
              {item?.items?.map((item, index) => {
                if (item?.label === "Logout") {
                  return (
                    <Link
                      href={item.link}
                      key={index}
                      className={`${
                        pathname === item.link
                          ? "bg-[#f34d13] text-white font-semibold"
                          : ""
                      } flex items-center space-x-2 p-2 rounded-md cursor-pointer`}
                      onClick={() => {
                        handleLogout();
                      }}
                    >
                      {item.icon}
                      <span className="md:inline">{item.label}</span>
                    </Link>
                  );
                } else
                  return (
                    <Link
                      href={item.link}
                      key={index}
                      className={`${
                        pathname === item.link
                          ? "bg-[#f34d13] text-white font-semibold"
                          : ""
                      } flex items-center space-x-2 p-2 rounded-md cursor-pointer`}
                    >
                      {item.icon}
                      <span className="md:inline">{item.label}</span>
                    </Link>
                  );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
