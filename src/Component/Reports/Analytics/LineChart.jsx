import React from "react";
import ReactApexChart from "react-apexcharts";
import { IoIosFunnel } from "react-icons/io"; // Filter icon

const LineChart = ({ chartData, period, onPeriodChange }) => {
  // Default data if no chartData provided
  const defaultSeries = [
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

  const defaultLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Process API data
  const series = chartData?.datasets ? chartData.datasets.map(dataset => ({
    name: dataset.label,
    data: dataset.data,
  })) : defaultSeries;

  const labels = chartData?.labels || defaultLabels;

  // Color mapping for datasets
  const getColorForDataset = (datasetName) => {
    const colorMap = {
      "Total Signups": "#DDC104",
      "KYC Verifications": "#00FF66", 
      "Active Conversions": "#3B3BFF"
    };
    return colorMap[datasetName] || "#DDC104";
  };

  const colors = series.map(s => getColorForDataset(s.name));

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
    colors: colors,
    xaxis: {
      categories: labels,
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
      {/* Header Row with Chart Type, Period Filter */}
      <div className="flex justify-between items-center border-b border-[#DDC104] pb-2 mb-4">
        <h2 className="text-xl font-bold text-[#DDC104]">Analytics Chart</h2>
        <div className="flex gap-2 items-center">
          <select
            value={period || 'year'}
            onChange={(e) => onPeriodChange && onPeriodChange(e.target.value)}
            className="bg-transparent border border-[#DDC104] text-[#DDC104] px-2 py-1 rounded text-sm focus:outline-none"
          >
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
          <IoIosFunnel className="text-xl text-[#DDC104] cursor-pointer" />
        </div>
      </div>

      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default LineChart;
