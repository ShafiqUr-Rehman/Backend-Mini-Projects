import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

  return token ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
