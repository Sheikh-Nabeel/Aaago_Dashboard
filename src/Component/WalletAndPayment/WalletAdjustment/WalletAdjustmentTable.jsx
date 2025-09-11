import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const sampleData = [
  {
    date: '24-Jul-25',
    userName: 'Asad Raza',
    type: 'Bonus',
    amount: '+500',
    reason: 'July contest winner',
    admin: 'Admin A',
  },
  {
    date: '24-Jul-25',
    userName: 'Asad Raza',
    type: 'Bonus',
    amount: '+500',
    reason: 'July contest winner',
    admin: 'Admin A',
  },
  {
    date: '24-Jul-25',
    userName: 'Asad Raza',
    type: 'Bonus',
    amount: '+500',
    reason: 'July contest winner',
    admin: 'Admin A',
  },
  {
    date: '24-Jul-25',
    userName: 'Asad Raza',
    type: 'Bonus',
    amount: '+500',
    reason: 'July contest winner',
    admin: 'Admin A',
  },
  {
    date: '24-Jul-25',
    userName: 'Asad Raza',
    type: 'Bonus',
    amount: '+500',
    reason: 'July contest winner',
    admin: 'Admin A',
  },
  {
    date: '24-Jul-25',
    userName: 'Asad Raza',
    type: 'Bonus',
    amount: '+500',
    reason: 'July contest winner',
    admin: 'Admin A',
  },
  {
    date: '24-Jul-25',
    userName: 'Asad Raza',
    type: 'Bonus',
    amount: '+500',
    reason: 'July contest winner',
    admin: 'Admin A',
  },
  {
    date: '24-Jul-25',
    userName: 'Asad Raza',
    type: 'Bonus',
    amount: '+500',
    reason: 'July contest winner',
    admin: 'Admin A',
  },
  {
    date: '24-Jul-25',
    userName: 'Asad Raza',
    type: 'Bonus',
    amount: '+500',
    reason: 'July contest winner',
    admin: 'Admin A',
  },
  {
    date: '24-Jul-25',
    userName: 'Asad Raza',
    type: 'Bonus',
    amount: '+500',
    reason: 'July contest winner',
    admin: 'Admin A',
  },
  {
    date: '24-Jul-25',
    userName: 'Asad Raza',
    type: 'Bonus',
    amount: '+500',
    reason: 'July contest winner',
    admin: 'Admin A',
  },
  {
    date: '24-Jul-25',
    userName: 'Asad Raza',
    type: 'Bonus',
    amount: '+500',
    reason: 'July contest winner',
    admin: 'Admin A',
  },
  {
    date: '24-Jul-25',
    userName: 'Asad Raza',
    type: 'Bonus',
    amount: '+500',
    reason: 'July contest winner',
    admin: 'Admin A',
  },
  {
    date: '24-Jul-25',
    userName: 'Asad Raza',
    type: 'Bonus',
    amount: '+500',
    reason: 'July contest winner',
    admin: 'Admin A',
  },
  // Add more static data or fetch from backend later
];

const WalletAdjustmentTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(sampleData.length / itemsPerPage);
  const paginatedData = sampleData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen px-8 py-10  text-yellow-300 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Select Box */}
        <div className="flex items-center border border-yellow-400 rounded-full px-4 py-2">
          <select className="bg-transparent w-full focus:outline-none bg-[#013220]">
            <option>Select User/Driver</option>
            <option>User</option>
            <option>Driver</option>
          </select>
          <FiSearch className="text-yellow-300" />
        </div>

        {/* Apply Button */}
        <div className="text-center">
          <button className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold">
            Apply Adjustment
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <p className="mb-2 font-semibold">Paginated Table View:</p>
          <table className="min-w-full text-left border border-yellow-400">
            <thead className=" text-yellow-300">
              <tr>
                <th className="py-2 px-4 border-b border-yellow-400">Date</th>
                <th className="py-2 px-4 border-b border-yellow-400">User Name</th>
                <th className="py-2 px-4 border-b border-yellow-400">Type</th>
                <th className="py-2 px-4 border-b border-yellow-400">Amount</th>
                <th className="py-2 px-4 border-b border-yellow-400">Reason</th>
                <th className="py-2 px-4 border-b border-yellow-400">Admin</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={index} className="">
                  <td className="py-2 px-4 border-b border-yellow-400">{item.date}</td>
                  <td className="py-2 px-4 border-b border-yellow-400">{item.userName}</td>
                  <td className="py-2 px-4 border-b border-yellow-400">{item.type}</td>
                  <td className="py-2 px-4 border-b border-yellow-400">{item.amount}</td>
                  <td className="py-2 px-4 border-b border-yellow-400">{item.reason}</td>
                  <td className="py-2 px-4 border-b border-yellow-400">{item.admin}</td>
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
  );
};

export default WalletAdjustmentTable;
