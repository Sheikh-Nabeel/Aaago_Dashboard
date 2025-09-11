// Customer History
import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import CustomerDetailnav from "./CustomerDetailnav";

const data = [
  {
    id: 1,
    date:'21/July/2025',
    pick:'Dubai',
    dropoff:'Sharjah',
    drivername: "Allice Smith",
    status:'Completed',
    fare:100,
  },
  {
    id: 1,
    date:'21/July/2025',
    pick:'Dubai',
    dropoff:'Sharjah',
    drivername: "Allice Smith",
    status:'Completed',
    fare:100,
  },
  {
    id: 1,
    date:'21/July/2025',
    pick:'Dubai',
    dropoff:'Sharjah',
    drivername: "Allice Smith",
    status:'Completed',
    fare:100,
  },
 
];

const CustomerHistory = () => {
  return (
    <>
        <div> 
          <div className="flex justify-end items-center gap-4">
          <div className="text-sm font-bold flex items-center gap-2">
            <FaRegCalendarAlt/>
            <label htmlFor="">Date:</label>
            <input type="date" name="" id=""  className='bg-[#013220]' />
          </div>
          {/* Sort by completed */}
<div className='flex justify-end  pt-2 text-sm font-semibold'>
  <label htmlFor="">Sort By:</label>
<select name="" id="" className='bg-[#013220]'>
  <option value="Month">Completed</option>
  <option value="year">Un-Completed</option>
</select>
</div>  
</div> 

{/* customer navbar component */}
 <CustomerDetailnav/> 

<div className=' pt-4'>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-yellow-200">
                <th className="px-3 py-3">ID</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-cente">Pick/Drop-off</th>
                <th className="px-4 py-3">Driver Name</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Fare</th>
<th className="px-4 py-3 text-center align-middle">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} >
                  <td className="px-3 py-3">00{item.id}</td>
                  <td className="px-4 py-3">{item.date}</td>
                  <td className="px-4 py-3">
                    <div >
                    <p>Pick-up: {item.pick}</p> 
                     <p>Drop-off: {item.dropoff}</p> 
                      </div>
                      </td>
                  <td className="px-4 py-3">{item.drivername}</td>
                  <td className="px-4 py-3">{item.status}</td>
                  <td className="px-4 py-3">${item.fare}</td>
                  <td className="px-4 py-3">
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
    </>
  );
};

export default CustomerHistory;
