// src/components/Dashboard.js
import React from "react";
import Sidebar from "../../Home/Sidebar";
import ReportNavbar from "../ReportNavbar";
import ReactApexChart from "react-apexcharts";
import { GoArrowDownRight } from "react-icons/go";
import { PiMoneyLight } from "react-icons/pi";
import EarningAndChart from "./EarningChart";
import EarningTable from "./EarningTable";

const EarningAndCommission = () => {
  const kpis = [
    { name: "Total Revenue", value: "AED 1,500,000" },
    { name: "AAAO Earnings (15%)", value: "AED 225,000" },
    { name: "Driver Earnings (85%)", value: "AED 1,275,000" },
    { name: "Service Provider Commissions", value: "AED 95,000" },
  ];

  // Only one red line
  const series = [
    {
      name: "New Bookings",
      data: [60, 50, 90, 40, 60, 30, 20],
    },
  ];

  const options = {
    chart: {
      type: "line",
      height: 350,
      background: "#013220",
      toolbar: { show: false },
    },
    stroke: {
      curve: "straight",
      width: 3,
    },
    colors: ["#FF0000"], // Red line
    xaxis: {
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      axisBorder: { show: true, color: "#DDC104" },
      axisTicks: { show: true, color: "#DDC104" },
      labels: { style: { colors: "#FFFFFF" } },
    },
    yaxis: {
      axisBorder: { show: true, color: "#DDC104" },
      axisTicks: { show: true, color: "#DDC104" },
      labels: { style: { colors: "#FFFFFF" } },
    },
    grid: {
      borderColor: "#DDC104",
      strokeDashArray: 0,
    },
    legend: {
      show: false, // No legend for single line
    },
    markers: {
      size: 5,
    },
    tooltip: {
      theme: "dark",
    },
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 overflow-hidden">
        <ReportNavbar />
        <div className="p-6 space-y-6">
          {/* KPI Table */}
          <div className="w-full md:w-1/2 mx-auto rounded-lg overflow-hidden border border-yellow-300">
            <table className="w-full">
              <thead>
                <tr className="border-b border-yellow-300">
                  <th className="text-left px-4 py-2">KPI</th>
                  <th className="text-left px-4 py-2">Value</th>
                </tr>
              </thead>
              <tbody>
                {kpis.map((item, idx) => (
                  <tr key={idx} className="border-b border-yellow-300">
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Team Earnings */}
          <div className="text-lg font-semibold text-yellow-300">
            Team Earnings: AED 78,000
          </div>

          {/* Apex Red Line Chart */}
          <div
            className="p-4 rounded-lg  w-3/4 mx-auto border border-yellow-400"
            style={{ backgroundColor: "#013220" }}
          >
            <ReactApexChart options={options} series={series} type="line" height={350} />
          </div>

         {/* Withdrawals Box */}
<div className="shadow-xl shadow-black  bg-gradient-to-r from-[#013526] to-[#008d67] py-6 px-8 rounded-xl w-full max-w-2xl mx-auto">
  <h3 className="gap-3 text-3xl font-semibold mb-4 flex px-4">
    <PiMoneyLight size={30}/> Withdrawals: Today vs Yesterday
  </h3>

  <div className="space-y-4 mt-6">
    <div className="flex gap-6 px-10">
      <span className="w-28 font-semibold">Today:</span>
      <p className="font-semibold">AED 18,000</p>
    </div>
    <div className="flex gap-6 px-10">
      <span className="w-28 font-semibold">Yesterday:</span>
      <p className="font-semibold">AED 24,000</p>
    </div>
    <div className="flex gap-6 px-10 font-semibold">
      <span className="w-28 font-semibold">Change:</span>
      <span className="text-red-500 flex items-center gap-1">
        <GoArrowDownRight /> -25%
      </span>
    </div>
  </div>
</div>
<EarningTable/>
<EarningAndChart/>

        </div>
      </div>
    </div>
  );
};

export default EarningAndCommission;
