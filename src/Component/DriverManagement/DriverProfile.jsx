import React from 'react'
import { TiArrowBackOutline } from 'react-icons/ti'
import { Link } from 'react-router-dom'
import DriverDetailnav from './DriverDetailnav'
import SparklineChart from './SparklineChart'

const data = [
  {
    title: 'Total Deposit',
    money: '$1000',
    chartData: [20, 40, 86, 60, 90]
  },
  {
    title: 'Total Withdrawal',
    money: '$1000',
    chartData: [10, 22, 34, 25, 15]
  },
  {
    title: 'Total Rides',
    money: '100+',
    chartData: [5, 15, 25, 20, 30]
  },
]

const driverdata = [
  {
    heading: 'KYC Document:',
    image1: 'https://www.citizencard.com/images/sample-cards/uk-id-card-for-over-18s-2025.png',
    title: 'Front Side',
    image2: 'https://www.citizencard.com/images/sample-cards/uk-id-card-for-over-18s-2025.png',
    title2: 'Back Side',
  },
  {
    heading: 'Driving License:',
    image1: 'driving.jpg',
    title: 'Front Side',
    image2: 'driving2.jpg',
    title2: 'Back Side',
  },
  {
    heading: 'Vehicle Registration:',
    image1: 'vehicle.jpg',
    title: 'Front Side',
    image2: 'vehicle.jpg',
    title2: 'Back Side',
  },
]

const DriverProfile = () => {
  return (
    <div>
      <DriverDetailnav />

      {/* Sort by month */}
      <div className='flex justify-end w-2/3 pt-8'>
        <label>Sort By:</label>
        <select className='bg-[#013220] focus:outline-none'>
          <option value="Month">Month</option>
          <option value="year">Year</option>
        </select>
      </div>

      {/* Profile Top Section */}
      <div className="flex items-center justify-around w-[90%] mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-10 w-[70%]">
          {data.map((item, index) => (
            <div key={index} className="shadow-xl p-4 rounded shadow-black outline outline-black/20 bg-gradient-to-b from-[#038A59] to-[#013723] text-[#DDC104]">
              <p className="font-semibold">{item.title}</p>
              <h2 className="text-xl font-bold">{item.money}</h2>
              <SparklineChart data={item.chartData} /> {/* Chart here */}
            </div>
          ))}
          <div className="text-sm flex flex-col gap-4 items-start ">
            <p><span className="font-bold">ID:</span> 12345</p>
            <p><span className="font-bold">Name:</span> Lorem Ipsum</p>
            <p><span className="font-bold">Contact:</span> +1233456478</p>
          </div>
        </div>

        {/* Profile Image */}
        <div className="w-[20%] flex justify-center bg-yellow-200 rounded p-1">
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="Profile"
            className="w-full h-60 rounded shadow object-cover"
          />
        </div>
      </div>

      {/* Driver Document Section */}
      <div className='flex justify-center mt-6'>
        <div className='border border-yellow-300 rounded-xl px-8 w-[80%]'>
          {driverdata.map((item, index) => (
            <div key={index} className='mb-10'>
              <h2 className='text-xl font-bold mb-4'>{item.heading}</h2>
              <div className='flex justify-center items-center'>
                <div className='flex flex-col items-center'>
                  <img src={item.image1} alt="id card" className='w-[70%] mb-2' />
                  <h2 className='font-bold'>{item.title}</h2>
                </div>
                <div className='flex flex-col items-center'>
                  <img src={item.image2} alt="id card" className='w-[70%] mb-2' />
                  <h2 className='font-bold'>{item.title2}</h2>
                </div>
              </div>
              <div className='flex justify-center gap-4 mt-4'>
                <button className='px-6 font-semibold py-1 text-sm rounded-full text-[#013220] bg-yellow-400'>Accept</button>
                <button className='px-6 font-semibold py-1 text-sm rounded-full text-[#013220] bg-yellow-400'>Reject</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accept/Reject All Buttons */}
      <div className='flex justify-center gap-8 p-8'>
        <button className='rounded-full bg-yellow-400 px-4 py-1.5 font-semibold text-[#013220]'>Accept All</button>
        <button className='rounded-full bg-yellow-400 px-6 py-1.5 text-[#013220] font-semibold'>Reject</button>
      </div>
    </div>
  )
}

export default DriverProfile
