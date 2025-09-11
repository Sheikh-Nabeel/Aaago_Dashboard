import React from "react";
import Sidebar from "../Home/Sidebar";
import AdminApprovalNav from "./AdminApprovalNav";
import { RiAttachment2 } from "react-icons/ri";

const ManualAccountEdits = () => {
  return (
    <div className="flex  text-yellow-400 min-h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 overflow-hidden">
        <AdminApprovalNav />
        <div>
          {/* Title */}
          <h2 className="text-2xl font-semibold px-4 py-4">
            Change Request Summary:
          </h2>

          <div className="flex items-center justify-center  font-sans">
            <div className="w-full max-w-4xl border border-yellow-400 rounded-xl p-10">
              {/* Phone Number Change Row */}
              <div>
                <p className="font-semibold mb-6">Requested Change:</p>
                <div className="flex items-center justify-around mb-8  w-full max-w-md mx-auto">
                  <div className="inline-block border border-yellow-300  px-4 py-2 rounded-full">
                    +971-500123456
                  </div>
                  <div className="px-4 font-semibold">To</div>
                  <div className="inline-block border border-yellow-300  px-4 py-2 rounded-full">
                    +971-585678910
                  </div>
                </div>
              </div>
              {/* Request Details Grid */}
              <div>
                <p className="font-semibold mb-6">Requested Change:</p>
                {/* Request Details Grid */}
                <div className="grid grid-cols-2 gap-y-4 text-sm mb-10 w-full max-w-md mx-auto">
                  <p className="font-semibold">User:</p>
                  <p className="">Ahmed Raza</p>

                  <p className="font-semibold">User ID:</p>
                  <p className="">U-2025-01984</p>

                  <p className="font-semibold">Date of Request:</p>
                  <p className="">01 Aug 2025</p>
                </div>
              </div>
              {/* Reason Submitted */}
              <div className="mb-8 w-full max-w-md mx-auto">
                <p className="font-semibold mb-2">Reason Submitted:</p>
                <div className="border border-yellow-400  bg-[#014733] rounded-xl p-4 text-sm">
                  I lost my old number and now use this new one. Need it updated
                  for verification purposes.
                </div>
              </div>

              {/* Supporting Documents */}
              <div>
                <p className="font-semibold mb-2">Supporting Document(s):</p>
                <div className="space-y-2 text-sm w-full max-w-xl mx-auto">
                  <div className=" hover:text-yellow-200 cursor-pointer flex items-center">
                    <RiAttachment2 size={20} />{" "}
                    <span className="ml-2">View Uploaded ID</span>
                  </div>
                  <div className=" hover:text-yellow-200 cursor-pointer flex items-center">
                    <RiAttachment2 size={20} />
                    <span className="ml-2">View Selfie with Document</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex justify-center gap-10">
            <button className="px-6 py-2 rounded-full text-green-900 bg-yellow-400 text-sm font-semibold">Approve Request</button>
            <button className="px-8 py-2 rounded-full text-green-900 bg-yellow-400 text-sm font-semibold">Reject Request</button>
            <button className="px-4 py-2 rounded-full text-green-900 bg-yellow-400 text-sm font-semibold">Flag for Audit Review</button>
        </div>
      </div>
    </div>
  );
};

export default ManualAccountEdits;
