import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Sidebar from '../../Home/Sidebar';
import WalletPaymentNavbar from '../WalletPaymentNavbar';

const sampleData = [
  {
    type: 'Top-up',
    Userid: 'CUST-7861',
    amount: 'AED 1,000',
    timestamp: '29 July, 09:15\nAM',
    notes: 'JazzCash via\napp',
    tags: 'Bonus',
  },
  {
    type: 'Top-up',
    Userid: 'CUST-7861',
    amount: 'AED 1,000',
    timestamp: '29 July, 09:15\nAM',
    notes: 'JazzCash via\napp',
    tags: 'Bonus',
  },
  // Add more entries as needed
];

const TransactionLog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(sampleData.length / itemsPerPage);
  const paginatedData = sampleData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <WalletPaymentNavbar />

        <div className="min-h-screen px-8 py-10 font-sans">
          <div className="max-w-6xl mx-auto space-y-6">

            {/* Filters and Search */}
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <p className="font-semibold text-lg">Main Table Layout:</p>

              <div className="flex gap-4 items-center flex-wrap">
                {/* Amount Range */}
                <label className="flex items-center gap-2">
                  <span className="text-sm font-medium">Amount Range</span>
                  <input
                    type="number"
                    className="w-20 px-2 border bg-transparent border-yellow-300 rounded focus:outline-none focus:ring-1 focus:ring-yellow-400"
                  />
                </label>

                {/* To */}
                <label className="flex items-center gap-2">
                  <span className="text-sm font-medium">To</span>
                  <input
                    type="number"
                    className="w-20 px-2 bg-transparent border border-yellow-300 rounded focus:outline-none focus:ring-1 focus:ring-yellow-400"
                  />
                </label>

                {/* Date */}
                <label className="flex items-center gap-2">
                  <span className="text-sm font-medium">Date</span>
                  <input
                    type="date"
                    className="px-2 bg-transparent border border-yellow-300 rounded focus:outline-none focus:ring-1 focus:ring-yellow-400"
                  />
                </label>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded border border-yellow-400">
              <table className="min-w-full text-left">
                <thead className="">
                  <tr>
                    <th className="py-2 px-4 border-b border-yellow-400">Type</th>
                    <th className="py-2 px-4 border-b border-yellow-400">User ID</th>
                    <th className="py-2 px-4 border-b border-yellow-400">Amount</th>
                    <th className="py-2 px-4 border-b border-yellow-400">Timestamp</th>
                    <th className="py-2 px-4 border-b border-yellow-400">Notes</th>
                    <th className="py-2 px-4 border-b border-yellow-400">Tags</th>
                    <th className="py-2 px-4 border-b border-yellow-400">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b border-yellow-400">{item.type}</td>
                      <td className="py-2 px-4 border-b border-yellow-400">{item.Userid}</td>
                      <td className="py-2 px-4 border-b border-yellow-400">{item.amount}</td>
                      <td className="py-2 px-4 border-b border-yellow-400 whitespace-pre-line">{item.timestamp}</td>
                      <td className="py-2 px-4 border-b border-yellow-400 whitespace-pre-line">{item.notes}</td>
                      <td className="py-2 px-4 border-b border-yellow-400">{item.tags}</td>
                      <td className="py-2 px-4 border-b border-yellow-400">
                        <button className="bg-yellow-300 px-6 py-1 rounded-full text-black hover:bg-yellow-200">
                          Note
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-4 gap-2 text-yellow-300">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="hover:underline disabled:opacity-50"
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-8 h-8 rounded-full border border-yellow-400 text-center text-sm font-semibold ${
                    currentPage === index + 1 ? 'bg-yellow-400 text-black' : ''
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className="hover:underline disabled:opacity-50"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionLog;
