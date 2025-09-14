import axios from 'axios';

const API_URL = 'http://localhost:3001/api/vehicle-hiring'; // Adjust base URL as per your backend setup


// Get all driver hirings
export const getAllDriverHirings = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/all-driver-hirings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch all driver hirings';
  }
};
// Get pending driver hirings (Admin only)
export const getPendingDriverHirings = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/pending-driver-hirings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch pending driver hirings';
  }
};

// Get single driver hiring by ID (Admin only)
export const getDriverHiringById = async (driverHiringId, token) => {
  try {
    const response = await axios.get(`${API_URL}/driver-hiring/${driverHiringId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch driver hiring details';
  }
};

// Approve driver hiring (Admin only)
export const approveDriverHiring = async (driverHiringId, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/accept-driver-hiring/${driverHiringId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to approve driver hiring';
  }
};

// Reject driver hiring (Admin only)
export const rejectDriverHiring = async (driverHiringId, reason, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/reject-driver-hiring/${driverHiringId}`,
      { reason },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to reject driver hiring';
  }
};

// Update driver hiring terms (Admin only)
export const updateDriverHiringTerms = async (driverHiringId, terms, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/update-driver-hiring/${driverHiringId}`,
      { terms },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to update driver hiring terms';
  }
};

// Add internal note (Admin only)
export const addInternalNote = async (driverHiringId, note, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/add-note/${driverHiringId}`,
      { note },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to add internal note';
  }
};