import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MlmPopupCard from './MlmPopupCard';

const Level1Table = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const { leaderboard, loading } = useSelector((state) => state.mlm);
  
  // Filter leaderboard data for Level 1 or use fallback data
  const level1Data = leaderboard?.leaderboard?.topEarners?.filter(earner => 
    earner.levelBreakdown?.level1 > 0
  ).map((earner, index) => ({
    id: index + 1,
    name: earner.name,
    username: earner.username,
    amount: earner.levelBreakdown.level1,
    totalEarnings: earner.earnings,
    rank: earner.rank,
    date: new Date().toLocaleDateString(),
    source: 'Level 1 DDR'
  })) || [
    { id: 1, name: 'Smith Joy', amount: 1000, date: '4/July/25', source: 'Driver', rank: 1 },
    { id: 2, name: 'John Doe', amount: 1500, date: '5/July/25', source: 'Rider', rank: 2 },
  ];
  
  if (loading) {
    return (
      <div className="border mx-auto border-yellow-400 w-[95%] px-8 py-4 rounded text-center">
        Loading Level 1 data...
      </div>
    );
  }

  return (
    <>
      <div className="border mx-auto border-yellow-400 w-[95%] px-8 py-2 rounded">
        <table className="w-full border-collapse table-fixed">
          <thead>
            <tr className="border-b border-yellow-400 text-left">
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">Full Name</th>
              <th className="px-4 py-2">Level 1 Amount</th>
              <th className="px-4 py-2">Total Earnings</th>
              <th className="px-4 py-2">Source</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {level1Data.length > 0 ? level1Data.map((item, index) => (
              <tr key={index} className="text-left hover:bg-gray-50">
                <td className="px-4 py-2">
                  <span className="font-bold text-yellow-600">#{item.rank || index + 1}</span>
                </td>
                <td className="px-4 py-2">
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    {item.username && <div className="text-sm text-gray-600">@{item.username}</div>}
                  </div>
                </td>
                <td className="px-4 py-2 font-semibold text-green-600">${item.amount}</td>
                <td className="px-4 py-2 font-semibold">${item.totalEarnings || item.amount}</td>
                <td className="px-4 py-2">{item.source}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => setSelectedUser(item)}
                    className='bg-yellow-400 px-4 py-2 text-[11px] font-semibold hover:bg-yellow-200 text-black rounded-full'
                  >
                    View Detail
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                  No Level 1 earnings data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pass selectedUser to popup */}
      {selectedUser && (
        <MlmPopupCard 
          user={selectedUser} 
          onClose={() => setSelectedUser(null)} 
        />
      )}
    </>
  );
};

export default Level1Table;
