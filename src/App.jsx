import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { DatabaseProvider } from './context/DatabaseContext';
import { AuthProvider } from './context/AuthContext';
import { CMSProvider } from './context/CMSContext';
import Preloader from './components/Preloader';
import { AnimatePresence } from 'framer-motion';

// Public Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/admin/Login';
import ForgotPassword from './pages/admin/ForgotPassword';

// Protected Admin Dashboard Layout & Sub-Pages
import AdminLayout from './layouts/AdminLayout';
import Overview from './pages/admin/Overview';
import Subscriptions from './pages/admin/Subscriptions';
import Coaches from './pages/admin/Coaches';
import CMS from './pages/admin/CMS';
import Settings from './pages/admin/Settings';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 seconds custom preloader reveal duration
    return () => clearTimeout(timer);
  }, []);

  return (
    <LanguageProvider>
      <DatabaseProvider>
        <CMSProvider>
          <AuthProvider>
            {/*bespoke animated Preloader overlay */}
            <AnimatePresence mode="wait">
              {isLoading && <Preloader key="preloader" />}
            </AnimatePresence>
            
            <Router>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Protected Admin Nested Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Navigate to="/admin/overview" replace />} />
                  <Route path="overview" element={<Overview />} />
                  <Route path="subscriptions" element={<Subscriptions />} />
                  <Route path="coaches" element={<Coaches />} />
                  <Route path="cms" element={<CMS />} />
                  <Route path="settings" element={<Settings />} />
                </Route>

                {/* Catch-all Wildcard fallback to Public Landing */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Router>
          </AuthProvider>
        </CMSProvider>
      </DatabaseProvider>
    </LanguageProvider>
  );
}
