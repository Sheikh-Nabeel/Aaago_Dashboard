import React from 'react'
import CustomerDetailnav from './CustomerDetailnav';
import SparklineChart from './SparklineChart'; // ✅ Import the chart

const data = [
  {
    title: 'Total Deposit',
    money: '$1000',
    chartData: [20, 40, 86, 60, 90] // ✅ Chart data
  },
  {
    title: 'Total Withdrawal',
    money: "$1000",
    chartData: [10, 22, 34, 25, 15]
  },
  {
    title: 'Total Rides',
    money: '100+',
    chartData: [5, 15, 25, 20, 30]
  },
];

const clientdata = [
  {
    heading: 'KYC Document:',
    image1: 'https://www.citizencard.com/images/sample-cards/uk-id-card-for-over-18s-2025.png',
    title: 'Front Side',
    image2: 'https://www.citizencard.com/images/sample-cards/uk-id-card-for-over-18s-2025.png',
    title2: 'Back Side',
  },
];

const CustomerProfile = () => {
  return (
    <div className=''>
      <div>
        <CustomerDetailnav />
      </div>

      {/* Profile Top Section */}
      <div className="mt-8 flex items-center justify-around w-[80%] mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 w-[70%]">
          {data.map((item, index) => (
            <div
              key={index}
              className="shadow-xl p-4 rounded shadow-black outline outline-black/20 bg-gradient-to-b from-[#038A59] to-[#013723] text-[#DDC104]"
            >
              <p className="font-semibold">{item.title}</p>
              <h2 className="text-xl font-bold">{item.money}</h2>
              <SparklineChart data={item.chartData} /> {/* ✅ Chart added */}
            </div>
          ))}

          <div className="text-sm flex flex-col gap-4 items-start ">
            <p><span className="font-bold">ID:</span> 12345</p>
            <p><span className="font-bold">Name:</span> Lorem Ipsum</p>
            <p><span className="font-bold">Contact:</span> +1233456478</p>
            <p><span className="font-bold">Status:</span> pending</p>
          </div>
        </div>

        {/* Profile Image */}
        <div className="w-[20%] flex justify-center bg-yellow-200 pt-0 rounded p-1">
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="Profile"
            className="w-full h-60 rounded shadow object-cover"
          />
        </div>
      </div>

      {/* Client Document Section */}
      <div className='flex justify-center mt-6 p-4'>
        <div className='border border-yellow-300 rounded-xl px-8 pt-4 w-[80%]'>
          {clientdata.map((item, index) => (
            <div key={index} className='mb-10'>
              <h2 className='text-xl font-bold mb-4'>{item.heading}</h2>
              <div className='flex justify-center items-center '>
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
    </div>
  );
};

export default CustomerProfile;
