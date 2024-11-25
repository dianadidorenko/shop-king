import Link from "next/link";
import { useState } from "react";

type TabName = "Men" | "Women" | "Juniors";

type TabData = {
  [key in TabName]: {
    clothing: string[];
    shoes: string[];
    accessories: string[];
    image: string;
  };
};

const tabData: TabData = {
  Men: {
    image: "/men-cover.png",
    clothing: ["Hoodies & SweatShirts"],
    shoes: ["Running"],
    accessories: ["Bags & Backpacks"],
  },
  Women: {
    image: "/women-cover.png",
    clothing: ["Tops", "Jeans"],
    shoes: ["Heels", "Flats"],
    accessories: ["HandBags"],
  },
  Juniors: {
    image: "/juniors-cover.png",
    clothing: ["T-Shirts"],
    shoes: ["Sneakers"],
    accessories: ["Hats"],
  },
};

const MenuTabs = () => {
  const [activeTab, setActiveTab] = useState<TabName>("Men");

  const renderContent = () => {
    const data = tabData[activeTab];

    return (
      <div className="flex justify-between py-3 w-full">
        <div className="flex justify-between space-x-8 p-4">
          <div className="w-1/2">
            <img
              src={data?.image}
              alt="category"
              className="rounded-lg w-full object-cover h-[300px]"
            />
          </div>

          <div className="flex justify-normal space-x-8 w-full">
            <div className="w-1/3">
              <h2 className="font-bold mb-4">Clothing</h2>
              <ul className="space-y-2">
                {data?.clothing?.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link
                        href={`/products?category=${item?.toLowerCase()}`}
                        className="text-base"
                      >
                        {item}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="w-1/3">
              <h2 className="font-bold mb-4">Shoes</h2>
              <ul className="space-y-2">
                {data?.shoes?.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link
                        href={`/products?category=${item?.toLowerCase()}`}
                        className="text-base"
                      >
                        {item}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="w-1/3">
              <h2 className="font-bold mb-4">Accessories</h2>
              <ul className="space-y-2">
                {data?.accessories?.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link
                        href={`/products?category=${item?.toLowerCase()}`}
                        className="text-base"
                      >
                        {item}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <nav className="flex justify-center space-x-8 py-4 border-b">
        {(["Men", "Women", "Juniors"] as TabName[]).map((tab) => {
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-black ${
                activeTab === tab
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : ""
              }`}
            >
              {tab}
            </button>
          );
        })}
      </nav>
      {renderContent()}
    </div>
  );
};

export default MenuTabs;
