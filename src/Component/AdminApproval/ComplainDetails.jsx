import React from "react";
import Sidebar from "../Home/Sidebar";
import AdminApprovalNav from './AdminApprovalNav'
import { IoArrowUndoOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const ComplaintDetails = () => {
  return (
     <div className="flex  text-yellow-400 min-h-screen overflow-hidden">
          <Sidebar />
    
          <div className="flex-1 overflow-hidden">
            <AdminApprovalNav/>
             {/* Back Button */}
                    <div className="flex items-center gap-2 mb-4 m-4">
                      <IoArrowUndoOutline size={25} className="text-yellow-400" />
                      <Link to={'/complainresolve'}
                       
                        className="text-yellow-400 hover:underline"
                      >
                        Back
                      </Link>
                    </div>
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Complaint Details:</h2>

      <div className="space-y-8 mx-auto w-full max-w-xl">
        <div className="flex">
          <span className="w-32 font-semibold">Title:</span>
          <span>Refund not received</span>
        </div>

        <div>
          <div className="font-semibold mb-1">Content:</div>
          <div className="border border-yellow-400 rounded-xl p-4 max-w-3xl">
            I canceled the ride but haven’t received the refund in my wallet.
            Please resolve this ASAP
          </div>
        </div>

        <div className="flex">
          <span className="w-32 font-semibold">Attachments:</span>
          <a href="#" className="text-yellow-300 underline">
            View Image
          </a>
        </div>

        <div className="flex">
          <span className="w-32 font-semibold">Submitted On:</span>
          <span>01–Aug–2025</span>
        </div>

        <div>
          <div className="font-semibold mb-1">Admin Notes:</div>
          <div className="border border-yellow-400 rounded-xl p-4 max-w-3xl">
            Checked wallet history – refund not issued due to system error.
          </div>
        </div>

        <div>
          <div className="font-semibold mb-1">Previous Actions:</div>
          <div className="text-sm text-yellow-300">
            • Logged by Sarah @ 01–Aug–2025: Refund re-initiated
          </div>
        </div>

        <div className="flex">
          <span className="w-32 font-semibold">Status:</span>
          <span>In Progress</span>
        </div>

        {/* Assign To dropdown */}
        <div className="rounded-full">
          <select className="focus:outline-none w-full bg-transparent  text-yellow-400 border border-yellow-400 rounded-xl py-2 px-4">
            <option>Assign To</option>
            <option>Admin A</option>
            <option>Admin B</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button className="bg-yellow-400 text-green-900 font-semibold py-2 px-6 rounded-full">
            Mark as Resolved
          </button>
          <button className="bg-yellow-400 text-green-900 font-semibold py-2 px-12 rounded-full">
            Escalate
          </button>
          <button className="bg-yellow-400 text-green-900 font-semibold py-2 px-12 rounded-full">
            Reopen
          </button>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default ComplaintDetails;
