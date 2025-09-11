import React from "react";
import { IoEyeOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import Sidebar from '../Home/Sidebar'
import CareerNavbar from "./CareerNavbar";
const data = [
  {
    id: 1,
    driver: "Allice Smith",
    owner: "Smith",
    vehicle: "Control",
    type: "Rental",
    date: "18/July/25",
    status: "Active",
  },
  {
    id: 1,
    driver: "Allice Smith",
    owner: "Smith",
    vehicle: "Control",
    type: "Rental",
    date: "18/July/25",
    status: "Active",
  },
];

const ProposalManagement = () => {
 

  return (
    <div className="flex">
      <Sidebar/>
      <div className="flex-1 flex flex-col">
      <div className=" border-b border-yellow-300">

         <CareerNavbar/>
      </div>
      {/* date range and sort */}
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
            <th className="px-4 py-3">Driver</th>
            <th className="px-4 py-3">Owner</th>
            <th className="px-4 py-3">Vehicle</th>
            <th className="px-4 py-3">
              Type
              <select className="bg-[#013220] text-xs focus:outline-none">
    
                <option value="">Rental</option>
                <option value="">Salaried</option>
                <option value="">%</option>
              </select>
            </th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">
              Status
              <select className=" bg-[#013220] text-xs focus:outline-none">
               
                <option value="active">Active</option>
                <option value="non-active">pending</option>
              </select>
            </th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="px-3 py-3">00{item.id}</td>
              <td className="px-4 py-3">{item.driver}</td>
              <td className="px-4 py-3">{item.owner}</td>
              <td className="px-4 py-3">{item.vehicle}</td>
              <td className="px-4 py-3">{item.type}</td>
              <td className="px-4 py-3">{item.date}</td>
              <td className="px-4 py-3">{item.status}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2 justify-center items-center">
                     <button className="text-yellow-400 border rounded-full px-1 py-1 border-yellow-400  hover:text-yellow-300">
                    <IoEyeOutline size={15} />
                  </button>
                  <button className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-medium hover:bg-yellow-300">
                    Approve
                  </button>
                  <button className="bg-yellow-400  px-3 py-1 rounded-full text-xs font-medium hover:bg-yellow-300 text-black">
                    Reject
                  </button>
                 
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

export default ProposalManagement;
