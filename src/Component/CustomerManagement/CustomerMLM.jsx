import React, { useState } from 'react'
import CutomerMlmDetail from './CutomerMlmDetail'
import CustomerMlmDdr from './CustomerMlmDdr'
import CustomerDetailnav from './CustomerDetailnav'
import { FaChevronDown } from 'react-icons/fa';


// Custom dropdown component
const CustomSortDropdown = ({ sortBy, setSortBy, options }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative text-sm flex justify-end">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 "
      >
        Sort By: {sortBy}
        <FaChevronDown className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <ul className="absolute right-0 mt-2 w-20 bg-green-900 border border-yellow-400 rounded-md shadow-lg z-10">
          {options.map((opt, index) => (
            <li
              key={index}
              className="px-2 py-2 hover:bg-yellow-500 hover:text-black cursor-pointer"
              onClick={() => {
                setSortBy(opt);
                setOpen(false);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const CustomerMLM = () => {
    const [sortBy, setSortBy] = useState('Earn');
  const options = ['Earn', 'Rating', 'Complaints'];
  return (

    
    <div>
                  <CustomSortDropdown sortBy={sortBy} setSortBy={setSortBy} options={options} />

      <CustomerDetailnav/>
      <CutomerMlmDetail/>
      <CustomerMlmDdr/>
    </div>
  )
}

export default CustomerMLM