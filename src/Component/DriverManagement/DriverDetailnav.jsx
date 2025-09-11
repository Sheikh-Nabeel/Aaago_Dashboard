import React from 'react';
import { TiArrowBackOutline } from 'react-icons/ti';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const DriverDetailnav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const linkClass = (path) => {
    return `menu-tab ${location.pathname === path ? 'active' : ''}`;
  };

  return (
    <div className="px-10">
     {/* Back Button */}
<div className="flex items-center gap-2 pb-6">
  <Link 
    to={location.pathname === '/driverprofile' 
         ? '/drivermanagement'  // If on profile, go to management
         : '/driverprofile'      // Otherwise, go to profile
    }
    className='flex items-center gap-2 cursor-pointer'
  >
    <TiArrowBackOutline size={30} className="text-lg" />
    <span className="text-lg font-semibold">Back</span>
  </Link>
</div>


      {/* Navigation Tabs */}
      <div className="flex justify-between items-center border-b border-yellow-400">
        <Link to={'/driverprofile'} className={linkClass('/driverprofile')}>
          Profile
        </Link>
        <div className="w-[2px] h-3 bg-yellow-400"></div>

        <Link to={'/drivermonitoring'} className={linkClass('/drivermonitoring')}>
          Monitoring
        </Link>
        <div className="w-[2px] h-3 bg-yellow-400"></div>

        <Link to={'/driverhistory'} className={linkClass('/driverhistory')}>
          History
        </Link>
        <div className="w-[2px] h-3 bg-yellow-400"></div>

        <Link to={'/earningandpayouts'} className={linkClass('/earningandpayouts')}>
          Earning & Payouts
        </Link>
        <div className="w-[2px] h-3 bg-yellow-400"></div>

        <Link to={'/ratings'} className={linkClass('/ratings')}>
          Ratings
        </Link>
        <div className="w-[2px] h-3 bg-yellow-400"></div>

        <Link to={'/penalty'} className={linkClass('/penalty')}>
          Penalty
        </Link>
        <div className="w-[2px] h-3 bg-yellow-400"></div>

        <Link to={'/report'} className={linkClass('/report')}>
          Report
        </Link>
        <div className="w-[2px] h-3 bg-yellow-400"></div>

        <Link to={'/referraltree'} className={linkClass('/referraltree')}>
          Referral Tree
        </Link>
      </div>
    </div>
  );
};

export default DriverDetailnav;
