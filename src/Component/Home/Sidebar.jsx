import React, { useState, useEffect } from 'react';
import { LuLayoutDashboard } from 'react-icons/lu';
import { FaSitemap, FaTruck, FaHandHolding, FaBriefcase, FaUserTie, FaUsers, FaTags } from 'react-icons/fa';
import { MdVerifiedUser, MdRequestPage, MdOutlineIndeterminateCheckBox } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { TbMessageDots } from 'react-icons/tb';
import { PiUserFocus } from 'react-icons/pi';
import { FiUserCheck } from 'react-icons/fi';
import { RiWallet3Fill } from 'react-icons/ri';
import { CiBookmarkPlus } from 'react-icons/ci';
import { LiaUserFriendsSolid } from 'react-icons/lia';
import { FaUserShield } from 'react-icons/fa6';
import axios from 'axios';

const Sidebar = () => {
  const location = useLocation();
  const [permissions, setPermissions] = useState([]);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchUserPermissions = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/user/me', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setPermissions(response.data.user.adminPermissions || []);
        setUserRole(response.data.user.role);
      } catch (error) {
        console.error('Failed to fetch user permissions:', error);
      }
    };
    fetchUserPermissions();
  }, []);

  const linkClasses = (path) =>
    `px-4 py-2 rounded-full border border-[#DDC104] transition-all duration-300 font-medium text-lg flex items-center gap-3 ${
      location.pathname === path
        ? 'bg-[#DDC104] text-[#013220] shadow-md'
        : 'hover:bg-yellow-100 hover:text-[#013220]'
    }`;

  const routes = [
    { path: '/home', name: 'Dashboard', icon: <LuLayoutDashboard size={20} />, permission: 'home' },
    { path: '/mlm', name: 'MLM', icon: <FaSitemap size={20} />, permission: 'mlm' },
    { path: '/dispatch', name: 'Dispatch Center', icon: <FaTruck size={20} />, permission: 'dispatch' },
    { path: '/drivermanagement', name: 'Driver Management', icon: <FaUserTie size={20} />, permission: 'drivermanagement' },
    { path: '/customermanagement', name: 'Customer Management', icon: <LiaUserFriendsSolid size={20} />, permission: 'customermanagement' },
    { path: '/customersupport', name: 'Customer Support', icon: <MdVerifiedUser size={20} />, permission: 'customersupport' },
    { path: '/websiteuser', name: 'Website User', icon: <FaUsers size={20} />, permission: 'websiteuser' },
    {
      path: '/proposalmanagement',
      name: 'Career Management',
      icon: (
        <div className="flex items-center gap-2">
          <div className="relative w-6 h-6">
            <FaBriefcase size={16} className="absolute top-0 left-1/2 -translate-x-1/2" />
            <FaHandHolding size={16} className="absolute bottom-0 left-1/2 -translate-x-1/2" />
          </div>
        </div>
      ),
      permission: 'proposalmanagement',
    },
    { path: '/overview', name: 'Fraud Detection', icon: <MdOutlineIndeterminateCheckBox size={20} />, permission: 'overview' },
    { path: '/paymentoverview', name: 'Wallet & Panel', icon: <RiWallet3Fill size={20} />, permission: 'paymentoverview' },
    { path: '/chatdetail', name: 'Monitor', icon: <TbMessageDots size={20} />, subtext: '(Chats & Activity)', permission: 'chatdetail' },
    { path: '/kycverification', name: 'Admin Approvals', icon: <FiUserCheck size={20} />, permission: 'kycverification' },
    { path: '/reportanalytics', name: 'Reports', icon: <PiUserFocus size={25} />, permission: 'reportanalytics' },
    { path: '/reviewandrating', name: 'Rating & Reviews', icon: <CiBookmarkPlus size={25} />, permission: 'reviewandrating' },
    { path: '/officialsandfeed', name: 'Officials & Feed', icon: <FaTags size={20} />, permission: 'officialsandfeed' },
    { path: '/adminmanagement', name: 'Admin Management', icon: <FaUserShield size={20} />, permission: 'adminmanagement' },
  ];

  const visibleRoutes = userRole === 'superadmin' ? routes : routes.filter(route =>
    route.permission === 'adminmanagement' ? userRole === 'superadmin' : permissions.includes(route.permission)
  );

  return (
    <div className="sticky top-0 left-0 overflow-y-auto overflow-x-hidden z-10 p-6 flex flex-col gap-12 border-r border-[#546816] min-h-screen">
      <div className="flex flex-col gap-6 w-64">
        {visibleRoutes.map(route => (
          <Link key={route.path} to={route.path} className={linkClasses(route.path)}>
            {route.icon}
            {route.subtext ? (
              <p className="truncate">{route.name} <span className="text-sm">{route.subtext}</span></p>
            ) : (
              <span className="truncate">{route.name}</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;