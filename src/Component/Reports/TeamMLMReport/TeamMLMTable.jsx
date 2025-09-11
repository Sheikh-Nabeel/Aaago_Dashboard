import React from 'react'

const sampleData = [
    {
 Rank: "#1",
  username: "Usman Khan",
 totalincome: "AED 58,000",
 Ranktitle: "Gold",
 bbrstatus:'Archieved'
},
{ 
 Rank: "#2",
  username: "Usman Khan",
 totalincome: "AED 58,000",
 Ranktitle: "Gold",
 bbrstatus:'In Progress',
},
]
const TeamMLMTable = () => {
  return (
    <>
          <div className="flex justify-end items-center my-6 gap-4">
            <div className="flex items-center text-sm gap-2">
              <span>Date Range :</span>
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
  
            <div>
              <span>
                Type:
                <select className="bg-transparent focus:outline-none text-sm">
                  <option value="">Driver</option>
                  <option value="">Rental Driver</option>
                </select>
              </span>
            </div>
  
            <div className="flex items-center text-sm pr-6">
              <span>City:</span>
              <select className="bg-transparent focus:outline-none">
                <option value="">Dubai</option>
                <option value="">Dubai</option>
              </select>
            </div>
          </div>
  
          {/* Table */}
          <div className="mx-4 overflow-x-auto border border-yellow-400 rounded-xl">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-yellow-400  text-yellow-400">
                  <th className="px-4 py-3">Rank</th>
                  <th className="px-4 py-3">User Name</th>
                  <th className="px-4 py-3">Total Income</th>
                  <th className="px-4 py-3">Rank Title</th>
                  <th className="px-4 py-3">BBR Status</th>
                </tr>
              </thead>
              <tbody>
                {sampleData.map((item, index) => (
                  <tr key={index} className="text-sm">
                    <td className="px-4 py-3">{item.Rank}</td>
                    <td className="px-4 py-3">{item.username}</td>
                    <td className="px-4 py-3">{item.totalincome}</td>
                    <td className="px-4 py-3">{item.Ranktitle}</td>
                    <td className="px-4 py-3">
                   {item.bbrstatus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
       </>
  )
}

export default TeamMLMTable