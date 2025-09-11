import axios from 'axios';
import { store } from '../app/store';
import { logout, setCredentials } from '../features/slice/authSlice';
import { isTokenValid, getTokenExpirationTime } from '../utils/tokenUtils';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: 'https://aaaogo.xyz/api',
  timeout: 10000,
});

// Request interceptor to add token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    
    if (token) {
      // Check if token is expired before making request
      try {
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        
        if (tokenPayload.exp && tokenPayload.exp < currentTime) {
          // Token is expired, logout user
          store.dispatch(logout());
          window.location.href = '/';
          return Promise.reject(new Error('Token expired'));
        }
        
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        // Invalid token format, logout user
        console.error('Invalid token format:', error);
        store.dispatch(logout());
        window.location.href = '/';
        return Promise.reject(new Error('Invalid token'));
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration and errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;
    
    if (response?.status === 401 || response?.status === 403) {
      console.log('Unauthorized access detected:', response.status);
      
      // Check if this is a token refresh request to avoid infinite loops
      if (config.url?.includes('/auth/refresh')) {
        console.log('Token refresh failed, logging out...');
        store.dispatch(logout({ reason: 'refresh_failed' }));
        
        if (typeof window !== 'undefined') {
          window.location.href = '/';
        }
        return Promise.reject(error);
      }
      
      // Try to refresh token before logging out
      try {
        const state = store.getState();
        const { token } = state.auth;
        
        if (token && isTokenValid(token)) {
          // Import tokenRefreshService dynamically to avoid circular dependency
          const { default: tokenRefreshService } = await import('./tokenRefreshService');
          const refreshSuccess = await tokenRefreshService.refreshToken();
          
          if (refreshSuccess) {
            // Retry the original request with new token
            const newState = store.getState();
            const newToken = newState.auth.token;
            
            if (newToken) {
              config.headers.Authorization = `Bearer ${newToken}`;
              return axiosInstance(config);
            }
          }
        }
      } catch (refreshError) {
        console.error('Token refresh attempt failed:', refreshError);
      }
      
      // If refresh fails or token is invalid, logout
      console.log('Token expired or unauthorized, logging out...');
      store.dispatch(logout({ reason: 'expired' }));
      
      // Redirect to login page
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    }
    
    // Handle other error types
    if (response?.status >= 500) {
      console.error('Server error:', response.status, response.data);
    } else if (response?.status === 429) {
      console.warn('Rate limit exceeded, please try again later');
    } else if (response) {
      console.error('API Error:', response.data?.message || error.message);
    } else if (error.request) {
      // Network error
      console.error('Network error - please check your connection');
    } else {
      console.error('Request error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Re-export token utilities for backward compatibility
export { isTokenValid, getTokenExpirationTime } from '../utils/tokenUtils';

export default axiosInstance;