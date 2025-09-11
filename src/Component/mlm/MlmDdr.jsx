import React, { useState } from 'react';
import { IoFilterOutline } from "react-icons/io5";
import MlmTable from './MlmTable';
import MlmBbr from './MlmBbr';
import MlmHlr from './MlmHlr';
import MlmCrr from './MlmCrr';
import Ambessdor from './Ambessdor';
import MlmManagement from "./MlmPaymentPage"
import MLMPaymentPage from './MlmPaymentPage';

const MlmDdr = () => {
  const titles = [
    'DDR',
    'CCR',
    'BBR',
    'HLR',
    'AMBESSDOR',
    'MLM MANAGEMENT',
    'Day'
  ];

  const [activeTab, setActiveTab] = useState('DDR');

  const renderContent = () => {
    switch (activeTab) {
      case 'CCR':
        return <MlmCrr />;
      case 'BBR':
        return <MlmBbr />;
      case 'HLR':
        return <MlmHlr />;
      case 'AMBESSDOR':
        return <Ambessdor/>; // Placeholder for missing Ambessdor component
      case 'MLM MANAGEMENT':
        return <MLMPaymentPage/>; // Placeholder for missing Ambessdor component
      default:
        return <MlmTable activeTab={activeTab} />;
    }
  };

  return (
    <div className="p-5">
      {/* Tabs */}
      <div className="flex border-b border-yellow-400 overflow-x-auto">
        <div className="flex flex-nowrap">
          {titles.map((title, index) => (
            <div key={index} className="flex items-center">
              <button
                onClick={() => setActiveTab(title)}
                className={`px-4 py-2 text-sm font-semibold flex items-center gap-2 transition-colors duration-200
                  ${activeTab === title
                    ? 'border-b-2 border-yellow-400 text-yellow-400'
                    : 'text-gray-300 hover:text-yellow-300'
                  }
                  ${title === 'Day'
                    ? 'border border-yellow-400 border-b-0 rounded-t-md'
                    : ''
                  }`}
              >
                {title}
                {title === 'Day' && <IoFilterOutline className="text-lg" />}
              </button>
              {index < titles.length - 1 && (
                <div className="w-[1px] h-6 bg-yellow-400/50" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mt-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default MlmDdr;