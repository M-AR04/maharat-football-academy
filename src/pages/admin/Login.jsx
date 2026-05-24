import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';
import { Mail, Lock, ShieldAlert, Globe, Trophy } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const { language, toggleLanguage, t, isRtl } = useLanguage();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError(language === 'ar' ? 'الرجاء إدخال البريد الإلكتروني وكلمة المرور' : 'Please fill in all fields.');
      return;
    }

    setLoading(true);
    // Simulate minor network buffer
    setTimeout(() => {
      const res = login(email, password);
      setLoading(false);
      if (res.success) {
        navigate('/admin/overview');
      } else {
        setError(res.message);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-dark relative px-4 py-12 overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary-dark via-primary to-primary-dark/90 opacity-95 pointer-events-none"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Floating Language Switcher */}
      <div className="absolute top-6 end-6 z-10">
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white border border-white/10 hover:border-secondary hover:bg-white/15 text-xs font-semibold cursor-pointer transition-all"
        >
          <Globe className="h-4 w-4 text-secondary-light" />
          <span>{language === 'ar' ? 'English' : 'العربية'}</span>
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100 z-10"
      >
        <div className="text-center mb-8">
          <div className="bg-primary text-secondary p-3.5 rounded-2xl flex items-center justify-center w-fit mx-auto mb-4 shadow-lg">
            <Trophy className="h-7 w-7" />
          </div>
          <h2 className="text-2xl font-display font-extrabold text-charcoal">
            {language === 'ar' ? 'بوابة إدارة الأكاديمية' : 'Maharat Admin Portal'}
          </h2>
          <p className="text-xs font-bold text-gray-400 mt-2">
            {language === 'ar' 
              ? 'سجل دخولك لإدارة المشتركين والمدربين ومحتوى الموقع' 
              : 'Sign in to manage subscribers, coaches, and content'}
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3 text-xs font-semibold leading-normal"
          >
            <ShieldAlert className="h-5 w-5 text-red-500 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
              {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
            </label>
            <div className="relative">
              <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none text-gray-400`}>
                <Mail className="h-5 w-5" />
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@maharat.com"
                className={`block w-full py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-xs sm:text-sm font-bold ${
                  isRtl ? 'pl-4 pr-12 text-right' : 'pl-12 pr-4 text-left'
                }`}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="block text-xs sm:text-sm font-bold text-gray-700">
                {language === 'ar' ? 'كلمة المرور' : 'Password'}
              </label>
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-xs font-bold text-primary hover:text-primary-light cursor-pointer"
              >
                {language === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
              </button>
            </div>
            <div className="relative">
              <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none text-gray-400`}>
                <Lock className="h-5 w-5" />
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`block w-full py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-xs sm:text-sm font-bold ${
                  isRtl ? 'pl-4 pr-12 text-right' : 'pl-12 pr-4 text-left'
                }`}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-light text-white font-extrabold py-4.5 rounded-2xl shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all text-base cursor-pointer disabled:bg-primary/70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
          >
            <span>{loading ? (language === 'ar' ? 'جاري التحقق...' : 'Signing in...') : (language === 'ar' ? 'تسجيل الدخول' : 'Sign In')}</span>
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <button
            onClick={() => navigate('/')}
            className="text-xs font-bold text-gray-400 hover:text-primary cursor-pointer transition-colors"
          >
            {language === 'ar' ? '← العودة للموقع الرئيسي' : '← Return to Main Website'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
