import { FaChevronDown } from 'react-icons/fa';
import { SlCalender } from 'react-icons/sl';
import { useState } from 'react'
// Custom dropdown component
const CustomSortDropdown = ({ sortBy, setSortBy, options }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative text-sm ">
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

const DateRange= ()=>{
      const [sortBy, setSortBy] = useState('Earn');
   const options = ['Earn', 'Rating', 'Complaints'];
    return(
         <div className="flex items-center justify-end flex-wrap gap-4 m-4">
         <div className="flex items-center gap-2 flex-wrap">
           <label className="flex items-center space-x-2">
             <div className="text-sm flex items-center gap-1"><span>Date Range:</span></div>
             <input
               type="date"
               className="bg-transparent rounded border py-1  border-yellow-300  text-yellow-300 focus:outline-none text-sm"
             />
           </label>
 
           <span className="text-sm pr-3">To</span>
 
           <label className="flex items-center space-x-2">
             <div className="text-sm flex items-center gap-1"> <span>Date:</span></div>
             <input
               type="date"
               className="bg-transparent rounded py-1  border border-yellow-300 text-yellow-300 focus:outline-none text-sm"
             />
           </label>
         </div>
 
         <CustomSortDropdown sortBy={sortBy} setSortBy={setSortBy} options={options} />
       </div>

    )
}
export default DateRange;