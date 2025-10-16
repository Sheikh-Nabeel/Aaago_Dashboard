import React, { useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const BookingChargesNav = () => {
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
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 px-1"
      >
        <IoIosArrowBack size={20} />
      </button>

      {/* Scrollable Menu */}
      <div
        ref={scrollRef}
        className="mx-6 flex gap-x-4 overflow-x-auto whitespace-nowrap scrollbar-hide"
      >
        <Link to="/bookingcharges" className={linkClass('/bookingcharges')}>
          General Pricing
        </Link>

        <div className="w-[2px] h-3 bg-yellow-400" />

        <Link to="/bookingcharges/carcab" className={linkClass('/bookingcharges/carcab')}>
          Car/Cab
        </Link>

        <div className="w-[2px] h-3 bg-yellow-400" />

        <Link to="/bookingcharges/bike" className={linkClass('/bookingcharges/bike')}>
          Bike
        </Link>

        <div className="w-[2px] h-3 bg-yellow-400" />

        <Link to="/bookingcharges/carrecovery" className={linkClass('/bookingcharges/carrecovery')}>
          Car Recovery
        </Link>

        <div className="w-[2px] h-3 bg-yellow-400" />

        <Link to="/bookingcharges/shiftingmovers" className={linkClass('/bookingcharges/shiftingmovers')}>
          Shifting & Movers
        </Link>

        <div className="w-[2px] h-3 bg-yellow-400" />

        <Link to="/bookingcharges/appointmentservices" className={linkClass('/bookingcharges/appointmentservices')}>
          Appointment Services
        </Link>
      </div>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 px-1"
      >
        <IoIosArrowForward size={20} />
      </button>
    </div>
  );
};

export default BookingChargesNav;
