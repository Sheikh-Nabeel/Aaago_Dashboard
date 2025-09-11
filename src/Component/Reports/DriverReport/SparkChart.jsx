import React from "react";
import ReactApexChart from "react-apexcharts";

const SparkChart = ({ data }) => {
  const options = {
    chart: {
      type: "area",
      sparkline: { enabled: true },
    },
    colors: ['#FFD700'], // Yellow color
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.05,
        stops: [0, 90, 100],
        colorStops: [
          {
            offset: 0,
            color: '#FFD700',
            opacity: 0.4,
          },
          {
            offset: 100,
            color: '#FFD700',
            opacity: 0.05,
          },
        ]
      }
    },
    markers: {
      size: 0,
    },
    tooltip: {
      enabled: false,
    }
  };

  const series = [
    {
      name: "Trend",
      data: data || [10, 15, 12, 18, 20, 17, 25],
    }
  ];

  return (
    <div className="w-full">
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={40}
      />
    </div>
  );
};

export default SparkChart;
