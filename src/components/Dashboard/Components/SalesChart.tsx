import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FaChartBar } from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesChart = ({ data }) => {
  const chartData = {
    labels: Array.from({ length: 31 }, (_, i) => i + 1),
    datasets: [
      {
        label: "Sales",
        data: Array.from({ length: 31 }, (_, i) => {
          const sale = data?.dailySales.find((s) => s._id === i + 1);
          return sale ? sale.total : 0;
        }),
        borderColor: "#f97316",
        backgroundColor: "rgba(249, 115, 22, 0.2)",
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-2">
      {/* Информация о продажах */}
      <div className="flex items-center justify-between space-x-2 mb-4">
        <div className="flex space-x-2 mb-4">
          <FaChartBar className="text-3xl text-gray-700" />
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">${data?.totalSales || 0}</h2>
            <p className="text-gray-500">Total Sales</p>
          </div>
        </div>
        <div className="flex space-x-2 mb-4">
          <FaChartBar className="text-3xl text-gray-700" />
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">${data?.avgSales || 0}</h2>
            <p className="text-gray-500">Avg Sales Per Day</p>
          </div>
        </div>
      </div>
      {/* График */}
      <div className="">
        <Line
          style={{ width: "100%", height: "320px" }}
          data={chartData}
          options={chartOptions}
        />
      </div>
    </div>
  );
};

export default SalesChart;
