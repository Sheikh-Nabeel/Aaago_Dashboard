import React from 'react'
import { FaRegEye } from "react-icons/fa";
import { Link } from 'react-router-dom';


const Completed = () => {
    const tabledata = [
        {
            id:1,
            name:'Alice Smith',
            pickup:'Pickup:Dubai',
            Dropoff:'Drop_off:Sharjah',
            status:'Completed',
           
        },
        {
            id:1,
            name:'Alice Smith',
            pickup:'Pickup:Dubai',
            Dropoff:'Drop_off:Sharjah',
            status:'Completed',
           
        },
        {
            id:1,
            name:'Alice Smith',
            pickup:'Pickup:Dubai',
            Dropoff:'Drop_off:Sharjah',
            status:'Completed',
            
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
       
    </tr>
    ))}
   
</tbody>
        </table>
    </div>
  )
}

export default Completed