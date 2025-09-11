import React, { useState } from "react";
import DispatchTable from "./DispatchTable";
import Sidebar from "../Home/Sidebar";
import Assigned from "./Assigned";
import Completed from "./Completed";
import Cancelled from "./Cancelled";
import { SlRefresh } from "react-icons/sl";

const dataTabs = ["All", "Assigned", "Completed", "Cancelled"];

const Dispatch = () => {
  // Filter states
  const [serviceType, setServiceType] = useState("");
  const [region, setRegion] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [date, setDate] = useState("");

  // Active tab state
  const [activeTab, setActiveTab] = useState("All");
  const renderContent = ()=>{
    switch(activeTab){
      case 'Assigned':
      return <Assigned/>
      case 'Completed':
        return <Completed/>
        case 'Cancelled':
          return <Cancelled/>
          default: 
          return <DispatchTable activeTab={activeTab}/>
    }
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        
        {/* Filters */}
        <div className="flex gap-6 p-6 flex-wrap">
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="border border-yellow-400 rounded-full px-4 py-2 bg-transparent text-yellow-400 focus:outline-none"
          >
            <option value="">Services type</option>
            <option value="Tow">Tow</option>
            <option value="Repair">Repair</option>
            <option value="Delivery">Delivery</option>
          </select>

          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="border border-yellow-400 rounded-full px-4 py-2 bg-transparent text-yellow-400 focus:outline-none"
          >
            <option value="">City</option>
            <option value="North">Dubai</option>
            <option value="South">Abu Dhabi</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-yellow-400 rounded-full px-4 py-2 bg-transparent text-yellow-400 focus:outline-none"
          >
            <option value="">Sort By</option>
            <option value="date">Date</option>
            <option value="status">Status</option>
            <option value="priority">Priority</option>
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-yellow-400 rounded-full px-4 py-2 bg-transparent text-yellow-400 focus:outline-none"
          />
          <button  className="flex gap-2 items-center border border-yellow-400 rounded-full px-4 py-2 bg-transparent text-yellow-400 focus:outline-none"><SlRefresh/> Refresh</button>
        </div>

        {/* Status Tabs */}
        <div className="flex gap-6 p-6 items-center font-bold">
          {dataTabs.map((item, index) => (
            <React.Fragment key={index}>
              <p
                onClick={() => setActiveTab(item)}
                className={`cursor-pointer pb-1 transition-colors duration-200 ${
                  activeTab === item
                    ? "text-yellow-400 border-b-2 border-yellow-400"
                    : "hover:text-yellow-300"
                }`}
              >
                {item}
              </p>
              {index !== dataTabs.length - 1 && (
                <div className="w-[2px] h-3 bg-yellow-400"></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default Dispatch;
