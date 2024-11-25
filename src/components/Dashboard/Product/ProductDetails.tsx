import React from "react";

interface ProductInfo {
  name: string;
  sku: string;
  category: string;
  barcode: string;
  brand: string;
  tax: string[];
  buyingPrice: string;
  sellingPrice: string;
  maximumPurchaseQuantity: number;
  lowStockWarning: number;
  weight: string;
  unit: string;
  canPurchaseAble: string;
  showStockOut: string;
  refundable: string;
  status: string;
  tags: string[];
  description: string;
}

interface ProductInformationProps {
  product: ProductInfo;
}

const ProductDetails: React.FC<ProductInformationProps> = ({ product }) => {
  return (
    <div className="container mx-auto bg-white shadow rounded-md ">
      <div className="text-2xl font-semibold mb-6 shadow p-4 px-6">
        Information
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2 p-4 px-6">
        {/* Левая колонка */}
        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">Name</span>
          <span className="text-gray-600 font-semibold">{product.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">SKU</span>
          <span className="text-gray-800 font-semibold">{product.sku}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">Category</span>
          <span className="text-gray-800 font-semibold">
            {product.category}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">Barcode</span>
          <span className="text-gray-800 font-semibold">{product.barcode}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">Brand</span>
          <span className="text-gray-800 font-semibold">{product.brand}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">Tax</span>
          <span className="text-gray-800 font-semibold">
            {/* {product.tax.join(", ")} */}
            {product.tax}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">Buying Price</span>
          <span className="text-gray-800 font-semibold">
            {product.buyingPrice}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">Selling Price</span>
          <span className="text-gray-800 font-semibold">
            {product.sellingPrice}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">
            Maximum Purchase Quantity
          </span>
          <span className="text-gray-800 font-semibold">
            {product.maximumPurchaseQuantity}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">
            Low Stock Quantity Warning
          </span>
          <span className="text-gray-800 font-semibold">
            {product.lowStockWarning}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">Weight</span>
          <span className="text-gray-800 font-semibold">{product.weight}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">Unit</span>
          <span className="text-gray-800 font-semibold">{product.unit}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">Purchasable</span>
          <span className="text-gray-800 font-semibold">
            {product.canPurchaseAble}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">Show Stock Out</span>
          <span className="text-gray-800 font-semibold">
            {product.showStockOut}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">Refundable</span>
          <span className="text-gray-800 font-semibold">
            {product.refundable}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">Status</span>
          <span className="text-gray-800 font-semibold">{product.status}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">Tags</span>
          <span className="text-gray-800 font-semibold">
            {/* {product.tags.join(", ")} */}
            {product.tags}
          </span>
        </div>
      </div>

      {/* Описание */}
      <div className="mt-8 p-4 px-6">
        <h2 className="text-gray-800 font-semibold text-lg">Description</h2>
        <p className="text-gray-600 mt-2">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
