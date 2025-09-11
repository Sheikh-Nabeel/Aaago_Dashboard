import React, { useState } from 'react';
import MlmPopupCard from './MlmPopupCard';

const level4Data = [
  { id: 1, name: 'Emma Wilson', amount: 3000, date: '10/July/25', source: 'Driver',  },
  { id: 2, name: 'Liam Johnson', amount: 3500, date: '11/July/25', source: 'Rider',  },
];

const Level4Table = () => {
  const [selectedUser, setSelectedUser] = useState(null);

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
            {level4Data.map((item, index) => (
              <tr key={index} className="text-left">
                <td className="px-4 py-2">00{item.id}</td>
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">${item.amount}</td>
                <td className="px-4 py-2">{item.date}</td>
                <td className="px-4 py-2">{item.source}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => setSelectedUser(item)}
                    className="bg-yellow-400 px-4 py-2 text-[11px] font-semibold hover:bg-yellow-200 text-black rounded-full"
                  >
                   View Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup */}
      {selectedUser && (
        <MlmPopupCard 
          user={selectedUser} 
          onClose={() => setSelectedUser(null)} 
        />
      )}
    </>
  );
};

export default Level4Table;
