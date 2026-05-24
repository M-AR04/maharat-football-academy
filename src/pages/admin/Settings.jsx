import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Lock, ShieldCheck, Plus, Sparkles, X, ShieldAlert, Key
} from 'lucide-react';

export default function Settings() {
  const { t, language, isRtl } = useLanguage();
  const { user, updateProfile, staffList, addStaff } = useAuth();

  // Admin credentials local state
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [toast, setToast] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New staff form local state
  const [staffForm, setStaffForm] = useState({
    name: '',
    email: '',
    role: 'coach'
  });

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        email: user.email || '',
        password: ''
      });
    }
  }, [user]);

  // Toast clear timer
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    updateProfile(profileForm.name, profileForm.email, profileForm.password);
    setToast(t('admin.settings.successProfile'));
    setProfileForm(prev => ({ ...prev, password: '' })); // clear password input field
  };

  const handleAddStaffSubmit = (e) => {
    e.preventDefault();
    if (!staffForm.name.trim() || !staffForm.email.trim()) return;

    addStaff(staffForm.name, staffForm.email, staffForm.role);
    setToast(language === 'ar' ? 'تم تفويض الموظف الجديد بنجاح!' : 'New staff authorized successfully!');
    setIsModalOpen(false);
    setStaffForm({ name: '', email: '', role: 'coach' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 relative"
    >
      {/* Toast Alert */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-4.5 bg-primary-dark text-white rounded-2xl shadow-2xl border border-white/5 flex items-center gap-3 text-xs font-bold"
          >
            <Sparkles className="h-5 w-5 text-secondary animate-[spin_4s_linear_infinite]" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Info */}
      <div className="text-start">
        <h2 className="text-xl sm:text-2xl font-display font-extrabold text-charcoal">
          {t('admin.settings.title')}
        </h2>
        <p className="text-xs sm:text-sm font-semibold text-gray-400 mt-1">
          {t('admin.settings.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Profile Credentials Settings */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm text-start">
          <div className="mb-6 flex items-center gap-2">
            <Key className="h-5 w-5 text-secondary" />
            <h3 className="text-base sm:text-lg font-display font-extrabold text-charcoal leading-none">
              {t('admin.settings.profile')}
            </h3>
          </div>

          <form onSubmit={handleProfileUpdate} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-xs font-extrabold text-gray-700 mb-2">
                {t('admin.settings.adminName')}
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-3.5' : 'left-0 pl-3.5'} flex items-center pointer-events-none text-gray-400`}>
                  <User className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className={`block w-full py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-xs sm:text-sm font-bold ${
                    isRtl ? 'pl-4 pr-10 text-right' : 'pl-10 pr-4 text-left'
                  }`}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-extrabold text-gray-700 mb-2">
                {t('admin.settings.adminEmail')}
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-3.5' : 'left-0 pl-3.5'} flex items-center pointer-events-none text-gray-400`}>
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className={`block w-full py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-xs sm:text-sm font-bold ${
                    isRtl ? 'pl-4 pr-10 text-right' : 'pl-10 pr-4 text-left'
                  }`}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-extrabold text-gray-700 mb-2">
                {t('admin.settings.adminPass')}
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-3.5' : 'left-0 pl-3.5'} flex items-center pointer-events-none text-gray-400`}>
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  value={profileForm.password}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, password: e.target.value }))}
                  placeholder={t('admin.settings.adminPassPlaceholder')}
                  className={`block w-full py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-xs sm:text-sm font-bold ${
                    isRtl ? 'pl-4 pr-10 text-right' : 'pl-10 pr-4 text-left'
                  }`}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-light text-white font-extrabold py-3.5 rounded-2xl shadow-md hover:shadow-lg transition-all text-xs cursor-pointer"
            >
              {t('admin.settings.saveProfile')}
            </button>
          </form>
        </div>

        {/* Roles management & sub-advisors roster */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-secondary" />
                <h3 className="text-base sm:text-lg font-display font-extrabold text-charcoal leading-none">
                  {t('admin.settings.roleManagement')}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary/5 hover:bg-primary/10 text-primary font-bold px-4 py-2.5 rounded-xl text-xs cursor-pointer flex items-center justify-center gap-1.5 transition-all"
              >
                <Plus className="h-4 w-4" />
                <span>{t('admin.settings.addStaff')}</span>
              </button>
            </div>

            {/* Staff list Table */}
            <div className="overflow-x-auto border border-gray-100 rounded-2xl">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50">
                  <tr>
                    <th className={`px-4 py-3 text-xs font-extrabold text-gray-400 uppercase tracking-wider ${isRtl ? 'text-right' : 'text-left'}`}>
                      {t('admin.settings.cols.name')}
                    </th>
                    <th className={`px-4 py-3 text-xs font-extrabold text-gray-400 uppercase tracking-wider ${isRtl ? 'text-right' : 'text-left'}`}>
                      {t('admin.settings.cols.role')}
                    </th>
                    <th className={`px-4 py-3 text-xs font-extrabold text-gray-400 uppercase tracking-wider ${isRtl ? 'text-right' : 'text-left'}`}>
                      {t('admin.settings.cols.status')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100 text-xs font-semibold text-charcoal">
                  {staffList.map((staff) => {
                    const roleLabel = staff.role === 'coach' 
                      ? t('admin.settings.roles.coach') 
                      : staff.role === 'editor' 
                        ? t('admin.settings.roles.editor') 
                        : t('admin.settings.roles.super');
                    
                    return (
                      <tr key={staff.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap text-start">
                          <div className="font-extrabold text-primary-dark">{staff.name}</div>
                          <div className="text-[10px] text-gray-400 font-bold mt-0.5">{staff.email}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-start">
                          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold border ${
                            staff.role === 'super' 
                              ? 'bg-purple-50 text-purple-700 border-purple-100'
                              : staff.role === 'editor'
                                ? 'bg-blue-50 text-blue-700 border-blue-100'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                          }`}>
                            {roleLabel}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-start">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${
                            staff.status === 'active' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {staff.status === 'active' 
                              ? (language === 'ar' ? 'نشط' : 'Active') 
                              : (language === 'ar' ? 'معلق' : 'Inactive')}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      {/* Authorize Staff Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
            {/* Backdrop click close */}
            <div className="fixed inset-0" onClick={() => setIsModalOpen(false)}></div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 relative z-10 text-start"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                <h3 className="text-lg font-display font-extrabold text-charcoal">
                  {t('admin.settings.addStaff')}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleAddStaffSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    {language === 'ar' ? 'الاسم الكامل للموظف' : 'Staff Full Name'}
                  </label>
                  <input
                    type="text"
                    value={staffForm.name}
                    onChange={(e) => setStaffForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className={`block w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-xs sm:text-sm font-bold ${
                      isRtl ? 'text-right' : 'text-left'
                    }`}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    value={staffForm.email}
                    onChange={(e) => setStaffForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className={`block w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-xs sm:text-sm font-bold ${
                      isRtl ? 'text-right' : 'text-left'
                    }`}
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    {t('admin.settings.cols.role')}
                  </label>
                  <select
                    value={staffForm.role}
                    onChange={(e) => setStaffForm(prev => ({ ...prev, role: e.target.value }))}
                    className="block w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-xs sm:text-sm font-bold animate-none"
                  >
                    <option value="coach">{t('admin.settings.roles.coach')}</option>
                    <option value="editor">{t('admin.settings.roles.editor')}</option>
                  </select>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-3 border border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50 rounded-2xl font-bold text-xs cursor-pointer"
                  >
                    {t('admin.subscriptions.form.cancel')}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-primary hover:bg-primary-light text-white rounded-2xl font-extrabold text-xs cursor-pointer shadow-md"
                  >
                    {t('admin.settings.addStaff')}
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
