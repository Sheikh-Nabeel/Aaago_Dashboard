import React from "react";
import ReactApexChart from "react-apexcharts";

const ServiceSuccessChart = () => {
  const series = [
    {
      data: [85, 70, 45, 90, 40], // Example success rates
    },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 350,
      background: "#013220",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "50%",
        distributed: true,
      },
    },
    colors: ["#DDC104", "#0000FF", "#2ECC71", "#FF0000", "#00CFFF"],
    dataLabels: {
      enabled: false,
      style: {
        colors: ["#FFFFFF"],
      },
    },
    xaxis: {
      categories: [
        "Ride",
        "Recovery",
        "Shifting & Movers",
        "Delivery",
        "Tourism",
      ],
      labels: {
        style: {
          colors: "#FFD700",
        },
      },
      axisBorder: {
        show: true,
        color: "#DDC104",
      },
      axisTicks: {
        show: true,
        color: "#DDC104",
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#FFD700",
        },
      },
    },
    grid: {
      borderColor: "#DDC104",
    },
    tooltip: {
      theme: "dark",
    },
    legend: {
      show: false,
    },
  };

  return (
    <div
      className="w-full max-w-5xl  p-4 rounded"
      style={{ backgroundColor: "#013220" }}
    >
      <h2 className="text-lg font-bold  mb-4">
        Service-Wise Success Rate:
      </h2>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default ServiceSuccessChart;
