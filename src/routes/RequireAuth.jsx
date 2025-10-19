import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    // Only navigate; Login page will show the toast on mount
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}
