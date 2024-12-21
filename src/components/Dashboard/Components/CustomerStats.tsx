import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CustomerStats: React.FC = ({ data }) => {
  const [hourly, setHourly] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);

  useEffect(() => {
    setHourly(data?.map((item) => item?._id));
    setHourlyData(data?.map((item) => item?.count));
  }, [data]);

  const chartData = {
    labels: hourly,
    datasets: [
      {
        label: "Hourly Sales",
        data: hourlyData,
        backgroundColor: "#567dff",
        borderColor: "#567dff",
        borderWidth: 1,
      },
    ],
  };

  // Настройки графика
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
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
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Hourly Activity
      </h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default CustomerStats;
