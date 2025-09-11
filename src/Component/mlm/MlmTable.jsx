// MlmTable.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMLMDashboardData, fetchDDRLeaderboard } from '../../features/Mlm/mlmSlice';

const MlmTable = () => {
  const dispatch = useDispatch();
  const { dashboardData, leaderboard, loading, error } = useSelector((state) => state.mlm);

  useEffect(() => {
    dispatch(fetchMLMDashboardData());
    dispatch(fetchDDRLeaderboard());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading MLM data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-red-500">Error: {error}</div>
      </div>
    );
  }

  const ddrAmount = dashboardData?.currentBalances?.ddr || 0;

  return (
    <div className='w-[85%] mx-auto'>
      <div className="flex justify-between items-center m-6">
        <h2 className="text-lg font-semibold">DDR Balance: ${ddrAmount.toFixed(2)}</h2>
        {leaderboard && (
          <div className="text-sm text-gray-600">
            Leaderboard Updated: {new Date(leaderboard.leaderboard?.lastUpdated).toLocaleDateString()}
          </div>
        )}
      </div>



      {/* DDR Leaderboard */}
      <div className="border mx-auto border-yellow-400 w-[95%] px-8 py-4 rounded">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-yellow-600">DDR Leaderboard</h2>
          <div className="text-sm text-gray-600">
            Last updated: {leaderboard?.lastUpdated ? new Date(leaderboard.lastUpdated).toLocaleString() : 'Just now'}
          </div>
        </div>
        
        <table className="w-full border-collapse table-fixed">
          <thead>
            <tr className="border-b border-yellow-400 text-left">
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">Full Name</th>
              <th className="px-4 py-2">Total Earnings</th>
              <th className="px-4 py-2">Level 1</th>
              <th className="px-4 py-2">Level 2</th>
              <th className="px-4 py-2">Level 3</th>
              <th className="px-4 py-2">Level 4</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard?.leaderboard?.topEarners?.length > 0 ? leaderboard.leaderboard.topEarners.map((earner, index) => (
              <tr key={index} className="text-left hover:bg-gray-50">
                <td className="px-4 py-2">
                  <span className="font-bold text-yellow-600">#{earner.rank}</span>
                </td>
                <td className="px-4 py-2">
                  <div>
                    <div className="font-semibold">{earner.name}</div>
                    {earner.username && <div className="text-sm text-gray-600">@{earner.username}</div>}
                  </div>
                </td>
                <td className="px-4 py-2 font-bold text-green-600">${earner.earnings}</td>
                <td className="px-4 py-2 font-semibold">${earner.levelBreakdown?.level1 || 0}</td>
                <td className="px-4 py-2 font-semibold">${earner.levelBreakdown?.level2 || 0}</td>
                <td className="px-4 py-2 font-semibold">${earner.levelBreakdown?.level3 || 0}</td>
                <td className="px-4 py-2 font-semibold">${earner.levelBreakdown?.level4 || 0}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                  No leaderboard data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
        <div className="mt-4 text-center">
          <div className="text-sm text-gray-600">
            Total Participants: {leaderboard?.leaderboard?.totalParticipants || 0}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            💡 Tip: Rankings are updated in real-time based on DDR earnings across all levels
          </div>
        </div>
      </div>
    </div>
  );
};

export default MlmTable;
