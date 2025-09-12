import React, { useState } from 'react';
import Sidebar from '../Home/Sidebar';
import AdminApprovalNav from './AdminApprovalNav';
import { useSelector, useDispatch } from 'react-redux';
import { useGetPendingKYCsQuery, apiSlice } from '../../features/service/apiSlice';

const IMAGE_BASE_URL = 'http://localhost:3001';

const KYCVerificationTable = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [sortBy, setSortBy] = useState('Pending');
  const [roleFilter, setRoleFilter] = useState('All');
  const [selectedKyc, setSelectedKyc] = useState(null);

  const { data: kycDataResponse, isLoading, isError, error } = useGetPendingKYCsQuery();
  const kycData = kycDataResponse?.kycDetails || [];

  const handleApprove = async (userId, kycLevel) => {
    try {
      await dispatch(apiSlice.endpoints.approveKyc.initiate({ userId })).unwrap();
      alert(`KYC Level ${kycLevel} approved successfully`);
    } catch (err) {
      alert(err.data?.message || 'Failed to approve KYC');
    }
  };

  const handleReject = async (userId) => {
    try {
      const reason = prompt('Enter reason for rejection:');
      if (!reason) return;
      await dispatch(apiSlice.endpoints.rejectKyc.initiate({ userId, reason })).unwrap();
      alert('KYC rejected successfully');
    } catch (err) {
      alert(err.data?.message || 'Failed to reject KYC');
    }
  };

  const handleViewKyc = (item) => {
    setSelectedKyc(item);
  };

  const handleClosePopup = () => {
    setSelectedKyc(null);
  };

  const filteredData = (Array.isArray(kycData) ? kycData : [])
    .filter((item) => {
      if (roleFilter === 'All') return true;
      return item.kycLevel === (roleFilter === 'User' ? 0 : 1);
    })
    .filter((item) => {
      if (!dateRange.start || !dateRange.end) return true;
      const createdAt = new Date(item.createdAt);
      return (
        createdAt >= new Date(dateRange.start) &&
        createdAt <= new Date(dateRange.end)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'Pending') return 0;
      if (sortBy === 'Approved' || sortBy === 'Rejected') return 0;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  if (isLoading) return <div className="text-yellow-400 text-center py-8">Loading...</div>;
  if (isError) return <div className="text-red-500 text-center py-8">{error.data?.message || 'Failed to fetch KYC data'}</div>;

  return (
    <div className="flex text-yellow-400 min-h-screen overflow-hidden bg-[#013220] font-sans">
      <Sidebar />
      <div className="flex-1 overflow-hidden">
        <AdminApprovalNav />
        <div className="flex justify-end items-center mb-6 gap-4 px-4">
          <div className="flex items-center gap-2">
            <span>Date Range:</span>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="bg-[#013A2A] border border-yellow-400 text-yellow-400 px-2 py-1 rounded-md w-28"
            />
            <span>To</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="bg-[#013A2A] border border-yellow-400 text-yellow-400 px-2 py-1 rounded-md w-28"
            />
          </div>
          <div className="flex items-center gap-2">
            <span>Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border border-yellow-400 text-yellow-400 px-2 py-1 rounded-md"
            >
              <option value="Pending">Pending</option>
              <option value="Date">Date</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span>Role:</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-transparent border border-yellow-400 text-yellow-400 px-2 py-1 rounded-md"
            >
              <option value="All">All</option>
              <option value="User">User (Level 1)</option>
              <option value="Driver">Driver (Level 2)</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto border border-yellow-400 rounded-xl mx-4 bg-gradient-to-b from-[#038A59] to-[#013723] shadow-lg">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-yellow-400 bg-[#038A59]">
                <th className="px-4 py-3 font-medium tracking-wide">User ID</th>
                <th className="px-4 py-3 font-medium tracking-wide">Name</th>
                <th className="px-4 py-3 font-medium tracking-wide">Role</th>
                <th className="px-4 py-3 font-medium tracking-wide">Documents</th>
                <th className="px-4 py-3 font-medium tracking-wide">Selfie Match</th>
                <th className="px-4 py-3 font-medium tracking-wide">Status</th>
                <th className="px-4 py-3 font-medium tracking-wide">Date</th>
                <th className="px-4 py-3 font-medium tracking-wide">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-8 text-yellow-400">
                    No users to approve KYC levels
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr key={item.userId} className="text-sm border-b border-[#013723] hover:bg-[#038A59]/50">
                    <td className="px-4 py-3">{item.userId}</td>
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">{item.kycLevel === 0 ? 'User' : 'Driver'}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        {item.cnicImages?.front && typeof item.cnicImages.front === 'string' && (
                          <a
                            href={`${IMAGE_BASE_URL}/Uploads/${item.cnicImages.front.replace(/^\/?uploads\//, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-yellow-400 hover:text-yellow-300"
                          >
                            CNIC Front
                          </a>
                        )}
                        {item.cnicImages?.back && typeof item.cnicImages.back === 'string' && (
                          <a
                            href={`${IMAGE_BASE_URL}/Uploads/${item.cnicImages.back.replace(/^\/?uploads\//, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-yellow-400 hover:text-yellow-300"
                          >
                            CNIC Back
                          </a>
                        )}
                        {item.selfieImage && typeof item.selfieImage === 'string' && (
                          <a
                            href={`${IMAGE_BASE_URL}/Uploads/${item.selfieImage.replace(/^\/?uploads\//, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-yellow-400 hover:text-yellow-300"
                          >
                            Selfie
                          </a>
                        )}
                        {item.kycLevel === 1 && item.licenseImage && typeof item.licenseImage === 'string' && (
                          <a
                            href={`${IMAGE_BASE_URL}/Uploads/${item.licenseImage.replace(/^\/?uploads\//, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-yellow-400 hover:text-yellow-300"
                          >
                            License
                          </a>
                        )}
                        {item.vehicleData && (
                          <div>
                            {item.vehicleData.vehicleRegistrationCard && typeof item.vehicleData.vehicleRegistrationCard === 'string' && (
                              <a
                                href={`${IMAGE_BASE_URL}/Uploads/${item.vehicleData.vehicleRegistrationCard.replace(/^\/?uploads\//, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline text-yellow-400 hover:text-yellow-300"
                              >
                                Vehicle Registration
                              </a>
                            )}
                            {item.vehicleData.roadAuthorityCertificate && typeof item.vehicleData.roadAuthorityCertificate === 'string' && (
                              <a
                                href={`${IMAGE_BASE_URL}/Uploads/${item.vehicleData.roadAuthorityCertificate.replace(/^\/?uploads\//, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline text-yellow-400 hover:text-yellow-300 ml-2"
                              >
                                Road Certificate
                              </a>
                            )}
                            {item.vehicleData.insuranceCertificate && typeof item.vehicleData.insuranceCertificate === 'string' && (
                              <a
                                href={`${IMAGE_BASE_URL}/Uploads/${item.vehicleData.insuranceCertificate.replace(/^\/?uploads\//, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline text-yellow-400 hover:text-yellow-300 ml-2"
                              >
                                Insurance
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Match
                    </td>
                    <td className="px-4 py-3">{item.kycStatus}</td>
                    <td className="px-4 py-3">{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          className="bg-red-800 text-white px-4 py-1 rounded-full text-sm hover:bg-red-900"
                          onClick={() => handleReject(item.userId)}
                        >
                          Reject
                        </button>
                        <button
                          className="bg-green-500 text-white px-4 py-1 rounded-full text-sm hover:bg-green-600"
                          onClick={() => handleApprove(item.userId, item.kycLevel + 1)}
                        >
                          Approve
                        </button>
                        <button
                          className="bg-yellow-400 text-[#013220] px-4 py-1 rounded-full text-sm font-medium hover:bg-yellow-300 transition duration-200"
                          onClick={() => handleViewKyc(item)}
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {selectedKyc && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" role="dialog" aria-modal="true" tabIndex="-1">
            <div className="bg-gradient-to-b from-[#038A59] to-[#013723] rounded-lg shadow-lg outline outline-black/20 shadow-black/80 p-6 w-full max-w-md text-yellow-400 font-sans transform transition-all duration-300">
              <h2 className="text-2xl font-semibold tracking-wide mb-4">KYC Details</h2>
              <div className="space-y-3">
                <p><span className="font-medium">User ID:</span> {selectedKyc.userId}</p>
                <p><span className="font-medium">Name:</span> {selectedKyc.name}</p>
                <p><span className="font-medium">Role:</span> {selectedKyc.kycLevel === 0 ? 'User' : 'Driver'}</p>
                <p><span className="font-medium">KYC Status:</span> {selectedKyc.kycStatus || 'Pending'}</p>
                <p><span className="font-medium">Date:</span> {new Date(selectedKyc.createdAt).toLocaleString()}</p>
                <p><span className="font-medium">Documents:</span></p>
                <div className="pl-4">
                  {selectedKyc.cnicImages?.front && typeof selectedKyc.cnicImages.front === 'string' && (
                    <p>
                      <a
                        href={`${IMAGE_BASE_URL}/Uploads/${selectedKyc.cnicImages.front.replace(/^\/?uploads\//, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-yellow-400 hover:text-yellow-300"
                      >
                        CNIC Front
                      </a>
                    </p>
                  )}
                  {selectedKyc.cnicImages?.back && typeof selectedKyc.cnicImages.back === 'string' && (
                    <p>
                      <a
                        href={`${IMAGE_BASE_URL}/Uploads/${selectedKyc.cnicImages.back.replace(/^\/?uploads\//, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-yellow-400 hover:text-yellow-300"
                      >
                        CNIC Back
                      </a>
                    </p>
                  )}
                  {selectedKyc.selfieImage && typeof selectedKyc.selfieImage === 'string' && (
                    <p>
                      <a
                        href={`${IMAGE_BASE_URL}/Uploads/${selectedKyc.selfieImage.replace(/^\/?uploads\//, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-yellow-400 hover:text-yellow-300"
                      >
                        Selfie
                      </a>
                    </p>
                  )}
                  {selectedKyc.kycLevel === 1 && selectedKyc.licenseImage && typeof selectedKyc.licenseImage === 'string' && (
                    <p>
                      <a
                        href={`${IMAGE_BASE_URL}/Uploads/${selectedKyc.licenseImage.replace(/^\/?uploads\//, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-yellow-400 hover:text-yellow-300"
                      >
                        License
                      </a>
                    </p>
                  )}
                  {selectedKyc.vehicleData && (
                    <div>
                      {selectedKyc.vehicleData.vehicleRegistrationCard && typeof selectedKyc.vehicleData.vehicleRegistrationCard === 'string' && (
                        <p>
                          <a
                            href={`${IMAGE_BASE_URL}/Uploads/${selectedKyc.vehicleData.vehicleRegistrationCard.replace(/^\/?uploads\//, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-yellow-400 hover:text-yellow-300"
                          >
                            Vehicle Registration
                          </a>
                        </p>
                      )}
                      {selectedKyc.vehicleData.roadAuthorityCertificate && typeof selectedKyc.vehicleData.roadAuthorityCertificate === 'string' && (
                        <p>
                          <a
                            href={`${IMAGE_BASE_URL}/Uploads/${selectedKyc.vehicleData.roadAuthorityCertificate.replace(/^\/?uploads\//, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-yellow-400 hover:text-yellow-300"
                          >
                            Road Certificate
                          </a>
                        </p>
                      )}
                      {selectedKyc.vehicleData.insuranceCertificate && typeof selectedKyc.vehicleData.insuranceCertificate === 'string' && (
                        <p>
                          <a
                            href={`${IMAGE_BASE_URL}/Uploads/${selectedKyc.vehicleData.insuranceCertificate.replace(/^\/?uploads\//, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-yellow-400 hover:text-yellow-300"
                          >
                            Insurance
                          </a>
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleClosePopup}
                  className="bg-yellow-400 text-[#013220] px-4 py-2 rounded-full text-sm font-medium hover:bg-yellow-300 transition duration-200"
                  autoFocus
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KYCVerificationTable;