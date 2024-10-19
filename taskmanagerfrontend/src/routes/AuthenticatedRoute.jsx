import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthenticatedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.authenticated);

  // If authenticated, prevent access to login/register routes
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>; // Render children if not authenticated
};

export default AuthenticatedRoute;
