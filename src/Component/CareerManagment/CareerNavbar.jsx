import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const CareerNavbar = () => {
     const location = useLocation();
  const linkClass = (path) => {
    return `menu-tab ${location.pathname === path ? "active" : ""}`;
  };
  return (
     <div className="border-b border-yellow-300">
          <div className="flex justify-between w-2/3 p-2">
            <Link
              to="/proposalmanagement"
              className={linkClass("/proposalmanagement")}
            >
              Proposal Management
            </Link>
            <Link
              to="/agreementrecord"
              className={linkClass("/agreementrecord")}
            >
              Agreement Generation & Record
            </Link>
            <Link
              to="/marketplacecontrol"
              className={linkClass("/marketplacecontrol")}
            >
              Marketplace Control
            </Link>
          </div>
        </div>
  )
}

export default CareerNavbar