import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Check, ShieldAlert, Globe, Trophy } from 'lucide-react';

export default function ForgotPassword() {
  const { language, toggleLanguage, isRtl } = useLanguage();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError(language === 'ar' ? 'الرجاء إدخال البريد الإلكتروني' : 'Please enter your email.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-dark relative px-4 py-12 overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary-dark via-primary to-primary-dark/90 opacity-95 pointer-events-none"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Language Switcher */}
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
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100 z-10 overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-center mb-8">
                <div className="bg-primary text-secondary p-3.5 rounded-2xl flex items-center justify-center w-fit mx-auto mb-4 shadow-lg">
                  <Trophy className="h-7 w-7" />
                </div>
                <h2 className="text-2xl font-display font-extrabold text-charcoal">
                  {language === 'ar' ? 'استعادة كلمة المرور' : 'Reset Password'}
                </h2>
                <p className="text-xs font-bold text-gray-400 mt-2">
                  {language === 'ar' 
                    ? 'أدخل بريدك الإلكتروني المسجل وسنرسل لك رابطاً لإعادة تعيين كلمة المرور' 
                    : 'Enter your registered email and we will send a password reset link'}
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3 text-xs font-semibold">
                  <ShieldAlert className="h-5 w-5 text-red-500 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-light text-white font-extrabold py-4.5 rounded-2xl shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all text-base cursor-pointer disabled:bg-primary/70 flex items-center justify-center gap-2"
                >
                  <span>{loading ? (language === 'ar' ? 'جاري الإرسال...' : 'Sending...') : (language === 'ar' ? 'إرسال رابط استعادة كلمة المرور' : 'Send Reset Link')}</span>
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="text-center py-6"
            >
              <div className="bg-emerald-100 text-emerald-800 p-4.5 rounded-full w-fit mx-auto mb-6 flex items-center justify-center">
                <Check className="h-10 w-10 font-bold" />
              </div>
              
              <h3 className="text-2xl font-display font-extrabold text-charcoal">
                {language === 'ar' ? 'تم إرسال الرابط!' : 'Instructions Dispatched!'}
              </h3>
              
              <p className="text-xs sm:text-sm font-bold text-gray-500 mt-4 leading-relaxed">
                {language === 'ar'
                  ? `لقد أرسلنا بريداً إلكترونياً يحتوي على تعليمات استعادة كلمة المرور إلى البريد: ${email}`
                  : `We have sent password recovery instructions directly to: ${email}`}
              </p>
              
              <p className="text-[11px] font-bold text-gray-400 mt-3 bg-gray-50 p-3 rounded-xl border border-gray-100 leading-normal">
                {language === 'ar'
                  ? 'الرجاء التحقق من علبة الرسائل المزعجة (Spam) إذا لم تصلك خلال دقيقتين.'
                  : 'Please check your spam/junk folder if you do not receive the email within 2 minutes.'}
              </p>

              <button
                onClick={() => navigate('/login')}
                className="mt-8 w-full bg-primary hover:bg-primary-light text-white font-extrabold py-4.5 rounded-2xl shadow-lg transition-all text-sm cursor-pointer"
              >
                {language === 'ar' ? 'العودة لصفحة الدخول' : 'Back to Login'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {!success && (
          <div className="mt-8 text-center border-t border-gray-100 pt-6">
            <button
              onClick={() => navigate('/login')}
              className="text-xs font-bold text-gray-400 hover:text-primary cursor-pointer transition-colors"
            >
              {language === 'ar' ? '← العودة لصفحة تسجيل الدخول' : '← Back to Sign In'}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
