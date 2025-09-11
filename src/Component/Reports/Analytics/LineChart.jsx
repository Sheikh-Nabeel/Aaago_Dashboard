import React from "react";
import ReactApexChart from "react-apexcharts";
import { IoIosFunnel } from "react-icons/io"; // Filter icon

const LineChart = () => {
  const series = [
    {
      name: "Total Signups",
      data: [60, 50, 90, 40, 60, 30, 20],
    },
    {
      name: "KYC Verifications",
      data: [45, 20, 80, 35, 50, 70, 60],
    },
    {
      name: "Active Conversions",
      data: [35, 75, 25, 45, 40, 60, 30],
    },
  ];

  const options = {
    chart: {
      type: "line",
      height: 350,
      background: "#013220",
      toolbar: { show: false },
    },
    stroke: {
      curve: "straight", // solid line
      width: 3,
    },
    colors: ["#DDC104", "#00FF66", "#3B3BFF"],
    xaxis: {
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      axisBorder: {
        show: true,
        color: "#DDC104",
      },
      axisTicks: {
        show: true,
        color: "#DDC104",
      },
      labels: {
        style: {
          colors: "#FFFFFF",
        },
      },
    },
    yaxis: {
      axisBorder: {
        show: true,
        color: "#DDC104",
      },
      axisTicks: {
        show: true,
        color: "#DDC104",
      },
      labels: {
        style: {
          colors: "#FFFFFF",
        },
      },
    },
    grid: {
      borderColor: "#DDC104",
      strokeDashArray: 0, // solid line
    },
    legend: {
      position: "right",
      labels: {
        colors: "#FFFFFF",
      },
      markers: {
        radius: 12,
      },
    },
    markers: {
      size: 5,
    },
    tooltip: {
      theme: "dark",
    },
  };

  return (
    <div
      className="w-full max-w-5xl border-2 border-yellow-400 p-4 rounded"
      style={{ backgroundColor: "#013220" }}
    >
      {/* Header Row with Chart Type, Day, Filter */}
      <div className="flex justify-between items-center border-b border-[#DDC104] pb-2 mb-4">
        <h2 className="text-xl font-bold text-[#DDC104]">Chart Type:</h2>
        <div className="flex gap-2">
        <p className="text-sm text-[#DDC104]">Day</p>
        <IoIosFunnel className="text-xl text-[#DDC104] cursor-pointer" />
        </div>
      </div>

      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default LineChart;
