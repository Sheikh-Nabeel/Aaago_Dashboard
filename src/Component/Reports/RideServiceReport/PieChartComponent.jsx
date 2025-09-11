import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// Plugin to draw rotated labels inside sectors
const rotatedLabelsPlugin = {
  id: "rotatedLabels",
  afterDraw(chart) {
    const {
      ctx,
      chartArea: { width, height }
    } = chart;
    const meta = chart.getDatasetMeta(0);
    const dataset = chart.data.datasets[0];
    const labels = chart.data.labels;
    const total = dataset.data.reduce((a, b) => a + b, 0);

    ctx.save();
    ctx.font = " 2px sans-serif";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    meta.data.forEach((arc, i) => {
      const { startAngle, endAngle, innerRadius, outerRadius } = arc;
      const midAngle = (startAngle + endAngle) / 2;

      // Position text at middle radius
      const r = (innerRadius + outerRadius) / 2;
      const x = width / 2 + Math.cos(midAngle) * r;
      const y = height / 2 + Math.sin(midAngle) * r;

      ctx.translate(x, y);
      ctx.rotate(midAngle);

      const percent = Math.round((dataset.data[i] / total) * 100);
      ctx.fillText(`${labels[i]} ${percent}%`, 0, 0);

      ctx.rotate(-midAngle);
      ctx.translate(-x, -y);
    });

    ctx.restore();
  }
};

const PieChartComponent = () => {
  const data = {
    labels: ["Ride", "Recovery", "Shifting&Movers", "Delivery", "Tourism"],
    datasets: [
      {
        data: [68, 40, 30, 20, 20],
        backgroundColor: [
          "#FFD700", // Ride
          "#FF0000", // Recovery
          "#004d26", // Shifting & Movers
          "#0000CC", // Delivery
          "#66FF66"  // Tourism
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  return (
    <div style={{ width: "80px", margin: "auto" }}>
      <Pie data={data} options={options} plugins={[rotatedLabelsPlugin]} />
    </div>
  );
};

export default PieChartComponent;
