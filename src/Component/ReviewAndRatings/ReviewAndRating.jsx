// src/components/ReviewDashboard.jsx
import React from "react";
import PieChart from "./PieChart";
import { LuFlagTriangleRight } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { CiWarning } from "react-icons/ci";
import Sidebar from "../Home/Sidebar";

const ReviewAndRating = () => {
  const data = [
    {
      reviewer: 'Ahmed Ali',
      role: 'Customer',
      rating: 4,
      Reviewtext: 'Great ride',
      target: 'Driver: Asif Khan',
      date: 'Aug 2/25',
    },
    {
      reviewer: 'Sana',
      role: 'Driver',
      rating: 5,
      Reviewtext: 'Very cooperative rider',
      target: 'Customer: Ahmed Ali',
      date: 'Aug 2/25',
    },
    {
      reviewer: 'Zeeshan',
      role: 'Customer',
      rating: 3,
      Reviewtext: 'Average experience',
      target: 'Driver: Bilal',
      date: 'Aug 1/25',
    },
  ];

  return (
    <div className="flex text-yellow-400 min-h-screen overflow-hidden">
      <Sidebar />
      <div className="font-sans w-full max-w-5xl mx-auto px-6 py-10 flex flex-col items-center space-y-10">

        {/* KPI Box */}
        <div className="w-full max-w-2xl mx-auto border border-yellow-400 text-sm">
          <div className="text-center">
            <div className="px-4 py-2 border-b border-yellow-300 font-semibold flex justify-between items-center">
              <p>Average Rating (All Time):</p>
              <span className="flex justify-center items-center gap-1 mt-1">
                ⭐ 4.3 / 5
              </span>
            </div>
            <div className="px-4 py-2 border-b border-yellow-300 font-semibold flex justify-between items-center">
              <p>Total Reviews Received</p>
              <p>12,340</p>
            </div>
            <div className="px-4 py-2 border-b border-yellow-300 font-semibold flex justify-between items-center">
              <p>Reviews This Month</p>
              <span className="mt-1 block">892</span>
            </div>
            <div className="px-4 py-2 border-b border-yellow-300 font-semibold flex justify-between items-center">
              <p>Flagged Reviews</p>
              <span className="mt-1 block">36</span>
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="w-full max-w-5xl">
          <PieChart />
        </div>

        {/* Filters */}
        <div className="w-full max-w-5xl flex flex-col md:flex-row md:items-center justify-end gap-4 text-sm">
          <div className="flex items-center gap-2">
            <label htmlFor="from" className="font-medium">
              Date Range:
            </label>
            <input
              type="date"
              id="from"
              className="bg-transparent border border-yellow-300 p-1 rounded"
              defaultValue="2025-07-18"
            />
            <span>To</span>
            <input
              type="date"
              id="to"
              className="border border-yellow-300 bg-transparent p-1 rounded"
              defaultValue="2025-07-21"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="role" className="font-medium mr-2">
              Role:
            </label>
            <select id="role" className="bg-transparent bg-[#013220] focus:outline-none border border-yellow-300 p-1 rounded text-yellow-400">
              <option>Driver</option>
              <option>Customer</option>
            </select>
          </div>
        </div>

        {/* Review Table */}
        <div className="w-full max-w-5xl border border-yellow-400 rounded-xl overflow-x-auto text-sm">
          <table className="min-w-full text-left">
            <thead className="text-yellow-300">
              <tr>
                <th className="p-3">Reviewer</th>
                <th className="p-3">Role</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Review Text</th>
                <th className="p-3">Target</th>
                <th className="p-3">Date</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={idx} className="border-t border-yellow-400">
                  <td className="p-3">{item.reviewer}</td>
                  <td className="p-3">{item.role}</td>
                  <td className="p-3">{'⭐'.repeat(item.rating)}</td>
                  <td className="p-3">{item.Reviewtext}</td>
                  <td className="p-3">{item.target}</td>
                  <td className="p-3">{item.date}</td>
                  <td className="p-3">
                    <div className="flex gap-2 items-center">
                      {item.role == 'Customer' ? (
                        <CiWarning size={25} className="border border-yellow-300 rounded-full p-1 text-yellow-300" />
                      ) : (
                        <LuFlagTriangleRight size={25} className="text-yellow-300 border border-yellow-300 rounded-full p-1" />
                      )}
                      <button className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-300 text-xs">
                        View
                      </button>
                      <MdDelete size={25} className="border border-yellow-300 rounded-full p-1 cursor-pointer" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default ReviewAndRating;
