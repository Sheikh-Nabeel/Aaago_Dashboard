import React from "react";
import Sidebar from "../../Home/Sidebar";
import ReportNavbar from "../ReportNavbar";
import { Link } from "react-router-dom";

function CustomReportGenerator() {
  return (
      <div className="flex bg-[#13220] min-h-screen">
      <Sidebar />
      <div className="flex-1 overflow-hidden">
        <ReportNavbar/>
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-5xl space-y-6">
        {/* Title */}
        <h2 className="text-yellow-400 font-medium">Build Your Custom Report</h2>

        {/* User Type */}
        <select className="w-full border border-yellow-400 text-yellow-400 bg-transparent rounded-full px-4 py-3 outline-none">
          <option value="" className="bg-[#003328]">User Type</option>
          <option value="admin" className="bg-[#003328]">Admin</option>
          <option value="customer" className="bg-[#003328]">Customer</option>
        </select>

        {/* Date Range */}
        <div className="flex items-center gap-4 justify-center">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">From</span>
            <input
              type="date"
              className="border border-yellow-400 text-yellow-400 bg-transparent rounded-full px-6 py-2 outline-none w-40 text-center"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">To</span>
            <input
              type="date"
              className="border border-yellow-400 text-yellow-400 bg-transparent rounded-full px-6 py-2 outline-none w-40 text-center"
            />
          </div>
        </div>

        {/* City */}
        <select className="w-full border border-yellow-400 text-yellow-400 bg-transparent rounded-full px-4 py-3 outline-none">
          <option value="" className="bg-[#003328]">City</option>
          <option value="newyork" className="bg-[#003328]">New York</option>
          <option value="london" className="bg-[#003328]">London</option>
        </select>

        {/* Category */}
        <select className="w-full border border-yellow-400 text-yellow-400 bg-transparent rounded-full px-4 py-3 outline-none">
          <option value="" className="bg-[#003328]">Category</option>
          <option value="food" className="bg-[#003328]">Food</option>
          <option value="travel" className="bg-[#003328]">Travel</option>
        </select>

        {/* Button */}
        <div className="text-center">
          <Link to={'/customreporttable'} className="bg-yellow-400 text-[#003328] font-medium px-6 py-2 rounded-full hover:bg-yellow-500 transition">
            Generate Report
          </Link>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}

export default CustomReportGenerator;
