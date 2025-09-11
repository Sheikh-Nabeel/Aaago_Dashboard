import React, { useState } from "react";
import CustomerDetailnav from "./CustomerDetailnav";
import DateRange from '../DriverManagement/DateRange'
import ComplainDetailPopup from "./ComplainDetailPopup";
const data = [
  {
    id: 1,
    date:'24/July/2025',
    issuesummary:'Driver was late',
    status:'Open',
   assignedto:'Admin A',
  },
  {
    id: 1,
    date:'24/July/2025',
    issuesummary:'Driver was late',
    status:'Open',
   assignedto:'Admin A',
  },
  {
    id: 1,
    date:'24/July/2025',
    issuesummary:'Driver was late',
    status:'Open',
   assignedto:'Admin A',
  },
];

const CustomerComplain = () => {
    const [popup, setPopup] = useState(false)
  return (
    <>
        <div>    
  <CustomerDetailnav/> 
  <DateRange/>
<div className=' p-8'>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border border-yellow-300 ">
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-cente">Issue Summary</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Assigned To</th>
               
<th className="px-4 py-3 text-center ">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} >
    
                  <td className="px-4 py-2">{item.date}</td>
                  <td className="px-4 py-2 ">{item.issuesummary}</td>
                  <td className="px-4 py-2">{item.status}</td>
                  <td className="px-4 py-2">{item.assignedto}</td>
                 
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-3 justify-center">
                  
                      <button onClick={()=> setPopup(true)} className="bg-yellow-400 text-[#013220] px-4 py-1.5 cursor-pointer rounded-full text-xs font-medium">
                      View
                      </button>
                    
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
      {popup && (<ComplainDetailPopup onClose ={()=> setPopup(false)} />)}
      </div>
    </>
  );
};

export default CustomerComplain;
