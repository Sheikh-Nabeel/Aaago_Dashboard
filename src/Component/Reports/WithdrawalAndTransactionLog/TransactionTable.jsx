import React from 'react'
import { LuRefreshCcw } from "react-icons/lu";
import { LuFlagTriangleRight } from "react-icons/lu";

const sampleData = [
    {
 user:'Sara',
  transactionid: "TXN-9812",
 reason: "Insufficient balance",
 date: "Aug 4",
 status:'Failed'
},
    {
 user:'Sara',
  transactionid: "TXN-9812",
 reason: "Insufficient balance",
 date: "Aug 4",
 status:'Failed'
},

]
const TransactionTable = () => {
  return (
     <>
          <div className="flex justify-end items-center my-6 gap-4">
            <div className="flex items-center text-sm gap-2">
              <span>Date Range :</span>
              <input
                type="date"
                value=""
                readOnly
                className="bg-[#013A2A] border border-yellow-400 text-yellow-400 px-2 py-1 rounded-md w-28"
              />
              <span>To</span>
              <input
                type="date"
                value=""
                readOnly
                className="bg-[#013A2A] border border-yellow-400 text-yellow-400 px-2 py-1 rounded-md w-28"
              />
            </div>
  
            <div>
              <span>
                Type:
                <select className="bg-transparent focus:outline-none text-sm">
                  <option value="">Driver</option>
                  <option value="">Rental Driver</option>
                </select>
              </span>
            </div>
  
            <div className="flex items-center text-sm pr-6">
              <span>Status:</span>
              <select className="bg-transparent focus:outline-none">
                <option value="">Failed</option>
                <option value="">Success</option>
              </select>
            </div>
          </div>
  
          {/* Table */}
          <div className="mx-4 overflow-x-auto border border-yellow-400 rounded-xl">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-yellow-400  text-yellow-400">
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Transaction ID</th>
                  <th className="px-4 py-3">Reason</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {sampleData.map((item, index) => (
                  <tr key={index} className="text-sm">
                    <td className="px-4 py-3">{item.user}</td>
                    <td className="px-4 py-3">{item.transactionid}</td>
                    <td className="px-4 py-3">{item.reason}</td>
                    <td className="px-4 py-3">{item.date}</td>
                    <td className="px-4 py-3">{item.status}</td>
                    <td className="px-4 py-3">
                  <div className='flex gap-2'>
                    <div className='p-1 border border-yellow-300 rounded-full'>

                   <LuRefreshCcw size={20} />
                    </div>
                    <div className='p-1 border border-yellow-300 rounded-full flex justify-center '>

                   <LuFlagTriangleRight size={20}/>
                    </div>
                  </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
       </>
  )
}

export default TransactionTable