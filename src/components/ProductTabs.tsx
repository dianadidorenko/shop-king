import { Circle, Info, Star, Truck, Video } from "lucide-react";
import React, { useState } from "react";

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState<string>("Details");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="border rounded-b-3xl rounded-t-3xl">
      <div className="flex tabs-container mb-4 p-4 overflow-x-auto flex-nowrap">
        {[
          { name: "Details", icon: <Info /> },
          { name: "Videos", icon: <Video /> },
          { name: "Reviews", icon: <Star /> },
          { name: "Shipping & Returns", icon: <Truck /> },
        ].map((tab) => (
          <div
            key={tab.name}
            onClick={() => handleTabClick(tab.name)}
            className={`${
              activeTab === tab.name
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-800"
            } tab px-4 py-2 border rounded-3xl mr-2 cursor-pointer whitespace-nowrap flex items-center space-x-2`}
          >
            {tab.icon}
            <span>{tab.name}</span>
          </div>
        ))}
      </div>
      <div className="tab-content border p-6 rounded-b-3xl">
        {activeTab === "Details" && (
          <div>
            <h2 className="text-3xl font-bold">Product Details</h2>
          </div>
        )}
        {activeTab === "Videos" && (
          <div>
            <h2 className="text-3xl font-bold">Product Videos</h2>
          </div>
        )}

        {activeTab === "Reviews" && (
          <div>
            <h2 className="text-3xl font-bold">Product Reviews</h2>
          </div>
        )}

        {activeTab === "Shipping & Returns" && (
          <div>
            <h2 className="text-3xl font-bold">Product Shipping</h2>
            <ul>
              <li>Lorem ipsum dolor sit amet consectetur.</li>
              <li>Lorem ipsum dolor sit amet consectetur.</li>
              <li>Lorem ipsum dolor sit amet consectetur.</li>
              <li>Lorem ipsum dolor sit amet consectetur.</li>
              <li>Lorem ipsum dolor sit amet consectetur.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
