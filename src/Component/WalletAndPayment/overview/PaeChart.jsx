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

const PaeChart = ({ labels = [], values = [] }) => {
  const safeLabels = Array.isArray(labels) && labels.length ? labels : ["CRR", "Ambassador", "Platinum"];
  const safeValues = Array.isArray(values) && values.length ? values : [20, 40, 15];
  const palette = [
    "#DDC104", "#00C292", "#FF6B6B", "#4C6EF5", "#F59E0B", "#10B981",
    "#EF4444", "#6366F1", "#22C55E", "#F97316", "#14B8A6", "#84CC16"
  ];
  const colors = safeLabels.map((_, i) => palette[i % palette.length]);

  const data = {
    labels: safeLabels,
    datasets: [
      {
        data: safeValues,
        backgroundColor: colors,
        borderWidth: 0,
        hoverOffset: 8,
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
        formatter: (value, context) => context.chart.data.labels[context.dataIndex],
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
