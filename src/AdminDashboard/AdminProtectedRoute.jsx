import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const loginTime = localStorage.getItem('adminLoginTime');

  // Check if token exists
  if (!token) {
    return <Navigate to="/adminlogin" state={{ from: location }} replace />;
  }

  // Check if session has expired (1 hour)
  if (loginTime) {
    const elapsed = Date.now() - parseInt(loginTime, 10);
    if (elapsed > 3600000) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('adminLoginTime');
      return <Navigate to="/adminlogin" state={{ from: location }} replace />;
    }
  }

  return children;
};

export default AdminProtectedRoute;
