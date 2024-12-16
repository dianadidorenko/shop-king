import Link from "next/link";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axiosInstance";

const MenuTabs = () => {
  const [category, setCategory] = useState([]);

  // Получение категорий
  const fetchCategories = async () => {
    await axiosInstance.get("/category").then((data) => {
      if (data?.data?.status) {
        setCategory(data.data.data);
      }
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const [activeTab, setActiveTab] = useState("Men");

  // Маппинг для картинок и названий табов
  const tabImages = {
    Men: "/men-cover.png",
    Women: "/women-cover.png",
    Juniors: "/juniors-cover.png",
  };

  // Общий компонент для вывода контента таба
  const renderTabContent = (tab) => {
    return (
      <div className="flex justify-between space-x-8 p-4">
        <div className="w-1/2">
          <img
            src={tabImages[tab]} // Выбор изображения в зависимости от активного таба
            alt="category"
            className="rounded-lg w-full object-cover h-[300px]"
          />
        </div>

        <div className="flex justify-normal space-x-8 w-full">
          <ul className="flex flex-row flex-wrap justify-start gap-2 w-full">
            {category
              .filter((item) => item.category === tab) // Фильтрация по текущей категории
              .map((item, index) => (
                <li key={index} className="border rounded-md p-2 h-[40px]">
                  <Link
                    href={`/products?subcategory=${item?.subcategory}`}
                    className="text-base"
                  >
                    {item?.subcategory}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <nav className="flex justify-center space-x-8 py-4 border-b">
        {["Men", "Women", "Juniors"].map((tab) => (
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
        ))}
      </nav>
      {renderTabContent(activeTab)}{" "}
    </div>
  );
};

export default MenuTabs;
