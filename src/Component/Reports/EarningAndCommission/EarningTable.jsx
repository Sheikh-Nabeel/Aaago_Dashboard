import React from "react";

const userData =[
    {
        name:'Ali',
        role:'Angel Investor',
        Share:'10%',
        lastAction:'Wallet Frozen',
        earning:'AED 15,000'
    }
]
const EarningTable = () => {
  return (
    <div className=" bg-[#013220] text-yellow-300 p-8 font-sans">
      {/* Top Flagged Users Table */}
      <h2 className="text-2xl font-semibold mb-4">Stakeholder Panel:</h2>
      <h2 className="text-xl font-semibold mb-4">Shareholder Earnings:</h2>
      <div className="border border-yellow-400 rounded-xl p-4">
        <table className="w-full  table-auto border-separate border-spacing-y-2">
          <thead className=" text-left border-b border-yellow-300">
            <tr className="border-b border-yellow-300">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4">Share %</th>
              <th className="py-2 px-4">Earnings</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((item, i) => (
              <tr key={i} className="rounded">
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">{item.role}</td>
                <td className="py-2 px-4">{item.Share}</td>
                <td className="py-2 px-4">{item.earning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     
    </div>
  );
};

export default EarningTable;
