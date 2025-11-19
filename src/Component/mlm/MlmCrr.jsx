import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CrrLineChart from "./CrrLineChart";
import axiosInstance from "../../services/axiosConfig";
import { getCrrLegPercentages, updateGlobalLegPercentages } from "../../features/Mlm/mlmService";


const MlmCrr = () => {
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [crrConfigData, setCrrConfigData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [legData, setLegData] = useState(null);
  const [legForm, setLegForm] = useState(null);
  const [isLegEditing, setIsLegEditing] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [leaderboardRes, configRes, legsRes] = await Promise.all([
          axiosInstance.get("/mlm/crr/leaderboard"),
          axiosInstance.get("/mlm/admin/crr/config"),
          getCrrLegPercentages(),
        ]);

        if (!cancelled) {
          const lb = leaderboardRes.data;
          if (lb?.success) setLeaderboardData(lb.data.leaderboard);

          const cfg = configRes.data;
          if (cfg?.success) {
            setCrrConfigData(cfg.data);
            setFormData(cfg.data);
          }

          if (legsRes) {
            setLegData(legsRes);
            setLegForm({
              legSplitRatio: { ...legsRes.legSplitRatio },
              legPercentages: { ...legsRes.legPercentages },
            });
          }
        }
      } catch (err) {
        const msg = err?.message || 'Error fetching CRR data';
        setError(msg);
        toast.error(msg);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchAll();
    return () => { cancelled = true; };
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
      const response = await axiosInstance.put("/mlm/admin/crr/config", formData);
      const result = response.data;
      if (result.success) {
        setCrrConfigData(result.data);
        setIsEditing(false);
        toast.success("CRR configuration updated successfully!");
      } else {
        setError("Failed to update CRR configuration");
      }
    } catch {
      setError("Error updating CRR configuration");
    }
  };

  const handleLegInputChange = (e, section, key) => {
    const value = Number(e.target.value);
    setLegForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleLegSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        legSplitRatio: legForm.legSplitRatio,
        legPercentages: legForm.legPercentages,
      };
      const data = await updateGlobalLegPercentages(payload);
      setLegData({ ...data, lastUpdated: data.lastUpdated });
      setIsLegEditing(false);
      toast.success("Leg percentages updated successfully!");
    } catch {
      setError("Failed to update leg percentages");
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
            <div className="border border-yellow-400 p-4 rounded-lg mt-4">
              <h4 className="text-sm font-semibold mb-2">Leg Split & Percentages</h4>
              {!isLegEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-6 items-start">
                    <div className="flex flex-col items-center gap-2">
                      <div className="rounded-full flex items-center justify-center" style={{ width: '140px', height: '140px', background: `conic-gradient(#DDC104 ${((legData?.legSplitRatio?.fromThreeLegs ?? 0) * 3.6)}deg, #013723 0deg)` }}>
                        <div className="rounded-full flex items-center justify-center text-2xl font-semibold" style={{ width: '108px', height: '108px', background: '#013220' }}>{Math.round(legData?.legSplitRatio?.fromThreeLegs ?? 0)}%</div>
                      </div>
                      <div className="text-xs">From Three Legs</div>
                      <div className="mt-3 grid grid-cols-3 gap-3">
                        {['legA','legB','legC'].map((k) => (
                          <div key={k} className="flex flex-col items-center gap-1">
                            <div className="rounded-full flex items-center justify-center" style={{ width: '90px', height: '90px', background: `conic-gradient(#DDC104 ${((legData?.legPercentages?.[k] ?? 0) * 3.6)}deg, #013723 0deg)` }}>
                              <div className="rounded-full flex items-center justify-center text-lg font-semibold" style={{ width: '68px', height: '68px', background: '#013220' }}>{Math.round(legData?.legPercentages?.[k] ?? 0)}%</div>
                            </div>
                            <div className="text-xs uppercase">{k.replace('leg','Leg ')}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="rounded-full flex items-center justify-center" style={{ width: '140px', height: '140px', background: `conic-gradient(#DDC104 ${((legData?.legSplitRatio?.fromOtherLegs ?? 0) * 3.6)}deg, #013723 0deg)` }}>
                        <div className="rounded-full flex items-center justify-center text-2xl font-semibold" style={{ width: '108px', height: '108px', background: '#013220' }}>{Math.round(legData?.legSplitRatio?.fromOtherLegs ?? 0)}%</div>
                      </div>
                      <div className="text-xs">From Other Legs</div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-300">Last Updated: {legData?.lastUpdated ? new Date(legData.lastUpdated).toLocaleString() : 'N/A'}</p>
                  <button onClick={() => setIsLegEditing(true)} className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500">Edit</button>
                </div>
              ) : (
                <form onSubmit={handleLegSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-6 items-start">
                    <div className="flex flex-col items-center gap-2">
                      <div className="rounded-full flex items-center justify-center" style={{ width: '140px', height: '140px', background: `conic-gradient(#DDC104 ${((legForm?.legSplitRatio?.fromThreeLegs ?? 0) * 3.6)}deg, #013723 0deg)` }}>
                        <div className="rounded-full flex items-center justify-center text-2xl font-semibold" style={{ width: '108px', height: '108px', background: '#013220' }}>{Math.round(legForm?.legSplitRatio?.fromThreeLegs ?? 0)}%</div>
                      </div>
                      <div className="text-xs">From Three Legs</div>
                      <input type="number" value={legForm?.legSplitRatio?.fromThreeLegs ?? 0} onChange={(e) => handleLegInputChange(e, 'legSplitRatio', 'fromThreeLegs')} className="bg-transparent border border-yellow-400 rounded px-2 py-1 text-sm w-24 text-center" />
                      <div className="mt-3 grid grid-cols-3 gap-3">
                        {['legA','legB','legC'].map((k) => (
                          <div key={k} className="flex flex-col items-center gap-1">
                            <div className="rounded-full flex items-center justify-center" style={{ width: '90px', height: '90px', background: `conic-gradient(#DDC104 ${((legForm?.legPercentages?.[k] ?? 0) * 3.6)}deg, #013723 0deg)` }}>
                              <div className="rounded-full flex items-center justify-center text-lg font-semibold" style={{ width: '68px', height: '68px', background: '#013220' }}>{Math.round(legForm?.legPercentages?.[k] ?? 0)}%</div>
                            </div>
                            <div className="text-xs uppercase">{k.replace('leg','Leg ')}</div>
                            <input type="number" value={legForm?.legPercentages?.[k] ?? 0} onChange={(e) => handleLegInputChange(e, 'legPercentages', k)} className="bg-transparent border border-yellow-400 rounded px-2 py-1 text-sm w-20 text-center" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="rounded-full flex items-center justify-center" style={{ width: '140px', height: '140px', background: `conic-gradient(#DDC104 ${((legForm?.legSplitRatio?.fromOtherLegs ?? 0) * 3.6)}deg, #013723 0deg)` }}>
                        <div className="rounded-full flex items-center justify-center text-2xl font-semibold" style={{ width: '108px', height: '108px', background: '#013220' }}>{Math.round(legForm?.legSplitRatio?.fromOtherLegs ?? 0)}%</div>
                      </div>
                      <div className="text-xs">From Other Legs</div>
                      <input type="number" value={legForm?.legSplitRatio?.fromOtherLegs ?? 0} onChange={(e) => handleLegInputChange(e, 'legSplitRatio', 'fromOtherLegs')} className="bg-transparent border border-yellow-400 rounded px-2 py-1 text-sm w-24 text-center" />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500">Save</button>
                    <button type="button" onClick={() => setIsLegEditing(false)} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">Cancel</button>
                  </div>
                </form>
              )}
            </div>
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

      
    </div>
  );
};

export default MlmCrr;