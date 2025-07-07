


import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard/Dashboard';
import Login from '../Pages/Login/Login';

const AppRoutes = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const PrivateRoute = ({ children }) => {
    return authenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Routes>
      <Route path="/login" element={<Login onLoginSuccess={() => setAuthenticated(true)} />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
