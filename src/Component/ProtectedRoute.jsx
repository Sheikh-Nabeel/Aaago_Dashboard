import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isTokenValid } from '../utils/tokenUtils';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const location = useLocation();

  // Check if user is authenticated and has a valid token
  if (!isAuthenticated || !token) {
    // Redirect to login page with return url
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Check if token is expired (basic JWT expiration check)
  try {
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      
      if (tokenPayload.exp && tokenPayload.exp < currentTime) {
        // Token is expired, redirect to login
        localStorage.removeItem('token');
        return <Navigate to="/" state={{ from: location }} replace />;
      }
    }
  } catch (error) {
    // Invalid token format, redirect to login
    console.error('Invalid token format:', error);
    localStorage.removeItem('token');
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;