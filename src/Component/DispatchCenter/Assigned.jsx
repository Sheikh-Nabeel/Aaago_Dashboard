import React from 'react'
import { FaRegEye } from "react-icons/fa";
import { Link } from 'react-router-dom';


const Assigned = () => {
    const tabledata = [
        {
            id:1,
            name:'Alice Smith',
            pickup:'Pickup:Dubai',
            Dropoff:'Drop_off:Sharjah',
            status:'Assigned',
           
        },
        {
            id:1,
            name:'Alice Smith',
            pickup:'Pickup:Dubai',
            Dropoff:'Drop_off:Sharjah',
            status:'Assigned',
           
        },
        {
            id:1,
            name:'Alice Smith',
            pickup:'Pickup:Dubai',
            Dropoff:'Drop_off:Sharjah',
            status:'Assigned',
            
        },
    ]
  return (
    <div>
        <table className='w-full p-6'>
            <thead>
                <tr className='text-left border-b  border-t border-yellow-400' >
                <th className='text-sm px-4 py-2'>ID</th>
                <th className='text-sm px-4 py-2'>Client Name</th>
                <th className='text-sm px-4 py-2'>Pickup & Drop-off</th>
                <th className='text-sm px-4 py-2'>Status</th>
                <th className='text-sm px-4 py-2 text-center'>Action</th>
                 </tr>
            </thead>
<tbody>
    {tabledata.map((item, index)=>(
         <tr key={index}>
        <td className='text-sm px-4 py-2' >00{item.id}</td>
        <td className='text-sm px-4 py-2'>{item.name}</td>
        <td className='text-sm px-4 py-2'>
  <div className='flex flex-col'>
    <span>{item.pickup}</span>
    <span>{item.Dropoff}</span>
  </div>
</td>
        <td className='text-sm px-4 py-2'>{item.status}</td>
        <td className='px-4 py-2 flex justify-center'>
  <Link to={'/livelocation'} className='inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-yellow-400 rounded-full text-black hover:bg-yellow-300 transition-all whitespace-nowrap'>
    <FaRegEye className='text-sm' />
    Live Location
  </Link>
</td>
    </tr>
    ))}
   
</tbody>
        </table>
    </div>
  )
}

export default Assigned