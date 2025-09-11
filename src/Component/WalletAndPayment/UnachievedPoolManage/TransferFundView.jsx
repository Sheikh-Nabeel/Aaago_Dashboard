import React from 'react';
import TransferHistorytable from './TransferHistorytable';

const TransferFundView = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
   
  };

  return (
    <div>
          <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto space-y-10 mt-12"
    >
      {/* From and To Fields */}
      <div className="flex flex-wrap gap-6 items-center max-w-4xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="font-medium">From:</span>
          <select className="bg-transparent border border-yellow-400 rounded-full px-4 py-1 focus:outline-none">
            <option>Select Source Pool</option>
            <option>CRR Pool</option>
            <option>BBR Pool</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-medium">To:</span>
          <select className="bg-transparent border border-yellow-400 rounded-full px-4 py-1 focus:outline-none">
            <option>Select Target Pool</option>
            <option>CRR Pool</option>
            <option>BBR Pool</option>
          </select>
        </div>
      </div>

      {/* Amount Input */}
      <div>
        <input
          type="text"
          className="w-full bg-transparent placeholder:text-yellow-300 border border-yellow-400 rounded-full px-4 py-2 focus:outline-none"
          placeholder="Amount (AED)"
        />
      </div>

      {/* Reason Textarea */}
      <div>
        <textarea
          rows={6}
          className="w-full bg-transparent placeholder:text-yellow-300 border border-yellow-400 rounded px-4 py-2 focus:outline-none"
          placeholder="Type reason here..."
        />
      </div>

      {/* 2FA Checkbox */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="2fa"
          className="accent-yellow-400 w-4 h-4"
        />
        <label htmlFor="2fa" className="text-sm">
          Triggers 2FA + logs the transfer with timestamp & admin name
        </label>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-yellow-400 block mx-auto hover:bg-yellow-300 text-black font-semibold px-6 py-2 rounded-full transition"
        >
          Confirm Transfer
        </button>
      </div>
    </form>
    <TransferHistorytable/>
    </div>

  );
};

export default TransferFundView;
