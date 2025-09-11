// Token utility functions

// Check if a JWT token is valid and not expired
export const isTokenValid = (token) => {
  if (!token) return false;
  
  try {
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    
    // Check if token has expiration and if it's still valid
    return tokenPayload.exp && tokenPayload.exp > currentTime;
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};

// Get token expiration time as Date object
export const getTokenExpirationTime = (token) => {
  if (!token) return null;
  
  try {
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    if (tokenPayload.exp) {
      return new Date(tokenPayload.exp * 1000);
    }
    return null;
  } catch (error) {
    console.error('Error getting token expiration:', error);
    return null;
  }
};

// Get token payload
export const getTokenPayload = (token) => {
  if (!token) return null;
  
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (error) {
    console.error('Error parsing token payload:', error);
    return null;
  }
};

// Check if token expires within a certain time (in milliseconds)
export const isTokenExpiringSoon = (token, thresholdMs = 5 * 60 * 1000) => {
  const expirationTime = getTokenExpirationTime(token);
  if (!expirationTime) return false;
  
  const currentTime = new Date();
  const timeUntilExpiration = expirationTime.getTime() - currentTime.getTime();
  
  return timeUntilExpiration <= thresholdMs;
};