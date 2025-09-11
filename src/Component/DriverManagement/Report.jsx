import React from 'react';
import Chart from 'react-apexcharts';
import DriverDetailnav from './DriverDetailnav';
import { CiLocationOn } from "react-icons/ci";
import { FaCar } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
import { PiMoneyLight } from "react-icons/pi";
import { MdOutlineAssignmentLate } from "react-icons/md";
import { TiArrowBackOutline } from 'react-icons/ti';
import { Link } from 'react-router-dom';

const data = [
  {
    date: '24-July-25',
    rides: '15',
    distance: '180KM',
    earning: 1200,
    latestart: 1,
  },
  {
    date: '24-July-25',
    rides: '15',
    distance: '180KM',
    earning: 1200,
    latestart: 1,
  },
 
];

const Report = () => {
  const options = {
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: { show: false },
      background: '#013220',
    },
    plotOptions: {
      bar: {
        columnWidth: '25%',
        borderRadius: 8,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
        endingShape: 'flat',
      },
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: [
        '18/Jul/25',
        '19/Jul/25',
        '20/Jul/25',
        '21/Jul/25',
        '22/Jul/25',
        '23/Jul/25',
        '24/Jul/25',
      ],
      labels: {
        style: {
          colors: '#FFD700',
          fontSize: '12px',
        },
      },
      axisBorder: {
        show: true,
        color: '#FFD700',
      },
      axisTicks: {
        show: true,
        color: '#FFD700',
      },
      title: {
        text: 'Date',
        style: {
          color: '#FFD700',
          fontSize: '14px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#FFD700',
          fontSize: '12px',
        },
      },
      axisBorder: {
        show: true,
        color: '#FFD700',
      },
      axisTicks: {
        show: true,
        color: '#FFD700',
      },
      title: {
        text: 'Rides',
        style: {
          color: '#FFD700',
          fontSize: '14px',
        },
      },
    },
    colors: ['#FFD700', '#15803D'],
    dataLabels: { enabled: false },
    tooltip: { theme: 'dark' },
    legend: { show: false },
  };

  const series = [
    {
      name: 'Completed',
      data: [8, 14, 10, 18, 9, 5, 22],
    },
    {
      name: 'Remaining',
      data: [10, 8, 15, 12, 16, 20, 5],
    },
  ];

  return (
    <>
    {/* sort by today */}
     <div className='flex text-sm font-semibold justify-end pr-4 '>
  <label htmlFor="">Sort By:</label>
<select name="" id="" className='bg-[#013220]'>
  <option value="high">Today</option>
  <option value="low">Yesterday</option>
  <option value="low">One Week</option>
</select>
</div>
      <DriverDetailnav />
      <div className="text-yellow-400 px-8 py-12 min-h-screen space-y-10">
        <div className="border max-w-4xl mx-auto w-full border-yellow-400 rounded-xl">
          <div className="flex justify-between px-6 py-4 items-center mb-4 border-b border-yellow-300">
            <h2 className="text-lg font-bold text-yellow-400">Ride Per Day</h2>
            <div className="flex items-center gap-2 text-yellow-400 text-sm">
              <span>Date Range :</span>
              <span className="border border-yellow-400 px-2 py-1 rounded">
                <input type="date"  className='bg-[#013220]'/>
              </span>
              <span>To</span>
              <span className="border border-yellow-400 px-2 py-1 rounded">
                <input type="date"  className='bg-[#013220]'/>
              </span>
            </div>
          </div>
         
          <Chart options={options} series={series} type="bar" height={300} />
        </div>
     
     {/* card */}

<div className='flex justify-center items-center'>
  <div className='w-full max-w-4xl'>

 
  <h3 className='font-semibold pb-2 text-lg'>KPT Card</h3>
<div className=' rounded-xl border border-yellow-300 px-12 py-4'>
  <div className='flex flex-col gap-4'>
    <div className='flex justify-between '>
      <div className='flex items-center gap-2'>
<CiLocationOn/>
      <p>Total Distance Coverd:</p>
      </div>
      <span>1,240km</span>
    </div>
    <div className='flex justify-between'>
      <div className='flex items-center gap-2'>
<FaCar/>
      <p>Total Rides Completed:</p>
      </div>
      <span>512</span>
    </div>
    <div className='flex justify-between text-red-600'>
      <div className='flex items-center gap-2'>
<FcCancel/>
      <p>Rides Cancelled:</p>
      </div>
      <span>15</span>
    </div>
    <div className='flex justify-between'>
      <div className='flex items-center gap-2'>
<MdOutlineAssignmentLate/>
      <p>Late Starts:</p>
      </div>
      <span>6</span>
    </div>
    <div className='flex justify-between'>
      <div className='flex items-center gap-2'>
<PiMoneyLight/>
      <p>Total Earnings:</p>
      </div>
      <span>425,000</span>
    </div>
  </div>
</div>
</div>
 </div>

      {/* table */}
      


     <div className='flex justify-center py-6'>
      <div className=' w-full max-w-6xl'>
  <h3 className='font-semibold pb-2 text-lg'>Summay</h3>
  <div className=" rounded-xl overflow-hidden border border-yellow-300">
    <table className='w-full table-fixed border-collapse'>
      <thead className=" text-yellow-400">
        <tr className='text-left border-b border-yellow-300'>
          <th className='w-1/5 px-4 py-2'>Date</th>
          <th className='w-1/5 px-4 py-2'>Rides</th>
          <th className='w-1/5 px-4 py-2'>Distance</th>
          <th className='w-1/5 px-4 py-2'>Earning</th>
          <th className='w-1/5 px-4 py-2'>Late Start</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td className='px-4 py-2'>{item.date}</td>
            <td className='px-4 py-2'>{item.rides}</td>
            <td className='px-4 py-2'>{item.distance}</td>
            <td className='px-4 py-2'>{item.earning}</td>
            <td className='px-4 py-2'>{item.latestart}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
</div>
    </div>
     </>
  );
};

export default Report;
