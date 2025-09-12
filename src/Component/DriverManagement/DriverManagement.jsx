import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TbEdit } from 'react-icons/tb';
import { RiDeleteBinLine } from 'react-icons/ri';
import { IoIosArrowDown } from 'react-icons/io';
import { fetchAllDrivers, editDriver, deleteUser, resetUserState } from '../../features/users/userSlice';
import Sidebar from '../Home/Sidebar';

const DriverManagement = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user || {});
  const {
    drivers = [],
    loading = false,
    error = null,
    success = false,
    editSuccess = false,
    deleteSuccess = false,
    totalDrivers = 0,
    updateKey = 0,
  } = userState;

  const [sortBy, setSortBy] = useState('All');
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [editingDriver, setEditingDriver] = useState(null);
  const [deletingDriverId, setDeletingDriverId] = useState(null);
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
    vehicleOwnerName: '',
    companyName: '',
    vehiclePlateNumber: '',
    vehicleMakeModel: '',
    chassisNumber: '',
    vehicleColor: '',
    registrationExpiryDate: '',
    vehicleType: '',
    serviceType: '',
    serviceCategory: '',
    wheelchair: '',
    packingHelper: '',
    loadingUnloadingHelper: '',
    fixingHelper: '',
    driverSettings: {
      autoAccept: { enabled: false },
      ridePreferences: { pinkCaptainMode: false },
    },
  });
  const [formErrors, setFormErrors] = useState({});
  const [files, setFiles] = useState({
    licenseImage: null,
    vehicleRegistrationCard: null,
    roadAuthorityCertificate: null,
    insuranceCertificate: null,
    vehicleImages: [],
  });

  useEffect(() => {
    console.log('Fetching all drivers');
    dispatch(fetchAllDrivers());
  }, [dispatch]);

  useEffect(() => {
    if (error || editSuccess || deleteSuccess) {
      console.log('Resetting state due to:', { error, editSuccess, deleteSuccess });
      const timer = setTimeout(() => {
        dispatch(resetUserState());
        setDeletingDriverId(null);
        setFormErrors({});
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, editSuccess, deleteSuccess, dispatch]);

  const handleSortChange = (e) => {
    console.log('Sort changed to:', e.target.value);
    setSortBy(e.target.value);
  };

  const handleViewDriver = (driver) => {
    console.log('Viewing driver:', driver._id, 'Driver data:', driver);
    setSelectedDriver(driver);
  };

  const handleEditDriver = (driver) => {
    console.log('Editing driver:', driver._id, 'Driver data:', driver);
    setEditingDriver(driver);
    setFormData({
      username: driver.username || '',
      firstName: driver.firstName || '',
      lastName: driver.lastName || '',
      email: driver.email || '',
      phoneNumber: driver.phoneNumber || '',
      gender: driver.gender || '',
      country: driver.country || '',
      kycLevel: driver.kycLevel !== undefined ? String(driver.kycLevel) : '',
      kycStatus: driver.kycStatus || '',
      hasVehicle: driver.hasVehicle ? 'yes' : 'no',
      vehicleOwnerName: driver.pendingVehicleData?.vehicleOwnerName || driver.vehicle?.vehicleOwnerName || '',
      companyName: driver.pendingVehicleData?.companyName || driver.vehicle?.companyName || '',
      vehiclePlateNumber: driver.pendingVehicleData?.vehiclePlateNumber || driver.vehicle?.vehiclePlateNumber || '',
      vehicleMakeModel: driver.pendingVehicleData?.vehicleMakeModel || driver.vehicle?.vehicleMakeModel || '',
      chassisNumber: driver.pendingVehicleData?.chassisNumber || driver.vehicle?.chassisNumber || '',
      vehicleColor: driver.pendingVehicleData?.vehicleColor || driver.vehicle?.vehicleColor || '',
      registrationExpiryDate: driver.pendingVehicleData?.registrationExpiryDate || driver.vehicle?.registrationExpiryDate ? new Date(driver.pendingVehicleData?.registrationExpiryDate || driver.vehicle?.registrationExpiryDate).toISOString().split('T')[0] : '',
      vehicleType: driver.pendingVehicleData?.vehicleType || driver.vehicle?.vehicleType || '',
      serviceType: driver.pendingVehicleData?.serviceType || driver.vehicle?.serviceType || '',
      serviceCategory: driver.pendingVehicleData?.serviceCategory || driver.vehicle?.serviceCategory || '',
      wheelchair: driver.pendingVehicleData?.wheelchair !== undefined ? String(driver.pendingVehicleData.wheelchair) : driver.vehicle?.wheelchair !== undefined ? String(driver.vehicle.wheelchair) : '',
      packingHelper: driver.pendingVehicleData?.packingHelper !== undefined ? String(driver.pendingVehicleData.packingHelper) : driver.vehicle?.packingHelper !== undefined ? String(driver.vehicle.packingHelper) : '',
      loadingUnloadingHelper: driver.pendingVehicleData?.loadingUnloadingHelper !== undefined ? String(driver.pendingVehicleData.loadingUnloadingHelper) : driver.vehicle?.loadingUnloadingHelper !== undefined ? String(driver.vehicle.loadingUnloadingHelper) : '',
      fixingHelper: driver.pendingVehicleData?.fixingHelper !== undefined ? String(driver.pendingVehicleData.fixingHelper) : driver.vehicle?.fixingHelper !== undefined ? String(driver.vehicle.fixingHelper) : '',
      driverSettings: {
        autoAccept: driver.driverSettings?.autoAccept || { enabled: false },
        ridePreferences: driver.driverSettings?.ridePreferences || { pinkCaptainMode: false },
      },
    });
    setFiles({
      licenseImage: null,
      vehicleRegistrationCard: null,
      roadAuthorityCertificate: null,
      insuranceCertificate: null,
      vehicleImages: [],
    });
    setFormErrors({});
  };

  const handleClosePopup = () => {
    console.log('Closing popup:', selectedDriver ? 'View' : 'Edit');
    setSelectedDriver(null);
    setEditingDriver(null);
    setFormErrors({});
    setFiles({
      licenseImage: null,
      vehicleRegistrationCard: null,
      roadAuthorityCertificate: null,
      insuranceCertificate: null,
      vehicleImages: [],
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('driverSettings.')) {
      const [_, field, subField] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        driverSettings: {
          ...prev.driverSettings,
          [field]: {
            ...prev.driverSettings[field],
            [subField]: value === 'true' ? true : value === 'false' ? false : value,
          },
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    if (name === 'vehicleImages') {
      setFiles((prev) => ({ ...prev, [name]: Array.from(selectedFiles) }));
    } else {
      setFiles((prev) => ({ ...prev, [name]: selectedFiles[0] }));
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting edit for userId:', editingDriver._id, 'Data:', formData, 'Files:', files);
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'driverSettings') {
          formDataToSend.append(key, JSON.stringify(value));
        } else if (value !== '') {
          formDataToSend.append(key, value);
        }
      });
      if (files.licenseImage) formDataToSend.append('licenseImage', files.licenseImage);
      if (files.vehicleRegistrationCard) formDataToSend.append('vehicleRegistrationCard', files.vehicleRegistrationCard);
      if (files.roadAuthorityCertificate) formDataToSend.append('roadAuthorityCertificate', files.roadAuthorityCertificate);
      if (files.insuranceCertificate) formDataToSend.append('insuranceCertificate', files.insuranceCertificate);
      files.vehicleImages.forEach((file) => formDataToSend.append('vehicleImages', file));

      await dispatch(editDriver({ userId: editingDriver._id, userData: formDataToSend })).unwrap();
      console.log('Edit driver successful:', editingDriver._id);
      setEditingDriver(null);
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
        vehicleOwnerName: '',
        companyName: '',
        vehiclePlateNumber: '',
        vehicleMakeModel: '',
        chassisNumber: '',
        vehicleColor: '',
        registrationExpiryDate: '',
        vehicleType: '',
        serviceType: '',
        serviceCategory: '',
        wheelchair: '',
        packingHelper: '',
        loadingUnloadingHelper: '',
        fixingHelper: '',
        driverSettings: {
          autoAccept: { enabled: false },
          ridePreferences: { pinkCaptainMode: false },
        },
      });
      setFiles({
        licenseImage: null,
        vehicleRegistrationCard: null,
        roadAuthorityCertificate: null,
        insuranceCertificate: null,
        vehicleImages: [],
      });
    } catch (error) {
      console.error('Edit driver failed:', error);
      try {
        const parsedError = typeof error === 'string' ? JSON.parse(error) : error;
        if (typeof parsedError === 'object' && parsedError !== null) {
          setFormErrors(parsedError);
        } else {
          setFormErrors({ general: parsedError || 'Failed to edit driver' });
        }
      } catch {
        setFormErrors({ general: error || 'Failed to edit driver' });
      }
    }
  };

  const handleDeleteDriver = async (userId) => {
    if (window.confirm('Are you sure you want to delete this driver? This action cannot be undone.')) {
      console.log('Initiating delete for userId:', userId);
      setDeletingDriverId(userId);
      try {
        await dispatch(deleteUser(userId)).unwrap();
        console.log('Delete driver successful:', userId);
      } catch (error) {
        console.error('Delete driver failed:', error);
        setDeletingDriverId(null);
      }
    }
  };

  const filteredDrivers = drivers.filter((driver) => {
    if (sortBy === 'All') return true;
    if (sortBy === 'Pending' || sortBy === 'Approved') return driver.kycStatus === sortBy.toLowerCase() || (!driver.kycStatus && sortBy === 'Pending');
    return false;
  });

  console.log('Rendering with drivers:', filteredDrivers.map(d => d._id), 'updateKey:', updateKey);

  const BASE_URL = 'http://localhost:3001/';

  return (
    <div className="flex min-h-screen bg-[#013220] text-[#DDC104] font-sans">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center tracking-wide">Driver Management Dashboard</h1>

          {loading && !deletingDriverId && !editingDriver && !selectedDriver && (
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
              <span>Drivers fetched successfully! Total: {totalDrivers}</span>
            </div>
          )}

          {editSuccess && (
            <div className="bg-[#038A59] text-white p-4 rounded-lg mb-6 shadow-lg outline outline-black/20 shadow-black/80 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Driver updated successfully!</span>
            </div>
          )}

          {deleteSuccess && (
            <div className="bg-[#038A59] text-white p-4 rounded-lg mb-6 shadow-lg outline outline-black/20 shadow-black/80 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Driver deleted successfully!</span>
            </div>
          )}

          {!loading && !error && drivers.length > 0 && (
            <div className="bg-gradient-to-b from-[#038A59] to-[#013723] rounded-lg shadow-lg outline outline-black/20 shadow-black/80 p-6 transform hover:scale-105 transition duration-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold tracking-wide">Driver List</h2>
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
                      <th className="px-4 py-3 font-medium tracking-wide">Phone</th>
                      <th className="px-4 py-3 font-medium tracking-wide">Vehicle Type</th>
                      <th className="px-4 py-3 font-medium tracking-wide">KYC Status</th>
                      <th className="px-4 py-3 font-medium tracking-wide text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDrivers.map((driver) => (
                      <tr key={driver._id} className="border-b border-[#013723] hover:bg-[#038A59]/50">
                        <td className="px-4 py-3">{driver._id.slice(-6)}</td>
                        <td className="px-4 py-3">{driver.username}</td>
                        <td className="px-4 py-3">{driver.email}</td>
                        <td className="px-4 py-3">{driver.phoneNumber}</td>
                        <td className="px-4 py-3">{driver.vehicle?.vehicleType || 'N/A'}</td>
                        <td className="px-4 py-3">{driver.kycStatus || 'Pending'}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3 justify-center">
                            <button
                              onClick={() => handleEditDriver(driver)}
                              className="border border-[#DDC104] p-2 rounded-full text-[#DDC104] hover:bg-[#DDC104] hover:text-[#013723] transition duration-200"
                              disabled={deletingDriverId === driver._id}
                            >
                              <TbEdit size={16} />
                            </button>
                            <button
                              onClick={() => handleViewDriver(driver)}
                              className="bg-[#DDC104] text-[#013723] px-4 py-1.5 rounded-full text-xs font-medium hover:bg-[#e8d34a] transition duration-200"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleDeleteDriver(driver._id)}
                              className="border border-[#DDC104] p-2 rounded-full text-[#DDC104] hover:bg-[#DDC104] hover:text-[#013723] transition duration-200"
                              disabled={deletingDriverId === driver._id}
                            >
                              {deletingDriverId === driver._id ? (
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

          {!loading && !error && drivers.length === 0 && (
            <div className="bg-[#038A59] text-white p-4 rounded-lg mb-6 shadow-lg outline outline-black/20 shadow-black/80 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>No drivers found</span>
            </div>
          )}

          {selectedDriver && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" role="dialog" aria-modal="true" tabIndex="-1">
              <div className="bg-gradient-to-b from-[#038A59] to-[#013723] rounded-lg shadow-lg outline outline-black/20 shadow-black/80 p-6 w-full max-w-4xl text-[#DDC104] font-sans transform transition-all duration-300 overflow-y-auto max-h-[90vh]">
                <h2 className="text-2xl font-semibold tracking-wide mb-4">Driver Details</h2>
                
                <div className="mb-6">
                  <h3 className="text-xl font-medium tracking-wide mb-2">Driver Information</h3>
                  <table className="w-full text-sm text-left bg-[#013723] rounded-lg shadow no-scrollbar">
                    <tbody>
                      <tr className="border-b border-[#038A59]">
                        <td className="px-4 py-2 font-medium">ID</td>
                        <td className="px-4 py-2">{selectedDriver._id?.slice(-6) || 'N/A'}</td>
                      </tr>
                      <tr className="border-b border-[#038A59]">
                        <td className="px-4 py-2 font-medium">Username</td>
                        <td className="px-4 py-2">{selectedDriver.username || 'N/A'}</td>
                      </tr>
                      <tr className="border-b border-[#038A59]">
                        <td className="px-4 py-2 font-medium">Full Name</td>
                        <td className="px-4 py-2">{selectedDriver.firstName || ''} {selectedDriver.lastName || ''}</td>
                      </tr>
                      <tr className="border-b border-[#038A59]">
                        <td className="px-4 py-2 font-medium">Email</td>
                        <td className="px-4 py-2">{selectedDriver.email || 'N/A'}</td>
                      </tr>
                      <tr className="border-b border-[#038A59]">
                        <td className="px-4 py-2 font-medium">Phone Number</td>
                        <td className="px-4 py-2">{selectedDriver.phoneNumber || 'N/A'}</td>
                      </tr>
                      <tr className="border-b border-[#038A59]">
                        <td className="px-4 py-2 font-medium">Gender</td>
                        <td className="px-4 py-2">{selectedDriver.gender || 'N/A'}</td>
                      </tr>
                      <tr className="border-b border-[#038A59]">
                        <td className="px-4 py-2 font-medium">Country</td>
                        <td className="px-4 py-2">{selectedDriver.country || 'N/A'}</td>
                      </tr>
                      <tr className="border-b border-[#038A59]">
                        <td className="px-4 py-2 font-medium">KYC Status</td>
                        <td className="px-4 py-2">{selectedDriver.kycStatus || 'Pending'}</td>
                      </tr>
                      <tr className="border-b border-[#038A59]">
                        <td className="px-4 py-2 font-medium">KYC Level</td>
                        <td className="px-4 py-2">{selectedDriver.kycLevel !== undefined ? selectedDriver.kycLevel : 'N/A'}</td>
                      </tr>
                      <tr className="border-b border-[#038A59]">
                        <td className="px-4 py-2 font-medium">Has Vehicle</td>
                        <td className="px-4 py-2">{selectedDriver.hasVehicle ? 'Yes' : 'No'}</td>
                      </tr>
                      <tr className="border-b border-[#038A59]">
                        <td className="px-4 py-2 font-medium">Created At</td>
                        <td className="px-4 py-2">{selectedDriver.createdAt ? new Date(selectedDriver.createdAt).toLocaleString() : 'N/A'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {selectedDriver.vehicle && (
                  <div className="mb-6">
                    <h3 className="text-xl font-medium tracking-wide mb-2">Vehicle Information</h3>
                    <table className="w-full text-sm text-left bg-[#013723] rounded-lg shadow no-scrollbar">
                      <tbody>
                        <tr className="border-b border-[#038A59]">
                          <td className="px-4 py-2 font-medium">Vehicle Owner</td>
                          <td className="px-4 py-2">{selectedDriver.vehicle.vehicleOwnerName || 'N/A'}</td>
                        </tr>
                        <tr className="border-b border-[#038A59]">
                          <td className="px-4 py-2 font-medium">Company Name</td>
                          <td className="px-4 py-2">{selectedDriver.vehicle.companyName || 'N/A'}</td>
                        </tr>
                        <tr className="border-b border-[#038A59]">
                          <td className="px-4 py-2 font-medium">Vehicle Plate</td>
                          <td className="px-4 py-2">{selectedDriver.vehicle.vehiclePlateNumber || 'N/A'}</td>
                        </tr>
                        <tr className="border-b border-[#038A59]">
                          <td className="px-4 py-2 font-medium">Vehicle Model</td>
                          <td className="px-4 py-2">{selectedDriver.vehicle.vehicleMakeModel || 'N/A'}</td>
                        </tr>
                        <tr className="border-b border-[#038A59]">
                          <td className="px-4 py-2 font-medium">Chassis Number</td>
                          <td className="px-4 py-2">{selectedDriver.vehicle.chassisNumber || 'N/A'}</td>
                        </tr>
                        <tr className="border-b border-[#038A59]">
                          <td className="px-4 py-2 font-medium">Vehicle Color</td>
                          <td className="px-4 py-2">{selectedDriver.vehicle.vehicleColor || 'N/A'}</td>
                        </tr>
                        <tr className="border-b border-[#038A59]">
                          <td className="px-4 py-2 font-medium">Registration Expiry</td>
                          <td className="px-4 py-2">{selectedDriver.vehicle.registrationExpiryDate ? new Date(selectedDriver.vehicle.registrationExpiryDate).toLocaleDateString() : 'N/A'}</td>
                        </tr>
                        <tr className="border-b border-[#038A59]">
                          <td className="px-4 py-2 font-medium">Service Type</td>
                          <td className="px-4 py-2">{selectedDriver.vehicle.serviceType || 'N/A'}</td>
                        </tr>
                        <tr className="border-b border-[#038A59]">
                          <td className="px-4 py-2 font-medium">Vehicle Type</td>
                          <td className="px-4 py-2">{selectedDriver.vehicle.vehicleType || 'N/A'}</td>
                        </tr>
                        <tr className="border-b border-[#038A59]">
                          <td className="px-4 py-2 font-medium">Wheelchair Accessible</td>
                          <td className="px-4 py-2">{selectedDriver.vehicle.wheelchair ? 'Yes' : 'No'}</td>
                        </tr>
                        <tr className="border-b border-[#038A59]">
                          <td className="px-4 py-2 font-medium">Packing Helper</td>
                          <td className="px-4 py-2">{selectedDriver.vehicle.packingHelper ? 'Yes' : 'No'}</td>
                        </tr>
                        <tr className="border-b border-[#038A59]">
                          <td className="px-4 py-2 font-medium">Loading/Unloading Helper</td>
                          <td className="px-4 py-2">{selectedDriver.vehicle.loadingUnloadingHelper ? 'Yes' : 'No'}</td>
                        </tr>
                        <tr className="border-b border-[#038A59]">
                          <td className="px-4 py-2 font-medium">Fixing Helper</td>
                          <td className="px-4 py-2">{selectedDriver.vehicle.fixingHelper ? 'Yes' : 'No'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {selectedDriver.pendingVehicleData && (
                  <div className="mb-6">
                    <h3 className="text-xl font-medium tracking-wide mb-2">Pending Vehicle Information</h3>
                    <table className="w-full text-sm text-left bg-[#013723] rounded-lg shadow no-scrollbar">
                      <tbody>
                        <tr className="border-b border-[#038A59]">
                          <td className="px-4 py-2 font-medium">Vehicle Owner</td>
                          <td className="px-4 py-2">{selectedDriver.pendingVehicleData.vehicleOwnerName || 'N/A'}</td>
                        </tr>
                        <tr className="border-b border-[#038A59]">
                          <td className="px-4 py-2 font-medium">Company Name</td>
                          <td className="px-4 py-2">{selectedDriver.pendingVehicleData.companyName || 'N/A'}</td>
                        </tr>
                        <tr className="border-b border-[#038A59]">
                          <td className="px-4 py-2 font-medium">Vehicle Plate</td>
                          <td className="px-4 py-2">{selectedDriver.pendingVehicleData.vehiclePlateNumber || 'N/A'}</td>
                        </tr>
                        <tr className="border-b border-[#038A59]">
                          <td className="px-4 py-2 font-medium">Vehicle Model</td>
                          <td className="px-4 py-2">{selectedDriver.pendingVehicleData.vehicleMakeModel || 'N/A'}</td>
                        </tr>
                        <tr className="border-b border-[#038A59]">
                          <td className="px-4 py-2 font-medium">Chassis Number</td>
                          <td className="px-4 py-2">{selectedDriver.pendingVehicleData.chassisNumber || 'N/A'}</td>
                        </tr>
                        <tr className="border-b border-[#038A59]">
                          <td className="px-4 py-2 font-medium">Vehicle Color</td>
                          <td className="px-4 py-2">{selectedDriver.pendingVehicleData.vehicleColor || 'N/A'}</td>
                        </tr>
                        <tr className="border-b border-[#038A59]">
                          <td className="px-4 py-2 font-medium">Registration Expiry</td>
                          <td className="px-4 py-2">{selectedDriver.pendingVehicleData.registrationExpiryDate ? new Date(selectedDriver.pendingVehicleData.registrationExpiryDate).toLocaleDateString() : 'N/A'}</td>
                        </tr>
                        <tr className="border-b border-[#038A59]">
                          <td className="px-4 py-2 font-medium">Service Type</td>
                          <td className="px-4 py-2">{selectedDriver.pendingVehicleData.serviceType || 'N/A'}</td>
                        </tr>
                        <tr className="border-b border-[#038A59]">
                          <td className="px-4 py-2 font-medium">Vehicle Type</td>
                          <td className="px-4 py-2">{selectedDriver.pendingVehicleData.vehicleType || 'N/A'}</td>
                        </tr>
                        <tr className="border-b border-[#038A59]">
                          <td className="px-4 py-2 font-medium">Wheelchair Accessible</td>
                          <td className="px-4 py-2">{selectedDriver.pendingVehicleData.wheelchair ? 'Yes' : 'No'}</td>
                        </tr>
                        <tr className="border-b border-[#038A59]">
                          <td className="px-4 py-2 font-medium">Packing Helper</td>
                          <td className="px-4 py-2">{selectedDriver.pendingVehicleData.packingHelper ? 'Yes' : 'No'}</td>
                        </tr>
                        <tr className="border-b border-[#038A59]">
                          <td className="px-4 py-2 font-medium">Loading/Unloading Helper</td>
                          <td className="px-4 py-2">{selectedDriver.pendingVehicleData.loadingUnloadingHelper ? 'Yes' : 'No'}</td>
                        </tr>
                        <tr className="border-b border-[#038A59]">
                          <td className="px-4 py-2 font-medium">Fixing Helper</td>
                          <td className="px-4 py-2">{selectedDriver.pendingVehicleData.fixingHelper ? 'Yes' : 'No'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {(selectedDriver.vehicle || selectedDriver.pendingVehicleData) && (
                  <div className="mb-6">
                    <h3 className="text-xl font-medium tracking-wide mb-2">Vehicle Images</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedDriver.vehicle?.vehicleRegistrationCard?.front && (
                        <div>
                          <p className="font-medium">Registration Card (Front)</p>
                          <img
                            src={`${BASE_URL}${selectedDriver.vehicle.vehicleRegistrationCard.front}`}
                            alt="Registration Card Front"
                            className="w-full h-48 object-contain rounded-lg"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
                            }}
                          />
                        </div>
                      )}
                      {selectedDriver.vehicle?.vehicleRegistrationCard?.back && (
                        <div>
                          <p className="font-medium">Registration Card (Back)</p>
                          <img
                            src={`${BASE_URL}${selectedDriver.vehicle.vehicleRegistrationCard.back}`}
                            alt="Registration Card Back"
                            className="w-full h-48 object-contain rounded-lg"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
                            }}
                          />
                        </div>
                      )}
                      {selectedDriver.vehicle?.roadAuthorityCertificate && (
                        <div>
                          <p className="font-medium">Road Authority Certificate</p>
                          <img
                            src={`${BASE_URL}${selectedDriver.vehicle.roadAuthorityCertificate}`}
                            alt="Road Authority Certificate"
                            className="w-full h-48 object-contain rounded-lg"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
                            }}
                          />
                        </div>
                      )}
                      {selectedDriver.vehicle?.insuranceCertificate && (
                        <div>
                          <p className="font-medium">Insurance Certificate</p>
                          <img
                            src={`${BASE_URL}${selectedDriver.vehicle.insuranceCertificate}`}
                            alt="Insurance Certificate"
                            className="w-full h-48 object-contain rounded-lg"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
                            }}
                          />
                        </div>
                      )}
                      {selectedDriver.vehicle?.vehicleImages?.map((img, index) => (
                        <div key={index}>
                          <p className="font-medium">Vehicle Image {index + 1}</p>
                          <img
                            src={`${BASE_URL}${img}`}
                            alt={`Vehicle Image ${index + 1}`}
                            className="w-full h-48 object-contain rounded-lg"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
                            }}
                          />
                        </div>
                      ))}
                      {selectedDriver.pendingVehicleData?.vehicleRegistrationCard?.front && (
                        <div>
                          <p className="font-medium">Pending Registration Card (Front)</p>
                          <img
                            src={`${BASE_URL}${selectedDriver.pendingVehicleData.vehicleRegistrationCard.front}`}
                            alt="Pending Registration Card Front"
                            className="w-full h-48 object-contain rounded-lg"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
                            }}
                          />
                        </div>
                      )}
                      {selectedDriver.pendingVehicleData?.vehicleRegistrationCard?.back && (
                        <div>
                          <p className="font-medium">Pending Registration Card (Back)</p>
                          <img
                            src={`${BASE_URL}${selectedDriver.pendingVehicleData.vehicleRegistrationCard.back}`}
                            alt="Pending Registration Card Back"
                            className="w-full h-48 object-contain rounded-lg"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
                            }}
                          />
                        </div>
                      )}
                      {selectedDriver.pendingVehicleData?.roadAuthorityCertificate && (
                        <div>
                          <p className="font-medium">Pending Road Authority Certificate</p>
                          <img
                            src={`${BASE_URL}${selectedDriver.pendingVehicleData.roadAuthorityCertificate}`}
                            alt="Pending Road Authority Certificate"
                            className="w-full h-48 object-contain rounded-lg"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
                            }}
                          />
                        </div>
                      )}
                      {selectedDriver.pendingVehicleData?.insuranceCertificate && (
                        <div>
                          <p className="font-medium">Pending Insurance Certificate</p>
                          <img
                            src={`${BASE_URL}${selectedDriver.pendingVehicleData.insuranceCertificate}`}
                            alt="Pending Insurance Certificate"
                            className="w-full h-48 object-contain rounded-lg"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
                            }}
                          />
                        </div>
                      )}
                      {selectedDriver.pendingVehicleData?.vehicleImages?.map((img, index) => (
                        <div key={index}>
                          <p className="font-medium">Pending Vehicle Image {index + 1}</p>
                          <img
                            src={`${BASE_URL}${img}`}
                            alt={`Pending Vehicle Image ${index + 1}`}
                            className="w-full h-48 object-contain rounded-lg"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
                            }}
                          />
                        </div>
                      ))}
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

          {editingDriver && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" role="dialog" aria-modal="true" tabIndex="-1">
              <div className="bg-gradient-to-b from-[#038A59] to-[#013723] rounded-lg shadow-lg outline outline-black/20 shadow-black/80 p-4 w-full max-w-sm sm:max-w-lg text-[#DDC104] font-sans transform transition-all duration-300 overflow-y-auto max-h-[80vh]">
                <h2 className="text-xl font-semibold tracking-wide mb-3">Edit Driver</h2>
                <form onSubmit={handleEditSubmit} className="space-y-3">
                  <div>
                    <h3 className="text-base font-medium tracking-wide mb-2">Driver Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-medium tracking-wide mb-2">Vehicle Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium">Vehicle Owner Name</label>
                        <input
                          type="text"
                          name="vehicleOwnerName"
                          value={formData.vehicleOwnerName}
                          onChange={handleInputChange}
                          className="w-full p-1.5 bg-[#013723] border border-[#DDC104] rounded text-[#DDC104] focus:outline-none text-sm"
                        />
                        {formErrors.vehicleOwnerName && <p className="text-red-500 text-xs mt-1">{formErrors.vehicleOwnerName}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium">Company Name</label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          className="w-full p-1.5 bg-[#013723] border border-[#DDC104] rounded text-[#DDC104] focus:outline-none text-sm"
                        />
                        {formErrors.companyName && <p className="text-red-500 text-xs mt-1">{formErrors.companyName}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium">Vehicle Plate Number</label>
                        <input
                          type="text"
                          name="vehiclePlateNumber"
                          value={formData.vehiclePlateNumber}
                          onChange={handleInputChange}
                          className="w-full p-1.5 bg-[#013723] border border-[#DDC104] rounded text-[#DDC104] focus:outline-none text-sm"
                        />
                        {formErrors.vehiclePlateNumber && <p className="text-red-500 text-xs mt-1">{formErrors.vehiclePlateNumber}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium">Vehicle Make/Model</label>
                        <input
                          type="text"
                          name="vehicleMakeModel"
                          value={formData.vehicleMakeModel}
                          onChange={handleInputChange}
                          className="w-full p-1.5 bg-[#013723] border border-[#DDC104] rounded text-[#DDC104] focus:outline-none text-sm"
                        />
                        {formErrors.vehicleMakeModel && <p className="text-red-500 text-xs mt-1">{formErrors.vehicleMakeModel}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium">Chassis Number</label>
                        <input
                          type="text"
                          name="chassisNumber"
                          value={formData.chassisNumber}
                          onChange={handleInputChange}
                          className="w-full p-1.5 bg-[#013723] border border-[#DDC104] rounded text-[#DDC104] focus:outline-none text-sm"
                        />
                        {formErrors.chassisNumber && <p className="text-red-500 text-xs mt-1">{formErrors.chassisNumber}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium">Vehicle Color</label>
                        <input
                          type="text"
                          name="vehicleColor"
                          value={formData.vehicleColor}
                          onChange={handleInputChange}
                          className="w-full p-1.5 bg-[#013723] border border-[#DDC104] rounded text-[#DDC104] focus:outline-none text-sm"
                        />
                        {formErrors.vehicleColor && <p className="text-red-500 text-xs mt-1">{formErrors.vehicleColor}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium">Registration Expiry Date</label>
                        <input
                          type="date"
                          name="registrationExpiryDate"
                          value={formData.registrationExpiryDate}
                          onChange={handleInputChange}
                          className="w-full p-1.5 bg-[#013723] border border-[#DDC104] rounded text-[#DDC104] focus:outline-none text-sm"
                        />
                        {formErrors.registrationExpiryDate && <p className="text-red-500 text-xs mt-1">{formErrors.registrationExpiryDate}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium">Vehicle Type</label>
                        <input
                          type="text"
                          name="vehicleType"
                          value={formData.vehicleType}
                          onChange={handleInputChange}
                          className="w-full p-1.5 bg-[#013723] border border-[#DDC104] rounded text-[#DDC104] focus:outline-none text-sm"
                        />
                        {formErrors.vehicleType && <p className="text-red-500 text-xs mt-1">{formErrors.vehicleType}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium">Service Type</label>
                        <input
                          type="text"
                          name="serviceType"
                          value={formData.serviceType}
                          onChange={handleInputChange}
                          className="w-full p-1.5 bg-[#013723] border border-[#DDC104] rounded text-[#DDC104] focus:outline-none text-sm"
                        />
                        {formErrors.serviceType && <p className="text-red-500 text-xs mt-1">{formErrors.serviceType}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium">Service Category</label>
                        <input
                          type="text"
                          name="serviceCategory"
                          value={formData.serviceCategory}
                          onChange={handleInputChange}
                          className="w-full p-1.5 bg-[#013723] border border-[#DDC104] rounded text-[#DDC104] focus:outline-none text-sm"
                        />
                        {formErrors.serviceCategory && <p className="text-red-500 text-xs mt-1">{formErrors.serviceCategory}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium">Wheelchair Accessible</label>
                        <select
                          name="wheelchair"
                          value={formData.wheelchair}
                          onChange={handleInputChange}
                          className="w-full p-1.5 bg-[#013723] border border-[#DDC104] rounded text-[#DDC104] focus:outline-none text-sm"
                        >
                          <option value="">Select Option</option>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                        {formErrors.wheelchair && <p className="text-red-500 text-xs mt-1">{formErrors.wheelchair}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium">Packing Helper</label>
                        <select
                          name="packingHelper"
                          value={formData.packingHelper}
                          onChange={handleInputChange}
                          className="w-full p-1.5 bg-[#013723] border border-[#DDC104] rounded text-[#DDC104] focus:outline-none text-sm"
                        >
                          <option value="">Select Option</option>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                        {formErrors.packingHelper && <p className="text-red-500 text-xs mt-1">{formErrors.packingHelper}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium">Loading/Unloading Helper</label>
                        <select
                          name="loadingUnloadingHelper"
                          value={formData.loadingUnloadingHelper}
                          onChange={handleInputChange}
                          className="w-full p-1.5 bg-[#013723] border border-[#DDC104] rounded text-[#DDC104] focus:outline-none text-sm"
                        >
                          <option value="">Select Option</option>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                        {formErrors.loadingUnloadingHelper && <p className="text-red-500 text-xs mt-1">{formErrors.loadingUnloadingHelper}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium">Fixing Helper</label>
                        <select
                          name="fixingHelper"
                          value={formData.fixingHelper}
                          onChange={handleInputChange}
                          className="w-full p-1.5 bg-[#013723] border border-[#DDC104] rounded text-[#DDC104] focus:outline-none text-sm"
                        >
                          <option value="">Select Option</option>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                        {formErrors.fixingHelper && <p className="text-red-500 text-xs mt-1">{formErrors.fixingHelper}</p>}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-medium tracking-wide mb-2">Driver Settings</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium">Auto Accept Enabled</label>
                        <select
                          name="driverSettings.autoAccept.enabled"
                          value={formData.driverSettings.autoAccept.enabled}
                          onChange={handleInputChange}
                          className="w-full p-1.5 bg-[#013723] border border-[#DDC104] rounded text-[#DDC104] focus:outline-none text-sm"
                        >
                          <option value="false">No</option>
                          <option value="true">Yes</option>
                        </select>
                        {formErrors.autoAcceptEnabled && <p className="text-red-500 text-xs mt-1">{formErrors.autoAcceptEnabled}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium">Pink Captain Mode</label>
                        <select
                          name="driverSettings.ridePreferences.pinkCaptainMode"
                          value={formData.driverSettings.ridePreferences.pinkCaptainMode}
                          onChange={handleInputChange}
                          className="w-full p-1.5 bg-[#013723] border border-[#DDC104] rounded text-[#DDC104] focus:outline-none text-sm"
                        >
                          <option value="false">No</option>
                          <option value="true">Yes</option>
                        </select>
                        {formErrors.pinkCaptainMode && <p className="text-red-500 text-xs mt-1">{formErrors.pinkCaptainMode}</p>}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-medium tracking-wide mb-2">Documents</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium">License Image</label>
                        <input
                          type="file"
                          name="licenseImage"
                          onChange={handleFileChange}
                          accept="image/*"
                          className="w-full p-1.5 bg-[#013723] border border-[#DDC104] rounded text-[#DDC104] focus:outline-none text-sm"
                        />
                        {formErrors.licenseImage && <p className="text-red-500 text-xs mt-1">{formErrors.licenseImage}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium">Vehicle Registration Card</label>
                        <input
                          type="file"
                          name="vehicleRegistrationCard"
                          onChange={handleFileChange}
                          accept="image/*"
                          className="w-full p-1.5 bg-[#013723] border border-[#DDC104] rounded text-[#DDC104] focus:outline-none text-sm"
                        />
                        {formErrors.vehicleRegistrationCard && <p className="text-red-500 text-xs mt-1">{formErrors.vehicleRegistrationCard}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium">Road Authority Certificate</label>
                        <input
                          type="file"
                          name="roadAuthorityCertificate"
                          onChange={handleFileChange}
                          accept="image/*"
                          className="w-full p-1.5 bg-[#013723] border border-[#DDC104] rounded text-[#DDC104] focus:outline-none text-sm"
                        />
                        {formErrors.roadAuthorityCertificate && <p className="text-red-500 text-xs mt-1">{formErrors.roadAuthorityCertificate}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium">Insurance Certificate</label>
                        <input
                          type="file"
                          name="insuranceCertificate"
                          onChange={handleFileChange}
                          accept="image/*"
                          className="w-full p-1.5 bg-[#013723] border border-[#DDC104] rounded text-[#DDC104] focus:outline-none text-sm"
                        />
                        {formErrors.insuranceCertificate && <p className="text-red-500 text-xs mt-1">{formErrors.insuranceCertificate}</p>}
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium">Vehicle Images (up to 10)</label>
                        <input
                          type="file"
                          name="vehicleImages"
                          onChange={handleFileChange}
                          accept="image/*"
                          multiple
                          className="w-full p-1.5 bg-[#013723] border border-[#DDC104] rounded text-[#DDC104] focus:outline-none text-sm"
                        />
                        {formErrors.vehicleImages && <p className="text-red-500 text-xs mt-1">{formErrors.vehicleImages}</p>}
                      </div>
                    </div>
                  </div>

                  {formErrors.general && (
                    <div className="text-red-500 text-xs mt-1">{formErrors.general}</div>
                  )}

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
    </div>
  );
};

export default DriverManagement;