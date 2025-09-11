import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { CiWarning } from "react-icons/ci";
import { PiFlagPennantThin } from "react-icons/pi";
import FinancialActivity from './FinancialActivity';
import GeoKYCSection from './GeoKYCSection';
import FraudDetectNav from '../FraudDetectNav'
import { Link } from 'react-router-dom';
import { TiArrowBackOutline } from 'react-icons/ti';
const FraudProfile = () => {
  return (
    <div className='min-h-screen'>
<FraudDetectNav/>
   <div>
{/* Back button */}
      <div className="flex items-center gap-2 py-4 px-6">
          <Link to="/overview" className='flex items-center gap-2'>
            <TiArrowBackOutline size={30} className="cursor-pointer text-lg" />
            <span className="text-lg font-semibold">Back</span>
          </Link>
      </div>

   </div>
    <div className=" flex flex-col md:flex-row gap-8 justify-center items-start p-6 font-sans">


      
      {/* Left Card */}
      <div className="bg-[#006C45] rounded-xl px-6 py-10 w-full md:w-[500px] shadow-lg">
        <div className="flex justify-center -mt-1">
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="Profile"
            className="w-26 h-26 rounded-full border-4 border-[#00281E] object-cover"
          />
        </div>

        <div className="mt-4 text-base space-y-3">
          <div className="flex justify-between">
            <span className="font-semibold text-xl">Name:</span>
            <span className='text-xl'>Farhan Ali</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-xl">User ID:</span>
            <span className='text-xl'>CUST-7834</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-xl">Phone:</span>
            <span className='text-xl'>+92xxxxxxxxx</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-xl">KYC Status:</span>
            <span className="flex items-center gap-1 text-xl text-green-300">
              <FaCheckCircle /> Verified
            </span>
          </div>
        </div>

        <div className="mt-6">
          <span className="font-semibold block mb-2 text-base">Fraud Score Meter:</span>
          <div className="w-full h-3 bg-gray-300 rounded-full relative">
            <div
              className="h-3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-green-400 rounded-full"
              style={{ width: '70%' }}
            />
            <div className="absolute text-[10px] left-0 ">10</div>
            <div className="absolute text-[10px] left-[70%] ">60</div>
            <div className="absolute text-[10px] right-0" >100</div>
          </div>
        </div>

        <div className="mt-6">
          <span className="font-semibold block mb-2 text-xl">Flag History:</span>
          <ul className="list-disc list-inside space-y-1 text-lg">
            <li>3 ride cancellations in 1 day (24-Jul)</li>
            <li>Logged in from 2 devices simultaneously</li>
            <li>Duplicate payment attempts (same card ID)</li>
          </ul>
        </div>
      </div>

      {/* Right Card */}
      <div className="bg-[#004431] rounded-xl px-4 py-4 w-full md:w-[400px] shadow-lg relative">
        <div className="flex justify-between items-start mb-3">
          <h2 className=" text-base font-semibold">Booking Pattern</h2>

          {/* Date Range Inputs */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <label className="text-[7px] ">Date Range:</label>
              <input
                type="date"
                className="bg-transparent  border border-yellow-300 rounded px-1 py-[2px] text-[9px] text-yellow-300 focus:outline-none"
              />
            </div>
            <div className="flex items-center space-x-1">
              <label className="text-[7px] ">To</label>
              <input
                type="date"
                className="bg-transparent border border-yellow-300 rounded px-1 py-[2px] text-[9px]  focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="text-[15px] space-y-2">
          <h2 className="font-semibold text-xl">Time Line</h2>
          <ul className='list-disc space-y-1 text-sm px-6'>
            <li>24 Jul, 2:00 PM: Cancelled ride (same driver as before)</li>
            <li>24 Jul, 2:00 PM: Cancelled ride again (same pickup point)</li>
            <li>24 Jul, 2:00 PM: No-show</li>
          </ul>
        </div>

        <ul className="mt-4 text-sm list-disc list-inside space-y-2">
          <li className="flex items-center gap-2">
            <CiWarning size={25} /> <span className="underline text-lg font-semibold">Repeated behavior</span>
          </li>
          <li className="flex items-center gap-2">
            <PiFlagPennantThin size={25} /> <span className="underline text-lg font-semibold">Same pickup/drop location flagged</span>
          </li>
        </ul>
      </div>

    </div>
      <FinancialActivity/>
      <GeoKYCSection/>
     </div>
  );
};

export default FraudProfile;
