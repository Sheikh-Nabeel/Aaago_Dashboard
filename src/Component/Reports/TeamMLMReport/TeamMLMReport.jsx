import React from 'react';
import Sidebar from '../../Home/Sidebar';
import ReportNavbar from '../ReportNavbar';
import { FaSackDollar } from "react-icons/fa6";
import { RiTeamFill } from "react-icons/ri";
import { FaRankingStar } from "react-icons/fa6";
import TreeView from './TreeView';
import TeamMLMTable from './TeamMLMTable';

const data = [
  {
    total: 'Total Downline Income',
    percent: 'AED 754,000',
    desc: 'Earnings generated from all levels',
    Icon: FaSackDollar,
  },
  {
    total: 'Total Team Size',
    percent: '1,250 Members',
    desc: 'Users in direct + indirect downline',
    Icon: RiTeamFill,
  },
  {
    total: 'Top Rank Achiever',
    percent: 'Aku Zafar(Gold Rank)',
    desc: 'Highest rank achieved in this period',
    Icon: FaRankingStar,
  },
];

const TeamMLMReport = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 overflow-hidden">
        <ReportNavbar />
        <div className="mr-10 px-10 py-10 overflow-hidden">
          {/* All Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {data.map((item, index) => {
              const IconComponent = item.Icon;
              return (
                <div
                  key={index}
                  className="flex flex-col gap-4 shadow-lg rounded-lg outline outline-black/20 px-5 py-5 bg-gradient-to-b from-[#038A59] to-[#013723] shadow-black/80"
                >
                  <div className="flex gap-2 items-center">
                    <IconComponent size={30} />
                    <p className="text-lg font-semibold m-0 tracking-wide">
                      {item.total}
                    </p>
                  </div>
                  <h2 className="text-2xl font-bold">{item.percent}</h2>
                  <p className="text-sm">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
        <TreeView/>
        <TeamMLMTable/>
      </div>
    </div>
  );
};

export default TeamMLMReport;
