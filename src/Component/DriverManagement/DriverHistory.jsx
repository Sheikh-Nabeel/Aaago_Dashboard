import React from "react";
import { Link } from "react-router-dom";
import DriverDetailnav from "./DriverDetailnav";
import { TiArrowBackOutline } from "react-icons/ti";

const data = [
  {
    id: 1,
    date:'21/July/2025',
    type:'Booking',
    name: "Allice Smith",
    status:'Completed',
    fare:100,
    action: "View",
  },
  {
    id: 1,
    date:'21/July/2025',
    type:'Booking',
    name: "Allice Smith",
    status:'Completed',
    fare:100,
    action: "View",
  },
  {
    id: 1,
    date:'21/July/2025',
    type:'Booking',
    name: "Allice Smith",
    status:'Completed',
    fare:100,
    action: "View",
  },
];

const DriverHistory = () => {
  return (
    <>
        <div>
             
  <DriverDetailnav/> 
 
       
<div className=' pt-4'>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-yellow-200">
                <th className="px-3 py-3">ID</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-cente">Type</th>
                <th className="px-4 py-3">Customer Name</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Fare</th>
<th className="px-4 py-3 text-center align-middle">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} >
                  <td className="px-4 py-3">00{item.id}</td>
                  <td className="px-4 py-3">{item.date}</td>
                  <td className="px-4 py-3 r">{item.type}</td>
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.status}</td>
                  <td className="px-4 py-3">{item.fare}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3 justify-center">
                  
                      <button className="bg-yellow-400 text-black px-4 py-1.5 cursor-pointer rounded-full text-xs font-medium">
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

export default DriverHistory;
