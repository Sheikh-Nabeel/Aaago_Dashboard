import React from "react";
import Sidebar from "../../Home/Sidebar";
import LineChart from "./LineChart";
import { FaCar, FaRegClock } from "react-icons/fa";
import SparklineCharts from "./SparklineCharts";
import ReportNavbar from "../ReportNavbar";
import { MdOutlineCarCrash } from "react-icons/md";
import { TbCarCrane } from "react-icons/tb";
import { IoIosFunnel } from "react-icons/io";
import { GrServices } from "react-icons/gr";
import ServiceSuccessChart from "./ServiceSuccessChart";
import PieChartComponent from "./PieChartComponent";

const data = [
  {
    total: "Total Bookings",
    percent: "1,832",
    desc: "Date Range: July 1-Aug 3",
    chartData: [10, 20, 15, 30, 25, 35],
    Icon: FaCar,
  },
  {
    total: "Completed Rides",
    percent: "1,702(93%)",
    chartData: [5, 10, 8, 12, 14, 18],
    Icon: TbCarCrane,
  },
  {
    total: "Cancelled Rides",
    percent: "130(7%)",
    chartData: [20, 18, 16, 14, 12, 10],
    Icon: MdOutlineCarCrash,
  },
  {
    total: "Top Service Type",
    percent: "Ride (68%)",
    chartData: [5, 15, 25, 35, 30, 40],
    Icon: GrServices,
  },
  {
    total: "Peak Usage Time",
    percent: "5–7 PM, Mon–Fri",
    chartData: [40, 35, 30, 25, 20, 15],
    Icon: FaRegClock,
  },
];

const RideServiceReport = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 overflow-hidden">
        <ReportNavbar />
        <div className="mr-10 px-10 pb-6 pt-12 overflow-hidden">
          {/* Filter Bar */}
          <div className="flex flex-wrap justify-between items-center gap-4 pb-6 ">
            <div className="flex flex-wrap items-center gap-4 text-yellow-400 text-sm">
              <div className="flex items-center gap-2">
                <span>Date Range:</span>
                <input
                  type="date"
                  className="bg-transparent border border-yellow-400 text-yellow-400 px-2 py-1 rounded"
                />
                <span>To</span>
                <input
                  type="date"
                  className="bg-transparent border border-yellow-400 text-yellow-400 px-2 py-1 rounded"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 text-yellow-400">
              <span>Day</span>
              <IoIosFunnel size={20} />
            </div>
          </div>

          {/* First Row - One Card */}
          <div className="grid grid-cols-1 mb-6">
            {data.slice(0, 1).map((item, index) => {
              const IconComponent = item.Icon;
              return (
                <div
                  key={index}
                  className="flex flex-col gap-4 shadow-lg rounded-lg px-5 py-5 bg-gradient-to-b from-[#038A59] to-[#013723]"
                >
                  <div className="flex gap-2 items-center">
                    <IconComponent size={30} className="text-yellow-400" />
                    <p className="text-xl font-semibold">{item.total}</p>
                  </div>
                  <h2 className="text-3xl font-bold">{item.percent}</h2>
                  <p className="text-sm text-yellow-400">{item.desc}</p>
                  <SparklineCharts data={item.chartData} />
                </div>
              );
            })}
          </div>

          {/* Second Row - 4 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.slice(1).map((item, index) => {
              const IconComponent = item.Icon;
              return (
                <div
                  key={index}
                  className="flex flex-col gap-4 shadow-lg rounded-lg px-2 py-5 bg-gradient-to-b from-[#038A59] to-[#013723]"
                >
                  <div className="flex gap-2 items-center">
                    <IconComponent size={30} className="text-yellow-400" />
                    <p className="text-md font-bold">{item.total}</p>
                  </div>
                  {index === 2 ? (
                    <div className="flex items-center justify-center ">
                      <h2 className="text-md ">{item.percent}</h2>
                      <div className="flex-1">
                        <PieChartComponent />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-md font-bold">{item.percent}</h2>
                      <SparklineCharts data={item.chartData} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Line Chart */}
          <div className="pt-12">
            <LineChart />
          </div>

          {/* Service Success Chart */}
          <div className="pt-6">
            <ServiceSuccessChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideServiceReport;
