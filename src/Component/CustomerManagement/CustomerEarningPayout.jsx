import React, { useState } from 'react';
import CustomerDetailnav from './CustomerDetailnav';
import { FaChevronDown } from 'react-icons/fa';
import { SlCalender } from "react-icons/sl";
import SparklineChart from './SparklineChart'; // ✅ Import your sparkline chart

const data = [
  {
    date: '21/July/2025',
    time: '11:00 Pm',
    amount: 100,
    payment: 'Bank: ABM Bank Abu Dhabi',
  },
  {
    date: '21/July/2025',
    time: '11:00 Pm',
    amount: 100,
    payment: 'Bank: ABM Bank Abu Dhabi',
  },
  {
    date: '21/July/2025',
    time: '11:00 Pm',
    amount: 100,
    payment: 'Bank: ABM Bank Abu Dhabi',
  },
];

const totalpayment = [
  {
    title: 'Total Deposit',
    money: 1000,
    chartData: [20, 40, 86, 60, 90], // ✅ Chart data
  },
  {
    title: 'Total Withdraw',
    money: 1000,
    chartData: [10, 22, 34, 25, 15], // ✅ Chart data
  },
];

// Custom dropdown component
const CustomSortDropdown = ({ sortBy, setSortBy, options }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative text-sm">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 "
      >
        Sort By: {sortBy}
        <FaChevronDown className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <ul className="absolute right-0 mt-2 w-20 bg-green-900 border border-yellow-400 rounded-md shadow-lg z-10">
          {options.map((opt, index) => (
            <li
              key={index}
              className="px-2 py-2 hover:bg-yellow-500 hover:text-black cursor-pointer"
              onClick={() => {
                setSortBy(opt);
                setOpen(false);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const CustomerEarningPayout = () => {
  const [sortBy, setSortBy] = useState('Earn');
  const options = ['Earn', 'Rating', 'Complaints'];

  return (
    <div className="text-yellow-400 w-full pt-2 px-2">
      
      {/* Date Picker & Sort */}
      <div className="flex items-center justify-end flex-wrap gap-4 mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <label className="flex items-center space-x-2">
            <div className="text-sm flex items-center gap-1"><SlCalender/> <span>Date:</span></div>
            <input
              type="date"
              className="bg-transparent  text-yellow-300 focus:outline-none text-sm"
            />
          </label>

          <span className="text-sm pr-3">To</span>

          <label className="flex items-center space-x-2">
            <div className="text-sm flex items-center gap-1"><SlCalender/> <span>Date:</span></div>
            <input
              type="date"
              className="bg-transparent  text-yellow-300 focus:outline-none text-sm"
            />
          </label>
        </div>

        <CustomSortDropdown sortBy={sortBy} setSortBy={setSortBy} options={options} />
      </div>
      <CustomerDetailnav />

      {/* Deposit & Withdraw Cards */}
      <div className="pt-4">
        <div className="flex justify-center gap-10 my-4 flex-wrap">
          {totalpayment.map((item, index) => (
            <div
              key={index}
              className="rounded-xl shadow-lg px-6 py-4 bg-gradient-to-b from-[#038A59] to-[#013723] shadow-black space-y-2 min-w-[200px]"
            >
              <p className="font-semibold text-xl">{item.title}</p>
              <h3 className="font-bold text-2xl">${item.money}</h3>
              <SparklineChart data={item.chartData} /> {/* ✅ Chart added */}
            </div>
          ))}
        </div>

        {/* Transactions Table */}
        <table className="w-full text-sm text-left table-fixed">
          <thead>
            <tr className="border-b border-yellow-200">
              <th className="w-[20%] px-6 py-3">Date</th>
              <th className="w-[20%] px-4 py-3">Time</th>
              <th className="w-[20%] px-4 py-3">Amount</th>
              <th className="w-[20%] px-4 py-3 text-center">Payment Method</th>
              <th className="w-[20%] px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="w-[20%] px-6 py-3">{item.date}</td>
                <td className="w-[20%] px-4 py-3">{item.time}</td>
                <td className="w-[20%] px-4 py-3">${item.amount}</td>
                <td className="w-[20%] px-4 py-3 text-center">{item.payment}</td>
                <td className="w-[20%] px-4 py-3">
                  <div className="flex items-center gap-3 justify-center">
                    <button className="bg-yellow-400 text-[#013220] px-4 py-1.5 cursor-pointer rounded-full text-xs font-medium">
                     View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerEarningPayout;
