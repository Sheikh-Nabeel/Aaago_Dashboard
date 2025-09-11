import React, { useState } from 'react';
import Sidebar from '../../Home/Sidebar';
import CareerProposals from './CareerProposals'
import ManualEditsLog from './ManualEditsLog'
import NewDriver from './NewDriver';
import AgreementSentLog from './AgreementSentLog'
import ReportNavbar from '../ReportNavbar';
const ApprovalActivities = () => {
  const [activeView, setActiveView] = useState("driver");

  const viewButtons = [
    { key: "driver", label: "New Driver/Service Provider Approvals" },
    { key: "career", label: "Career Proposals" },
    { key: "manual", label: "Manual Edits Log" },
    { key: "agreement", label: "Agreement Sent Log" },
  ];

  let contentView;
  if (activeView === "driver") {
    contentView = <NewDriver/>;
  } else if (activeView === "career") {
    contentView = <CareerProposals/>;
  } else if (activeView === "manual") {
    contentView = <ManualEditsLog/>;
  } else if (activeView === "agreement") {
    contentView = <AgreementSentLog/>; 
  }

  return (
    <div className="flex bg-[#13220] min-h-screen">
      <Sidebar />
      <div className="flex-1 overflow-hidden">
        <ReportNavbar/>
        <div className="p-6 space-y-6">
          {/* View Selection Buttons */}
          <div className="flex justify-between">
            {viewButtons.map((btn) => (
              <button
                key={btn.key}
                onClick={() => setActiveView(btn.key)}
                className={`px-8 py-2 rounded font-semibold transition duration-150 ${
                  activeView === btn.key
                    ? "bg-yellow-400 text-black"
                    : "border border-yellow-400 text-yellow-300 hover:bg-yellow-300 hover:text-black"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* View Content */}
          <div>{contentView}</div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalActivities;
