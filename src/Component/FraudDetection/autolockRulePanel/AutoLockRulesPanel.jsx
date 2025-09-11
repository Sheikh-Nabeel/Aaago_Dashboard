import React from 'react';
import { FiEdit } from "react-icons/fi";
import FraudDetectNav from '../FraudDetectNav';
import Sidebar from '../../Home/Sidebar';


const data = [
  { rule: "Cancel in 24H", currentThreshold: 3, lastTriggered: '25 Jul, 11:30 AM' },
  { rule: "Cancel in 24H", currentThreshold: 3, lastTriggered: '25 Jul, 11:30 AM' },
  { rule: "Cancel in 24H", currentThreshold: 3, lastTriggered: '25 Jul, 11:30 AM' },
  { rule: "Cancel in 24H", currentThreshold: 3, lastTriggered: '25 Jul, 11:30 AM' },
  { rule: "Cancel in 24H", currentThreshold: 3, lastTriggered: '25 Jul, 11:30 AM' },
  { rule: "Cancel in 24H", currentThreshold: 3, lastTriggered: '25 Jul, 11:30 AM' },
  { rule: "Cancel in 24H", currentThreshold: 3, lastTriggered: '25 Jul, 11:30 AM' },
];

const AutoLockRulesPanel = () => {
  return (
    <div className="flex min-h-screen  ">
        <Sidebar />
  
        <div className="flex-1">
          <FraudDetectNav />

      {/* Date Filter */}
      <div className=" flex justify-end pt-2 pb-6 px-4 gap-4 items-center border-b border-yellow-200 text-xs">
        <label className="flex items-center space-x-2">
          <span>Date Range:</span>
          <input type="date" className="bg-transparent border border-yellow-300 rounded px-2 py-1 text-yellow-300 focus:outline-none" />
        </label>
        <span className="text-sm">To</span>
        <label className="flex items-center space-x-2">
          <span>Date:</span>
          <input type="date" className="bg-transparent border border-yellow-300 rounded px-2 py-1 text-yellow-300 focus:outline-none" />
        </label>
      </div>

      {/* Panel Header */}
      <div className="w-[90%] px-10 py-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Auto-Lock Rules Panel</h2>
        <button className="text-sm px-4 py-1 underline">Edit</button>
      </div>

      {/* Auto Lock Table */}
      <div className="flex justify-center items-center px-4">
        <div className="w-full max-w-3xl">
          <div className="overflow-x-auto border border-yellow-300 rounded-lg">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-yellow-300">
                  <th className="px-4 py-2 border-r border-yellow-300">Rules</th>
                  <th className="px-4 py-2 border-r border-yellow-300">Threshold</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-4 border-r border-yellow-300">Fraud Score</td>
                  <td className="px-4 py-4 border-r border-yellow-300">&gt;= 70</td>
                  <td className="px-4 py-4">Active</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-r border-yellow-300">High-Risk Flags</td>
                  <td className="px-4 py-2 border-r border-yellow-300">&gt;= 3 in 7 days</td>
                  <td className="px-4 py-2">Active</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-r border-yellow-300">Financial Abuse</td>
                  <td className="px-4 py-2 border-r border-yellow-300">Triggered once</td>
                  <td className="px-4 py-2">Active</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Explanation Checkbox */}
          <div className="flex gap-2 py-4 text-sm">
            <input type="checkbox" className="accent-yellow-300" />
            <label>If a user crosses any of these limits, automation triggers below will apply.</label>
          </div>
        </div>
      </div>

      {/* Toggle Controls Header */}
      <div className="w-[90%] px-10 py-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          Toggle Controls <span className="text-yellow-400 text-xs">(Automation Setting)</span>
        </h2>
      </div>

      {/* Toggle Settings */}
      <div className="flex justify-center items-center px-4">
        <div className="w-full max-w-3xl">
          <div className="border border-yellow-300 rounded-lg p-4 space-y-4 text-sm">
            <div className="flex items-center gap-2"><input type="checkbox" className="accent-yellow-300" /><label>Auto-Freeze Wallet</label></div>
            <div className="flex items-center gap-2"><input type="checkbox" className="accent-yellow-300" /><label>Notify User of Suspension via App + Email</label></div>
            <div className="flex items-center gap-2"><input type="checkbox" className="accent-yellow-300" /><label>Required Manual Unflag by Admin to Reinstate Account</label></div>
            <div className="flex items-center gap-2"><input type="checkbox" className="accent-yellow-300" /><label>Auto-Escalate to Fraud Dept if wallet frozen twice in 30 days</label></div>
          </div>
        </div>
      </div>

      {/* Rule Monitoring & History */}
      <div className="w-[90%] px-10 py-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Rule Monitoring & History</h2>
        <div>
          <label className="text-sm font-semibold">Sort By</label>
          <select className='bg-[#013220] focus:outline-none text-sm py-1 rounded'>
            <option value="today">Today</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>

     
     {/* History Table with Scrollbar inside tbody */}
<div className="flex justify-center items-center px-4">
  <div className="w-full max-w-3xl">
    <div className="border border-yellow-300 rounded-lg overflow-hidden">
      <div className="w-full">
        <table className="w-full text-sm text-left table-fixed">
          <thead className="">
            <tr className="border-b border-yellow-300">
              <th className="px-4 py-2 w-1/4">Rule</th>
              <th className="px-4 py-2 w-1/4">Current Threshold</th>
              <th className="px-4 py-2 w-1/4">Last Triggered</th>
              <th className="px-4 py-2 w-1/4">Action</th>
            </tr>
          </thead>
        </table>
        <div className="max-h-[240px] overflow-y-auto scrollbar scrollbar-thumb-yellow-400 scrollbar-track-yellow-100">
          <table className="w-full text-sm text-left table-fixed">
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="border-b border-yellow-200">
                  <td className="px-4 py-4 w-1/4">{item.rule}</td>
                  <td className="px-4 py-4 w-1/4">{item.currentThreshold}</td>
                  <td className="px-4 py-4 w-1/4">{item.lastTriggered}</td>
                  <td className="px-4 py-4 w-1/4">
                    <button><FiEdit size={20} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
</div>

    </div>
  );
};

export default AutoLockRulesPanel;
