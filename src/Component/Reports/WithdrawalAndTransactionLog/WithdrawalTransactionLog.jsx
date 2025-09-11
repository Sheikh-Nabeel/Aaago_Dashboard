import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Sidebar from "../../Home/Sidebar";
import ReportNavbar from "../ReportNavbar";
import TransactionTable from "./TransactionTable";
import TransactionLineChart from './TransactionLineChart'
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const WithdrawalTransactionLog = () => {
  const data = {
    labels: ["Auto Payouts", "Manual Payouts"],
    datasets: [
      {
        data: [82, 18], // two slices only
        backgroundColor: [ "#FFD700" , "#004d26"], // keep your colors
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // hide legend
      },
      tooltip: {
        enabled: true,
      },
      datalabels: {
        color: "#fff",
        font: {
          size: 12,
          
        },
        formatter: (value, context) => {
          // show label + percentage inside slice
          const label = context.chart.data.labels[context.dataIndex];
          return `${label}\n${value}%`;
        },
        anchor: "center",
        align: "center",
      },
    },
  };

  return (
     <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 overflow-hidden">
            <ReportNavbar />
            <div className="flex justify-between w-1/2 px-6 py-6">
      <h2 className="text-xl font-bold">Payout Distribution</h2>
<div className="flex gap-5">
  <div>
  <input type="radio" name="chartitem" id="" />
<label htmlFor="">Pie Chart</label>
  </div>
  <input type="radio" name="chartitem" id="" />
  <label htmlFor="">Table</label>
</div>
            </div>
      <div style={{ width: "300px", margin: "auto" }}>
        <Pie data={data} options={options} />
      </div>
      <TransactionTable/>
      <TransactionLineChart/>
    </div>
    </div>
    
  );
};

export default WithdrawalTransactionLog;
