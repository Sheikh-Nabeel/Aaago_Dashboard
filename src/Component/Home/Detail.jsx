import React from "react";
import SparklineChart from "./SparklineChart";
import { GiTowTruck } from "react-icons/gi";
import { FaUserTie } from "react-icons/fa6";
import { FiUserCheck } from "react-icons/fi";
import { FaMoneyBillWave } from "react-icons/fa";
// import { useGetPendingKYCsQuery } from "../features/service/apiSlice";
import { useSelector } from "react-redux";
import { useGetPendingKYCsQuery } from "../../features/service/apiSlice";

const data = [
  {
    total: "Total Booking",
    percent: "0", // Replace with dynamic data if needed
    icon: GiTowTruck,
    chartData: [5, 10, 8, 12, 15],
  },
  {
    total: "Active Driver",
    percent: "0", // Replace with dynamic data if needed
    icon: FaUserTie,
    chartData: [2, 6, 4, 8, 10],
  },
  {
    total: "Total Revenue",
    percent: 0, // Replace with dynamic data if needed
    icon: FaMoneyBillWave,
    chartData: [20, 25, 22, 30, 28],
  },
  {
    total: "Pending Approvals",
    percent: "Loading...", // Initial value, updated dynamically
    icon: FiUserCheck,
    chartData: [1, 3, 2, 4, 5], // Placeholder, replace with real data if available
  },
];

const Detail = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const {
    data: pendingKYCs,
    isLoading,
    error,
  } = useGetPendingKYCsQuery(undefined, {
    skip: !isAuthenticated || !user || user.role !== "admin", // Skip query if not admin
  });

  // Update the Pending Approvals data with the fetched total
  const updatedData = data.map((item) => {
    if (item.total === "Pending Approvals") {
      return {
        ...item,
        percent: isLoading
          ? "Loading..."
          : error
          ? "Error"
          : pendingKYCs?.totalPending || "0",
      };
    }
    return item;
  });

  return (
    <div className="text-[#DDC104] mr-10 px-10 py-8">
      <div className="flex justify-end pb-1">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
        {updatedData.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex flex-col gap-4 shadow-lg rounded-lg outline outline-black/20 pl-5 pt-5 bg-gradient-to-b from-[#038A59] to-[#013723] shadow-black/80"
            >
              <div className="flex gap-2 items-center">
                <Icon className="text-4xl" />
                <p className="text-xl font-bold m-0 tracking-wide">
                  {item.total}
                </p>
              </div>
              <h2 className="text-3xl font-bold">{item.percent}</h2>

              {/* Chart */}
              <div className="w-full pr-5 pb-5">
                <SparklineChart data={item.chartData} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Detail;
