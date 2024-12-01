import { Box, ChartBarStacked, ShoppingCart, Undo } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FaThLarge } from "react-icons/fa";
import { RiRefund2Fill } from "react-icons/ri";
import { SiBrandfolder } from "react-icons/si";

interface DashboardSidebarProps {
  openSidebar: boolean;
}

const Sidebar: React.FC<DashboardSidebarProps> = ({ openSidebar }) => {
  const [activeLink, setActiveLink] = useState<string>("Dashboard");

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
          icon: <SiBrandfolder size={25}/>,
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
        {
          icon: <Undo />,
          label: "Return Orders",
          link: "/dashboard/return",
        },
        {
          icon: <RiRefund2Fill size={25} />,
          label: "Return & Refunds",
          link: "/dashboard/return-refunds",
        },
      ],
    },
  ];

  return (
    <div className="h-full bg-white shadow-md w-64">
      <div className="p-4 scroll h-[90vh] overflow-x-hidden overflow-y-scroll">
        <Link
          href={"/dashboard"}
          className={`${
            activeLink === "Dashboard"
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
              {item?.items?.map((item, index) => (
                <Link
                  href={item.link}
                  key={index}
                  onClick={() => setActiveLink(item.label)}
                  className={`${
                    activeLink === item.label
                      ? "bg-[#f34d13] text-white font-semibold"
                      : ""
                  } flex items-center space-x-2 p-2 rounded-md cursor-pointer`}
                >
                  {item.icon}
                  <span className="md:inline">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
