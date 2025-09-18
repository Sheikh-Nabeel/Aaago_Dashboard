import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Home/Sidebar';

const WebsiteUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0,
    usersPerPage: 10,
    hasNextPage: false,
    hasPrevPage: false,
    nextPage: null,
    prevPage: null
  });

  const fetchUsersWithoutKYC = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const baseUrl = 'http://localhost:3001/api';
      const response = await axios.get(`${baseUrl}/user/without-kyc?page=${page}&limit=10`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        setUsers(response.data.users);
        setPagination(response.data.pagination);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error fetching users without KYC:', error);
      setError(error.response?.data?.message || 'Failed to fetch users without KYC');
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersWithoutKYC();
  }, []);

  const handleViewUser = (user) => {
    setSelectedUser(user);
  };

  const handleClosePopup = () => {
    setSelectedUser(null);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchUsersWithoutKYC(newPage);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="flex bg-[#013220] text-yellow-400 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-3 md:p-6 min-w-0">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 bg-gradient-to-r from-[#1a4a2e] to-[#2d5a3d] p-6 rounded-xl border border-yellow-400/20 shadow-lg">
            <h1 className="text-3xl font-bold text-yellow-400 mb-2">Customer Support</h1>
            <p className="text-gray-400">Manage website users without KYC verification</p>
          </div>

          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin inline-block w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-600/20 border border-red-500/50 text-red-400 p-4 rounded-lg mb-6 shadow-lg flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-600/20 border border-green-500/50 text-green-400 p-4 rounded-lg mb-6 shadow-lg flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Users fetched successfully! Total: {pagination.totalUsers}</span>
            </div>
          )}

          {!loading && !error && users.length > 0 && (
            <div className="bg-[#1a4a2e] rounded-xl border border-yellow-400/20 shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-yellow-400">Users Without KYC</h2>
                <div className="text-sm text-gray-400">
                  Page {pagination.currentPage} of {pagination.totalPages} | Total: {pagination.totalUsers} users
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left bg-[#013220] rounded-lg shadow border border-yellow-400/10">
                  <thead className="text-xs uppercase bg-gradient-to-r from-yellow-400 to-yellow-300 text-[#013220]">
                    <tr>
                      <th className="px-4 py-3 font-medium text-center">User ID</th>
                      <th className="px-4 py-3 font-medium text-center">Username</th>
                      <th className="px-4 py-3 font-medium text-center">Name</th>
                      <th className="px-4 py-3 font-medium text-center">Email</th>
                      <th className="px-4 py-3 font-medium text-center">Phone</th>
                      <th className="px-4 py-3 font-medium text-center">Gender</th>
                      <th className="px-4 py-3 font-medium text-center">KYC Level</th>
                      <th className="px-4 py-3 font-medium text-center">Created At</th>
                      <th className="px-4 py-3 font-medium text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.userId} className="border-b border-yellow-400/10 hover:bg-yellow-400/5 text-yellow-400">
                        <td className="px-4 py-3 text-center">{user.userId.slice(-6)}</td>
                        <td className="px-4 py-3 text-center">{user.username}</td>
                        <td className="px-4 py-3 text-center">{user.firstName} {user.lastName}</td>
                        <td className="px-4 py-3 text-center">{user.email}</td>
                        <td className="px-4 py-3 text-center">{user.phoneNumber}</td>
                        <td className="px-4 py-3 text-center">{user.gender || 'N/A'}</td>
                        <td className="px-4 py-3 text-center">{user.kycLevel}</td>
                        <td className="px-4 py-3 text-center">{formatDate(user.createdAt)}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3 justify-center">
                            <button
                              onClick={() => handleViewUser(user)}
                              className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-[#013220] px-3 py-1 rounded-md hover:from-yellow-300 hover:to-yellow-200 transition-all duration-200 text-xs font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                              View
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center items-center mt-6 gap-2">
                  <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={!pagination.hasPrevPage}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      pagination.hasPrevPage
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-[#013220] hover:from-yellow-300 hover:to-yellow-200 shadow-lg hover:shadow-xl transform hover:scale-105'
                        : 'bg-gray-600/50 text-gray-400 cursor-not-allowed border border-gray-600/50'
                    }`}
                  >
                    Previous
                  </button>
                  
                  <span className="px-4 py-2 text-sm text-yellow-400">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </span>
                  
                  <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={!pagination.hasNextPage}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      pagination.hasNextPage
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-[#013220] hover:from-yellow-300 hover:to-yellow-200 shadow-lg hover:shadow-xl transform hover:scale-105'
                        : 'bg-gray-600/50 text-gray-400 cursor-not-allowed border border-gray-600/50'
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}

          {!loading && !error && users.length === 0 && (
            <div className="bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 p-4 rounded-lg mb-6 shadow-lg flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>No users without KYC found</span>
            </div>
          )}

          {/* User Detail Modal */}
          {selectedUser && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" role="dialog" aria-modal="true" tabIndex="-1">
              <div className="bg-gradient-to-b from-[#013220] to-[#001a0f] border border-yellow-400/30 rounded-lg shadow-2xl p-6 w-full max-w-4xl text-yellow-400 font-sans transform transition-all duration-300 overflow-y-auto max-h-[90vh]">
                <h2 className="text-2xl font-semibold tracking-wide mb-4 text-yellow-400">User Details</h2>
                
                <div className="mb-6">
                  <h3 className="text-xl font-medium tracking-wide mb-2 text-yellow-400">User Information</h3>
                  <table className="w-full text-sm text-left bg-[#013220]/50 border border-yellow-400/20 rounded-lg shadow-lg">
                    <tbody>
                      <tr className="border-b border-yellow-400/20 hover:bg-yellow-400/5 transition-colors duration-200">
                        <td className="px-4 py-2 font-medium text-yellow-400">User ID</td>
                        <td className="px-4 py-2 text-gray-300">{selectedUser.userId}</td>
                      </tr>
                      <tr className="border-b border-yellow-400/20 hover:bg-yellow-400/5 transition-colors duration-200">
                        <td className="px-4 py-2 font-medium text-yellow-400">Username</td>
                        <td className="px-4 py-2 text-gray-300">{selectedUser.username}</td>
                      </tr>
                      <tr className="border-b border-yellow-400/20 hover:bg-yellow-400/5 transition-colors duration-200">
                        <td className="px-4 py-2 font-medium text-yellow-400">Full Name</td>
                        <td className="px-4 py-2 text-gray-300">{selectedUser.firstName} {selectedUser.lastName}</td>
                      </tr>
                      <tr className="border-b border-yellow-400/20 hover:bg-yellow-400/5 transition-colors duration-200">
                        <td className="px-4 py-2 font-medium text-yellow-400">Email</td>
                        <td className="px-4 py-2 text-gray-300">{selectedUser.email}</td>
                      </tr>
                      <tr className="border-b border-yellow-400/20 hover:bg-yellow-400/5 transition-colors duration-200">
                        <td className="px-4 py-2 font-medium text-yellow-400">Phone Number</td>
                        <td className="px-4 py-2 text-gray-300">{selectedUser.phoneNumber}</td>
                      </tr>
                      <tr className="border-b border-yellow-400/20 hover:bg-yellow-400/5 transition-colors duration-200">
                        <td className="px-4 py-2 font-medium text-yellow-400">Gender</td>
                        <td className="px-4 py-2 text-gray-300">{selectedUser.gender || 'N/A'}</td>
                      </tr>
                      <tr className="border-b border-yellow-400/20 hover:bg-yellow-400/5 transition-colors duration-200">
                        <td className="px-4 py-2 font-medium text-yellow-400">KYC Level</td>
                        <td className="px-4 py-2 text-gray-300">{selectedUser.kycLevel}</td>
                      </tr>
                      <tr className="border-b border-yellow-400/20 hover:bg-yellow-400/5 transition-colors duration-200">
                        <td className="px-4 py-2 font-medium text-yellow-400">KYC Status</td>
                        <td className="px-4 py-2 text-gray-300">{selectedUser.kycStatus || 'Not Started'}</td>
                      </tr>
                      <tr className="border-b border-yellow-400/20 hover:bg-yellow-400/5 transition-colors duration-200">
                        <td className="px-4 py-2 font-medium text-yellow-400">Created At</td>
                        <td className="px-4 py-2 text-gray-300">{formatDate(selectedUser.createdAt)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={handleClosePopup}
                    className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-[#013220] px-4 py-2 rounded-md hover:from-yellow-300 hover:to-yellow-200 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebsiteUser;