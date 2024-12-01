"use client";

import ProductDetails from "@/components/Dashboard/Product/ProductDetails";
import ProductImages from "@/components/Dashboard/Product/ProductImages";
import ProductOffer from "@/components/Dashboard/Product/ProductOffer";
import ProductSeo from "@/components/Dashboard/Product/ProductSeo";
import ProductShipping from "@/components/Dashboard/Product/ProductShipping";
import ProductVariations from "@/components/Dashboard/Product/ProductVariations";
import ProductVideos from "@/components/Dashboard/Product/ProductVideo";
import { axiosInstance } from "@/lib/axiosInstance";
import { ChevronRight, ChevronUp, Image, Info, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface TabProps {
  icon: JSX.Element;
  label: string;
  isActive: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}

interface DropdownItemProps {
  label: string;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({
  icon,
  label,
  isActive,
  onClick,
  children,
}) => {
  return (
    <div className="relative group w-1/4">
      <div
        onClick={onClick}
        className={`flex items-center px-4 py-2 rounded-lg cursor-pointer gap-2 ${
          isActive ? "bg-red-500 text-white" : "bg-white text-gray-500"
        } shadow-md`}
      >
        {icon}
        <span>{label}</span>
      </div>
      {children && (
        <div className="absolute hidden group-hover:block right-0 w-48 bg-white border border-gray-200 rounded opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200">
          {children}
        </div>
      )}
    </div>
  );
};

const DropdownItem: React.FC<DropdownItemProps> = ({ label, onClick }) => (
  <div onClick={onClick} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
    {label}
  </div>
);

const DashboardProductDetailsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Information");
  const [product, setProduct] = useState();

  const params = useParams();

  const getProduct = async () => {
    try {
      if (Array.isArray(params?.slug) && params.slug.length > 1) {
        const productId = params.slug[1];
        const response = await axiosInstance.get(`/products/${productId}`);

        if (response?.data?.status) {
          setProduct(response.data.data);
        } else {
          console.error("Failed to fetch product data.");
        }
      } else {
        console.error("Invalid slug format or slug is missing.");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  // console.log(product);

  const productData = {
    name: product?.name,
    category: product?.category,
    brand: product?.brand,
    buyingPrice: product?.buyingPrice,
    maximumPurchaseQuantity: product?.maximumPurchaseQuantity,
    weight: product?.weight,
    canPurchaseAble: product?.canPurchaseAble ? "Yes" : "No",
    refundable: product?.refundable ? "Yes" : "No",
    tags: product?.tags,
    sku: product?.sku,
    barcode: product?.barcode,
    tax: product?.tax,
    sellingPrice: product?.sellingPrice,
    lowStockWarning: product?.lowStockWarning,
    unit: product?.unit,
    showStockOut: product?.showStockOut ? "Enable" : "Disable",
    status: product?.status,
    description: product?.description,
  };

  return (
    <>
      <div className="flex items-center gap-3 mb-4">
        <Link href={"/dashboard"}>Dashboard</Link>
        <ChevronRight size={15} />
        <Link href={"/dashboard/products"}>Product</Link>
        <ChevronRight size={15} />
        <span>View</span>
      </div>

      <div className="flex space-x-4 justify-between p-4">
        <Tab
          icon={<Info size={15} />}
          label="Information"
          isActive={activeTab === "Information"}
          onClick={() => setActiveTab("Information")}
        />
        <Tab
          icon={<Image size={15} />}
          label="Images"
          isActive={activeTab === "Images"}
          onClick={() => setActiveTab("Images")}
        />
        <Tab
          icon={
            <LayoutGrid
              size={15}
              fill={activeTab === "Variation" ? "white" : "black"}
            />
          }
          label="Variation"
          isActive={activeTab === "Variation"}
          onClick={() => setActiveTab("Variation")}
        />
        <Tab
          icon={<ChevronUp size={15} />}
          label="More"
          isActive={false}
          onClick={() => {}}
        >
          <DropdownItem onClick={() => setActiveTab("Offers")} label="Offers" />
          <DropdownItem onClick={() => setActiveTab("Videos")} label="Videos" />
          <DropdownItem
            onClick={() => setActiveTab("Shipping & Return")}
            label="Shipping & Return"
          />
          <DropdownItem onClick={() => setActiveTab("Seo")} label="Seo" />
        </Tab>
      </div>

      <div className="mt-4">
        {activeTab === "Information" && (
          <ProductDetails product={productData} />
        )}
        {activeTab === "Images" && (
          <div>
            <ProductImages />
          </div>
        )}
        {activeTab === "Variation" && (
          <div>
            <ProductVariations />
          </div>
        )}
        {activeTab === "Offers" && (
          <div>
            <ProductOffer offer={product.offer} />
          </div>
        )}
        {activeTab === "Videos" && (
          <div>
            <ProductVideos video={product.videos} />
          </div>
        )}
        {activeTab === "Shipping & Return" && (
          <div>
            <ProductShipping shippingReturn={product.shippingReturn} />
          </div>
        )}
        {activeTab === "Seo" && (
          <div>
            <ProductSeo seo={product.seo} />
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardProductDetailsPage;
