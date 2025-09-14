import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../services/axiosConfig";

const CircularChart = ({ label, percentage, isEditing, onPercentageChange }) => {
  const radius = 80;
  const stroke = 12;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center">
      <svg height={radius * 2} width={radius * 2}>
        <defs>
          {/* Yellow to orange gradient */}
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FFA500" />
          </linearGradient>
        </defs>

        {/* Background Circle */}
        <circle
          stroke="#2E4437"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* Foreground Arc with Gradient, rotated to start at left */}
       <circle
  stroke="url(#goldGradient)"
  fill="transparent"
  strokeWidth={stroke}
  strokeLinecap="round"
  strokeDasharray={circumference}
  strokeDashoffset={strokeDashoffset}
  r={normalizedRadius}
  cx={radius}
  cy={radius}
  style={{
    transform: "rotate(90deg)", // start from left
    transformOrigin: "50% 50%",
  }}
/>

      </svg>

      {/* Centered Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="font-semibold text-sm">{label}</div>
        {isEditing ? (
          <input
            type="number"
            value={percentage}
            onChange={(e) => onPercentageChange(parseInt(e.target.value) || 0)}
            className="w-12 bg-transparent border border-yellow-400 rounded text-center text-sm font-semibold"
            min="0"
            max="100"
          />
        ) : (
          <div className="font-semibold text-sm">{percentage}%</div>
        )}
      </div>
    </div>
  );
};

const CrrTeamStructureChart = () => {
  const [legPercentages, setLegPercentages] = useState({
    legA: 40,
    legB: 30,
    legC: 30
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch leg percentages on component mount
  useEffect(() => {
    fetchLegPercentages();
  }, []);

  const fetchLegPercentages = async () => {
    try {
      const response = await axiosInstance.get('/mlm/admin/crr/leg-percentages');
      if (response.data.success) {
        setLegPercentages(response.data.data.legPercentages);
        setLastUpdated(response.data.data.lastUpdated);
      }
    } catch (error) {
      console.error('Error fetching leg percentages:', error);
      toast.error('Failed to fetch leg percentages');
    } finally {
      setLoading(false);
    }
  };

  const updateLegPercentages = async () => {
    try {
      const response = await axiosInstance.put('/mlm/admin/crr/global-leg-percentages', {
        legPercentages
      });
      if (response.data.success) {
        setLastUpdated(response.data.data.lastUpdated);
        setIsEditing(false);
        toast.success('Leg percentages updated successfully');
      }
    } catch (error) {
      console.error('Error updating leg percentages:', error);
      toast.error('Failed to update leg percentages');
    }
  };

  const handlePercentageChange = (leg, value) => {
    setLegPercentages(prev => ({
      ...prev,
      [leg]: value
    }));
  };

  const handleCancel = () => {
    setIsEditing(false);
    fetchLegPercentages(); // Reset to original values
  };

  if (loading) {
    return <div className="text-yellow-400">Loading team structure...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Team Structure Compliance</h2>
        <div className="flex gap-2">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 bg-yellow-600 text-black rounded text-sm font-semibold hover:bg-yellow-500"
            >
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={updateLegPercentages}
                className="px-3 py-1 bg-green-600 text-white rounded text-sm font-semibold hover:bg-green-500"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm font-semibold hover:bg-red-500"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
      
      <div className="py-10 flex justify-around gap-16 w-2/3">
        <CircularChart 
          label="Leg A" 
          percentage={legPercentages.legA} 
          isEditing={isEditing}
          onPercentageChange={(value) => handlePercentageChange('legA', value)}
        />
        <CircularChart 
          label="Leg B" 
          percentage={legPercentages.legB} 
          isEditing={isEditing}
          onPercentageChange={(value) => handlePercentageChange('legB', value)}
        />
        <CircularChart 
          label="Leg C" 
          percentage={legPercentages.legC} 
          isEditing={isEditing}
          onPercentageChange={(value) => handlePercentageChange('legC', value)}
        />
      </div>
      
      {lastUpdated && (
        <div className="text-sm text-gray-400 mt-2">
          Last updated: {new Date(lastUpdated).toLocaleString()}
        </div>
      )}
    </div>
  );
};

export default CrrTeamStructureChart;
