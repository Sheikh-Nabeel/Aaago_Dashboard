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
        <Link to="/paymentoverview" className={linkClass('/paymentoverview')}>
          Overview
        </Link>

        <div className="w-[2px] h-3 bg-yellow-400" />

        <Link to="/walletadjustment" className={linkClass('/walletadjustment')}>
          Wallet Adjustment
        </Link>

        <div className="w-[2px] h-3 bg-yellow-400" />

        <Link to="/transactions" className={linkClass('/transactions')}>
          Withdrawal Management
        </Link>

        <div className="w-[2px] h-3 bg-yellow-400" />

        <Link to="/walletfreezingrules" className={linkClass('/walletfreezingrules')}>
          Wallet Freezing Rules
        </Link>

        <div className="w-[2px] h-3 bg-yellow-400" />

        <Link to="/transactionlog" className={linkClass('/transactionlog')}>
          Transaction Logs
        </Link>

        <div className="w-[2px] h-3 bg-yellow-400" />

        <Link to="/alertnotification" className={linkClass('/alertnotification')}>
          Alert & Smart Notification
        </Link>

        <div className="w-[2px] h-3 bg-yellow-400" />

        <Link to="/unachievedpool" className={linkClass('/unachievedpool')}>
          Unachieved Pool Management
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
