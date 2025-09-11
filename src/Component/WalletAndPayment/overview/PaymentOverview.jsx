import React from "react";
import PaeChart from "./PaeChart";
import Sidebar from "../../Home/Sidebar";
import WalletPaymentNavbar from "../WalletPaymentNavbar";
import SparklinesCharts from "./SparklinesCharts";

const data = [
  {
    total: "Total Wallets",
    percent: "1,250",
    chartData: [12, 18, 15, 22, 28, 35],
  },
  {
    total: "Total Balance",
    percent: "AED 1,650,000",
    chartData: [150, 200, 170, 300, 280, 320],
  },
  {
    total: "Pending Withdrawals",
    percent: "AED 82,500",
    chartData: [20, 25, 18, 30, 26, 40],
  },
  {
    total: "Frozen Wallets",
    percent: "27 Accounts",
    chartData: [5, 10, 8, 14, 12, 15],
  },
];

const PaymentOverview = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <WalletPaymentNavbar />

        <div className="text-[#DDC104] p-6 overflow-y-auto">
          <div className="flex justify-end pb-4">
            <label className="text-sm text-[#DDC104] mr-2">Sort By:</label>
            <select className="bg-transparent text-[#DDC104] text-sm focus:outline-none">
              <option value="monthly" className="bg-yellow-400 text-black">
                Monthly
              </option>
              <option value="weekly" className="bg-yellow-400 text-black">
                Weekly
              </option>
              <option value="yearly" className="bg-yellow-400 text-black">
                Yearly
              </option>
            </select>
          </div>

          <div className="w-full max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 shadow-lg rounded-lg outline outline-black/20 px-5 py-5 bg-gradient-to-b from-[#038A59] to-[#013723] shadow-black/80"
              >
                <div className="flex flex-col w-full">
                  <p className="text-lg font-semibold tracking-wide mt-2">
                    {item.total}
                  </p>
                </div>
                <h2 className="text-3xl font-bold">{item.percent}</h2>
                <SparklinesCharts data={item.chartData} />
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center items-center">
            <PaeChart />
            <div className="py-4 border border-yellow-300 rounded-xl ">
              <div className="border-b border-yellow-300">
                <h3 className="text-center px-4">CRR</h3>
              </div>
              <div className="flex flex-col gap-6 px-6 py-4">
                <div className="flex justify-between gap-4">
                  <p>Amount:</p>
                  <span>AED 45,000</span>
                </div>
                <div className="flex gap-8">
                  <p>%age:</p>
                  <span>12%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOverview;
