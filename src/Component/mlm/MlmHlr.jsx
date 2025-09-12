import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const MlmHlr = () => {
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // HLR Configuration state
  const [hlrConfig, setHlrConfig] = useState({
    requiredPGP: '',
    requiredTGP: '',
    retirementAge: '',
    rewardAmount: ''
  });
  const [hlrLoading, setHlrLoading] = useState(false);

  const hlrCriteria = {
    accumulatedPGP: 'Min 25%',
    accumulatedTGP: 'Min 25%',
    active: 'Active at least once in each 6 months',
    timeLimit: 'No time limitations',
  };

  // Fetch HLR configuration
  const fetchHlrConfig = async () => {
    try {
      const response = await fetch('https://aaaogo.xyz/api/mlm/admin/hlr/config');
      if (response.ok) {
        const json = await response.json();
        if (json.success && json.data) {
          setHlrConfig({
            requiredPGP: json.data.requiredPGP || '',
            requiredTGP: json.data.requiredTGP || '',
            retirementAge: json.data.retirementAge || '',
            rewardAmount: json.data.rewardAmount || ''
          });
        }
      }
    } catch (err) {
      console.error('Failed to fetch HLR config:', err);
    }
  };
  
  // Handle HLR config input change
  const handleHlrInputChange = (e) => {
    const { name, value } = e.target;
    setHlrConfig(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle HLR config submit
  const handleHlrSubmit = async (e) => {
    e.preventDefault();
    setHlrLoading(true);
    
    try {
      // Only include fields that have values
      const updateData = {};
      if (hlrConfig.requiredPGP && hlrConfig.requiredPGP.trim() !== '') {
        updateData.requiredPGP = Number(hlrConfig.requiredPGP);
      }
      if (hlrConfig.requiredTGP && hlrConfig.requiredTGP.trim() !== '') {
        updateData.requiredTGP = Number(hlrConfig.requiredTGP);
      }
      if (hlrConfig.retirementAge && hlrConfig.retirementAge.trim() !== '') {
        updateData.retirementAge = Number(hlrConfig.retirementAge);
      }
      if (hlrConfig.rewardAmount && hlrConfig.rewardAmount.trim() !== '') {
        updateData.rewardAmount = Number(hlrConfig.rewardAmount);
      }
      
      // Check if at least one field is being updated
      if (Object.keys(updateData).length === 0) {
        toast.error('Please fill at least one field to update');
        return;
      }
      
      const response = await fetch('https://aaaogo.xyz/api/mlm/admin/hlr/config', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update HLR config: ${response.status} ${response.statusText}`);
      }
      
      const json = await response.json();
      if (!json.success) {
        throw new Error(json.message || 'Failed to update HLR configuration');
      }
      
      toast.success(json.message || 'HLR configuration updated successfully');
      
      // Refresh the config after successful update
      fetchHlrConfig();
    } catch (err) {
      console.error('Update HLR config error:', err);
      toast.error(err.message);
    } finally {
      setHlrLoading(false);
    }
  };

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('https://aaaogo.xyz/api/mlm/hlr/leaderboard?page=1&limit=20');
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
    fetchHlrConfig();
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
      
      {/* HLR Configuration Section */}
      <div className="mb-6 p-4 border border-yellow-400 rounded-lg">
        <h3 className="text-md font-semibold mb-2 text-yellow-400">HLR Configuration</h3>
        <form onSubmit={handleHlrSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-yellow-400">Required PGP</label>
              <input
                type="number"
                name="requiredPGP"
                value={hlrConfig.requiredPGP}
                onChange={handleHlrInputChange}
                className="w-full p-2 border border-yellow-400 rounded bg-transparent text-yellow-400"
                placeholder="e.g., 250000"
              />
            </div>
            <div>
              <label className="block text-sm text-yellow-400">Required TGP</label>
              <input
                type="number"
                name="requiredTGP"
                value={hlrConfig.requiredTGP}
                onChange={handleHlrInputChange}
                className="w-full p-2 border border-yellow-400 rounded bg-transparent text-yellow-400"
                placeholder="e.g., 7000000"
              />
            </div>
            <div>
              <label className="block text-sm text-yellow-400">Retirement Age</label>
              <input
                type="number"
                name="retirementAge"
                value={hlrConfig.retirementAge}
                onChange={handleHlrInputChange}
                className="w-full p-2 border border-yellow-400 rounded bg-transparent text-yellow-400"
                placeholder="e.g., 60"
              />
            </div>
            <div>
              <label className="block text-sm text-yellow-400">Reward Amount (AED)</label>
              <input
                type="number"
                name="rewardAmount"
                value={hlrConfig.rewardAmount}
                onChange={handleHlrInputChange}
                className="w-full p-2 border border-yellow-400 rounded bg-transparent text-yellow-400"
                placeholder="e.g., 75000"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={hlrLoading}
            className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 disabled:opacity-50"
          >
            {hlrLoading ? 'Updating...' : 'Update HLR Configuration'}
          </button>
        </form>
      </div>

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