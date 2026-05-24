import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useCMS } from '../../context/CMSContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Save, Edit3, Info, Phone, MapPin, Check, Globe
} from 'lucide-react';

export default function CMS() {
  const { t, language, isRtl } = useLanguage();
  const { content, updateSection } = useCMS();

  const [activeTab, setActiveTab] = useState('hero');
  const [toast, setToast] = useState('');
  
  // Local form states populated from the active CMSContext language
  const [heroForm, setHeroForm] = useState({
    badge: '',
    title: '',
    subtitle: '',
    cta: '',
    learnMore: ''
  });

  const [aboutForm, setAboutForm] = useState({
    title: '',
    desc1: '',
    desc2: ''
  });

  const [contactForm, setContactForm] = useState({
    phone: '',
    address: ''
  });

  // Load context state into form states when active language or context changes
  useEffect(() => {
    const langData = content[language];
    if (langData) {
      setHeroForm({
        badge: langData.hero?.badge || '',
        title: langData.hero?.title || '',
        subtitle: langData.hero?.subtitle || '',
        cta: langData.hero?.cta || '',
        learnMore: langData.hero?.learnMore || ''
      });

      setAboutForm({
        title: langData.about?.title || '',
        desc1: langData.about?.desc1 || '',
        desc2: langData.about?.desc2 || ''
      });

      setContactForm({
        phone: langData.contact?.phone || '',
        address: langData.contact?.address || ''
      });
    }
  }, [language, content]);

  // Toast timer auto-clear
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleHeroSave = (e) => {
    e.preventDefault();
    updateSection(language, 'hero', heroForm);
    setToast(t('admin.cms.successSave'));
  };

  const handleAboutSave = (e) => {
    e.preventDefault();
    updateSection(language, 'about', aboutForm);
    setToast(t('admin.cms.successSave'));
  };

  const handleContactSave = (e) => {
    e.preventDefault();
    updateSection(language, 'contact', contactForm);
    setToast(t('admin.cms.successSave'));
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
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-4 bg-primary-dark text-white rounded-2xl shadow-2xl border border-white/5 flex items-center gap-3 text-xs font-bold"
          >
            <Check className="h-5 w-5 text-secondary" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-start">
        <div>
          <h2 className="text-xl sm:text-2xl font-display font-extrabold text-charcoal">
            {t('admin.cms.title')}
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-gray-400 mt-1">
            {t('admin.cms.subtitle')}
          </p>
        </div>
        <div className="bg-primary/5 border border-primary/10 text-primary px-4.5 py-2.5 rounded-2xl flex items-center gap-2 text-xs font-bold w-fit">
          <Globe className="h-4.5 w-4.5" />
          <span>
            {language === 'ar' ? 'تعديل النسخة: العربية' : 'Editing: English version'}
          </span>
        </div>
      </div>

      {/* Dynamic Tabs Navigation */}
      <div className="bg-white rounded-3xl p-2.5 border border-gray-200/80 shadow-sm flex flex-wrap gap-2">
        {[
          { id: 'hero', label: t('admin.cms.tabs.hero'), icon: <Sparkles className="h-4 w-4" /> },
          { id: 'about', label: t('admin.cms.tabs.about'), icon: <Info className="h-4 w-4" /> },
          { id: 'contact', label: t('admin.cms.tabs.contact'), icon: <Phone className="h-4 w-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 rounded-2xl text-xs font-extrabold cursor-pointer transition-all flex items-center gap-2 relative ${
              activeTab === tab.id
                ? 'bg-primary text-white shadow-md shadow-primary/10'
                : 'text-gray-500 hover:bg-gray-50 hover:text-charcoal'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Editor Panels */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm text-start">
        <AnimatePresence mode="wait">
          
          {/* Hero Editor */}
          {activeTab === 'hero' && (
            <motion.form
              key="hero"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onSubmit={handleHeroSave}
              className="space-y-6"
            >
              {/* Badge Highlight */}
              <div>
                <label className="block text-xs font-extrabold text-gray-700 mb-2">
                  {t('admin.cms.hero.badge')}
                </label>
                <input
                  type="text"
                  value={heroForm.badge}
                  onChange={(e) => setHeroForm(prev => ({ ...prev, badge: e.target.value }))}
                  className={`block w-full py-3.5 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-xs sm:text-sm font-bold ${
                    isRtl ? 'text-right' : 'text-left'
                  }`}
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-extrabold text-gray-700 mb-2">
                  {t('admin.cms.hero.title')}
                </label>
                <textarea
                  rows="3"
                  value={heroForm.title}
                  onChange={(e) => setHeroForm(prev => ({ ...prev, title: e.target.value }))}
                  className={`block w-full py-3.5 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-xs sm:text-sm font-bold ${
                    isRtl ? 'text-right' : 'text-left'
                  }`}
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-xs font-extrabold text-gray-700 mb-2">
                  {t('admin.cms.hero.subtitle')}
                </label>
                <textarea
                  rows="3"
                  value={heroForm.subtitle}
                  onChange={(e) => setHeroForm(prev => ({ ...prev, subtitle: e.target.value }))}
                  className={`block w-full py-3.5 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-xs sm:text-sm font-bold ${
                    isRtl ? 'text-right' : 'text-left'
                  }`}
                />
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-gray-700 mb-2">
                    {t('admin.cms.hero.cta')}
                  </label>
                  <input
                    type="text"
                    value={heroForm.cta}
                    onChange={(e) => setHeroForm(prev => ({ ...prev, cta: e.target.value }))}
                    className={`block w-full py-3.5 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-xs sm:text-sm font-bold ${
                      isRtl ? 'text-right' : 'text-left'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-gray-700 mb-2">
                    {t('admin.cms.hero.learnMore')}
                  </label>
                  <input
                    type="text"
                    value={heroForm.learnMore}
                    onChange={(e) => setHeroForm(prev => ({ ...prev, learnMore: e.target.value }))}
                    className={`block w-full py-3.5 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-xs sm:text-sm font-bold ${
                      isRtl ? 'text-right' : 'text-left'
                    }`}
                  />
                </div>
              </div>

              {/* CTA save */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end">
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-light text-white font-extrabold px-6 py-3.5 rounded-2xl text-xs cursor-pointer shadow-md hover:shadow-lg flex items-center gap-2 hover:-translate-y-0.5 transition-all"
                >
                  <Save className="h-4.5 w-4.5 text-secondary" />
                  <span>{t('admin.cms.save')}</span>
                </button>
              </div>
            </motion.form>
          )}

          {/* About us Editor */}
          {activeTab === 'about' && (
            <motion.form
              key="about"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onSubmit={handleAboutSave}
              className="space-y-6"
            >
              {/* Heading */}
              <div>
                <label className="block text-xs font-extrabold text-gray-700 mb-2">
                  {t('admin.cms.about.title')}
                </label>
                <input
                  type="text"
                  value={aboutForm.title}
                  onChange={(e) => setAboutForm(prev => ({ ...prev, title: e.target.value }))}
                  className={`block w-full py-3.5 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-xs sm:text-sm font-bold ${
                    isRtl ? 'text-right' : 'text-left'
                  }`}
                />
              </div>

              {/* Desc 1 */}
              <div>
                <label className="block text-xs font-extrabold text-gray-700 mb-2">
                  {t('admin.cms.about.desc1')}
                </label>
                <textarea
                  rows="4"
                  value={aboutForm.desc1}
                  onChange={(e) => setAboutForm(prev => ({ ...prev, desc1: e.target.value }))}
                  className={`block w-full py-3.5 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-xs sm:text-sm font-bold ${
                    isRtl ? 'text-right' : 'text-left'
                  }`}
                />
              </div>

              {/* Desc 2 */}
              <div>
                <label className="block text-xs font-extrabold text-gray-700 mb-2">
                  {t('admin.cms.about.desc2')}
                </label>
                <textarea
                  rows="4"
                  value={aboutForm.desc2}
                  onChange={(e) => setAboutForm(prev => ({ ...prev, desc2: e.target.value }))}
                  className={`block w-full py-3.5 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-xs sm:text-sm font-bold ${
                    isRtl ? 'text-right' : 'text-left'
                  }`}
                />
              </div>

              {/* CTA save */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end">
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-light text-white font-extrabold px-6 py-3.5 rounded-2xl text-xs cursor-pointer shadow-md hover:shadow-lg flex items-center gap-2 hover:-translate-y-0.5 transition-all"
                >
                  <Save className="h-4.5 w-4.5 text-secondary" />
                  <span>{t('admin.cms.save')}</span>
                </button>
              </div>
            </motion.form>
          )}

          {/* Contact Editor */}
          {activeTab === 'contact' && (
            <motion.form
              key="contact"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onSubmit={handleContactSave}
              className="space-y-6"
            >
              {/* Phone */}
              <div>
                <label className="block text-xs font-extrabold text-gray-700 mb-2">
                  {language === 'ar' ? 'رقم الهاتف / الواتساب' : 'Phone / WhatsApp'}
                </label>
                <div className="relative">
                  <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-3.5' : 'left-0 pl-3.5'} flex items-center pointer-events-none text-gray-400`}>
                    <Phone className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                    className={`block w-full py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-xs sm:text-sm font-bold ${
                      isRtl ? 'pl-4 pr-12 text-right' : 'pl-12 pr-4 text-left'
                    }`}
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-extrabold text-gray-700 mb-2">
                  {language === 'ar' ? 'العنوان الفعلي المقر' : 'Physical Address Location'}
                </label>
                <div className="relative">
                  <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-3.5' : 'left-0 pl-3.5'} flex items-center pointer-events-none text-gray-400`}>
                    <MapPin className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    value={contactForm.address}
                    onChange={(e) => setContactForm(prev => ({ ...prev, address: e.target.value }))}
                    className={`block w-full py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-xs sm:text-sm font-bold ${
                      isRtl ? 'pl-4 pr-12 text-right' : 'pl-12 pr-4 text-left'
                    }`}
                  />
                </div>
              </div>

              {/* CTA save */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end">
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-light text-white font-extrabold px-6 py-3.5 rounded-2xl text-xs cursor-pointer shadow-md hover:shadow-lg flex items-center gap-2 hover:-translate-y-0.5 transition-all"
                >
                  <Save className="h-4.5 w-4.5 text-secondary" />
                  <span>{t('admin.cms.save')}</span>
                </button>
              </div>
            </motion.form>
          )}

        </AnimatePresence>
      </div>

    </motion.div>
  );
}
