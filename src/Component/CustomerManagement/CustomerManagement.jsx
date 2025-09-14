import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TbEdit } from 'react-icons/tb';
import { RiDeleteBinLine } from 'react-icons/ri';
import { IoIosArrowDown } from 'react-icons/io';
import { fetchAllUsers, editUser, deleteUser, resetUserState } from '../../features/users/userSlice';
import Sidebar from '../Home/Sidebar';
import ConfirmationModal from '../Common/ConfirmationModal';

const CustomerManagement = () => {
  const dispatch = useDispatch();
  const { users, loading, error, success, editSuccess, deleteSuccess, totalUsers, updateKey } = useSelector((state) => state.user);
  const [sortBy, setSortBy] = useState('All');
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    country: '',
    kycLevel: '',
    kycStatus: '',
    hasVehicle: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  useEffect(() => {
    console.log('Fetching all customers');
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error || editSuccess || deleteSuccess) {
      console.log('Resetting state due to:', { error, editSuccess, deleteSuccess });
      const timer = setTimeout(() => {
        dispatch(resetUserState());
        setDeletingUserId(null);
        setFormErrors({});
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, editSuccess, deleteSuccess, dispatch]);

  const handleSortChange = (e) => {
    console.log('Sort changed to:', e.target.value);
    setSortBy(e.target.value);
  };

  const handleViewUser = (user) => {
    console.log('Viewing customer:', user._id);
    setSelectedUser(user);
  };

  const handleEditUser = (user) => {
    console.log('Editing customer:', user._id);
    setEditingUser(user);
    setFormData({
      username: user.username || '',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phoneNumber: user.phoneNumber || '',
      gender: user.gender || '',
      country: user.country || '',
      kycLevel: user.kycLevel !== undefined ? String(user.kycLevel) : '',
      kycStatus: user.kycStatus || '',
      hasVehicle: user.hasVehicle || '',
    });
    setFormErrors({});
  };

  const handleClosePopup = () => {
    console.log('Closing customer popup');
    setSelectedUser(null);
    setEditingUser(null);
    setFormErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting edit for userId:', editingUser._id, 'Data:', formData);
    try {
      await dispatch(editUser({ userId: editingUser._id, userData: formData })).unwrap();
      console.log('Edit customer successful:', editingUser._id);
      setEditingUser(null);
      setFormData({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        gender: '',
        country: '',
        kycLevel: '',
        kycStatus: '',
        hasVehicle: '',
      });
    } catch (error) {
      console.error('Edit customer failed:', error);
      try {
        const parsedError = typeof error === 'string' ? JSON.parse(error) : error;
        if (typeof parsedError === 'object' && parsedError !== null) {
          setFormErrors(parsedError);
        } else {
          setFormErrors({ general: parsedError || 'Failed to edit customer' });
        }
      } catch {
        setFormErrors({ general: error || 'Failed to edit customer' });
      }
    }
  };

  const handleDeleteUser = (userId) => {
    setCustomerToDelete(userId);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteCustomer = async () => {
    if (customerToDelete) {
      console.log('Initiating delete for userId:', customerToDelete);
      setDeletingUserId(customerToDelete);
      try {
        await dispatch(deleteUser(customerToDelete)).unwrap();
        console.log('Delete customer successful:', customerToDelete);
      } catch (error) {
        console.error('Delete customer failed:', error);
        setDeletingUserId(null);
      }
    }
    setShowDeleteConfirmation(false);
    setCustomerToDelete(null);
  };

  const cancelDeleteCustomer = () => {
    setShowDeleteConfirmation(false);
    setCustomerToDelete(null);
  };

  const filteredUsers = users.filter((user) => {
    if (sortBy === 'All') return true;
    if (sortBy === 'Pending' || sortBy === 'Approved') return user.kycStatus === sortBy.toLowerCase() || (!user.kycStatus && sortBy === 'Pending');
    return false;
  });

  console.log('Rendering with customers:', filteredUsers.map(u => u._id), 'updateKey:', updateKey);

  // Base URL for images
  const BASE_URL = 'https://aaaogo.xyz/';

  return (
    <div className="flex min-h-screen bg-[#013220] text-[#DDC104] font-sans">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center tracking-wide">Customer Management Dashboard</h1>

          {loading && !deletingUserId && !editingUser && !selectedUser && (
            <div className="text-center py-8">
              <div className="animate-spin inline-block w-8 h-8 border-4 border-[#DDC104] border-t-transparent rounded-full" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-600 text-white p-4 rounded-lg mb-6 shadow-lg outline outline-black/20 shadow-black/80 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>{typeof error === 'string' && error === 'canceled' ? 'Request timed out. Please try again.' : typeof error === 'string' ? error : error.general || 'An error occurred'}</span>
            </div>
          )}

          {success && (
            <div className="bg-[#038A59] text-white p-4 rounded-lg mb-6 shadow-lg outline outline-black/20 shadow-black/80 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Customers fetched successfully! Total: {totalUsers}</span>
            </div>
          )}

          {editSuccess && (
            <div className="bg-[#038A59] text-white p-4 rounded-lg mb-6 shadow-lg outline outline-black/20 shadow-black/80 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Customer updated successfully!</span>
            </div>
          )}

          {deleteSuccess && (
            <div className="bg-[#038A59] text-white p-4 rounded-lg mb-6 shadow-lg outline outline-black/20 shadow-black/80 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Customer deleted successfully!</span>
            </div>
          )}

          {!loading && !error && users.length > 0 && (
            <div className="bg-gradient-to-b from-[#038A59] to-[#013723] rounded-lg shadow-lg outline outline-black/20 shadow-black/80 p-6 transform hover:scale-105 transition duration-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold tracking-wide">Customer List</h2>
                <div className="flex items-center">
                  <label htmlFor="sortBy" className="text-sm mr-2 tracking-wide">Sort by:</label>
                  <div className="relative">
                    <select
                      id="sortBy"
                      value={sortBy}
                      onChange={handleSortChange}
                      className="bg-transparent text-sm text-[#DDC104] focus:outline-none appearance-none pr-8"
                    >
                      <option className="bg-yellow-300 text-black" value="All">All</option>
                      <option className="bg-yellow-300 text-black" value="Pending">Pending KYC</option>
                      <option className="bg-yellow-300 text-black" value="Approved">Approved KYC</option>
                    </select>
                    <IoIosArrowDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#DDC104]" />
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left bg-[#013723] rounded-lg shadow">
                  <thead>
                    <tr className="border-b border-[#038A59] bg-[#038A59]">
                      <th className="px-4 py-3 font-medium tracking-wide">ID</th>
                      <th className="px-4 py-3 font-medium tracking-wide">Username</th>
                      <th className="px-4 py-3 font-medium tracking-wide">Email</th>
                      <th className="px-4 py-3 font-medium tracking-wide">KYC Status</th>
                      <th className="px-4 py-3 font-medium tracking-wide">KYC Level</th>
                      <th className="px-4 py-3 font-medium tracking-wide text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user._id} className="border-b border-[#013723] hover:bg-[#038A59]/50">
                        <td className="px-4 py-3">{user._id.slice(-6)}</td>
                        <td className="px-4 py-3">{user.username}</td>
                        <td className="px-4 py-3">{user.email}</td>
                        <td className="px-4 py-3">{user.kycStatus || 'Pending'}</td>
                        <td className="px-4 py-3">{user.kycLevel || 'N/A'}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3 justify-center">
                            <button
                              onClick={() => handleEditUser(user)}
                              className="border border-[#DDC104] p-2 rounded-full text-[#DDC104] hover:bg-[#DDC104] hover:text-[#013723] transition duration-200"
                              disabled={deletingUserId === user._id}
                            >
                              <TbEdit size={16} />
                            </button>
                            <button
                              onClick={() => handleViewUser(user)}
                              className="bg-[#DDC104] text-[#013723] px-4 py-1.5 rounded-full text-xs font-medium hover:bg-[#e8d34a] transition duration-200"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user._id)}
                              className="border border-[#DDC104] p-2 rounded-full text-[#DDC104] hover:bg-[#DDC104] hover:text-[#013723] transition duration-200"
                              disabled={deletingUserId === user._id}
                            >
                              {deletingUserId === user._id ? (
                                <div className="animate-spin inline-block w-4 h-4 border-2 border-[#DDC104] border-t-transparent rounded-full" />
                              ) : (
                                <RiDeleteBinLine size={16} />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {!loading && !error && users.length === 0 && (
            <div className="bg-[#038A59] text-white p-4 rounded-lg mb-6 shadow-lg outline outline-black/20 shadow-black/80 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>No customers found</span>
            </div>
          )}

          {selectedUser && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" role="dialog" aria-modal="true" tabIndex="-1">
              <div className="bg-gradient-to-b from-[#038A59] to-[#013723] rounded-lg shadow-lg outline outline-black/20 shadow-black/80 p-6 w-full max-w-4xl text-[#DDC104] font-sans transform transition-all duration-300 overflow-y-auto max-h-[90vh]">
                <h2 className="text-2xl font-semibold tracking-wide mb-4">Customer Details</h2>
                
                {/* Customer Information Table */}
                <div className="mb-6">
                  <h3 className="text-xl font-medium tracking-wide mb-2">Customer Information</h3>
                  <table className="w-full text-sm text-left bg-[#013723] rounded-lg shadow no-scrollbar">
                    <tbody>
                      <tr className="border-b border-[#038A59]">
                        <td className="px-4 py-2 font-medium">ID</td>
                        <td className="px-4 py-2">{selectedUser._id?.slice(-6) || 'N/A'}</td>
                      </tr>
                      <tr className="border-b border-[#038A59]">
                        <td className="px-4 py-2 font-medium">Username</td>
                        <td className="px-4 py-2">{selectedUser.username || 'N/A'}</td>
                      </tr>
                      <tr className="border-b border-[#038A59]">
                        <td className="px-4 py-2 font-medium">Full Name</td>
                        <td className="px-4 py-2">{selectedUser.firstName || ''} {selectedUser.lastName || ''}</td>
                      </tr>
                      <tr className="border-b border-[#038A59]">
                        <td className="px-4 py-2 font-medium">Email</td>
                        <td className="px-4 py-2">{selectedUser.email || 'N/A'}</td>
                      </tr>
                      <tr className="border-b border-[#038A59]">
                        <td className="px-4 py-2 font-medium">Phone Number</td>
                        <td className="px-4 py-2">{selectedUser.phoneNumber || 'N/A'}</td>
                      </tr>
                      <tr className="border-b border-[#038A59]">
                        <td className="px-4 py-2 font-medium">Gender</td>
                        <td className="px-4 py-2">{selectedUser.gender || 'N/A'}</td>
                      </tr>
                      <tr className="border-b border-[#038A59]">
                        <td className="px-4 py-2 font-medium">Country</td>
                        <td className="px-4 py-2">{selectedUser.country || 'N/A'}</td>
                      </tr>
                      <tr className="border-b border-[#038A59]">
                        <td className="px-4 py-2 font-medium">KYC Status</td>
                        <td className="px-4 py-2">{selectedUser.kycStatus || 'Pending'}</td>
                      </tr>
                      <tr className="border-b border-[#038A59]">
                        <td className="px-4 py-2 font-medium">KYC Level</td>
                        <td className="px-4 py-2">{selectedUser.kycLevel !== undefined ? selectedUser.kycLevel : 'N/A'}</td>
                      </tr>
                      <tr className="border-b border-[#038A59]">
                        <td className="px-4 py-2 font-medium">Has Vehicle</td>
                        <td className="px-4 py-2">{selectedUser.hasVehicle ? 'Yes' : 'No'}</td>
                      </tr>
                      <tr className="border-b border-[#038A59]">
                        <td className="px-4 py-2 font-medium">Created At</td>
                        <td className="px-4 py-2">{selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleString() : 'N/A'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* KYC Images Section */}
                {(selectedUser.cnicImages?.front || selectedUser.cnicImages?.back || selectedUser.selfieImage) && (
                  <div className="mb-6">
                    <h3 className="text-xl font-medium tracking-wide mb-2">KYC Images</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedUser.cnicImages?.front && (
                        <div>
                          <p className="font-medium">CNIC Front</p>
                          <img
                            src={`${BASE_URL}${selectedUser.cnicImages.front}`}
                            alt="CNIC Front"
                            className="w-full h-48 object-contain rounded-lg"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
                            }}
                          />
                        </div>
                      )}
                      {selectedUser.cnicImages?.back && (
                        <div>
                          <p className="font-medium">CNIC Back</p>
                          <img
                            src={`${BASE_URL}${selectedUser.cnicImages.back}`}
                            alt="CNIC Back"
                            className="w-full h-48 object-contain rounded-lg"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
                            }}
                          />
                        </div>
                      )}
                      {selectedUser.selfieImage && (
                        <div>
                          <p className="font-medium">Selfie</p>
                          <img
                            src={`${BASE_URL}${selectedUser.selfieImage}`}
                            alt="Selfie"
                            className="w-full h-48 object-contain rounded-lg"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleClosePopup}
                    className="bg-[#DDC104] text-[#013723] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#e8d34a] transition duration-200"
                    autoFocus
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {editingUser && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" role="dialog" aria-modal="true" tabIndex="-1">
              <div className="bg-gradient-to-b from-[#038A59] to-[#013723] rounded-lg shadow-lg outline outline-black/20 shadow-black/80 p-4 w-full max-w-sm sm:max-w-md text-[#DDC104] font-sans transform transition-all duration-300 overflow-y-auto max-h-[80vh]">
                <h2 className="text-xl font-semibold tracking-wide mb-3">Edit Customer</h2>
                <form onSubmit={handleEditSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full p-1.5 bg-[#013723] border border-[#DDC104] rounded text-[#DDC104] focus:outline-none text-sm"
                    />
                    {formErrors.username && <p className="text-red-500 text-xs mt-1">{formErrors.username}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full p-1.5 bg-[#013723] border border-[#DDC104] rounded text-[#DDC104] focus:outline-none text-sm"
                    />
                    {formErrors.firstName && <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full p-1.5 bg-[#013723] border border-[#DDC104] rounded text-[#DDC104] focus:outline-none text-sm"
                    />
                    {formErrors.lastName && <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-1.5 bg-[#013723] border border-[#DDC104] rounded text-[#DDC104] focus:outline-none text-sm"
                    />
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium">Phone Number</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full p-1.5 bg-[#013723] border border-[#DDC104] rounded text-[#DDC104] focus:outline-none text-sm"
                    />
                    {formErrors.phoneNumber && <p className="text-red-500 text-xs mt-1">{formErrors.phoneNumber}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full p-1.5 bg-[#013723] border border-[#DDC104] rounded text-[#DDC104] focus:outline-none text-sm"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {formErrors.gender && <p className="text-red-500 text-xs mt-1">{formErrors.gender}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full p-1.5 bg-[#013723] border border-[#DDC104] rounded text-[#DDC104] focus:outline-none text-sm"
                    />
                    {formErrors.country && <p className="text-red-500 text-xs mt-1">{formErrors.country}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium">KYC Level</label>
                    <select
                      name="kycLevel"
                      value={formData.kycLevel}
                      onChange={handleInputChange}
                      className="w-full p-1.5 bg-[#013723] border border-[#DDC104] rounded text-[#DDC104] focus:outline-none text-sm"
                    >
                      <option value="">Select KYC Level</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                    {formErrors.kycLevel && <p className="text-red-500 text-xs mt-1">{formErrors.kycLevel}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium">KYC Status</label>
                    <select
                      name="kycStatus"
                      value={formData.kycStatus}
                      onChange={handleInputChange}
                      className="w-full p-1.5 bg-[#013723] border border-[#DDC104] rounded text-[#DDC104] focus:outline-none text-sm"
                    >
                      <option value="">Select KYC Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    {formErrors.kycStatus && <p className="text-red-500 text-xs mt-1">{formErrors.kycStatus}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium">Has Vehicle</label>
                    <select
                      name="hasVehicle"
                      value={formData.hasVehicle}
                      onChange={handleInputChange}
                      className="w-full p-1.5 bg-[#013723] border border-[#DDC104] rounded text-[#DDC104] focus:outline-none text-sm"
                    >
                      <option value="">Select Vehicle Status</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                    {formErrors.hasVehicle && <p className="text-red-500 text-xs mt-1">{formErrors.hasVehicle}</p>}
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      type="button"
                      onClick={handleClosePopup}
                      className="bg-gray-500 text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-gray-600 transition duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#DDC104] text-[#013723] px-3 py-1.5 rounded-full text-xs font-medium hover:bg-[#e8d34a] transition duration-200"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="animate-spin inline-block w-4 h-4 border-2 border-[#013723] border-t-transparent rounded-full" />
                      ) : (
                        'Save'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <ConfirmationModal
        isOpen={showDeleteConfirmation}
        title="Delete Customer"
        message="Are you sure you want to delete this customer? This action cannot be undone."
        onConfirm={confirmDeleteCustomer}
        onClose={cancelDeleteCustomer}
      />
      
      <style jsx>{`
        .no-scrollbar {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Edge */
        }
      `}</style>
    </div>
  );
};

export default CustomerManagement;