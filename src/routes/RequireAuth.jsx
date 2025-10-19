import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/ToastProvider';


export default function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const toast = useToast();
  if (!isAuthenticated) {
    useEffect(() => {
      toast.show('You must be logged in to access this page.', { type: 'error' });
      // Only show once per mount
      // eslint-disable-next-line
    }, []);
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}

