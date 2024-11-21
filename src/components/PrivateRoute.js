import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  
  // Commenting out the authentication check to disable page restriction
  // return isAuthenticated ? children : <Navigate to="/login" />;
  return children; // Always render children without restriction
};

export default PrivateRoute;