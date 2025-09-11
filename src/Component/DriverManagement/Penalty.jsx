import React, { useState } from 'react'
import IssueWarning from './IssueWarning'
import TemporaryBan from './TemporaryBan'
import PermanentBan from './PermanentBan'
import DriverDetailnav from './DriverDetailnav'
import { TiArrowBackOutline } from 'react-icons/ti'
import { Link } from 'react-router-dom'

const data= [
  {
    date:'24-July-25',
    reason:'Warning',
    admin:'admin',
    notes:'2nd Strike',
    action:'Warning',
  },
  {
    date:'24-July-25',
    reason:'Mis Conduct',
    admin:'admin',
    notes:'Resolved',
    action:'Temp-Ban',
  }
]
const Penalty = () => {
  const [open, setOpen] = useState('issuewarn')
 
  return (
    <div> 
      {/* sort by high */}
       <div className='flex text-sm font-semibold justify-end pr-4 '>
  <label htmlFor="">Sort By:</label>
<select name="" id="" className='bg-[#013220]'>
  <option value="high">High</option>
  <option value="low">Low</option>
</select>
</div>
      <DriverDetailnav />

      <div className="flex justify-center items-center gap-32 mt-8">
        {/* Left Info Block */}
        <div className="flex flex-col gap-2 text-sm w-[25%] max-w-md">
          <div className="grid grid-cols-2 gap-x-0">
            <span className="font-medium text-lg">ID:</span>
            <span className=''>001</span>
          </div>
          <div className="grid grid-cols-2">
            <span className="font-medium text-lg">Name:</span>
            <span className=''>Smith Joy</span>
          </div>
          <div className="grid grid-cols-2">
            <span className="font-medium text-lg">Phone Number:</span>
            <span className=''>+97122222221</span>
          </div>
          <div className="grid grid-cols-2">
            <span className="font-semibold text-lg ">Status:</span>
            <span className=''>Active</span>
          </div>
          <div className="grid grid-cols-2">
            <span className="font-medium text-lg">Warning:</span>
            <span className=''>02</span>
          </div>
        </div>

        {/* Profile Image */}
        <div className="w-[200px] h-[240px] flex justify-center items-center bg-black rounded-lg p-1 shadow">
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="Profile"
            className="w-full h-full rounded-lg object-cover"
          />
        </div>
      </div>

{/* warning */}

      <div className='border px-10 py-4 border-yellow-300 border-l-0 border-r-0'>
<div className='flex gap-10'>
  <button onClick={()=> setOpen('issuewarn')}  className={`${open == "issuewarn" ? "btn-active" : "btn-inactive"} `}>Issue Warning</button>
   <button onClick={()=> setOpen('tempban')}  className={`${open =="tempban" ? "btn-active" : "btn-inactive"} `}>Temporary Ban</button>

  <button onClick={()=> setOpen('permanentban')}  className={`${open =="permanentban" ? "btn-active" : "btn-inactive"} `}>Permanent Ban</button>

</div>
      </div>
      {/* Warning section for driver */}
{open === 'issuewarn' && <IssueWarning />}
{open === 'tempban' && <TemporaryBan />}
{open === 'permanentban' && <PermanentBan />}


      {/* table */}

     <div className='flex justify-center py-10'>
  <div className="w-full max-w-7xl rounded-xl overflow-hidden border border-yellow-300">
    <table className='w-full table-fixed border-collapse'>
      <thead className=" text-yellow-400">
        <tr className='text-left border-b border-yellow-300'>
          <th className='w-1/5 px-4 py-2'>Date</th>
          <th className='w-1/5 px-4 py-2'>Reason</th>
          <th className='w-1/5 px-4 py-2'>Admin</th>
          <th className='w-1/5 px-4 py-2'>Notes</th>
          <th className='w-1/5 px-4 py-2'>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td className='px-4 py-2'>{item.date}</td>
            <td className='px-4 py-2'>{item.reason}</td>
            <td className='px-4 py-2'>{item.admin}</td>
            <td className='px-4 py-2'>{item.notes}</td>
            <td className='px-4 py-2'>{item.action}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

    </div>
  )
}

export default Penalty;
