import React from "react";
import { FaCheck } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import Sidebar from "../../Home/Sidebar";
import ReportNavbar from "../ReportNavbar";

const sampleData = Array(9).fill({
  applicationid: "12345",
  type: "Driver",
  area: "Pending",
  submitted: "28 Jul '25",
  status: "Pending",
});

const NewDriver = () => {
  return (
    <>
        <div className="flex justify-end items-center my-6 gap-4">
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
            <span>
              Type:
              <select className="bg-transparent focus:outline-none ml-1">
                <option value="">Driver</option>
                <option value="">Rental Driver</option>
              </select>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span>Status:</span>
            <select className="bg-transparent focus:outline-none">
              <option value="">Pending</option>
              <option value="">Approved</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="mx-4 overflow-x-auto border border-yellow-400 rounded-xl">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-yellow-400  text-yellow-400">
                <th className="px-4 py-3">Application ID</th>
                <th className="px-4 py-3">Type
                  <select name="" id="" className="bg-transparent focus:outline-none ">
                    <option value="">Driver</option>
                    <option value="">Rental Driver</option>
                  </select>
                </th>
                <th className="px-4 py-3">Area</th>
                <th className="px-4 py-3">Submitted</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {sampleData.map((item, index) => (
                <tr key={index} className=" text-sm">
                  <td className="px-4 py-3">{item.applicationid}</td>
                  <td className="px-4 py-3">{item.type}</td>
                  <td className="px-4 py-3">{item.area}</td>
                  <td className="px-4 py-3">{item.submitted}</td>
                  <td className="px-4 py-3">{item.status}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <MdCancel
                        className="cursor-pointer hover:text-red-500"
                        size={20}
                      />
                      <FaCheck
                        className="cursor-pointer hover:text-green-500"
                        size={16}
                      />
                      <button className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm hover:bg-yellow-300">
                      View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
     </>
  );
};

export default NewDriver;
