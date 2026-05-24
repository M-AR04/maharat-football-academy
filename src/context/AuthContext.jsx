import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('maharat_admin');
    return saved ? JSON.parse(saved) : null;
  });

  const [staffList, setStaffList] = useState([
    { id: '1', name: 'Coach Abu Rayan', email: 'aburayan@maharat.com', role: 'coach', status: 'active' },
    { id: '2', name: 'Fahad Al-Harbi', email: 'fahad@maharat.com', role: 'editor', status: 'active' },
    { id: '3', name: 'Sultan Bin Khalid', email: 'sultan@maharat.com', role: 'coach', status: 'inactive' }
  ]);

  const login = (email, password) => {
    // Simulated credential check
    if (email.trim() === 'admin@maharat.com' && password === 'admin123') {
      const adminUser = {
        name: 'Administrator',
        email: 'admin@maharat.com',
        role: 'super'
      };
      setUser(adminUser);
      localStorage.setItem('maharat_admin', JSON.stringify(adminUser));
      return { success: true };
    }
    return { 
      success: false, 
      message: 'Invalid credentials. Use admin@maharat.com and admin123.' 
    };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('maharat_admin');
  };

  const updateProfile = (name, email, password) => {
    const updatedUser = { ...user, name, email };
    setUser(updatedUser);
    localStorage.setItem('maharat_admin', JSON.stringify(updatedUser));
    return { success: true };
  };

  const addStaff = (name, email, role) => {
    const newStaff = {
      id: String(staffList.length + 1),
      name,
      email,
      role,
      status: 'active'
    };
    setStaffList(prev => [...prev, newStaff]);
    return { success: true };
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, updateProfile, staffList, addStaff }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
