import React, { useState, useEffect } from 'react';

const MlmHlr = () => {
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const hlrCriteria = {
    accumulatedPGP: 'Min 25%',
    accumulatedTGP: 'Min 25%',
    active: 'Active at least once in each 6 months',
    timeLimit: 'No time limitations',
  };

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/mlm/hlr/leaderboard?page=1&limit=20');
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard data');
        }
        const data = await response.json();
        setLeaderboardData(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div className="p-4 text-yellow-400">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4 rounded-lg text-yellow-400">
      <h2 className="text-lg font-bold mb-4">Honorpay Loyalty Reward (HLR)</h2>

      {/* Criteria Table */}
      <div className="overflow-x-auto mb-8">
        <table className="w-full border border-yellow-400 text-sm">
          <thead className="border-b border-yellow-400">
            <tr>
              <th className="px-3 py-2">Accumulated PGP</th>
              <th className="px-3 py-2">Accumulated TGP</th>
              <th className="px-3 py-2">Activity Requirement</th>
              <th className="px-3 py-2">Time Limitation</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center hover:bg-[#014b38]">
              <td className="px-3 py-2">{hlrCriteria.accumulatedPGP}</td>
              <td className="px-3 py-2">{hlrCriteria.accumulatedTGP}</td>
              <td className="px-3 py-2">{hlrCriteria.active}</td>
              <td className="px-3 py-2">{hlrCriteria.timeLimit}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Requirements Section */}
      {leaderboardData?.requirements && (
        <div className="mb-8">
          <h3 className="text-md font-semibold mb-2">Requirements</h3>
          <ul className="list-disc list-inside">
            <li>Required PGP: {leaderboardData.requirements.requiredPGP.toLocaleString()}</li>
            <li>Required TGP: {leaderboardData.requirements.requiredTGP.toLocaleString()}</li>
            <li>Retirement Age: {leaderboardData.requirements.retirementAge}</li>
            <li>Reward Amount: ${leaderboardData.requirements.rewardAmount.toLocaleString()}</li>
          </ul>
        </div>
      )}

      {/* Statistics Section */}
      {leaderboardData?.statistics && (
        <div className="mb-8">
          <h3 className="text-md font-semibold mb-2">Statistics</h3>
          <ul className="list-disc list-inside">
            <li>Total Participating: {leaderboardData.statistics.totalParticipating}</li>
            <li>Total Qualified: {leaderboardData.statistics.totalQualified}</li>
            <li>Qualification Rate: {leaderboardData.statistics.qualificationRate}%</li>
          </ul>
        </div>
      )}

      {/* Leaderboard Table */}
      {leaderboardData?.leaderboard && (
        <div className="overflow-x-auto">
          <h3 className="text-md font-semibold mb-2">Leaderboard</h3>
          <table className="w-full border border-yellow-400 text-sm">
            <thead className="border-b border-yellow-400">
              <tr>
                <th className="px-3 py-2">Rank</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Country</th>
                <th className="px-3 py-2">PGP</th>
                <th className="px-3 py-2">TGP</th>
                <th className="px-3 py-2">Total Points</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Qualified</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.leaderboard.map((entry) => (
                <tr key={entry.rank} className="text-center hover:bg-[#014b38]">
                  <td className="px-3 py-2">{entry.rank}</td>
                  <td className="px-3 py-2">{entry.name}</td>
                  <td className="px-3 py-2">{entry.flag} {entry.country.toUpperCase()}</td>
                  <td className="px-3 py-2">{entry.pgp.toLocaleString()}</td>
                  <td className="px-3 py-2">{entry.tgp.toLocaleString()}</td>
                  <td className="px-3 py-2">{entry.totalPoints.toLocaleString()}</td>
                  <td className="px-3 py-2">{entry.status}</td>
                  <td className="px-3 py-2">{entry.isQualified ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Info */}
      {leaderboardData?.pagination && (
        <div className="mt-4 text-sm">
          Page {leaderboardData.pagination.page} of {Math.ceil(leaderboardData.pagination.total / leaderboardData.pagination.limit)} | Total Entries: {leaderboardData.pagination.total}
        </div>
      )}
    </div>
  );
};

export default MlmHlr;