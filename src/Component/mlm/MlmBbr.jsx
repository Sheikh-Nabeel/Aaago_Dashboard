import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const MlmBbr = () => {

  // State for API data
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [campaignData, setCampaignData] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // State for create/update campaign form
  const [formData, setFormData] = useState({
    name: '',
    requirement: '',
    duration: '',
    reward: '',
    type: 'solo',
    newbieRidesOnly: false,
    description: '',
  });

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch campaign data
        const campaignResponse = await fetch('http://localhost:3001/api/mlm/bbr/campaign');
        if (!campaignResponse.ok) {
          throw new Error(`Failed to fetch campaign data: ${campaignResponse.status} ${campaignResponse.statusText}`);
        }
        const campaignJson = await campaignResponse.json();
        console.log('Campaign API Response:', campaignJson); // Debug log

        // Check if response is successful
        if (!campaignJson.success) {
          throw new Error(campaignJson.message || 'Campaign API returned an error');
        }

        // Set campaign data (allow null/undefined currentCampaign)
        setCampaignData(campaignJson.data?.currentCampaign || null);

        // Fetch leaderboard data
        const leaderboardResponse = await fetch('http://localhost:3001/api/mlm/bbr/leaderboard');
        if (!leaderboardResponse.ok) {
          throw new Error(`Failed to fetch leaderboard data: ${leaderboardResponse.status} ${leaderboardResponse.statusText}`);
        }
        const leaderboardJson = await leaderboardResponse.json();
        console.log('Leaderboard API Response:', leaderboardJson); // Debug log
        if (!leaderboardJson.success || !leaderboardJson.data) {
          throw new Error('Invalid leaderboard API response format');
        }

        // Set state with API data
        setLeaderboardData(leaderboardJson.data.leaderboard || []);
        setUserPosition(leaderboardJson.data.userPosition || null);
        setPagination(leaderboardJson.data.pagination || null);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
        setLoading(false);
        toast.error(err.message);
      }
    };

    fetchData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission for create/update
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.name || !formData.requirement || !formData.duration || !formData.reward) {
      toast.error('All fields except newbieRidesOnly and description are required.');
      return;
    }

    try {
      const url = 'http://localhost:3001/api/mlm/admin/bbr/campaign';
      const method = isEditing ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          requirement: Number(formData.requirement),
          duration: Number(formData.duration),
          reward: Number(formData.reward),
          type: formData.type,
          newbieRidesOnly: formData.newbieRidesOnly,
          description: formData.description,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isEditing ? 'update' : 'create'} campaign: ${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      if (!json.success) {
        throw new Error(json.message || `Failed to ${isEditing ? 'update' : 'create'} campaign`);
      }

      toast.success(json.message || `Campaign ${isEditing ? 'updated' : 'created'} successfully`);
      setFormData({
        name: '',
        requirement: '',
        duration: '',
        reward: '',
        type: 'solo',
        newbieRidesOnly: false,
        description: '',
      });
      setIsEditing(false);

      // Refetch campaign data to update the UI
      const refetchResponse = await fetch('http://localhost:3001/api/mlm/bbr/campaign');
      if (refetchResponse.ok) {
        const refetchJson = await refetchResponse.json();
        console.log('Refetched Campaign Data:', refetchJson);
        setCampaignData(refetchJson.data?.currentCampaign || null);
      } else {
        toast.error('Failed to refresh campaign data');
      }
    } catch (err) {
      console.error(`${isEditing ? 'Update' : 'Create'} campaign error:`, err);
      toast.error(err.message);
    }
  };

  // Handle edit button click
  const handleEdit = () => {
    if (campaignData) {
      setFormData({
        name: campaignData.name || '',
        requirement: campaignData.requirement || '',
        duration: campaignData.duration || '',
        reward: campaignData.reward?.amount || '',
        type: campaignData.type || 'solo',
        newbieRidesOnly: campaignData.newbieRidesOnly || false,
        description: campaignData.description || '',
      });
      setIsEditing(true);
    }
  };

  // Handle delete campaign
  const handleDelete = async () => {
    if (!campaignData) return;

    try {
      const response = await fetch('http://localhost:3001/api/mlm/admin/bbr/campaign', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete campaign: ${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      if (!json.success) {
        throw new Error(json.message || 'Failed to delete campaign');
      }

      toast.success(json.message || 'Campaign deleted successfully');
      setCampaignData(null); // Clear campaign data
      setFormData({
        name: '',
        requirement: '',
        duration: '',
        reward: '',
        type: 'solo',
        newbieRidesOnly: false,
        description: '',
      });
      setIsEditing(false);
    } catch (err) {
      console.error('Delete campaign error:', err);
      toast.error(err.message);
    }
  };

  return (
    <div className="p-4 rounded-lg text-yellow-400">
      <h2 className="text-lg font-bold mb-4">Bonus Booster Rewards (BBR)</h2>

      {/* Create/Update Campaign Form */}
      <div className="mb-6 p-4 border border-yellow-400 rounded-lg">
        <h3 className="text-md font-semibold mb-2">{isEditing ? 'Update Campaign' : 'Create New Campaign'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm">Campaign Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-yellow-400 rounded bg-transparent text-yellow-400"
              placeholder="e.g., Weekly Turbo Booster"
            />
          </div>
          <div>
            <label className="block text-sm">Requirement (Rides)</label>
            <input
              type="number"
              name="requirement"
              value={formData.requirement}
              onChange={handleInputChange}
              className="w-full p-2 border border-yellow-400 rounded bg-transparent text-yellow-400"
              placeholder="e.g., 100"
            />
          </div>
          <div>
            <label className="block text-sm">Duration (Days)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className="w-full p-2 border border-yellow-400 rounded bg-transparent text-yellow-400"
              placeholder="e.g., 7"
            />
          </div>
          <div>
            <label className="block text-sm">Reward (AED)</label>
            <input
              type="number"
              name="reward"
              value={formData.reward}
              onChange={handleInputChange}
              className="w-full p-2 border border-yellow-400 rounded bg-transparent text-yellow-400"
              placeholder="e.g., 550"
            />
          </div>
          <div>
            <label className="block text-sm">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full p-2 border border-yellow-400 rounded bg-transparent text-yellow-400"
            >
              <option value="solo">Solo</option>
              <option value="team">Team</option>
            </select>
          </div>
          <div>
            <label className="block text-sm">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-yellow-400 rounded bg-transparent text-yellow-400"
              placeholder="e.g., Complete rides to earn rewards!"
            />
          </div>
          <div>
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                name="newbieRidesOnly"
                checked={formData.newbieRidesOnly}
                onChange={handleInputChange}
                className="mr-2"
              />
              Newbie Rides Only
            </label>
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500"
            >
              {isEditing ? 'Update Campaign' : 'Create Campaign'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    name: '',
                    requirement: '',
                    duration: '',
                    reward: '',
                    type: 'solo',
                    newbieRidesOnly: false,
                    description: '',
                  });
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Loading and Error States */}
      {loading && <p className="text-center">Loading data...</p>}
      {error && <p className="text-red-500 text-center">Error: {error}</p>}

      {/* Campaign Details */}
      {campaignData && !loading && !error ? (
        <div className="mb-6 p-4 border border-yellow-400 rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-md font-semibold">{campaignData.name}</h3>
            <div className="flex gap-2">
              <button
                onClick={handleEdit}
                className="px-3 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
          <p><strong>Requirement:</strong> {campaignData.requirement} rides</p>
          <p><strong>Reward:</strong> AED {campaignData.reward?.amount || 'N/A'}</p>
          <p><strong>Duration:</strong> {campaignData.duration} days</p>
          <p>
            <strong>Period:</strong>{' '}
            {campaignData.startDate && campaignData.endDate
              ? `${new Date(campaignData.startDate).toLocaleDateString()} - ${new Date(campaignData.endDate).toLocaleDateString()}`
              : 'N/A'}
          </p>
          <p>
            <strong>Time Left:</strong>{' '}
            {campaignData.timeLeft
              ? `${campaignData.timeLeft.days || 0} days, ${campaignData.timeLeft.hours || 0} hours`
              : 'N/A'}
          </p>
          <p><strong>Type:</strong> {campaignData.type}</p>
          <p><strong>Newbie Rides Only:</strong> {campaignData.newbieRidesOnly ? 'Yes' : 'No'}</p>
          <p><strong>Description:</strong> {campaignData.description || 'N/A'}</p>
          <p><strong>Total Participants:</strong> {campaignData.totalParticipants || 0}</p>
          <p><strong>Total Winners:</strong> {campaignData.totalWinners || 0}</p>
          <p><strong>Total Reward Distributed:</strong> AED {campaignData.totalRewardDistributed || 0}</p>
        </div>
      ) : !loading && !error ? (
        <p className="text-center">No active campaign available</p>
      ) : null}

      {/* User Position */}
      {userPosition && !loading && !error && (
        <div className="mb-6 p-4 border border-yellow-400 rounded-lg">
          <h3 className="text-md font-semibold mb-2">Your Position</h3>
          <p><strong>Rank:</strong> {userPosition.rank || 'Not ranked'}</p>
          <p><strong>Rides:</strong> {userPosition.rides || 0}</p>
        </div>
      )}

      {/* Leaderboard Table */}
      {!loading && !error && (
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-2">Leaderboard</h3>
          {leaderboardData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border border-yellow-400 text-sm">
                <thead className="border-b border-yellow-400">
                  <tr>
                    <th className="px-3 py-2">Rank</th>
                    <th className="px-3 py-2">Name</th>
                    <th className="px-3 py-2">Role</th>
                    <th className="px-3 py-2">Rides</th>
                    <th className="px-3 py-2">Ride Type</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Reward</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((entry, index) => (
                    <tr key={index} className="text-center hover:bg-[#014b38]">
                      <td className="px-3 py-2">{entry.rank}</td>
                      <td className="px-3 py-2">{entry.name.trim()}</td>
                      <td className="px-3 py-2">{entry.role}</td>
                      <td className="px-3 py-2">{entry.rides}</td>
                      <td className="px-3 py-2">{entry.rideType}</td>
                      <td className="px-3 py-2">{entry.status}</td>
                      <td className="px-3 py-2">AED {entry.reward}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center">No leaderboard data available</p>
          )}
        </div>
      )}

      {/* Pagination Info */}
      {pagination && !loading && !error && (
        <div className="mb-6 text-sm">
          <p>Page: {pagination.page} of {pagination.hasMore ? 'multiple' : '1'}</p>
          <p>Items per page: {pagination.limit}</p>
        </div>
      )}


    </div>
  );
};

export default MlmBbr;