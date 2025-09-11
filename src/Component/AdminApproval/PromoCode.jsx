import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import Sidebar from '../Home/Sidebar';
import AdminApprovalNav from './AdminApprovalNav'
import { Link } from 'react-router-dom';
const sampleData = Array(9).fill({
 id:1,
  code: 'AAO15',
  Discounttype: '15% off fare',
  validperiod: '01-15 Aug 2025',
  campaignowner: 'Marketing Team',
  currentstatus: 'Pending Review',
  
});


const PromoCode = () => {
  return (
    <div className="flex  text-yellow-400 min-h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 overflow-hidden">
        <AdminApprovalNav/>
        {/* Header */}
        <div className="flex justify-end items-center mb-6 gap-4 ">
          <div className="flex items-center gap-2">
            <span>Sort By:</span>
            <select className="bg-transparent focus:outline">
              <option value="">Pending</option>
              <option value="">Approved</option>
              <option value="">Rejected</option>
              <option value="">Under Review</option>
             
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="mx-4 overflow-x-auto border border-yellow-400 rounded-xl">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-yellow-400">
                <th className="px-4 py-3">Code</th>        
                <th className="px-4 py-3">Discount Type</th>
                <th className="px-4 py-3">Validity Period</th>
                <th className="px-4 py-3">Campaign Owner</th>
                <th className="px-4 py-3">Current Status</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {sampleData.map((item, index) => (
                <tr key={index} className="text-sm">
                  <td className="px-4 py-3">{item.code}</td>
                  <td className="px-4 py-3">
                    {item.Discounttype}</td>
                  <td className="px-4 py-3 flex items-center gap-2">
                   {item.validperiod}
                  </td>
                  <td className="px-4 py-3">{item.campaignowner}</td>
                  <td className="px-4 py-3">{item.currentstatus}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <MdCancel className="cursor-pointer hover:text-red-500" size={20} />
                      <FaCheck className="cursor-pointer hover:text-green-500" size={16} />
                      <button className="bg-yellow-400 text-black px-2 py-1 rounded-full  hover:bg-yellow-300">
                        Suggest Changes
                      </button>
                      <Link to={`/promocodedetail/${item.id}`} className="bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-semibold hover:bg-yellow-300">
                        View Details
                      </Link>
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

export default PromoCode;
