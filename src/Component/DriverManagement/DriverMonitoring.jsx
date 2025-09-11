import React from 'react'
import DriverDetailnav from './DriverDetailnav'
import { Link } from 'react-router-dom'
import { TiArrowBackOutline } from 'react-icons/ti'
import { FaUser } from 'react-icons/fa'
import { IoCarSportOutline } from "react-icons/io5";
import { GrStatusGood } from "react-icons/gr";

const DriverMonitoring = () => {
  return (
    <div className=''>
<div>
  <DriverDetailnav/>
</div>
 <div className="w-full mt-8 relative">
  <div className='flex flex-col px-4 py-2 gap-4 rounded-xl z-50 top-0 right-0 bg-white absolute'>
    <div className='flex justify-center'>
      <img className='rounded-full w-20 h-20 object-cover' src="https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg=" alt="" />
    </div>
    <div className='pb-4 flex flex-col gap-2'>
    <div className='flex gap-2 text-black items-center'>
     
      <div className='flex items-center gap-1'> <FaUser size={15}/> <h3 className='font-semibold'>Driver:</h3></div>
      <p className='text-xs'>Ethel Lanon</p>
    </div>
    <div className='flex gap-2 text-black items-center'>
     
      <div className='flex items-center gap-1'> < GrStatusGood size={15}/> <h3 className='font-semibold'>Status:</h3></div>
      <p className='text-xs'>Active</p>
    </div>
    <div className='flex gap-2 text-black items-center'>
     
      <div className='flex items-center gap-1'> <IoCarSportOutline size={15}/> <h3 className='font-semibold'>Vehicle:</h3></div>
      <p className='text-xs'>Bike</p>
    </div>
    <div className='flex gap-2 text-black items-center'>
     
      <div className='flex items-center gap-1'> <IoCarSportOutline size={15}/> <h3 className='font-semibold'>Location:</h3></div>
      <p className='text-xs'>Christophemouts</p>
    </div>
    </div>
  </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.64236278531!2d73.07320327479474!3d33.64051393936022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11a4d1a8d62fd41%3A0x1feebab68518189!2sCodesVista!5e0!3m2!1sen!2s!4v1753349575704!5m2!1sen!2s"
        width="100%"
        height="500"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="CodesVista Location"
        className='rounded-lg'
      ></iframe>
    </div>

    </div>
  )
}

export default DriverMonitoring