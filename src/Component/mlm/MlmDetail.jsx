import React from 'react';
import { IoIosArrowDown } from "react-icons/io";
import SparklineChart from './SparklineChart';


const data = [
  {
    total: 'Total Income',
    percent: '$100000',
    chartData: [20, 40, 86, 60, 90]
  },
  {
    total: 'Company Expense',
    percent: '$10000',
    chartData: [10, 22, 34, 25, 15]
  }
];

const MlmDetail = () => {
  return (
    <div className='text-[#DDC104] mr-10 py-8'> 
      <div className='flex justify-end mr-[130px] pb-1'>
        <label htmlFor="" className='text-sm mr-1'>Sort by:</label>
        <select className='bg-transparent text-sm focus:outline-none'>
          <option className='bg-yellow-300 text-black' value="Monthly">Monthly</option>
          <option className='bg-yellow-300 text-black' value="Yearly">Yearly</option>
          <option className='bg-yellow-300 text-black' value="Weekly">Weekly</option>
        </select>
      </div>

      <div className='flex justify-around items-center flex-wrap gap-6'>
        {data.map((item, index) => (
          <div
            key={index}
            className='flex flex-col gap-4 shadow-lg bg-gradient-to-b from-[#038A59] to-[#013723] rounded-lg px-6 py-5 outline outline-black/20 shadow-black/80 w-80'
          >
            <p className='text-lg font-semibold tracking-wide'>{item.total}</p>
            <h2 className='text-3xl font-bold'>{item.percent}</h2>
            <SparklineChart data={item.chartData} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MlmDetail;
