import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage from './components/HomePage';
import Login from './components/Login';
import UserDashboard from './components/dashboards/UserDashboard';
import AdminDashboard from './components/dashboards/AdminDashboard';
import HospitalDashboard from './components/dashboards/HospitalDashboard';
import InsuranceDashboard from './components/dashboards/InsuranceDashboard';
import './App.css';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

function AppRoutes() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={
        isAuthenticated ? (
          user?.role === 'user' ? <Navigate to="/user-dashboard" /> :
          user?.role === 'admin' ? <Navigate to="/admin-dashboard" /> :
          user?.role === 'hospital' ? <Navigate to="/hospital-dashboard" /> :
          user?.role === 'insurance' ? <Navigate to="/insurance-dashboard" /> :
          <HomePage />
        ) : (
          <HomePage />
        )
      } />
      
      <Route path="/login/:role" element={<Login />} />
      
      <Route path="/user-dashboard" element={
        <PrivateRoute allowedRoles={['user']}>
          <UserDashboard />
        </PrivateRoute>
      } />
      
      <Route path="/admin-dashboard" element={
        <PrivateRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </PrivateRoute>
      } />
      
      <Route path="/hospital-dashboard" element={
        <PrivateRoute allowedRoles={['hospital']}>
          <HospitalDashboard />
        </PrivateRoute>
      } />
      
      <Route path="/insurance-dashboard" element={
        <PrivateRoute allowedRoles={['insurance']}>
          <InsuranceDashboard />
        </PrivateRoute>
      } />
      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
