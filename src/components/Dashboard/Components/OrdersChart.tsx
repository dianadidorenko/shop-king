import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DeliveryStatus = ({ data }) => {
  const totalOrders = data?.totalOrders || 0;
  const delivered = data?.orderStatusSummary?.Delivered || 0;
  const canceled = data?.orderStatusSummary?.Cancelled || 0;
  const rejected = data?.orderStatusSummary?.Rejected || 0;

  const hasData = delivered > 0 || canceled > 0 || rejected > 0;

  // Данные для диаграммы
  const chartData = {
    labels: ["Delivered", "Canceled", "Rejected"],
    datasets: [
      {
        label: "Order Status",
        data: [delivered, canceled, rejected],
        backgroundColor: ["#f97316", "#8b5cf6", "#ef4444"],
        hoverBackgroundColor: ["#fb923c", "#a78bfa", "#f87171"],
        borderWidth: 5,
        borderColor: ["#FFF", "#FFF", "#FFF"],
        hoverBorderColor: ["#FFF", "#FFF", "#FFF"],
        cutout: "70%",
      },
    ],
  };

  // Настройки диаграммы
  const chartOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: "70%",
  };

  return (
    <div className="flex items-center justify-center space-x-8">
      {hasData ? (
        <>
          {/* Диаграмма */}
          <div className="relative" style={{ width: "200px", height: "200px" }}>
            <Doughnut data={chartData} options={chartOptions} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-lg font-bold">{totalOrders}</p>
            </div>
          </div>

          {/* Список статусов */}
          <div className="space-y-4">
            <div className="flex flex-col gap-2 space-x-2">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                <p className="text-gray-700">
                  Delivered:{" "}
                  <span className="font-bold">
                    (
                    {totalOrders > 0
                      ? ((delivered / totalOrders) * 100).toFixed(1)
                      : 0}
                    %)
                  </span>
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                <p className="text-gray-700">
                  Canceled:{" "}
                  <span className="font-bold">
                    (
                    {totalOrders > 0
                      ? ((canceled / totalOrders) * 100).toFixed(1)
                      : 0}
                    %)
                  </span>
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <p className="text-gray-700">
                  Rejected:{" "}
                  <span className="font-bold">
                    (
                    {totalOrders > 0
                      ? ((rejected / totalOrders) * 100).toFixed(1)
                      : 0}
                    %)
                  </span>
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="text-gray-500 text-center">Нет данных для отображения</p>
      )}
    </div>
  );
};

export default DeliveryStatus;
