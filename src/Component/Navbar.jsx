import React from 'react';
import { CiSearch, CiLogin } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { BiSliderAlt } from "react-icons/bi";
import { LuMessageCircleMore } from "react-icons/lu";
import { FaUserShield } from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/slice/authSlice';
import { useGetCurrentUserQuery } from '../features/service/apiSlice';
import { apiSlice } from '../features/service/apiSlice'; // Import apiSlice to invalidate cache

// Define the base URL for images (without /api)
const IMAGE_BASE_URL = "https://aaogobackend.xyz";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, token } = useSelector((state) => state.auth);

  console.log('Auth State:', { isAuthenticated, token });

  // Fetch user data using getCurrentUser API
  const { data: userData, isLoading, error } = useGetCurrentUserQuery(undefined, {
    skip: !isAuthenticated || !token,
  });

  console.log('API Response:', { userData, isLoading, error });
  console.log('User Data Details:', userData?.user);

  const isSuperadmin = isAuthenticated && userData?.user?.role === 'superadmin';

  // Handle logout
  const handleLogout = () => {
    dispatch(logout()); // Clear Redux auth state
    dispatch(apiSlice.util.resetApiState()); // Clear RTK Query cache
    localStorage.removeItem('token'); // Ensure token is removed
    navigate('/');
  };

  // Construct full image URL
  const selfieImageUrl = userData?.user?.selfieImage
    ? `${IMAGE_BASE_URL}/uploads/${userData.user.selfieImage.replace(/^\/?uploads\//, '')}`
    : '/image.jpg';

  console.log('Selfie Image URL:', selfieImageUrl);

  return (
    <div className="flex justify-between items-center px-2 border-b border-[#3A5719]">
      <div className="flex items-center gap-4 pr-[50px] py-1 border-r border-[#546816]">
        <img
          className="rounded-full w-20 h-20 object-cover border-2 border-[#DDC104]"
          src={selfieImageUrl}
          alt="Profile"
          onError={(e) => {
            console.log('Image load error:', e);
            e.target.src = '/image.jpg';
          }}
        />
        <div className="flex flex-col justify-center">
          <h6 className="text-xs">Welcome</h6>
          <h1 className="font-bold text-lg">
            {isLoading ? 'Loading...' : error || !isAuthenticated ? 'Guest' : userData?.user?.username || 'Guest'}
          </h1>
          <p className="text-xs">
            {isLoading ? 'Loading...' : error || !isAuthenticated ? 'No email available' : userData?.user?.email || 'No email available'}
          </p>
        </div>
      </div>

      {/* Search Box */}
      <div className="flex items-center border border-[#DDC104] rounded-full px-4 py-2 gap-2 relative bg-[#013220] hover:border-yellow-400 transition">
        <CiSearch size={24} />
        <input
          type="text"
          placeholder="Search here"
          className="border-none outline-none bg-transparent text-white placeholder:text-[#DDC104] w-64"
        />
        <div className="absolute right-[1px] p-[10px] border-l border-t border-b border-[#DDC104] rounded-full cursor-pointer">
          <BiSliderAlt size={20} />
        </div>
      </div>

      {/* Icons Right Side */}
      <div className="flex gap-4 items-center text-[#DDC104]">
        <div className="p-2 border border-[#DDC104] rounded-full hover:bg-[#DDC104] hover:text-black transition cursor-pointer">
          <IoSettingsOutline size={25} />
        </div>
        <div className="p-2 border border-[#DDC104] rounded-full hover:bg-[#DDC104] hover:text-black transition cursor-pointer">
          <LuMessageCircleMore size={25} />
        </div>
        <NavLink
          to="/notification"
          className={({ isActive }) =>
            `p-2 border border-[#DDC104] rounded-full hover:bg-[#DDC104] hover:text-black transition cursor-pointer ${
              isActive ? "bg-yellow-400 text-black" : ""
            }`
          }
        >
          <IoIosNotifications size={25} />
        </NavLink>
        {isSuperadmin && (
          <NavLink
            to="/adminmanagement"
            className={({ isActive }) =>
              `p-2 border border-[#DDC104] rounded-full hover:bg-[#DDC104] hover:text-black transition cursor-pointer ${
                isActive ? "bg-yellow-400 text-black" : ""
              }`
            }
            title="Admin Management"
          >
            <FaUserShield size={25} />
          </NavLink>
        )}
        <button
          onClick={handleLogout}
          className="p-2 border border-[#DDC104] rounded-full hover:bg-[#DDC104] hover:text-black transition cursor-pointer"
          title="Logout"
        >
          <CiLogin size={25} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;