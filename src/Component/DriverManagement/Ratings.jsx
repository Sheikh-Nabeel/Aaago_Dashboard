import React from 'react'
import DriverDetailnav from './DriverDetailnav'
import { TiArrowBackOutline } from 'react-icons/ti'
import { Link } from 'react-router-dom'
const data = [
  {
    image:'',
    title:'Renee Watson',
    rating:'4.5 ⭐',
    date:'April 12,2024',
    desc:'Always punctual and reliable, ensuring timely pickups and drop-offs Maintains a clean and comfortable vehicle at all times Demonstrates excellent road safety and defensive driving skills Friendly, respectful, and communicates clearly with passengers Consistently receives positive feedback from clients and dispatch teams'
  },
  {
    image:'',
    title:'Renee Watson',
    rating:'4.5 ⭐',
    date:'April 12,2024',
    desc:'Always punctual and reliable, ensuring timely pickups and drop-offs Maintains a clean and comfortable vehicle at all times Demonstrates excellent road safety and defensive driving skills Friendly, respectful, and communicates clearly with passengers Consistently receives positive feedback from clients and dispatch teams'
  },
]

const Ratings = () => {
  return (
    <div>
{/* sort by high */}
      <div className='flex text-sm font-semibold justify-end pr-4 '>
  <label htmlFor="">Sort By:</label>
<select name="" id="" className='bg-[#013220]'>
  <option value="high">High</option>
  <option value="low">Low</option>
</select>
</div>
      <DriverDetailnav/>   
      <div className='px-8 py-6'>
<div className=''>

      <h2 className='font-semibold'>Ratings</h2>
      <span>⭐⭐⭐⭐⭐</span>
</div>
<div>
  <h4 className='font-semibold'>Reviews</h4>
  {data.map((item, index)=>(

  <div className='border border-yellow-300 rounded-lg mb-6 px-4 pb-4 pt-2 '>
    <div className='flex justify-between'>
    <div className='flex gap-8 '>
      <div>
        <img src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" className='rounded-full w-10 h-10 object-cover' alt="" />
      </div>
      <div>
        <h2 className='font-semibold'>{item.title}</h2>
        <span>{item.rating}</span>
      </div>
    </div>
   <span>{item.date}</span>
   </div>
    <div>
      {item.desc}
    </div>
  </div>
  ))}
</div>
      </div>


      
    </div>
  )
}

export default Ratings