import React from 'react';
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";

const  FutureReassignDashTable = () => {
  const tableData = [
    {
      date: '28 Jul 25',
      frompool: 'Loyalty',
    tousecase:'Wallet Boost',
    amount:4000,
    status:'Scheduled',
    admin:'Admin A'

    },
    {
      date: '28 Jul 25',
      frompool: 'Loyalty',
    tousecase:'Wallet Boost',
    amount:4000,
    status:'Scheduled',
    admin:'Admin A'

    },
    
    
  ];

  return (
   <div className="overflow-x-auto max-w-6xl mx-auto mt-8  ">
      
      {/* Header & Filter */}
      <div className=" flex flex-wrap justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-yellow-400">History Table:</h2>

        <div className="flex items-center">
          <span className="text-sm font-medium">Sort By:</span>
         <select name="" id="" className='bg-transparent focus:outline-none'>
            <option value="">Pool</option>
         </select>
        
        </div>
      </div>
      <div className='border border-yellow-400 rounded-lg'>
      <table className="w-full text-left ">
        <thead>
          <tr className="border-b border-yellow-400">
            <th className="text-sm px-4 py-2">Date</th>
            <th className="text-sm px-4 py-2">From Pool</th>
            <th className="text-sm px-4 py-2">To Use Case</th>
            <th className="text-sm px-4 py-2">Amount</th>
            <th className="text-sm px-4 py-2">Status</th>
            <th className="text-sm px-4 py-2">Admin</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index} className="">
              <td className="text-sm px-4 py-2">{item.date}</td>
              <td className="text-sm px-4 py-2">{item.frompool}</td>
              <td className="text-sm px-4 py-2">
               {item.tousecase}
              </td>
              <td className="text-sm px-4 py-2">{item.amount}</td>
              <td className="text-sm px-4 py-2">{item.status}</td>
              <td className="text-sm px-4 py-2">{item.admin}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
     </div>
  );
};

export default FutureReassignDashTable;
