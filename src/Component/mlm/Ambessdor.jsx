import React, { useState, useEffect } from 'react';

const Ambassador = () => {
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [ambassadorsData, setAmbassadorsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch regional leaderboard
        const leaderboardResponse = await fetch(
          'http://localhost:3001/api/mlm/regional/leaderboard'
        );
        const leaderboardResult = await leaderboardResponse.json();
        
        // Fetch global ambassadors
        const ambassadorsResponse = await fetch(
          'http://localhost:3001/api/mlm/regional/global-ambassadors?page=1&limit=20'
        );
        const ambassadorsResult = await ambassadorsResponse.json();

        setLeaderboardData(leaderboardResult.data);
        setAmbassadorsData(ambassadorsResult.data);
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-10 text-yellow-400">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4 text-yellow-400">
      {/* Regional Leaderboard Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Pakistan Leaderboard</h2>
        <div className="grid gap-4">
          {leaderboardData?.leaderboard?.map((entry) => (
            <div 
              key={entry.username} 
              className="flex items-center p-4 border border-yellow-400 rounded-lg hover:bg-[#014b38]"
            >
              <span className="w-12 text-lg font-bold">{entry.rank}</span>
              <span className="w-8 text-2xl">{entry.flag}</span>
              <div className="flex-1">
                <p className="font-semibold">{entry.name}</p>
                <p className="text-yellow-400">@{entry.username}</p>
              </div>
              <div className="text-right">
                <p className="text-yellow-400">Points: {entry.totalPoints}</p>
                <p className="text-sm text-yellow-400">
                  Achieved: {new Date(entry.achievedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global Ambassadors Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Global Ambassadors</h2>
        <div className="grid gap-4">
          {ambassadorsData?.ambassadors?.map((ambassador) => (
            <div 
              key={ambassador.id} 
              className="flex items-center p-4 border border-yellow-400 rounded-lg hover:bg-[#014b38]"
            >
              <span className="w-8 text-2xl">{ambassador.flag}</span>
              <div className="flex-1">
                <p className="font-semibold">{ambassador.name}</p>
                <p className="text-yellow-400">@{ambassador.username}</p>
                <p className="text-sm text-yellow-400">Country: {ambassador.country || 'N/A'}</p>
              </div>
              <div className="text-right">
                <p className="text-yellow-400">Earnings: {ambassador.totalEarnings}</p>
                <p className="text-sm text-yellow-400">
                  Achieved: {new Date(ambassador.achievedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-yellow-400">
          Total Ambassadors: {ambassadorsData?.totalAmbassadors} | 
          Total Countries: {ambassadorsData?.totalCountries}
        </p>
      </div>
    </div>
  );
};

export default Ambassador;