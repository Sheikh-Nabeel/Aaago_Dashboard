import React from 'react';
import Sidebar from '../../Home/Sidebar';
import LineChart from './LineChart';
import { FaUser } from "react-icons/fa";
import { RiUserStarFill } from "react-icons/ri";
import { TbUserQuestion } from "react-icons/tb";
import { PiSealQuestionBold } from "react-icons/pi";
import { LiaIdCardSolid } from "react-icons/lia";

import { FiFilter } from "react-icons/fi"; // ✅ your original filter icon
import SparklineCharts from './SparklineCharts';
import ReportNavbar from '../ReportNavbar';

const data = [
  {
    total: 'Total User',
    percent: '1,250',
    chartData: [10, 20, 15, 30, 25, 35],
    Icon: FaUser,
  },
  {
    total: 'Active Users',
    percent: '1,250',
    chartData: [5, 10, 8, 12, 14, 18],
    Icon: RiUserStarFill,
  },
  {
    total: 'Inactive Users',
    percent: '1,250',
    chartData: [20, 18, 16, 14, 12, 10],
    Icon: TbUserQuestion,
  },
  {
    total: 'Verified KYC',
    percent: '1,250',
    chartData: [5, 15, 25, 35, 30, 40],
    Icon: LiaIdCardSolid,
  },
  {
    total: 'Unverified KYC',
    percent: '1,250',
    chartData: [40, 35, 30, 25, 20, 15],
    Icon: PiSealQuestionBold,
  },
];

const ReportAnalytics = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className='flex-1 overflow-hidden'>
        <ReportNavbar />
        <div className=' mr-10 px-10 py-10 overflow-hidden'>

         
            <div className="flex items-center gap-4 py-2 justify-end  ">
              {/* Date Range */}
              <div className="flex items-center gap-2 text-yellow-400 text-sm">
                <label htmlFor="from">From:</label>
                <input
                  type="date"
                  id="from"
                  className="bg-transparent border border-yellow-400 text-yellow-400 px-2 py-1 rounded text-sm focus:outline-none"
                />
                <label htmlFor="to">To:</label>
                <input
                  type="date"
                  id="to"
                  className="bg-transparent border border-yellow-400 text-yellow-400 px-2 py-1 rounded text-sm focus:outline-none"
                />
              </div>
            </div>
          

          {/* First Row: First Card Only */}
          <div className='grid grid-cols-1 mb-6'>
            {data.slice(0, 1).map((item, index) => {
              const IconComponent = item.Icon;
              return (
                <div
                  key={index}
                  className='flex flex-col gap-4 shadow-lg rounded-lg outline outline-black/20 px-5 py-5 bg-gradient-to-b from-[#038A59] to-[#013723] shadow-black/80'
                >
                  <div className='flex gap-2 items-center'>
                    <IconComponent size={30} />
                    <p className='text-lg font-semibold m-0 tracking-wide'>{item.total}</p>
                  </div>
                  <h2 className='text-3xl font-bold'>{item.percent}</h2>
                  <SparklineCharts data={item.chartData} />
                </div>
              );
            })}
          </div>

          {/* Second Row: Remaining 4 Cards */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {data.slice(1).map((item, index) => {
              const IconComponent = item.Icon;
              return (
                <div
                  key={index}
                  className='flex flex-col gap-4 shadow-lg rounded-lg outline outline-black/20 px-5 py-5 bg-gradient-to-b from-[#038A59] to-[#013723] shadow-black/80'
                >
                  <div className='flex gap-2 items-center'>
                    <IconComponent size={30} />
                    <p className='text-lg font-semibold m-0 tracking-wide'>{item.total}</p>
                  </div>
                  <h2 className='text-3xl font-bold'>{item.percent}</h2>
                  <SparklineCharts data={item.chartData} />
                </div>
              );
            })}
          </div>

          {/* Line Chart */}
          <div className='pt-12'>
            <LineChart />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ReportAnalytics;
