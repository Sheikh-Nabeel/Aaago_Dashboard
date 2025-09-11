import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const IssueTableChart = () => {
  const [startDate, setStartDate] = useState("18/July/25");
  const [endDate, setEndDate] = useState("21/July/25");
  const [sortBy, setSortBy] = useState("Day");

  const tableData = Array(6).fill({
    title: "Payment Failures",
    count: 124,
    percent: "26%",
  });

  const chartData = [
    { name: "Login Issues", value: 45 },
    { name: "Account Issues", value: 25 },
    { name: "Payment Issues", value: 55 },
    { name: "Technical Issues", value: 15 },
  ];

  return (
    <div className="text-yellow-400 min-h-screen p-6">
      {/* Table */}
      <div className="border border-yellow-400 rounded-lg p-4 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-yellow-400">
              <th className="p-2 text-left">Issue Category</th>
              <th className="p-2 text-left">Ticket Count</th>
              <th className="p-2 text-left">% of Total</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, idx) => (
              <tr key={idx} className="border-b border-yellow-400 last:border-none">
                <td className="p-2">{row.title}</td>
                <td className="p-2">{row.count}</td>
                <td className="p-2">{row.percent}</td>
                <td className="p-2">
                  <button className="bg-yellow-400 text-[#003d2d] px-3 py-1 rounded-full text-sm font-semibold">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Date range and sort */}
      <div className="flex items-center justify-center gap-4 mt-6 text-sm">
        <span>Date Range :</span>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-yellow-400 bg-transparent px-2 py-1 rounded text-yellow-400"
        />
        <span>To</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border border-yellow-400 bg-transparent px-2 py-1 rounded text-yellow-400"
        />
        <span>Sort:</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-yellow-400 bg-transparent px-2 py-1 rounded text-yellow-400"
        >
          <option value="Day">Day</option>
          <option value="Week">Week</option>
          <option value="Month">Month</option>
        </select>
      </div>

      {/* Chart */}
      <div className="border border-yellow-400 rounded-lg p-4 mt-6">
        <h2 className="font-semibold mb-4">Chart Type:</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#FFD700" />
            <XAxis dataKey="name" stroke="#FFD700" />
            <YAxis stroke="#FFD700" />
            <Tooltip
              contentStyle={{ backgroundColor: "#003d2d", borderColor: "#FFD700" }}
              labelStyle={{ color: "#FFD700" }}
            />
            <Bar dataKey="value" fill="#FFD700" barSize={40} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IssueTableChart;
