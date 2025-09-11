import React from 'react'
import { TiArrowBackOutline } from 'react-icons/ti';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const CustomerDetailnav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const linkClass = (path) => {
    return `menu-tab ${location.pathname === path ? 'active' : ''}`;
  };

  return (
    <div className='px-10'>
      {/* Back Button */}
<div className="flex items-center gap-2 pb-6">
  <Link 
    to={location.pathname === '/customerprofile' 
         ? '/customermanagement'  // If on profile, go to management
         : '/customerprofile'      // Otherwise, go to profile
    }
    className='flex items-center gap-2 cursor-pointer'
  >
    <TiArrowBackOutline size={30} className="text-lg" />
    <span className="text-lg font-semibold">Back</span>
  </Link>
</div>


      {/* Navigation Tabs */}
      <div className='flex justify-between items-center border-b border-yellow-400'>
        <Link to={'/customerprofile'} className={linkClass('/customerprofile')}>
          Profile
        </Link>
        <div className='w-[2px] h-3 bg-yellow-400'></div>

        <Link to={'/customerhistory'} className={linkClass('/customerhistory')}>
          History
        </Link>
        <div className='w-[2px] h-3 bg-yellow-400'></div>

        <Link to={'/customerearningpayout'} className={linkClass('/customerearningpayout')}>
          Earning & Payouts
        </Link>
        <div className='w-[2px] h-3 bg-yellow-400'></div>

        <Link to={'/customermlm'} className={linkClass('/customermlm')}>
          MLM
        </Link>
        <div className='w-[2px] h-3 bg-yellow-400'></div>

        <Link to={'/customerrating'} className={linkClass('/customerrating')}>
          Ratings
        </Link>
        <div className='w-[2px] h-3 bg-yellow-400'></div>

        <Link to={'/customercomplain'} className={linkClass('/customercomplain')}>
          Complain
        </Link>
        <div className='w-[2px] h-3 bg-yellow-400'></div>

        <Link to={'/customerreferraltree'} className={linkClass('/customerreferraltree')}>
          Referral Tree
        </Link>
      </div>
    </div>
  );
};

export default CustomerDetailnav;
