import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

// Mock user database (frontend only - no backend needed)
const mockUsers = {
  user: [
    { id: 1, username: 'patient1', password: 'patient123', role: 'user', name: 'John Doe', email: 'johndoe@email.com' }
  ],
  admin: [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin', name: 'Admin User', email: 'admin@hospital.com' }
  ],
  hospital: [
    { id: 1, username: 'hospital1', password: 'hospital123', role: 'hospital', name: 'City Hospital', email: 'info@cityhospital.com' }
  ],
  insurance: [
    { id: 1, username: 'insurance1', password: 'insurance123', role: 'insurance', name: 'Health Insurance Co.', email: 'contact@healthinsurance.com' }
  ]
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password, role) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Find user in mock database
    const userList = mockUsers[role];
    if (!userList) {
      return {
        success: false,
        message: 'Invalid role'
      };
    }

    const foundUser = userList.find(u => u.username === username && u.password === password);
    
    if (!foundUser) {
      return {
        success: false,
        message: 'Invalid credentials'
      };
    }

    // Create mock token
    const mockToken = 'mock-jwt-token-' + Date.now();
    const userData = {
      id: foundUser.id,
      username: foundUser.username,
      name: foundUser.name,
      role: foundUser.role,
      email: foundUser.email,
      password: foundUser.password
    };
    
    setToken(mockToken);
    setUser(userData);
    localStorage.setItem('token', mockToken);
    localStorage.setItem('user', JSON.stringify(userData));

    return { success: true };
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
