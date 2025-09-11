import React from 'react';
import { FaCalendarAlt } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { BsArrowRightShort } from "react-icons/bs";
import FutureReassignDashTable from './FutureReassignDashTable';

const FutureReassignmentDash = () => {
  return (
    <div  className='w-full max-w-4xl mx-auto min-h-screen py-8'>
    <form className="space-y-8 ">

      {/* Source Pool & Available Balance */}
      <div className="flex justify-between gap-2">
        <div className="flex items-center gap-2 flex-1">
          <label className="whitespace-nowrap text-sm font-medium">Source Pool:</label>
          <div className="w-1/2 border border-yellow-400 rounded-full px-4 py-2">
            <select className="w-full bg-transparent outline-none">
              <option value="">CRR Pool</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-1">
          <label className="whitespace-nowrap text-sm font-medium">Available Balance:</label>
          <div className="w-1/2 border border-yellow-400 rounded-full px-4 py-2">
           <p>AED 20,000</p>
          </div>
        </div>
      </div>

      {/* Target Use Case */}
      <div className="flex items-center gap-4">
        <label className="whitespace-nowrap text-sm font-medium">Target Use Case:</label>
        <div className="flex-1 border border-yellow-400 rounded-full px-4 py-2">
          <select className="w-full bg-transparent outline-none">
            <option value="">Crisis Aid</option>
          </select>
        </div>
      </div>

      {/* Amount */}
      <div className="flex items-center gap-4">
        <label className="whitespace-nowrap text-sm font-medium">Amount:</label>
        <div className="flex-1 border border-yellow-400 rounded-full px-4 py-2">
          <input
            type="number"
            className="w-full bg-transparent outline-none placeholder:text-yellow-400"
            placeholder="Enter amount"
          />
        </div>
      </div>

      {/* Note */}
      <div>
        <label className=" text-sm font-medium">optional</label>
      <div className="flex">
        <textarea
          rows={4}
          placeholder="Type note here..."
          className="flex-1 bg-transparent placeholder:text-yellow-400 border border-yellow-400 rounded-xl px-4 py-2 outline-none resize-none"
        />
      </div>
      </div>

      {/* Add Another Reassignment */}
      <div className="flex items-center space-x-2">
      <div className='border border-yellow-300'><GoPlus/></div>
        <label htmlFor="addAnother" className="text-sm">Add Another Reassignment (dynamic row support)</label>
      </div>

      {/* Effective Date */}
      <div className="flex items-center justify-between py-2 px-4 border border-yellow-400 rounded-full">
        <label htmlFor="effectiveDate" className="text-sm">Effective Date</label>
        <div className="flex items-center gap-2  px-4 py-2">
          <FaCalendarAlt />
        </div>
      </div>
    </form>
      <div className="mt-8 w-full max-w-3xl mx-auto bg-gradient-to-r from-[#013321] to-[#027047] border border-yellow-200 rounded-xl p-6 shadow-lg  space-y-4">
      <h2 className="text-lg font-semibold mb-2">Reassignment Preview Card</h2>

      <div className="flex items-center ">
        <p>CRR Pool</p>
        <BsArrowRightShort size={20} />
        <p>Crisis Aid: <span className="font-semibold">AED 5,000</span></p>
      </div>

      <div className="flex items-center ">
        <p>Referral Pool</p>
        <BsArrowRightShort size={20} />
        <p>Wallet Boost: <span className="font-semibold">AED 3,000</span></p>
      </div>

      <div className="flex items-center">
        <p>Scheduled for:</p>
        <BsArrowRightShort size={20} />
        <p>02 Aug 2025</p>
      </div>
    </div>
    <div className='flex  justify-center gap-4 mt-6'>
    <button className='bg-yellow-400 px-4 py-2 font-semibold text-sm text-black rounded-full'>Download Summary</button>
    <button className='bg-yellow-400 px-4 py-2 font-semibold text-sm text-black rounded-full'>Confirm & Submit</button>

    </div>
    <FutureReassignDashTable/>
    </div>
  );
};

export default FutureReassignmentDash;
