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

const PaeChart = () => {
  const data = {
    labels: ["CRR", "Ambassador", "Platinum" , ""],
    datasets: [
      {
        data: [20, 40, 15,60], // Adjust slice proportions
        backgroundColor: ["#FFD700", "#00FF00", "#FF0000", "#174332" ],
        borderWidth: 0,
        borderColor: [
          "rgba(255, 215, 0, 1)", // Gold border
          "rgba(255, 215, 0, 1)",
          "rgba(255, 215, 0, 1)"
        ],
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
      datalabels: {
        color: "#000",
        font: { size: 10, weight: "bold" },
        formatter: (value, context) => {
          return context.chart.data.labels[context.dataIndex];
        },
      },
    },
    layout: {
      padding: 20
    }
  };

  return (
    <div
      style={{
       
        padding: "20px",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center"
      }}
    >
      <div style={{ width: "300px" }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default PaeChart;
