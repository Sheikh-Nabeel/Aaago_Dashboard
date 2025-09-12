import React, { useEffect, useState } from "react";
import { toast } from "react-toastify"; // Import toast
import CrrLineChart from "./CrrLineChart";
import CrrTeamStructureChart from "./CrrTeamStructureChart";


const MlmCrr = () => {
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [crrConfigData, setCrrConfigData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch leaderboard data
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("https://aaaogo.xyz/api/mlm/crr/leaderboard");
        const result = await response.json();
        if (result.success) {
          setLeaderboardData(result.data.leaderboard);
        } else {
          setError("Failed to load leaderboard data");
        }
      } catch (err) {
        setError("Error fetching leaderboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  // Fetch CRR configuration
  useEffect(() => {
    const fetchCrrConfig = async () => {
      try {
        const response = await fetch("https://aaaogo.xyz/api/mlm/admin/crr/config");
        const result = await response.json();
        if (result.success) {
          setCrrConfigData(result.data);
          setFormData(result.data); // Initialize form data with fetched config
        } else {
          setError("Failed to load CRR configuration");
        }
      } catch (err) {
        setError("Error fetching CRR configuration");
      }
    };
    fetchCrrConfig();
  }, []);

  // Handle form input changes
  const handleInputChange = (e, rank, field, subField) => {
    setFormData((prev) => {
      const newData = { ...prev };
      if (subField) {
        newData.crrRanks[rank].requirements[subField] = Number(e.target.value);
      } else if (field === "crrConfig") {
        newData.crrConfig[e.target.name] = e.target.type === "checkbox" ? e.target.checked : Number(e.target.value);
      } else {
        newData.crrRanks[rank][field] = field === "reward" ? Number(e.target.value) : e.target.value;
      }
      return newData;
    });
  };

  // Handle form submission to update CRR configuration
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://aaaogo.xyz/api/mlm/admin/crr/config", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        setCrrConfigData(result.data);
        setIsEditing(false);
        toast.success("CRR configuration updated successfully!"); // Use toast instead of alert
      } else {
        setError("Failed to update CRR configuration");
      }
    } catch (err) {
      setError("Error updating CRR configuration");
    }
  };

  if (loading) {
    return <div className="p-4 text-center text-yellow-400">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  const topEarner = leaderboardData?.topEarners[0] || {};

  return (
    <div className="p-4 space-y-6 w-full text-yellow-400">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold">
          {leaderboardData?.title || "🥇 CRR Leaderboard – Top Earners:"}
        </h2>
        <h3 className="text-base font-semibold">
          Estimated AED Earned: <span>{topEarner.earnings || 0} AED</span>
        </h3>

        <div className="flex items-center gap-3">
          <label className="font-medium">Auto Reset:</label>
          <input
            type="date"
            className="bg-transparent border border-yellow-400 rounded px-2 py-1 text-sm focus:outline-none focus:ring focus:ring-yellow-400"
          />
          <span className="font-medium">To</span>
          <input
            type="date"
            className="bg-transparent border border-yellow-400 rounded px-2 py-1 text-sm focus:outline-none focus:ring focus:ring-yellow-400"
          />
          <span className="ml-4 text-sm font-medium">
            Days Until Reset: {crrConfigData?.crrConfig?.resetDay || "N/A"}
          </span>
        </div>
      </div>

      {/* CRR Configuration Section */}
      <div className="rounded-lg">
        <h3 className="text-base font-semibold mb-4">CRR Rank Configuration</h3>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {formData?.crrRanks &&
              Object.keys(formData.crrRanks).map((rank) => (
                <div key={rank} className="border border-yellow-400 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold">{formData.crrRanks[rank].name} {formData.crrRanks[rank].icon}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm">Name</label>
                      <input
                        type="text"
                        value={formData.crrRanks[rank].name}
                        onChange={(e) => handleInputChange(e, rank, "name")}
                        className="bg-transparent border border-yellow-400 rounded px-2 py-1 text-sm w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm">Icon</label>
                      <input
                        type="text"
                        value={formData.crrRanks[rank].icon}
                        onChange={(e) => handleInputChange(e, rank, "icon")}
                        className="bg-transparent border border-yellow-400 rounded px-2 py-1 text-sm w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm">Reward</label>
                      <input
                        type="number"
                        value={formData.crrRanks[rank].reward}
                        onChange={(e) => handleInputChange(e, rank, "reward")}
                        className="bg-transparent border border-yellow-400 rounded px-2 py-1 text-sm w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm">Status</label>
                      <select
                        value={formData.crrRanks[rank].status}
                        onChange={(e) => handleInputChange(e, rank, "status")}
                        className="bg-transparent border border-yellow-400 rounded px-2 py-1 text-sm w-full"
                      >
                        <option value="Achieved">Achieved</option>
                        <option value="Locked">Locked</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm">PGP Requirement</label>
                      <input
                        type="number"
                        value={formData.crrRanks[rank].requirements.pgp}
                        onChange={(e) => handleInputChange(e, rank, "requirements", "pgp")}
                        className="bg-transparent border border-yellow-400 rounded px-2 py-1 text-sm w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm">TGP Requirement</label>
                      <input
                        type="number"
                        value={formData.crrRanks[rank].requirements.tgp}
                        onChange={(e) => handleInputChange(e, rank, "requirements", "tgp")}
                        className="bg-transparent border border-yellow-400 rounded px-2 py-1 text-sm w-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            <div className="border border-yellow-400 p-4 rounded-lg">
              <h4 className="text-sm font-semibold">General Configuration</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm">Monthly Reset</label>
                  <input
                    type="checkbox"
                    name="monthlyReset"
                    checked={formData?.crrConfig.monthlyReset}
                    onChange={(e) => handleInputChange(e, null, "crrConfig")}
                    className="ml-2"
                  />
                </div>
                <div>
                  <label className="text-sm">Reset Day</label>
                  <input
                    type="number"
                    name="resetDay"
                    value={formData?.crrConfig.resetDay}
                    onChange={(e) => handleInputChange(e, null, "crrConfig")}
                    className="bg-transparent border border-yellow-400 rounded px-2 py-1 text-sm w-full"
                  />
                </div>
                <div>
                  <label className="text-sm">Point Value</label>
                  <input
                    type="number"
                    name="pointValue"
                    value={formData?.crrConfig.pointValue}
                    onChange={(e) => handleInputChange(e, null, "crrConfig")}
                    className="bg-transparent border border-yellow-400 rounded px-2 py-1 text-sm w-full"
                  />
                </div>
                <div>
                  <label className="text-sm">Leaderboard Update Interval (ms)</label>
                  <input
                    type="number"
                    name="leaderboardUpdateInterval"
                    value={formData?.crrConfig.leaderboardUpdateInterval}
                    onChange={(e) => handleInputChange(e, null, "crrConfig")}
                    className="bg-transparent border border-yellow-400 rounded px-2 py-1 text-sm w-full"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-400 text-black px-4 py-2 rounded mb-4 hover:bg-yellow-500"
            >
              Edit Configuration
            </button>
            <div className="grid grid-cols-2 gap-4">
              {crrConfigData?.crrRanks &&
                Object.keys(crrConfigData.crrRanks).map((rank) => (
                  <div key={rank} className="border border-yellow-400 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold">
                      {crrConfigData.crrRanks[rank].name} {crrConfigData.crrRanks[rank].icon}
                    </h4>
                    <p>Reward: {crrConfigData.crrRanks[rank].reward} AED</p>
                    <p>Status: {crrConfigData.crrRanks[rank].status}</p>
                    <p>PGP Requirement: {crrConfigData.crrRanks[rank].requirements.pgp}</p>
                    <p>TGP Requirement: {crrConfigData.crrRanks[rank].requirements.tgp}</p>
                  </div>
                ))}
            </div>
            <div className="border border-yellow-400 p-4 rounded-lg mt-4">
              <h4 className="text-sm font-semibold">General Configuration</h4>
              <p>Monthly Reset: {crrConfigData?.crrConfig.monthlyReset ? "Enabled" : "Disabled"}</p>
              <p>Reset Day: {crrConfigData?.crrConfig.resetDay}</p>
              <p>Point Value: {crrConfigData?.crrConfig.pointValue}</p>
              <p>Leaderboard Update Interval: {crrConfigData?.crrConfig.leaderboardUpdateInterval} ms</p>
              <p>
                Last Updated:{" "}
                {crrConfigData?.lastUpdated
                  ? new Date(crrConfigData.lastUpdated).toLocaleString("en-US", {
                      timeZone: "Asia/Karachi",
                    })
                  : "N/A"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Top Earners Table */}
      <div className="rounded-lg">
        <h3 className="text-base font-semibold mb-4">Top Earners</h3>
        <div className="overflow-x-auto">
          <table className="w-full border border-yellow-400 text-sm">
            <thead className="border-b border-yellow-400 bg-[#013723]">
              <tr>
                <th className="px-3 py-2">Position</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Username</th>
                <th className="px-3 py-2">Rank</th>
                <th className="px-3 py-2">Earnings</th>
                <th className="px-3 py-2">PGP</th>
                <th className="px-3 py-2">TGP</th>
                <th className="px-3 py-2">Total Points</th>
                <th className="px-3 py-2">Progress (PGP/TGP/Overall)</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData?.topEarners.length > 0 ? (
                leaderboardData.topEarners.map((earner) => (
                  <tr
                    key={earner.position}
                    className="text-center hover:bg-[#014b38]"
                  >
                    <td className="px-3 py-2">{earner.position}</td>
                    <td className="px-3 py-2">
                      {earner.name} {earner.rankIcon}
                    </td>
                    <td className="px-3 py-2">{earner.username}</td>
                    <td className="px-3 py-2">{earner.rank}</td>
                    <td className="px-3 py-2">{earner.earnings} AED</td>
                    <td className="px-3 py-2">
                      {earner.qualificationPoints.pgp}
                    </td>
                    <td className="px-3 py-2">
                      {earner.qualificationPoints.tgp}
                    </td>
                    <td className="px-3 py-2">
                      {earner.qualificationPoints.total}
                    </td>
                    <td className="px-3 py-2">
                      {earner.progress.pgp}% / {earner.progress.tgp}% /{" "}
                      {earner.progress.overall}%
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="px-3 py-2 text-gray-400">
                    No top earners available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>



      {/* Metadata */}
      <div className="flex justify-between text-sm">
        <p>Total Participants: {leaderboardData?.totalParticipants || 0}</p>
        <p>
          Last Updated:{" "}
          {leaderboardData?.lastUpdated
            ? new Date(leaderboardData.lastUpdated).toLocaleString("en-US", {
                timeZone: "Asia/Karachi",
              })
            : "N/A"}
        </p>
      </div>

      {/* Tip */}
      {leaderboardData?.tip && (
        <div className="p-4 bg-[#013723] rounded-lg text-center text-sm">
          <p>{leaderboardData.tip}</p>
        </div>
      )}

      {/* Team Structure Chart */}
      <div className="p-4 rounded-lg shadow-lg">
        <h3 className="text-base font-semibold mb-4">Team Structure</h3>
        <CrrTeamStructureChart />
      </div>
    </div>
  );
};

export default MlmCrr;