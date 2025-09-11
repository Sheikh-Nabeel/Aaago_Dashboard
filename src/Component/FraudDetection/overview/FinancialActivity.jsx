import React from 'react'
import { FiEdit } from 'react-icons/fi';
import { FaCheck } from "react-icons/fa";

const data = [
    {
        date:'24-Jul',
        type:'Top-up',
        method:'Credit Card',
        amount:1000,
    },
    {
        date:'24-Jul',
        type:'Top-up',
        method:'Credit Card',
        amount:1000,
    },
    {
        date:'24-Jul',
        type:'Top-up',
        method:'Credit Card',
        amount:1000,
    },
    {
        date:'24-Jul',
        type:'Top-up',
        method:'Credit Card',
        amount:1000,
    },
    {
        date:'24-Jul',
        type:'Top-up',
        method:'Credit Card',
        amount:1000,
    },
    {
        date:'24-Jul',
        type:'Top-up',
        method:'Credit Card',
        amount:1000,
    },

];
const FinancialActivity = () => {
  return (
    <div>
         {/* History Table with Scrollbar inside tbody */}
<div className="flex justify-center items-center px-4">
  <div className="w-full max-w-3xl">
    <div className="border border-yellow-300 rounded-lg overflow-hidden">
      <div className="w-full">
        <table className="w-full text-sm text-left table-fixed">
          <thead className="">
            <tr className="border-b border-yellow-300">
              <th className="px-4 py-2 w-1/4">Date</th>
              <th className="px-4 py-2 w-1/4">Type</th>
              <th className="px-4 py-2 w-1/4">Method</th>
              <th className="px-4 py-2 w-1/4">Amount</th>
              <th className="px-4 py-2 w-1/4">Flag</th>
            </tr>
          </thead>
        </table>
        <div className="max-h-[240px] overflow-y-auto scrollbar scrollbar-thumb-yellow-400 scrollbar-track-yellow-100">
          <table className="w-full text-sm text-left table-fixed">
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="border-b border-yellow-200">
                  <td className="px-4 py-4 w-1/4">{item.date}</td>
                  <td className="px-4 py-4 w-1/4">{item.type}</td>
                  <td className="px-4 py-4 w-1/4">{item.method}</td>
                  <td className="px-4 py-4 w-1/4">{item.amount}</td>
                  <td className="px-4 py-4 w-1/4">
                    <button><FaCheck size={20} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default FinancialActivity