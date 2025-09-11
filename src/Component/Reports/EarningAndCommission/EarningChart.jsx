import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const EarningChart = () => {
  const data = {
    labels: [
      "Driver Incentives",
      "System Maintenance",
      "Marketing",
      "Miscellaneous Ops",
    ],
    datasets: [
      {
        data: [45, 25, 15, 15], // match your proportions
        backgroundColor: ["#FFD700", "#FF0000", "#004d26", "#0000CC"], // same as your image
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // hide legend, we use inside labels
      },
      tooltip: {
        enabled: true,
      },
      datalabels: {
        color: "#fff", // white text inside slices
        font: {
          size: 14,
          weight: "bold",
        },
        formatter: (value, context) => {
          // Show the slice's label instead of value
          return context.chart.data.labels[context.dataIndex];
        },
      },
    },
  };

  return (
    <div className="">
      <h2 className="text-xl font-bold">Company Expenses Chart:</h2>
    <div style={{ width: "400px", margin: "auto" }}>
      <Pie data={data} options={options} />
    </div>
    </div>
  );
};

export default EarningChart;
