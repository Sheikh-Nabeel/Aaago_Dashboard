import axiosInstance from '../../services/axiosConfig';
const API_URL = '/vehicle-hiring';


// Get all driver hirings
export const getAllDriverHirings = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/all-driver-hirings`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch all driver hirings';
  }
};
// Get pending driver hirings (Admin only)
export const getPendingDriverHirings = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/pending-driver-hirings`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch pending driver hirings';
  }
};

// Get single driver hiring by ID (Admin only)
export const getDriverHiringById = async (driverHiringId) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/driver-hiring/${driverHiringId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch driver hiring details';
  }
};

// Approve driver hiring (Admin only)
export const approveDriverHiring = async (driverHiringId) => {
  try {
    const response = await axiosInstance.post(
      `${API_URL}/accept-driver-hiring/${driverHiringId}`,
      {}
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to approve driver hiring';
  }
};

// Reject driver hiring (Admin only)
export const rejectDriverHiring = async (driverHiringId, reason) => {
  try {
    const response = await axiosInstance.post(
      `${API_URL}/reject-driver-hiring/${driverHiringId}`,
      { reason }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to reject driver hiring';
  }
};

// Update driver hiring terms (Admin only)
export const updateDriverHiringTerms = async (driverHiringId, terms) => {
  try {
    const response = await axiosInstance.put(
      `${API_URL}/update-driver-hiring/${driverHiringId}`,
      { terms }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to update driver hiring terms';
  }
};

// Add internal note (Admin only)
export const addInternalNote = async (driverHiringId, note) => {
  try {
    const response = await axiosInstance.post(
      `${API_URL}/add-note/${driverHiringId}`,
      { note }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to add internal note';
  }
};