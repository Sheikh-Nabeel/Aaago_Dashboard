import React from "react";
import ReactApexChart from "react-apexcharts";
import { IoIosFunnel } from "react-icons/io"; // Filter icon

const LineChart = () => {
  const series = [
    {
      name: "New Bookings",
      data: [60, 50, 90, 40, 60, 30, 20],
    },
    {
      name: "Completed Rides",
      data: [45, 20, 80, 35, 50, 70, 60],
    },
    {
      name: "Cancellations",
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
      curve: "straight",
      width: 3,
    },
    colors: ["#DDC104", "#00FF66", "#FF0000"],
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
    <div className="w-full max-w-5xl">
<div className="flex flex-wrap justify-between items-center gap-4 pb-1">
            {/* Left Side Filters */}
            <div className="flex flex-wrap items-center gap-4 text-yellow-400 text-sm">
              <div className="flex items-center gap-2">
                <span>Date Range:</span>
                <input type="date" className="bg-transparent border border-yellow-400 text-yellow-400 px-2 py-1 rounded" />
                <span>To</span>
                <input type="date" className="bg-transparent border border-yellow-400 text-yellow-400 px-2 py-1 rounded" />
              </div>
              <div className="flex items-center gap-2">
                <span>Platform</span>
                <select className="bg-transparent border border-yellow-400 text-yellow-400 px-2 py-1 rounded">
                  <option className="bg-black text-yellow-400">All</option>
                  <option className="bg-black text-yellow-400">App</option>
                  <option className="bg-black text-yellow-400">Web</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span>City</span>
                <select className="bg-transparent border border-yellow-400 text-yellow-400 px-2 py-1 rounded">
                  <option className="bg-black text-yellow-400">All</option>
                  <option className="bg-black text-yellow-400">Dubai</option>
                  <option className="bg-black text-yellow-400">Abu Dhabi</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span>Day</span>
                <select className="bg-transparent border border-yellow-400 text-yellow-400 px-2 py-1 rounded">
                  <option className="bg-black text-yellow-400">All</option>
                  <option className="bg-black text-yellow-400">Weekdays</option>
                  <option className="bg-black text-yellow-400">Weekends</option>
                </select>
              </div>
            </div>

            {/* Right Side: Icon and Label */}
            <div className="flex items-center gap-2 text-yellow-400">
              <span>Day</span>
              <IoIosFunnel size={20} />
            </div>
          </div>
    <div
      className="w-full max-w-5xl border-2 border-yellow-400 p-4 rounded"
      style={{ backgroundColor: "#013220" }}
      >
      
      {/* Header Row with Chart Type, Day, Filter */}
      <div className="flex justify-between items-center border-b border-[#DDC104] pb-2 mb-4">
        <h2 className="text-xl font-bold text-[#DDC104]">Chart Type:</h2>
        <div className="flex gap-2 items-center">
          <p className="text-sm text-[#DDC104]">Day</p>
          <IoIosFunnel className="text-xl text-[#DDC104] cursor-pointer" />
        </div>
      </div>
      <ReactApexChart options={options} series={series} type="line" height={350} />
      </div>
    </div>
  );
};

export default LineChart;
