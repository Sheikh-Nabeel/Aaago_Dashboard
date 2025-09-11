import React from 'react';
import { IoIosArrowRoundForward } from "react-icons/io";

const TransferHistoryTable = () => {
  const tableData = [
    {
      date: '29 Jul "25"',
      admin: 'Admin_01',
      from: 'CRR',
      to: 'Loyalty',
      amount: 'AED 5,000',
      reason: 'Balance shift for\nrewards',
    },
    {
      date: '29 Jul "25"',
      admin: 'Admin_02',
      from: 'Loyalty',
      to: 'CRR',
      amount: 'AED 3,000',
      reason: 'Manual adjustment\non error',
    },
  ];

  return (
   <div className="overflow-x-auto max-w-6xl mx-auto mt-8 ">
      
      {/* Header & Filter */}
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-yellow-400">Transfer History:</h2>

        <div className="flex items-center">
          <span className="text-sm font-medium">Sort By:</span>
          <select
            className="bg-transparent  text-sm  focus:outline-none"
          >
            <option>Admin</option>
            <option>User</option>
          </select>
        </div>
      </div>
      <div className='border border-yellow-400'>
      <table className="w-full text-left ">
        <thead>
          <tr className="border-b border-yellow-400">
            <th className="text-sm px-4 py-2">Date</th>
            <th className="text-sm px-4 py-2">Admin</th>
            <th className="text-sm px-4 py-2">From <IoIosArrowRoundForward className="inline" /> To</th>
            <th className="text-sm px-4 py-2">Amount</th>
            <th className="text-sm px-4 py-2 text-center">Reason</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index} className="">
              <td className="text-sm px-4 py-2">{item.date}</td>
              <td className="text-sm px-4 py-2">{item.admin}</td>
              <td className="text-sm px-4 py-2">
                <div className="flex items-center gap-1">
                  <span>{item.from}</span>
                  <IoIosArrowRoundForward />
                  <span>{item.to}</span>
                </div>
              </td>
              <td className="text-sm px-4 py-2">{item.amount}</td>
              <td className="text-sm px-4 py-2 whitespace-pre-line text-center">{item.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
     </div>
  );
};

export default TransferHistoryTable;
