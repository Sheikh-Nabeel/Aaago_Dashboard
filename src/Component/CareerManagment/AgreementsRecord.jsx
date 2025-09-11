import React from "react";
import { IoEyeOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { PiFlagPennantLight } from "react-icons/pi";
import Sidebar from "../Home/Sidebar";
import CareerNavbar from "./CareerNavbar";

const data = [
  {
    id: 1,
    proposalId: "PR-001",
    parties: "Smith Jey &\nJoy Stick",
    type: "Rental",
    date: "18/July/25",
    status: "Pending",
    download: "Download",
    cancel: "Cancel",
  },
  {
    id: 2,
    proposalId: "PR-002",
    parties: "Smith Jey &\nJoy Stick",
    type: "Rental",
    date: "18/July/25",
    status: "Pending",
  },
];

const AgreementRecord = () => {
  

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navigation Tabs */}
       <CareerNavbar/>

        {/* Filters */}
        <div className="flex items-center justify-end gap-2 flex-wrap py-2">
          <label className="flex items-center space-x-2">
            <span className="text-xs">Date Range:</span>
            <input
              type="date"
              className="bg-transparent rounded border py-1 border-yellow-300 text-yellow-300 focus:outline-none text-xs"
            />
          </label>

          <span className="text-xs">To</span>

          <label className="flex items-center space-x-2">
            <span className="text-xs">Date:</span>
            <input
              type="date"
              className="bg-transparent rounded py-1 text-xs border border-yellow-300 text-yellow-300 focus:outline-none"
            />
          </label>

          <label className="text-xs">Sort By</label>
          <select className="bg-[#013220] text-xs focus:outline-none border border-yellow-300 text-yellow-300">
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-yellow-300">
                <th className="px-3 py-3">ID</th>
                <th className="px-4 py-3">Proposal ID</th>
                <th className="px-4 py-3">Parties</th>
                <th className="px-4 py-3">
                  Type
                  <select className="bg-[#013220] text-xs focus:outline-none ml-1">
                    <option value="">Rental</option>
                    <option value="">Salaried</option>
                    <option value="">%</option>
                  </select>
                </th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">
                  Status
                  <select className="bg-[#013220] text-xs focus:outline-none ml-1">
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                  </select>
                </th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="">
                  <td className="px-3 py-3">00{item.id}</td>
                  <td className="px-4 py-3">{item.proposalId}</td>
                  <td className="px-4 py-3 whitespace-pre-line">
                    {item.parties}
                  </td>
                  <td className="px-4 py-3">{item.type}</td>
                  <td className="px-4 py-3">{item.date}</td>
                  <td className="px-4 py-3">{item.status}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-center items-center">
                      <button className="text-yellow-400 border rounded-full px-1 py-1 border-yellow-400 hover:text-yellow-300">
                        <IoEyeOutline size={15} />
                      </button>
                      <button className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-medium hover:bg-yellow-300">
                        Download
                      </button>
                      <button className="bg-yellow-400 px-3 py-1 rounded-full text-xs font-medium hover:bg-yellow-300 text-black">
                        Cancel
                      </button>
                      <button className="text-yellow-400 border rounded-full px-1 py-1 border-yellow-400 hover:text-yellow-300">
                        <PiFlagPennantLight size={15} />
                      </button>
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

export default AgreementRecord;
