import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import Sidebar from '../Home/Sidebar';
import AdminApprovalNav from './AdminApprovalNav'
const sampleData = Array(9).fill({
 
  userName: 'Ahmed Raza',
  amount: 'AED 1,500',
  method: 'Bank Transfer',
  kycstatus: 'Verified',
  datereq: '28-Aug-25',
  riskflag:'Normal',
});


const WithDrawalRequest = () => {
  return (
    <div className="flex  text-yellow-400 min-h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 overflow-hidden">
        <AdminApprovalNav/>
        {/* Header */}
        <div className="flex justify-end items-center mb-6 gap-4 ">
          <div className="flex items-center gap-2">
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
            <span>Risk Level:
                <select name="" id="" className="bg-transparent focus:outline-none">
                    <option value="">High</option>
                    <option value="">Normal</option>
                </select>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>KYC Level:</span>
            <select className="bg-transparent focus:outline">
              <option value="">Verified</option>
              <option value="">Rejected</option>
             
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="mx-4 overflow-x-auto border border-yellow-400 rounded-xl">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-yellow-400">
                <th className="px-4 py-3">User Name</th>
                
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Method</th>
                <th className="px-4 py-3">KYC Status</th>
                <th className="px-4 py-3">Date Requested</th>
                <th className="px-4 py-3">Risk Flag</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {sampleData.map((item, index) => (
                <tr key={index} className="text-sm">
                  <td className="px-4 py-3">{item.userName}</td>
                  <td className="px-4 py-3">
                    {item.amount}</td>
                  <td className="px-4 py-3 flex items-center gap-2">
                   {item.method}
                  </td>
                  <td className="px-4 py-3">{item.kycstatus}</td>
                  <td className="px-4 py-3">{item.datereq}</td>
                  <td className="px-4 py-3">{item.riskflag}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <MdCancel className="cursor-pointer hover:text-red-500" size={20} />
                      <FaCheck className="cursor-pointer hover:text-green-500" size={16} />
                      <button className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm hover:bg-yellow-300">
                        Hold
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

export default WithDrawalRequest;
