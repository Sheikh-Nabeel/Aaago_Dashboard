import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { PiFlagPennantLight } from "react-icons/pi";
import FraudDetectNav from "../FraudDetectNav";
import Sidebar from "../../Home/Sidebar";


const data = [
  {
    id: 'U-001',
   name:"Alice-Smith",
role:'Driver',
    flagtype:'Multiple\nCancels',
   Score: "72",
    LastActivity: "18/July/25/9:AM",
    status: "Auto Locked",
  },
  {
    id: 'U-001',
   name:"Alice-Smith",
role:'Driver',
    flagtype:'Multiple\nCancels',
   Score: "72",
    LastActivity: "18/July/25/9:AM",
    status: "Auto Locked",
  },

 
];

const OverView = () => {
 
  return (
   <div className="flex min-h-screen  ">
        <Sidebar />
  
        <div className="flex-1">
          <FraudDetectNav />
{/* Date range and sort */}
        <div className="flex items-center justify-end gap-2 flex-wrap py-2">
           <label className="flex items-center space-x-2">
             <div className="text-xs flex items-center gap-1"><span>Date Range:</span></div>
             <input
               type="date"
               className="bg-transparent rounded border py-1  border-yellow-300  text-yellow-300 focus:outline-none text-xs"
             />
           </label>
 
           <span className="text-xs pr-3">To</span>
 
           <label className="flex items-center space-x-2">
             <div className="text-xs flex items-center gap-1"> <span>Date:</span></div>
             <input
               type="date"
               className="bg-transparent rounded py-1 text-xs  border border-yellow-300 text-yellow-300 focus:outline-none"
             />
           </label>
           <label htmlFor="" className="text-xs ">Sort By</label>
           <select name="" id="" className="bg-[#013220]  text-xs focus:outline-none">
            <option value="pending">Pending</option>
            <option value="pending">accepted</option>
           </select>
         </div>
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="border-b border-yellow-200 ">
            <th className="px-3 py-3">ID</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Role
               <select className="bg-[#013220] text-xs focus:outline-none">
                <option value="">User</option>
                <option value="">Driver</option>
                <option value="">Both</option>
              </select>
            </th>
            <th className="px-4 py-3">
              Flag Type
               <select className="bg-[#013220] text-xs focus:outline-none">
                <option value="multiple">Booking</option>
                <option value="cancel">Financial</option>
                <option value="cancel">KYC</option>
                <option value="cancel">Driver</option>
                <option value="cancel">Referral</option>
                <option value="cancel">Geo</option>
              </select>
            </th>
            <th className="px-4 py-3">Score</th>
            <th className="px-4 py-3">Last Activity</th>
            <th className="px-4 py-3">
              Status
              <select className=" bg-[#013220] text-xs focus:outline-none">
               
                <option value="active">Auto Locked</option>
                <option value="non-active">Locked</option>
              </select>
            </th>
            <th className="px-4 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="px-3 py-3">{item.id}</td>
              <td className="px-4 py-3">{item.name}</td>
              <td className="px-4 py-3 ">{item.role}</td>
              <td className="px-4 py-3 whitespace-pre-line">{item.flagtype}</td>
              <td className="px-4 py-3">{item.Score}</td>
              <td className="px-4 py-3">{item.LastActivity}</td>
              <td className="px-4 py-3">{item.status}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2 justify-center items-center">
                 <Link to={`/fraudprofile/${item.id}`} className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-medium hover:bg-yellow-300">
                 View Detail 
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
    </div>
  );
};

export default OverView;
