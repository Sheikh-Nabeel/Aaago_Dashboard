import React, { useState } from 'react';
import Sidebar from '../../Home/Sidebar';
import WalletPaymentNavbar from '../WalletPaymentNavbar';
import PoollSummaryView from './PoollSummaryView';
import TransferFundView from './TransferFundView';
import ManualFundRecovery from './ManualFundRecovery';
import FutureReassignmentDash from './FutureReassignmentDash';

const UnachievedPoolManage = () => {
  const [activeView, setActiveView] = useState("summary");

  const viewButtons = [
    { key: "summary", label: "Pool Summary View" },
    { key: "transfer", label: "Transfer Pool Funds Panel View" },
    { key: "recovery", label: "Manual Fund Recovery" },
    { key: "reassignment", label: "Future Reassignment Dashboard" },
  ];

  let contentView;
  if (activeView === "summary") {
    contentView = <PoollSummaryView />;
  } else if (activeView === "transfer") {
    contentView = <TransferFundView />;
  } else if (activeView === "recovery") {
    contentView = <ManualFundRecovery/>;
  } else if (activeView === "reassignment") {
    contentView = <FutureReassignmentDash/>; 
  }

  return (
    <div className="flex bg-[#13220] min-h-screen">
      <Sidebar />
      <div className="flex-1 overflow-hidden">
        <WalletPaymentNavbar />
        <div className="p-6 space-y-6">
          {/* View Selection Buttons */}
          <div className="flex flex-wrap gap-4">
            {viewButtons.map((btn) => (
              <button
                key={btn.key}
                onClick={() => setActiveView(btn.key)}
                className={`px-4 py-2 rounded font-semibold transition duration-150 ${
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

export default UnachievedPoolManage;
