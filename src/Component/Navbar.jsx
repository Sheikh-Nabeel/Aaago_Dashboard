import React, { useRef } from 'react';
import { CiSearch, CiLogin } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { BiSliderAlt } from "react-icons/bi";
import { LuMessageCircleMore } from "react-icons/lu";
import { FaUserShield, FaUser } from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/slice/authSlice';
import { useGetCurrentUserQuery } from '../features/service/apiSlice';
import { apiSlice } from '../features/service/apiSlice'; // Import apiSlice to invalidate cache
import { toast } from 'react-toastify';
import axiosInstance from '../services/axiosConfig';

// Define the base URL for images (without /api)
const IMAGE_BASE_URL = "http://localhost:3001";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const fileInputRef = useRef(null);

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
    : null;

  // Get user initials for avatar
  const getUserInitials = (username) => {
    if (!username) return 'G';
    return username.split(' ').map(name => name[0]).join('').toUpperCase().slice(0, 2);
  };

  console.log('Selfie Image URL:', selfieImageUrl);

  // Handle profile picture click
  const handleProfilePictureClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle file selection and upload
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please select a valid image file (JPEG, PNG, GIF)');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error('File size must be less than 5MB');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('profilePicture', file);

      const response = await axiosInstance.patch('/user/update-profile-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success('Profile picture updated successfully!');
        // Invalidate the current user query to refetch updated data
        dispatch(apiSlice.util.invalidateTags(['User']));
      } else {
        toast.error('Failed to update profile picture');
      }
    } catch (error) {
      console.error('Error updating profile picture:', error);
      toast.error('Failed to update profile picture');
    }

    // Reset file input
    event.target.value = '';
  };

  return (
    <div className="flex justify-between items-center px-2 border-b border-[#3A5719]">
      <div className="flex items-center gap-4 pr-[50px] py-1 border-r border-[#546816]">
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
        
        {selfieImageUrl ? (
          <img
            className="rounded-full w-20 h-20 object-cover border-2 border-[#DDC104] cursor-pointer hover:opacity-80 transition-opacity"
            src={selfieImageUrl}
            alt="Profile"
            onClick={handleProfilePictureClick}
            title="Click to update profile picture"
            onError={(e) => {
              console.log('Image load error:', e);
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div 
          className={`rounded-full w-20 h-20 border-2 border-[#DDC104] bg-[#013220] flex items-center justify-center cursor-pointer hover:bg-[#024A30] transition-colors ${selfieImageUrl ? 'hidden' : 'flex'}`}
          onClick={handleProfilePictureClick}
          title="Click to add profile picture"
        >
          {userData?.user?.username ? (
            <span className="text-[#DDC104] font-bold text-xl">
              {getUserInitials(userData.user.username)}
            </span>
          ) : (
            <FaUser className="text-[#DDC104] text-2xl" />
          )}
        </div>
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

      {/* Search Box - Global search functionality for the dashboard */}
      {/* <div className="flex items-center border border-[#DDC104] rounded-full px-4 py-2 gap-2 relative bg-[#013220] hover:border-yellow-400 transition">
        <CiSearch size={24} />
        <input
          type="text"
          placeholder="Search here"
          className="border-none outline-none bg-transparent text-white placeholder:text-[#DDC104] w-64"
        />
        <div className="absolute right-[1px] p-[10px] border-l border-t border-b border-[#DDC104] rounded-full cursor-pointer">
          <BiSliderAlt size={20} />
        </div>
      </div> */}

      {/* Navigation Icons - Right side action buttons */}
      <div className="flex gap-4 items-center text-[#DDC104]">
        {/* Settings Icon - Opens application settings and preferences */}
        <div className="p-2 border border-[#DDC104] rounded-full hover:bg-[#DDC104] hover:text-black transition cursor-pointer">
          <IoSettingsOutline size={25} />
        </div>
        {/* Message Icon - Opens messaging/chat interface for communication */}
        {/* <div className="p-2 border border-[#DDC104] rounded-full hover:bg-[#DDC104] hover:text-black transition cursor-pointer">
          <LuMessageCircleMore size={25} />
        </div> */}
        {/* Notification Icon - Navigates to notifications page, shows active state when selected */}
        {/* <NavLink
          to="/notification"
          className={({ isActive }) =>
            `p-2 border border-[#DDC104] rounded-full hover:bg-[#DDC104] hover:text-black transition cursor-pointer ${
              isActive ? "bg-yellow-400 text-black" : ""
            }`
          }
        >
          <IoIosNotifications size={25} />
        </NavLink> */}
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