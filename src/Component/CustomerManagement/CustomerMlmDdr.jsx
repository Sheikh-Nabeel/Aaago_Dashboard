import React, { useState } from 'react';
import { IoFilterOutline } from "react-icons/io5";
import CustomerMlmDdrTable from './CustomerMlmDdrTable';

const CustomerMlmDdr = () => {
  const titles = [
    'DDR',
    'CCR',
    'BBR',
    'HLR',
    'AMBESSADOR',
    'Day'
  ];

  const [activeTitle, setActiveTitle] = useState('DDR'); // default active tab

  return (
    <div className="pl-5">
      <div className="flex items-center border-b border-yellow-400 justify-between font-semibold text-yellow-400 flex-nowrap">
        {titles.map((title, index) => (
          <React.Fragment key={index}>
            <div
              onClick={() => setActiveTitle(title)}
              className={`pr-2 cursor-pointer text-sm flex items-center gap-2 
                ${activeTitle === title ? 'border-b-2 border-yellow-400 pb-1' : ''} 
                ${title === 'Day' ? 'border border-b-0 border-yellow-400 px-4 py-2' : ''}`}
            >
              {title}
              {title === 'Day' && <IoFilterOutline className="text-lg" />}
            </div>

            {index !== titles.length - 2 && index !== titles.length - 1 && (
              <div className="w-[2px] h-3 bg-yellow-400" />
            )}
          </React.Fragment>
        ))}
      </div>

      <CustomerMlmDdrTable activeTitle={activeTitle} />
    </div>
  );
};

export default CustomerMlmDdr;
