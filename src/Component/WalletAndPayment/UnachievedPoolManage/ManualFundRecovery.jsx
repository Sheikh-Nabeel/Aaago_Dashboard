import React from 'react';
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";

const  ManualFundRecovery = () => {
  const tableData = [
    {
      compain: 'New User Bonus',
      amount: '1,500',
    expirydate:'25 Jul 2025',

    },
    {
      compain: 'New User Bonus',
      amount: '1,500',
    expirydate:'25 Jul 2025',

    },
    
  ];

  return (
   <div className="overflow-x-auto max-w-6xl mx-auto mt-8  ">
      
      {/* Header & Filter */}
      <div className=" flex flex-wrap justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-yellow-400">Transfer View:</h2>

        <div className="flex items-center">
          <span className="text-sm font-medium">Sort By:</span>
         <FaCalendarAlt/>
        
        </div>
      </div>
      <div className='border border-yellow-400'>
      <table className="w-full text-left ">
        <thead>
          <tr className="border-b border-yellow-400">
            <th className="text-sm px-4 py-2">Compain</th>
            <th className="text-sm px-4 py-2">Amount(AED)</th>
            <th className="text-sm px-4 py-2">Expiry Date</th>
            <th className="text-sm px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index} className="">
              <td className="text-sm px-4 py-2">{item.compain}</td>
              <td className="text-sm px-4 py-2">{item.amount}</td>
              <td className="text-sm px-4 py-2">
               {item.expirydate}
              </td>
              <td>
                <button className="text-sm px-4 py-1 bg-yellow-400 rounded-full text-black">Recall Fund</button>
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className='flex flex-col gap-6 mt-5'>
    
   <form action="">
  <input type="checkbox" />
  <label htmlFor="">Auto-flag bonuses if user inactive &gt; 90 days</label>
</form>
    <button className='self-center font-semibold text-sm bg-yellow-400 px-4 py-2 rounded-full text-black'>Export CSV/PDF</button>
    </div>
     </div>
  );
};

export default ManualFundRecovery;
