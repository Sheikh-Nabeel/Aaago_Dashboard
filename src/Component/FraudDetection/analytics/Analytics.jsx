import React from "react";
import Sidebar from "../../Home/Sidebar";
import FraudPieChart from "./FraudPieChart";
import FraudDetectNav from "../FraudDetectNav";
import AnalyticsChart from "./AnalyticsChart";

const userData =[
    {
        rank:1,
        fullname:'Smith Joy',
        userid:'US-001',
        fraudScore:94,
        lastAction:'Wallet Frozen',
    }
]

const detaildata= [
          { title: "Total Flags", value: "100+",chartData: [20, 40, 86, 60, 90]   },
          { title: "Suspensions", value: "200+", chartData: [20, 40, 86, 60, 90]  },
          { title: "Financial Abuse Cases", value: "50+", chartData: [20, 40, 86, 60, 90] },
        ]
const Analytics = () => {
  return (
    <div className="flex min-h-screen">
<Sidebar/>
   <div className=" flex-1">
    <FraudDetectNav/>
 
    <div className=" bg-[#013220] text-yellow-300 p-8 font-sans">
        <div className="flex justify-center text-sm text-yellow-300 mb-2">Sort By:
            <select name="" id="" className="bg-[#013220]">
                <option value="today">Today</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
            </select>
        </div>
      {/* Top Stats Section */}
      <div className="flex justify-around mb-10">
        {detaildata.map((item, i) => (
          <div
            key={i}
            className=" shadow-md w-1/4 p-4 shadow-black/70 rounded-xl"
          >
            
            <div className="text-xl font-bold">{item.title}</div>
            <div className="text-3xl font-bold text-yellow-400 my-2">
              {item.value}
            </div>
            {/* You can insert a line chart here */}
            <div  />
            <AnalyticsChart data={item.chartData}/>
          </div>
        ))}
      </div>

      {/* Top Flagged Users Table */}
      <h2 className="text-xl font-semibold mb-4">Top 5 Flagged Users (by Score)</h2>
      <div className="border border-yellow-400 rounded-xl p-4">
        <table className="w-full text-left table-auto border-separate border-spacing-y-2">
          <thead>
            <tr className="border-b border-yellow-300">
              <th>Rank</th>
              <th>Full Name</th>
              <th>User ID</th>
              <th>Fraud Score</th>
              <th className="text-center">Last Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((item, i) => (
              <tr key={i} className="rounded">
                <td className="py-2 px-3">{item.rank}</td>
                <td className="py-2 px-3">{item.fullname}</td>
                <td className="py-2 px-3">{item.userid}</td>
                <td className="py-2 px-3">{item.fraudScore}</td>
                <td className="text-center py-2 px-3 text-yellow-400 font-medium">{item.lastAction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <FraudPieChart/>
      </div>
    </div>
     </div>
       </div>
  );
};

export default Analytics;
