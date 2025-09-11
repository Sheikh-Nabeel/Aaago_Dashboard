import React from 'react';
import Sidebar from '../../Home/Sidebar';
import { TbUserQuestion } from "react-icons/tb";
import ReportNavbar from '../ReportNavbar';
import SparkChart from './SparkChart';
import LineCharts from './LineCharts';
import { RiUserStarFill } from "react-icons/ri";
import { RiWifiOffLine } from "react-icons/ri";


const data = [
  {
    total: 'Total Driver',
    percent: '1,250',
    desc:'Last updated Aug 3, 2025',
    chartData: [20, 18, 16, 14, 12, 10],
    Icon: TbUserQuestion,
  },
  {
    total: 'Online Drivers',
    percent: '1,250',
    desc:'Currently active & available for booking',
    chartData: [5, 15, 25, 35, 30, 40],
    Icon: RiUserStarFill,
  },
  {
    total: 'Unverified KYC',
    percent: '1,250',
    desc:'Driver inactive, logged out, or unavailable',
    chartData: [40, 35, 30, 25, 20, 15],
    Icon: RiWifiOffLine,
  },
];

const DriverReport = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className='flex-1 overflow-hidden'>
        <ReportNavbar />
        <div className='mr-10 px-10 py-10 overflow-hidden'>

         {/* Filters: Date Range, Service Type, City, Day */}
<div className="flex flex-wrap justify-between items-center gap-4 py-2">
  {/* Left side: Service Type, City, Day */}
  {/* Right side: Date Range */}
  <div className="flex items-center gap-2 text-yellow-400 text-sm">
    <label htmlFor="from">Date Range:</label>
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
  <div className="flex text-yellow-400 text-sm">
    {/* Service Type */}
    <div className="flex items-center">
      <label htmlFor="service">Service Type:</label>
      <select
        id="service"
        className="bg-transparent text-yellow-400  rounded focus:outline-none text-sm"
      >
        <option className="bg-black text-yellow-400">All</option>
        <option className="bg-black text-yellow-400">Recovery</option>
        <option className="bg-black text-yellow-400">Workshop</option>
      </select>
    </div>
  </div>
  {/* City */}
    <div className="flex items-center">
      <label htmlFor="city">City:</label>
      <select
        id="city"
        className="bg-transparent text-yellow-400  rounded focus:outline-none text-sm"
      >
        <option className="bg-black text-yellow-400">All</option>
        <option className="bg-black text-yellow-400">Dubai</option>
        <option className="bg-black text-yellow-400">Sharjah</option>
        <option className="bg-black text-yellow-400">Abu Dhabi</option>
      </select>
    </div>
     {/* Day */}
    <div className="flex items-center">
      <label htmlFor="day">Day:</label>
      <select
        id="day"
        className="bg-transparent text-yellow-400  rounded focus:outline-none text-sm"
      >
        <option className="bg-black text-yellow-400">All</option>
        <option className="bg-black text-yellow-400">Today</option>
        <option className="bg-black text-yellow-400">Last 7 Days</option>
        <option className="bg-black text-yellow-400">Last 30 Days</option>
      </select>
    </div>
</div>


          {/* All Cards */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
            {data.map((item, index) => {
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
                  <p className='text-sm'>{item.desc}</p>
                  <SparkChart data={item.chartData} />
                </div>
              );
            })}
          </div>

          {/* Line Chart */}
          <div className='pt-12'>
            <LineCharts />
          </div>

        </div>
      </div>
    </div>
  );
};

export default DriverReport;
