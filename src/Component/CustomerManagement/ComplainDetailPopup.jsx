import React from 'react'
import { MdCancel } from "react-icons/md";

const ComplainDetailPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-10 flex justify-center items-center pt-16 bg-[#013220] bg-opacity-90">
      <div
        style={{ background: 'linear-gradient(to bottom, #012C1C, #005536)' }}
        className="rounded-xl border border-yellow-300  w-full max-w-md mx-4 pb-10"
      >
        <div className='flex justify-end py-2 px-3' ><MdCancel onClick={onClose} cursor='pointer' size={25}/> </div>
        <div className="flex flex-col gap-4  text-sm px-12 pt-6">
          <div className="flex justify-between">
            <span className="font-semibold">Ticket ID:</span>
            <span>TCK 1124</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">User:</span>
            <span>Areeba Shah</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Issue Type:</span>
            <span>Driver Late</span>
          </div>
          <div>
            <div className="font-semibold block mb-2" > <span>Remarks:</span></div>
            <div className=" h-36 px-4 py-3 rounded-xl bg-yellow-400 text-black w-full"
            >The Driver are so late . They after 1 hour.I have got late at office. i was going to join a meeting </div>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Assigned To:</span>
            <span>Admin A</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Status:</span>
            <span>Open</span>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-10">
          <button className="rounded-full bg-yellow-400 text-black px-4 py-2 hover:bg-yellow-300 transition">Resolved</button>
          <button className="rounded-full bg-yellow-400 text-black px-4 py-1 hover:bg-yellow-300 transition">Escalate</button>
          <button
            onClick={onClose}
            className="rounded-full bg-yellow-400 text-black px-4 py-1 hover:bg-yellow-300 transition">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ComplainDetailPopup
