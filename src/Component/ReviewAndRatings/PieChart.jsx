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

const PieChart = () => {
  const data = {
    labels: [
      "⭐ 1-Star: 2%",
      "⭐ 2-Star: 3%",
      "⭐ 3-Star: 5%",
      "⭐ 4-Star: 20%",
      "⭐ 5-Star: 70%"
    ],
    datasets: [
      {
        data: [10, 10, 10, 20, 10], // your rating percentages
        backgroundColor: [
          "#99ff66", // 1-Star
          "#0000cc", // 2-Star
          "#003340", // 3-Star
          "#ff0000", // 4-Star
          "#ffcc00"  // 5-Star
        ],
        borderWidth: 0
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false // hide default legend
      },
      tooltip: {
        enabled: true
      },
      datalabels: {
        color: "#fff",
        font: {
          size: 10,
         
        },
        textStrokeColor: "#000", // black outline for readability
        textStrokeWidth: 3,
        formatter: (value, context) => {
          return context.chart.data.labels[context.dataIndex];
        }
      }
    }
  };

  return (
    <div className="p-4 rounded-lg">
      <h2 className="text-xl font-bold text-yellow-400 mb-4">
       PieChart
      </h2>
      <div style={{ width: "300px", margin: "auto" }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
