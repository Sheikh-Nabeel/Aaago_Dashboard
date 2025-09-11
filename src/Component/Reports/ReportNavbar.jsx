import React, { useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const ReportNavbar = () => {
  const location = useLocation();
  const scrollRef = useRef(null);

  const linkClass = (path) => {
    return `menu-tab ${location.pathname === path ? 'active' : ''}`;
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -150, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 150, behavior: 'smooth' });
  };

  return (
    <div className="relative border-b border-yellow-400 px-6 py-2">
      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10  px-1"
      >
        <IoIosArrowBack size={20} />
      </button>

      {/* Scrollable Menu */}
      <div
        ref={scrollRef}
        className="mx-6 flex gap-x-4 overflow-x-auto whitespace-nowrap scrollbar-hide"
      >
        <Link to="/reportanalytics" className={linkClass('/reportanalytics')}>
          Analytics
        </Link>

        <div className="w-[2px] h-3 bg-yellow-400" />

        <Link to="/driverreport" className={linkClass('/driverreport')}>
        Driver Reports
        </Link>

        <div className="w-[2px] h-3 bg-yellow-400" />

        <Link to="/rideservicereport" className={linkClass('/rideservicereport')}>
          Ride & Service Reports
        </Link>

        <div className="w-[2px] h-3 bg-yellow-400" />

        <Link to="/earningandcommission" className={linkClass('/earningandcommission')}>
          Earning & Commissions
        </Link>

        <div className="w-[2px] h-3 bg-yellow-400" />

        <Link to="/supportreport" className={linkClass('/supportreport')}>
         Support Reports
        </Link>

        <div className="w-[2px] h-3 bg-yellow-400" />

        <Link to="/approvalactivities" className={linkClass('/approvalactivities')}>
          Approved Activities 
        </Link>

        <div className="w-[2px] h-3 bg-yellow-400" />

        <Link to="/teammlmreport" className={linkClass('/teammlmreport')}>
        Team MLM Reports
        </Link>
                <div className="w-[2px] h-3 bg-yellow-400" />
        <Link to="/withdrawalandtransaction" className={linkClass('/withdrawalandtransaction')}>
        Withdrawal & Transaction Logs
        </Link>
                <div className="w-[2px] h-3 bg-yellow-400" />
        <Link to="/customreportgenerator" className={linkClass('/customreportgenerator')}>
        Custom Report Generator 
        </Link>

      </div>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10  px-1"
      >
        <IoIosArrowForward size={20} />
      </button>
    </div>
  );
};

export default ReportNavbar;
