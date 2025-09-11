import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const PaeChartComponent = () => {
  const [region, setRegion] = useState('Dubai');

  const chartOptions = {
    chart: {
      type: 'pie',
      toolbar: { show: false },
    },
    labels: ['Safe', 'Medium risk', 'High fraud'],
    colors: ['#D9D9D9', '#FFD700', '#FF0000'],
    legend: { show: false },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        colors: ['#000000'],
      },
    },
  };

  const chartSeries = [60, 20, 20];

  return (
    <div className="min-h-screen bg-[#013220] text-yellow-300 font-sans p-8">
      {/* Top Row: Heading and Date Range Filter */}
      <div className="flex justify-between items-center flex-wrap mb-6">
        <h2 className="text-xl font-bold">Pie Chart :</h2>
        <div className="flex items-center gap-2 text-sm mt-2 md:mt-0">
          <span>Date Range:</span>
          <input
            type="date"
            className="bg-transparent border border-yellow-400 text-yellow-300 px-2 py-1 rounded"
            defaultValue="2025-07-18"
          />
          <span>to</span>
          <input
            type="date"
            className="bg-transparent border border-yellow-400 text-yellow-300 px-2 py-1 rounded"
            defaultValue="2025-07-21"
          />
        </div>
      </div>

      {/* Bottom Row: Chart + Info Box */}
      <div className="flex mt-12 items-start gap-8">
        {/* Chart */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="pie"
            width="320"
          />
        </div>

        {/* Info Box */}
        <div className="border border-yellow-300 rounded-xl p-4 w-full md:w-[200px] text-sm">
         

          {/* Region Select */}
          <div className="mb-6">
            <label className="block mb-4">Select Region</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full bg-[#013220] text-yellow-300 rounded-full border border-yellow-300 px-2 py-1 focus:outline-none"
            >
              <option value="Dubai">Dubai</option>
              <option value="Karachi">Karachi</option>
              <option value="Lahore">Lahore</option>
              <option value="Riyadh">Riyadh</option>
            </select>
          </div>

          {/* Stats */}
          <div className="space-y-8">
            <div>12 GPS Spoofs</div>
            <div>4 Referral Flags</div>
            <div>Last Trigger: 2 hours ago</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaeChartComponent;
