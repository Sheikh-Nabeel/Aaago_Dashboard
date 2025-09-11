// features/slice/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { isTokenValid, getTokenExpirationTime } from "../../utils/tokenUtils";

// Helper function to get valid token from storage
const getValidTokenFromStorage = () => {
  try {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const sessionExpiry = localStorage.getItem('sessionExpiry');
    
    // Check if session has expired
    if (sessionExpiry && new Date() > new Date(sessionExpiry)) {
      console.log('Session expired based on stored expiry time');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('sessionExpiry');
      return { token: null, user: null };
    }
    
    if (token && isTokenValid(token)) {
      return { token, user };
    }
    
    // Clean up invalid data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('sessionExpiry');
    return { token: null, user: null };
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    // Clean up corrupted data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('sessionExpiry');
    return { token: null, user: null };
  }
};

const initialState = {
  user: getValidTokenFromStorage().user,
  token: getValidTokenFromStorage().token,
  isAuthenticated: !!getValidTokenFromStorage().token,
  loading: false,
  error: null,
  sessionExpired: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, user, rememberMe = false } = action.payload;
      state.token = token;
      state.user = user;
      state.isAuthenticated = true;
      state.error = null;
      state.sessionExpired = false;
      
      // Store in localStorage or sessionStorage based on rememberMe
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('token', token);
      
      if (user) {
        storage.setItem('user', JSON.stringify(user));
      }
      
      // Also store in localStorage for session recovery
      localStorage.setItem("token", token);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }
    },
    logout: (state, action) => {
      const reason = action.payload?.reason || 'manual';
      console.log(`Logging out user. Reason: ${reason}`);
      
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.sessionExpired = reason === 'expired';
      state.error = reason === 'expired' ? 'Session expired. Please login again.' : null;
      
      // Clear both localStorage and sessionStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem('sessionExpiry');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('sessionExpiry');
      
      // Clear any other auth-related data
      localStorage.removeItem('lastActivity');
    },
    clearSessionExpired: (state) => {
      state.sessionExpired = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    checkTokenValidity: (state) => {
      const { token, user } = getValidTokenFromStorage();
      
      if (!token || !isTokenValid(token)) {
        // Token is invalid or expired
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.sessionExpired = true;
        state.error = 'Session expired. Please login again.';
        
        // Clear all storage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem('sessionExpiry');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('sessionExpiry');
      } else {
        // Update last activity timestamp
        localStorage.setItem('lastActivity', new Date().toISOString());
      }
    },
    
    // New reducer for session recovery
    recoverSession: (state) => {
      const { token, user } = getValidTokenFromStorage();
      
      if (token && user && isTokenValid(token)) {
        state.token = token;
        state.user = user;
        state.isAuthenticated = true;
        state.error = null;
        
        console.log('Session recovered successfully');
      }
    },
    
    // New reducer for updating last activity
    updateLastActivity: (state) => {
      if (state.isAuthenticated) {
        localStorage.setItem('lastActivity', new Date().toISOString());
      }
    },
  },
});

export const { setCredentials, logout, clearSessionExpired, setError, setLoading, checkTokenValidity, recoverSession, updateLastActivity } =
  authSlice.actions;
export default authSlice.reducer;
