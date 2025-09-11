import React from "react";
import ReactApexChart from "react-apexcharts";

const SparklinesCharts = ({ data }) => {
  const options = {
    chart: {
      type: "area",
      sparkline: { enabled: true },
    },
    stroke: {
      curve: "smooth",
      width: 2
    },
    colors: ['#FACC15'], // ✅ Yellow stroke line
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.05,
        stops: [0, 90, 100],
        colorStops: [
          {
            offset: 0,
            color: '#FACC15', // ✅ Start with yellow
            opacity: 0.4
          },
          {
            offset: 100,
            color: '#FACC15', // ✅ End with yellow
            opacity: 0.05
          }
        ]
      }
    },
    markers: {
      size: 0
    },
    tooltip: {
      enabled: false
    }
  };

  const series = [
    {
      name: "Trend",
      data: data || [10, 20, 15, 25, 20, 30]
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

export default SparklinesCharts;
