import axios from 'axios';

const API_URL = 'https://aaaogo.xyz/api/user/';

const getAllUsers = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No authentication token found for getAllUsers');
    throw new Error('No authentication token found');
  }
  console.log('Fetching all customers with token:', token.slice(0, 20) + '...');
  try {
    const response = await axios.get(`${API_URL}customers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('getAllUsers response:', response.data);
    return {
      users: response.data.customers,
      totalUsers: response.data.totalCustomers,
      success: response.data.success,
      message: response.data.message,
    };
  } catch (error) {
    console.error('getAllUsers error:', error.response?.data || error.message);
    const message = error.response?.data?.message || error.message || 'Failed to fetch customers';
    throw new Error(message);
  }
};

const addAdmin = async (adminData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}admin/add-admin`, adminData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


const getAllDrivers = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No authentication token found for getAllDrivers');
    throw new Error('No authentication token found');
  }
  console.log('Fetching all drivers with token:', token.slice(0, 20) + '...');
  try {
    const response = await axios.get(`${API_URL}drivers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('getAllDrivers response:', response.data);
    return {
      drivers: response.data.drivers,
      totalDrivers: response.data.totalDrivers,
      success: response.data.success,
      message: response.data.message,
    };
  } catch (error) {
    console.error('getAllDrivers error:', error.response?.data || error.message);
    const message = error.response?.data?.message || error.message || 'Failed to fetch drivers';
    throw new Error(message);
  }
};

const editDriver = async (userId, userData) => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No authentication token found for editDriver');
    throw new Error('No authentication token found');
  }
  console.log(`Sending PUT request for userId: ${userId}, URL: ${API_URL}edit-driver/${userId}, Data:`, userData);
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.log(`Request timeout for userId: ${userId}`);
      controller.abort();
    }, 10000); // 10 seconds timeout
    const response = await axios.put(`${API_URL}edit-driver/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': userData instanceof FormData ? 'multipart/form-data' : 'application/json',
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    console.log('Edit driver response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Edit driver error:', error.response?.data || error.message);
    const message = error.response?.data?.message || error.response?.data?.errors || error.message || 'Failed to edit driver';
    throw new Error(JSON.stringify(message));
  }
};


const editUser = async (userId, userData) => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No authentication token found for editUser');
    throw new Error('No authentication token found');
  }
  console.log(`Sending PATCH request for userId: ${userId}, URL: ${API_URL}edit/${userId}, Data:`, userData);
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.log(`Request timeout for userId: ${userId}`);
      controller.abort();
    }, 10000); // 10 seconds timeout
    const response = await axios.patch(`${API_URL}edit/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    console.log('Edit response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Edit error:', error.response?.data || error.message);
    const message = error.response?.data?.message || error.response?.data?.errors || error.message || 'Failed to edit user';
    throw new Error(JSON.stringify(message)); // Stringify to handle object errors
  }
};

const deleteUser = async (userId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No authentication token found for deleteUser');
    throw new Error('No authentication token found');
  }
  console.log(`Sending DELETE request for userId: ${userId}, URL: ${API_URL}delete/${userId}, Token: ${token.slice(0, 20)}...`);
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.log(`Request timeout for userId: ${userId}`);
      controller.abort();
    }, 15000); // 15 seconds timeout
    const response = await axios.delete(`${API_URL}delete/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    console.log('Delete response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Delete error:', error.response?.data || error.message);
    const message = error.response?.data?.message || error.message || 'Failed to delete user';
    throw new Error(message);
  }
};

const userService = {
  getAllUsers,
  editUser,
  deleteUser,
  getAllDrivers,
  editDriver,
  addAdmin,
};

export default userService;