import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, BarChart3, Users, Clock, Edit, Settings, 
  Globe, LogOut, ChevronLeft, ChevronRight, Menu, Search, User, X
} from 'lucide-react';

export default function AdminLayout() {
  const { user, isAuthenticated, logout } = useAuth();
  const { language, toggleLanguage, t, isRtl } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  // Responsive mobile states
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('maharat_sidebar_collapsed');
    return saved === 'true';
  });
  
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Resize listener to adapt layouts dynamically
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setMobileOpen(false); // Close mobile drawer if resized to desktop
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem('maharat_sidebar_collapsed', isCollapsed);
  }, [isCollapsed]);

  // Auth gate check
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const navItems = [
    { id: 'overview', path: '/admin/overview', label: t('admin.sidebar.overview'), icon: <BarChart3 className="h-5 w-5" /> },
    { id: 'subscriptions', path: '/admin/subscriptions', label: t('admin.sidebar.subscriptions'), icon: <Users className="h-5 w-5" /> },
    { id: 'coaches', path: '/admin/coaches', label: t('admin.sidebar.coaches'), icon: <Clock className="h-5 w-5" /> },
    { id: 'cms', path: '/admin/cms', label: t('admin.sidebar.cms'), icon: <Edit className="h-5 w-5" /> },
    { id: 'settings', path: '/admin/settings', label: t('admin.sidebar.settings'), icon: <Settings className="h-5 w-5" /> }
  ];

  const getPageTitle = () => {
    const current = navItems.find(item => location.pathname.startsWith(item.path));
    return current ? current.label : t('admin.sidebar.overview');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Mobile slide values
  const sidebarTransition = { type: 'spring', damping: 25, stiffness: 220 };
  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { 
      x: isRtl ? '100%' : '-100%', 
      opacity: 0,
      transition: { duration: 0.25 }
    }
  };

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full">
      <div>
        {/* Logo Brand Header */}
        <div className="h-16 flex items-center justify-between px-4.5 border-b border-white/10 overflow-hidden shrink-0">
          <Link to="/admin/overview" className="flex items-center gap-3">
            <div className="bg-primary text-secondary p-2.5 rounded-xl flex items-center justify-center shadow-md">
              <Trophy className="h-5 w-5 shrink-0" />
            </div>
            {(!isCollapsed || isMobile) && (
              <span className="font-display font-extrabold text-sm sm:text-base text-white tracking-tight flex flex-col leading-none text-start">
                <span>{language === 'ar' ? 'بوابة مهارات' : 'MAHARAT ADMIN'}</span>
                <span className="text-[9px] text-secondary font-bold tracking-widest uppercase mt-1">
                  {language === 'ar' ? 'المشرف العام' : 'Control Center'}
                </span>
              </span>
            )}
          </Link>
          {isMobile && (
            <button 
              onClick={() => setMobileOpen(false)}
              className="p-2 text-gray-400 hover:text-white rounded-xl bg-white/5 cursor-pointer"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          )}
        </div>

        {/* Navigation Links list */}
        <nav className="mt-6 px-3 space-y-1.5">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => isMobile && setMobileOpen(false)}
                className={`flex items-center gap-3.5 py-3.5 px-4.5 rounded-2xl font-semibold text-sm transition-all cursor-pointer group relative ${
                  isActive 
                    ? 'bg-secondary text-primary-dark shadow-md shadow-secondary/15' 
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="shrink-0 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                {(!isCollapsed || isMobile) && (
                  <span>
                    {item.label}
                  </span>
                )}

                {/* Tooltip on collapse (Desktop only) */}
                {isCollapsed && !isMobile && (
                  <span 
                    className={`absolute z-50 bg-primary-dark text-white text-xs font-bold py-2 px-3 rounded-lg border border-white/5 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap ${
                      isRtl ? 'right-20' : 'left-20'
                    }`}
                  >
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Collapsing Toggle & LogOut */}
      <div className="p-3 border-t border-white/10 space-y-1.5 shrink-0">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3.5 py-3 px-4.5 rounded-2xl font-bold text-sm text-red-300 hover:bg-red-950/20 hover:text-red-200 transition-all cursor-pointer group relative text-start"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {(!isCollapsed || isMobile) && <span>{t('admin.header.logout')}</span>}
          {isCollapsed && !isMobile && (
            <span 
              className={`absolute z-50 bg-red-900 text-white text-xs font-bold py-2 px-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap ${
                isRtl ? 'right-20' : 'left-20'
              }`}
            >
              {t('admin.header.logout')}
            </span>
          )}
        </button>

        {!isMobile && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center gap-3.5 py-3 px-4.5 rounded-2xl font-bold text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-all cursor-pointer text-start"
          >
            {isRtl ? (
              isCollapsed ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />
            ) : (
              isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />
            )}
            {!isCollapsed && <span>{t('admin.sidebar.collapse')}</span>}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans select-none relative">
      
      {/* 1. RESPONSIVE SIDEBAR OVERLAY */}
      <AnimatePresence>
        {isMobile ? (
          mobileOpen && (
            <>
              {/* Blur backdrop for mobile drawer */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs" 
                onClick={() => setMobileOpen(false)}
              ></motion.div>
              
              {/* Mobile Drawer */}
              <motion.aside
                variants={sidebarVariants}
                initial="closed"
                animate="open"
                exit="closed"
                transition={sidebarTransition}
                className={`fixed top-0 bottom-0 z-50 w-64 bg-primary-dark text-white flex flex-col justify-between shadow-2xl ${
                  isRtl ? 'left-0 border-r border-white/5' : 'right-0 border-l border-white/5'
                }`}
              >
                {sidebarContent}
              </motion.aside>
            </>
          )
        ) : (
          /* Desktop Collapsible Sidebar */
          <motion.aside
            animate={{ width: isCollapsed ? 80 : 260 }}
            transition={{ duration: 0.3, cubicBezier: [0.4, 0, 0.2, 1] }}
            className={`bg-primary-dark text-white flex flex-col justify-between shrink-0 shadow-xl z-30 fixed top-0 bottom-0 ${
              isRtl ? 'right-0 border-l border-white/5' : 'left-0 border-r border-white/5'
            }`}
          >
            {sidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* 2. Main Content Frame (Adapting margins to 0 on mobile!) */}
      <div 
        className="flex-1 flex flex-col min-w-0 transition-all duration-300"
        style={{
          marginLeft: isMobile ? 0 : (isRtl ? 0 : (isCollapsed ? 80 : 260)),
          marginRight: isMobile ? 0 : (isRtl ? (isCollapsed ? 80 : 260) : 0)
        }}
      >
        {/* Sticky Header */}
        <header className="h-16 sticky top-0 bg-white shadow-sm border-b border-gray-200/80 z-20 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            {/* Hamburger open trigger for smartphone */}
            {isMobile && (
              <button 
                onClick={() => setMobileOpen(true)} 
                className="p-2 border border-gray-200 rounded-xl text-primary bg-gray-50 active:bg-gray-100 cursor-pointer"
                aria-label="Open Sidebar"
              >
                <Menu className="h-5 w-5" />
              </button>
            )}
            <h1 className="font-display font-extrabold text-sm sm:text-lg text-charcoal leading-none">
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Global Search Interface (hidden on mobile to prevent cram) */}
            <div className="relative hidden md:block w-64">
              <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-3.5' : 'left-0 pl-3.5'} flex items-center pointer-events-none text-gray-400`}>
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                placeholder={t('admin.header.search')}
                className={`block w-full py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white text-xs font-semibold ${
                  isRtl ? 'pl-4 pr-10 text-right' : 'pl-10 pr-4 text-left'
                }`}
              />
            </div>

            {/* Language Switch */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:text-primary hover:border-primary transition-all cursor-pointer bg-white"
            >
              <Globe className="h-4 w-4 text-primary" />
              <span className="hidden sm:inline">{language === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            {/* Admin Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 cursor-pointer hover:opacity-85 transition-opacity"
              >
                <div className="bg-primary text-secondary p-2 rounded-xl flex items-center justify-center shadow-sm">
                  <User className="h-5 w-5" />
                </div>
                <div className="hidden sm:flex flex-col text-start leading-none">
                  <span className="text-xs font-extrabold text-charcoal">{user?.name}</span>
                  <span className="text-[9px] text-gray-400 font-bold tracking-wider uppercase mt-0.5">{t('admin.settings.roles.super')}</span>
                </div>
              </button>

              <AnimatePresence>
                {profileDropdownOpen && (
                  <>
                    {/* Dropdown closing backdrop */}
                    <div className="fixed inset-0 z-40" onClick={() => setProfileDropdownOpen(false)}></div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`absolute z-50 mt-3 w-48 bg-white border border-gray-200/80 rounded-2xl shadow-xl p-2 ${
                        isRtl ? 'left-0' : 'right-0'
                      }`}
                    >
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          navigate('/admin/settings');
                        }}
                        className="w-full flex items-center gap-2.5 py-2.5 px-4 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 hover:text-primary transition-all text-start cursor-pointer"
                      >
                        <Settings className="h-4 w-4" />
                        <span>{t('admin.sidebar.settings')}</span>
                      </button>
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          handleLogout();
                        }}
                        className="w-full flex items-center gap-2.5 py-2.5 px-4 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-all text-start cursor-pointer border-t border-gray-100 mt-1 pt-2"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>{t('admin.header.logout')}</span>
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Content Body Routing slot */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
