import React from "react";
import Chart from "react-apexcharts";

const MyLineChart = () => {
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
    colors: ["#FF0000", "#0000FF"], // Red, Blue
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
          colors: "#DDC104",
        },
      },
    },
    yaxis: {
      min: 500, // start from 500
      max: 2000, // adjust if needed
      tickAmount: 3, // will create 500, 1000, 1500, 2000
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
          colors: "#DDC104",
        },
      },
    },
    grid: {
      borderColor: "#DDC104",
      strokeDashArray: 0, // solid grid lines
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

  const series = [
    {
      name: "Wallet Deductions",
      data: [800, 1200, 1500, 1800, 1000, 1600, 500],
    },
    {
      name: "Wallet Top-Ups",
      data: [1500, 1000, 1300, 1700, 900, 1400, 700],
    },
  ];

  return (
    <div className="bg-[#013220] p-4 rounded-lg">
      <h2 className="mb-4 text-xl font-semibold">Weekly Rides Overview</h2>
      <div className="flex justify-end">
       <div className="flex items-center text-sm gap-2">
              <span>Date Range :</span>
              <input
                type="date"
                value=""
                readOnly
                className="bg-[#013A2A] border border-yellow-400 text-yellow-400 px-2 py-1 rounded-md w-28"
              />
              <span>To</span>
              <input
                type="date"
                value=""
                readOnly
                className="bg-[#013A2A] border border-yellow-400 text-yellow-400 px-2 py-1 rounded-md w-28"
              />
            </div>
            <div className="flex items-center text-sm pr-6">
              <span>Transaction Type:</span>
              <select className="bg-transparent focus:outline-none">
                <option value="">Top-Ups</option>
                <option value="">Deduction</option>
              </select>
            </div>
             </div>
      <div className="border border-yellow-300 rounded-xl ">
        <h2 className="border-b border-yellow-300 px-4 py-6 font-semibold text-lg">Chart Type </h2>
      <Chart options={options} series={series} type="line" height={350} />

      </div>
    </div>
  );
};

export default MyLineChart;
