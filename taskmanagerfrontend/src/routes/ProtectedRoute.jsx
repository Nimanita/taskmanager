// components/ProtectedRoute.js
// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.authenticated);
  console.log(isAuthenticated , "isuathenticated")
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>; // Use React Fragment to return children
};

export default ProtectedRoute;

