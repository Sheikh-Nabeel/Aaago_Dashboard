import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import Sidebar from '../Home/Sidebar';
import AdminApprovalNav from './AdminApprovalNav'
import { Link } from 'react-router-dom';
const sampleData = Array(9).fill({
 id:1,
  userName: 'Ahmed Raza',
  status: 'Bank Transfer',
  lastUpdate: '28-Aug-25',
  assignedto:'Normal',
});


const ComplainResolution = () => {
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
        
        </div>

        {/* Table */}
        <div className="mx-4 overflow-x-auto border border-yellow-400 rounded-xl">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-yellow-400">
                <th className="px-4 py-3">User Name</th>
            
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Last Updated</th>
                <th className="px-4 py-3">Assigned To</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {sampleData.map((item, index) => (
                <tr key={index} className="text-sm">
                  <td className="px-4 py-3">{item.userName}</td>
                  <td className="px-4 py-3">{item.status}</td>
                  <td className="px-4 py-3">
                    {item.lastUpdate}</td>
                  <td className="px-4 py-3 flex items-center gap-2">
                   {item.assignedto}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link to={`/complaindetail/${item.id}`} className="bg-yellow-400 text-[#013220] px-4 py-1 rounded-full text-sm hover:bg-yellow-300">
                        View
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

export default ComplainResolution;
