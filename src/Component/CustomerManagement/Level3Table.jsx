// Level1Table.jsx
import React, { useState } from 'react';

const level1Data = [
  { id: 1, name: 'Smith Joy', amount: 1000, date: '4/July/25', source: 'Driver', action: 'View Detail' },
  { id: 2, name: 'John Doe', amount: 1500, date: '5/July/25', source: 'Rider', action: 'View Detail' },
];

const Level3Table = () => {

  return (
    <>
      <div className="border mx-auto border-yellow-400 w-[95%] px-8 py-2 rounded">
        <table className="w-full border-collapse table-fixed">
          <thead>
            <tr className="border-b border-yellow-400 text-left">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Full Name</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Source</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {level1Data.map((item, index) => (
              <tr key={index} className="text-left">
                <td className="px-4 py-2">00{item.id}</td>
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">${item.amount}</td>
                <td className="px-4 py-2">{item.date}</td>
                <td className="px-4 py-2">{item.source}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => setShowPopup(true)}
                    className='bg-yellow-400 px-4 py-2 text-[11px] font-semibold hover:bg-yellow-200 text-black rounded-full'
                  >
                    {item.action}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </>
  );
};

export default Level3Table;
