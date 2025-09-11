import React, { useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const WalletPaymentNavbar = () => {
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
        <Link to="/kycverification" className={linkClass('/kycverification')}>
          KYC Verifications
        </Link>

        <div className="w-[2px] h-3 bg-yellow-400" />

        <Link to="/serviceProvider" className={linkClass('/serviceProvider')}>
         Service Provider
        </Link>

        <div className="w-[2px] h-3 bg-yellow-400" />

        <Link to="/driverhiring" className={linkClass('/driverhiring')}>
          Driver Hiring/Career Proposals
        </Link>
        <div className="w-[2px] h-3 bg-yellow-400" />

        <Link to="/vendorreq" className={linkClass('/vendorreq')}>
          Vendor Onboarding Requests
        </Link>

        <div className="w-[2px] h-3 bg-yellow-400" />

        <Link to="/drawalRequest" className={linkClass('/drawalRequest')}>
         Withdrawal Requests
        </Link>

        <div className="w-[2px] h-3 bg-yellow-400" />

        <Link to="/complainresolve" className={linkClass('/complainresolve')}>
          Complain Resolutions
        </Link>
        <div className="w-[2px] h-3 bg-yellow-400" />

        <Link to="/accountedit" className={linkClass('/accountedit')}>
          Manual Account Edits
        </Link>
        <div className="w-[2px] h-3 bg-yellow-400" />

        <Link to="/promocode" className={linkClass('/promocode')}>
          Promo Code or Offer Aprovals
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

export default WalletPaymentNavbar;
