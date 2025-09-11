import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const FraudDetectNav = () => {
     const location = useLocation()
  const linkClass = (path) => {
  return `menu-tab ${location.pathname === path ? 'active' : ''}`;
};
  return (
   
        <div className=" border-b border-yellow-300">

         <div className="flex justify-between items-center w-2/3 p-2 ">
        <Link to="/overview" className={linkClass('/overview')}>
         <span className='font-semibold'>OverView</span> 
        </Link>
        <div className='h-3 w-[2px] bg-yellow-400 '></div>
        <Link to="/autolockRulesPanel" className={linkClass('/autolockRulesPanel')}>
         <span className='font-semibold'>Auto-Lock Rules Panel</span> 
        </Link>
                <div className='h-3 w-[2px] bg-yellow-400 '></div>

        <Link to="/ruleeditorpanel" className={linkClass('/ruleeditorpanel')}>
          <span className='font-semibold'>Rule Editor Panel</span>
        </Link>
                 <div className='h-3 w-[2px] bg-yellow-400 '></div>

        <Link to="/analytics" className={linkClass('/analytics')}>
        <span className='font-semibold'>Analytics</span>
        </Link>
      </div>
      </div>
    
  )
}

export default FraudDetectNav