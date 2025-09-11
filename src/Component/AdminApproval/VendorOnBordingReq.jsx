import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import Sidebar from '../Home/Sidebar';
import AdminApprovalNav from './AdminApprovalNav'
const sampleData = Array(9).fill({
  businessname: 'Al Noor Garage',
  contact: '+971-500123456',
  servicesOffered: 'Recovery, Tuning',
  businessdoc: 'view Document',
  location: 'View Map',
});


const VendorOnBordingReq = () => {
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
              <option value="">Verified</option>
              <option value="">Scheduled</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="mx-4 overflow-x-auto border border-yellow-400 rounded-xl">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-yellow-400">
                <th className="px-4 py-3">Business' Name</th>
                
                <th className="px-4 py-3">Contact Info</th>
                <th className="px-4 py-3">Services Offered</th>
                <th className="px-4 py-3">BusinessReg.Doc</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {sampleData.map((item, index) => (
                <tr key={index} className="text-sm">
                  <td className="px-4 py-3">{item.businessname}</td>
                  <td className="px-4 py-3">
                    {item.contact}</td>
                  <td className="px-4 py-3">
                    {item.servicesOffered}</td>
                  <td className="px-4 py-3">
                    <a href="#" className="underline text-yellow-400">{item.businessdoc}</a>
                  </td>
                  <td className="px-4 py-3 underline">{item.location}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <MdCancel className="cursor-pointer hover:text-red-500" size={20} />
                      <FaCheck className="cursor-pointer hover:text-green-500" size={16} />
                      <button className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm hover:bg-yellow-300">
                        Scheduled
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

export default VendorOnBordingReq;
