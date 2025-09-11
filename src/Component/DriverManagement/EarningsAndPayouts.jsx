import React from 'react'
import { Link } from 'react-router-dom';
import DriverDetailnav from './DriverDetailnav';
import { TiArrowBackOutline } from 'react-icons/ti';

const data = [
  {
    date: '21/July/2025',
    time: '11:00',
    amount: 100,
    payment: 'Bank:ABM Bank Abu dhabi',
   
  },
  {
    date: '21/July/2025',
    time: '11:00',
    amount: 100,
   payment: 'Bank:ABM Bank Abu dhabi',
    
  },
  {
    date: '21/July/2025',
    time: '11:00',
    amount: 100,
   payment: 'Bank:ABM Bank Abu dhabi',
  
  },
];

const EarningsAndPayouts = () => {
  return (
    <>
      <div>     
        <DriverDetailnav />
        <div className='pt-4'>
          <table className="w-full text-sm text-left table-fixed">
            <thead>
              <tr className="border-b border-yellow-200">
                <th className="w-[20%] px-6 py-3">Date</th>
                <th className="w-[20%] px-4 py-3">Time</th>
                <th className="w-[20%] px-4 py-3">Amount</th>
                <th className="w-[20%] px-4 py-3 text-center">Payment Method</th>
                <th className="w-[20%] px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="w-[20%] px-6 py-3">{item.date}</td>
                  <td className="w-[20%] px-4 py-3">{item.time}</td>
                  <td className="w-[20%] px-4 py-3">${item.amount}</td>
                  <td className="w-[20%] px-4 py-3 text-center">{item.payment}</td>
                  <td className="w-[20%] px-4 py-3">
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

export default EarningsAndPayouts;
