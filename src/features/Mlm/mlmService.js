import axiosInstance, { API_TIMEOUT_MS } from '../../services/axiosConfig';
const API_URL = '/mlm/';

export const getAdminMLMDashboard = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}admin-dashboard`);
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to fetch MLM dashboard');
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const updateAllMLMDistributions = async (distributionData) => {
  try {
    const response = await axiosInstance.put(`${API_URL}update-all`, distributionData);
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to update MLM distributions');
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Get MLM dashboard data including DDR amounts
export const getMLMDashboard = async () => {
  try {
    const response = await axiosInstance.get(`/mlm`);
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to fetch MLM dashboard');
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Get DDR leaderboard
export const getDDRLeaderboard = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}ddr/leaderboard`);
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to fetch DDR leaderboard');
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getCrrLegPercentages = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}admin/crr/leg-percentages`, { timeout: API_TIMEOUT_MS });
    const payload = response.data;
    if (response.status === 200) {
      return payload?.data ?? payload;
    }
    throw new Error(payload?.message || 'Failed to fetch CRR leg percentages');
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out');
    }
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const updateGlobalLegPercentages = async (payload) => {
  try {
    const response = await axiosInstance.put(`${API_URL}admin/crr/global-leg-percentages`, payload, { timeout: API_TIMEOUT_MS });
    const body = response.data;
    if (response.status === 200) {
      return body?.data ?? body;
    }
    throw new Error(body?.message || 'Failed to update global leg percentages');
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out');
    }
    throw new Error(error.response?.data?.message || error.message);
  }
};