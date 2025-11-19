import axios from 'axios';
import { store } from '../app/store';
import { logout } from '../features/slice/authSlice';
import { isTokenValid } from '../utils/tokenUtils';

const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || '/api';
const API_TIMEOUT_MS = Number(import.meta.env?.VITE_API_TIMEOUT_MS) || 30000;
const ENABLE_TOKEN_REFRESH = (import.meta.env?.VITE_ENABLE_TOKEN_REFRESH === 'true');
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT_MS,
});

// Request interceptor to add token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    config.metadata = { start: performance.now() };
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
  (response) => {
    const label = `${response.config.method?.toUpperCase()} ${response.config.url}`;
    if (response.config.metadata?.start) {
      const dur = Math.round(performance.now() - response.config.metadata.start);
      console.log(label, dur);
    }
    return response;
  },
  async (error) => {
    const { response, config } = error;
    const label = `${config?.method?.toUpperCase()} ${config?.url}`;
    if (config?.metadata?.start) {
      const dur = Math.round(performance.now() - config.metadata.start);
      console.log(label, dur);
    }
    
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
      
      if (ENABLE_TOKEN_REFRESH) {
        try {
          const state = store.getState();
          const { token } = state.auth;
          if (token && isTokenValid(token)) {
            const { default: tokenRefreshService } = await import('./tokenRefreshService');
            const refreshSuccess = await tokenRefreshService.refreshToken();
            if (refreshSuccess) {
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
export { API_BASE_URL, API_TIMEOUT_MS };
export default axiosInstance;