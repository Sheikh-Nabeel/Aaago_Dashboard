import axios from 'axios';

const API_URL = 'http://localhost:3001/api/mlm/';

export const getAdminMLMDashboard = async () => {
  try {
    const response = await axios.get(`${API_URL}admin-dashboard`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to fetch MLM dashboard');
    }
  } catch (error) {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const updateAllMLMDistributions = async (distributionData) => {
  try {
    const response = await axios.put(`${API_URL}update-all`, distributionData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to update MLM distributions');
    }
  } catch (error) {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Get MLM dashboard data including DDR amounts
export const getMLMDashboard = async () => {
  try {
    const response = await axios.get(`${API_URL.replace('/mlm/', '/mlm')}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to fetch MLM dashboard');
    }
  } catch (error) {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Get DDR leaderboard
export const getDDRLeaderboard = async () => {
  try {
    const response = await axios.get(`${API_URL}ddr/leaderboard`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to fetch DDR leaderboard');
    }
  } catch (error) {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    throw new Error(error.response?.data?.message || error.message);
  }
};