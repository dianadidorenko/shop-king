import { Info, Star, Truck, Video } from "lucide-react";
import React, { useState } from "react";

const ProductTabs = ({ data }) => {
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
            <div
              dangerouslySetInnerHTML={{ __html: data?.description }}
              className="mt-4"
            ></div>
          </div>
        )}
        {activeTab === "Videos" && (
          <div>
            <h2 className="text-3xl font-bold">Product Videos</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {data?.videos?.length ? (
                data?.videos?.map((video, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-lg aspect-w-16 aspect-h-9 shadow-lg border"
                  >
                    <iframe
                      src={video.link}
                      width="590"
                      height="315"
                      style={{ width: "100%" }}
                      frameBorder="0"
                      allowFullScreen
                      title={`Video ${index + 1}`}
                    ></iframe>
                  </div>
                ))
              ) : (
                <img src="/no-video-found.png" alt="no video found" />
              )}
            </div>
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
            <div
              dangerouslySetInnerHTML={{
                __html: data?.shippingReturn?.shippingAndReturnPolicy,
              }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
