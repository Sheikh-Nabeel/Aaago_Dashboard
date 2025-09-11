import axiosInstance from './axiosConfig';
import { store } from '../app/store';
import { setCredentials, logout } from '../features/slice/authSlice';
import { isTokenValid, getTokenExpirationTime } from '../utils/tokenUtils';

class TokenRefreshService {
  constructor() {
    this.refreshPromise = null;
    this.refreshThreshold = 5 * 60 * 1000; // 5 minutes before expiration
    this.checkInterval = null;
  }

  // Start automatic token refresh checking
  startTokenRefreshCheck() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }

    // Check every minute
    this.checkInterval = setInterval(() => {
      this.checkAndRefreshToken();
    }, 60 * 1000);
  }

  // Stop automatic token refresh checking
  stopTokenRefreshCheck() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }

  // Check if token needs refresh and refresh if necessary
  async checkAndRefreshToken() {
    const state = store.getState();
    const { token, isAuthenticated } = state.auth;

    if (!isAuthenticated || !token) {
      return false;
    }

    const expirationTime = getTokenExpirationTime(token);
    if (!expirationTime) {
      return false;
    }

    const currentTime = new Date();
    const timeUntilExpiration = expirationTime.getTime() - currentTime.getTime();

    // If token expires within the threshold, refresh it
    if (timeUntilExpiration <= this.refreshThreshold) {
      console.log('Token is about to expire, attempting refresh...');
      return await this.refreshToken();
    }

    return true;
  }

  // Refresh the authentication token
  async refreshToken() {
    // Prevent multiple simultaneous refresh attempts
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this._performTokenRefresh();
    
    try {
      const result = await this.refreshPromise;
      return result;
    } finally {
      this.refreshPromise = null;
    }
  }

  // Perform the actual token refresh
  async _performTokenRefresh() {
    try {
      const state = store.getState();
      const { token } = state.auth;

      if (!token) {
        throw new Error('No token available for refresh');
      }

      // Call the refresh endpoint
      const response = await axiosInstance.post('/auth/refresh', {
        refreshToken: token
      });

      const { token: newToken, user } = response.data;

      if (newToken && isTokenValid(newToken)) {
        // Update the store with new token
        store.dispatch(setCredentials({ token: newToken, user }));
        console.log('Token refreshed successfully');
        return true;
      } else {
        throw new Error('Invalid token received from refresh');
      }
    } catch (error) {
      console.error('Token refresh failed:', error.response?.data || error.message);
      
      // If refresh fails, logout the user
      store.dispatch(logout({ reason: 'expired' }));
      
      // Redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
      
      return false;
    }
  }

  // Get time until token expiration in milliseconds
  getTimeUntilExpiration() {
    const state = store.getState();
    const { token } = state.auth;

    if (!token) {
      return 0;
    }

    const expirationTime = getTokenExpirationTime(token);
    if (!expirationTime) {
      return 0;
    }

    const currentTime = new Date();
    return Math.max(0, expirationTime.getTime() - currentTime.getTime());
  }

  // Check if token needs refresh soon
  shouldRefreshSoon() {
    const timeUntilExpiration = this.getTimeUntilExpiration();
    return timeUntilExpiration > 0 && timeUntilExpiration <= this.refreshThreshold;
  }
}

// Create singleton instance
const tokenRefreshService = new TokenRefreshService();

export default tokenRefreshService;

// Export helper functions
export {
  TokenRefreshService
};