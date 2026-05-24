import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, Globe, Trophy, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { language, toggleLanguage, t, isRtl } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: t('nav.home') },
    { id: 'programs', label: t('nav.programs') },
    { id: 'facilities', label: t('nav.facilities') },
    { id: 'about', label: t('nav.about') },
    { id: 'contact', label: t('nav.contact') }
  ];

  const scrollToSection = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-effect shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Crest */}
          <div className="flex items-center cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="flex items-center gap-3">
              <div className="bg-primary text-secondary p-2.5 rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-6 transition-transform">
                <Trophy className="h-6 w-6" />
              </div>
              <span className="font-display font-extrabold text-xl sm:text-2xl text-primary tracking-tight flex flex-col leading-none">
                <span>{language === 'ar' ? 'أكاديمية مهارات' : 'MAHARAT ACADEMY'}</span>
                <span className="text-[10px] text-secondary font-bold mt-1 tracking-widest uppercase">
                  {language === 'ar' ? 'لتعليم كرة القدم' : 'Football Academy'}
                </span>
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-charcoal/80 font-semibold hover:text-primary transition-colors cursor-pointer text-sm relative group py-2"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </div>

          {/* Actions: Lang Switch, Login & CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 hover:border-primary text-xs font-semibold hover:bg-primary/5 cursor-pointer text-gray-700 hover:text-primary transition-all duration-300"
            >
              <Globe className="h-4 w-4 text-primary" />
              <span>{language === 'ar' ? 'English' : 'العربية'}</span>
            </button>
            <Link
              to="/login"
              className="flex items-center gap-2 border border-primary/20 text-primary hover:border-primary font-bold px-4 py-2.5 rounded-xl text-sm shadow-sm hover:shadow-md hover:bg-primary/5 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <LogIn className="h-4 w-4" />
              <span>{t('nav.login')}</span>
            </Link>
            <button
              onClick={() => scrollToSection('register')}
              className="bg-primary hover:bg-primary-light text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              {t('nav.register')}
            </button>
          </div>

          {/* Mobile Menu Trigger & Lang Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center p-2 rounded-xl border border-gray-200 text-gray-700 hover:text-primary bg-white"
              aria-label="Toggle Language"
            >
              <Globe className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-primary hover:bg-primary/5 focus:outline-none bg-white border border-gray-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden glass-effect border-t border-gray-100 shadow-inner overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-start px-4 py-3 text-sm font-bold text-charcoal hover:bg-primary hover:text-white rounded-xl transition-all"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-4 border-t border-gray-200/50 flex flex-col gap-3">
                <button
                  onClick={() => scrollToSection('register')}
                  className="w-full text-center bg-primary hover:bg-primary-light text-white font-bold py-3.5 rounded-xl shadow-md"
                >
                  {t('nav.register')}
                </button>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 border border-primary/20 text-primary font-bold py-3.5 rounded-xl shadow-sm hover:bg-primary/5 transition-all"
                >
                  <LogIn className="h-5 w-5" />
                  <span>{t('nav.login')}</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
