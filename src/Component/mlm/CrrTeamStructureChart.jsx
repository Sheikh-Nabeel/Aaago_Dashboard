import React from "react";

const CircularChart = ({ label, percentage }) => {
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
        <div className="font-semibold text-sm">{percentage}%</div>
      </div>
    </div>
  );
};

const CrrTeamStructureChart = () => {
  return (
    <div>
      <h2 className="text-xl font-bold ">Team Structure Compliance</h2>
    <div className="py-10 flex justify-around gap-16 w-2/3">
      <CircularChart label="Power Leg" percentage={30} />
      <CircularChart label="Weaker Leg1" percentage={60} />
      <CircularChart label="Weaker Leg2" percentage={60} />
    </div>
    </div>
  );
};

export default CrrTeamStructureChart;
