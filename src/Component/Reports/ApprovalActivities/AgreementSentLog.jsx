import React from 'react'
const sampleData = Array(9).fill({
  sentto: "Driver:Rizwan",
 type: "Rental Agreement",
  senton: "Aug 1",
  status: "Pending",
});


const AgreementSentLog = () => {
  return (
  <>
          <div className="flex justify-end items-center my-6 gap-4">
            <div className="flex items-center text-sm">
              <span>Date Range:</span>
              <input
                type="date"
                value=""
                readOnly
                className="bg-[#013A2A] border border-yellow-400 text-yellow-400 px-2 py-1 rounded-md w-28"
              />
              <span>To</span>
              <input
                type="date"
                value=""
                readOnly
                className="bg-[#013A2A] border border-yellow-400 text-yellow-400 px-2 py-1 rounded-md w-28"
              />
            </div>
  
            <div className='text-sm'>
              <span>
                Type:
                <select className="bg-transparent focus:outline-none ml-1">
                  <option value="">Driver</option>
                  <option value="">Rental Driver</option>
                </select>
              </span>
            </div>
  
            <div className="flex items-center gap-2 text-sm">
              <span>Status:</span>
              <select className="bg-transparent focus:outline-none">
                <option value="">Pending</option>
                <option value="">Approved</option>
              </select>
            </div>
          </div>
  
          {/* Table */}
          <div className="mx-4 overflow-x-auto border border-yellow-400 rounded-xl">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-yellow-400  text-yellow-400">
                  <th className="px-4 py-3">Sent To</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Sent On</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {sampleData.map((item, index) => (
                  <tr key={index} className="text-sm">
                    <td className="px-4 py-3">{item.sentto}</td>
                    <td className="px-4 py-3">{item.type}</td>
                    <td className="px-4 py-3">{item.senton}</td>
                    <td className="px-4 py-3">{item.status}</td>
                    <td className="px-4 py-3">
                        
                        <button className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm hover:bg-yellow-300">
                        Resend 
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
       </>  )
}

export default AgreementSentLog