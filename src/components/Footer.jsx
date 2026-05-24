import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCMS } from '../context/CMSContext';
import { Trophy, Phone, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  const { language, t, isRtl } = useLanguage();
  const { getContent } = useCMS();

  const scrollToSection = (id) => {
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

  const quickLinks = [
    { id: 'hero', label: t('nav.home') },
    { id: 'programs', label: t('nav.programs') },
    { id: 'facilities', label: t('nav.facilities') },
    { id: 'about', label: t('nav.about') },
    { id: 'contact', label: t('nav.contact') }
  ];

  return (
    <footer className="bg-primary-dark text-white border-t border-white/5 pt-16 pb-8 z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          
          {/* Logo & Description */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
              <div className="bg-primary text-secondary p-2.5 rounded-2xl flex items-center justify-center shadow-lg">
                <Trophy className="h-6 w-6" />
              </div>
              <span className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight flex flex-col leading-none">
                <span>{language === 'ar' ? 'أكاديمية مهارات' : 'MAHARAT ACADEMY'}</span>
                <span className="text-[10px] text-secondary font-bold mt-1 tracking-widest uppercase">
                  {language === 'ar' ? 'لتعليم كرة القدم' : 'Football Academy'}
                </span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed max-w-sm">
              {t('footer.desc')}
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 border border-white/10 hover:border-secondary hover:bg-white/10 rounded-2xl text-gray-300 hover:text-secondary transition-all cursor-pointer"
                aria-label="Instagram Link"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 border border-white/10 hover:border-secondary hover:bg-white/10 rounded-2xl text-gray-300 hover:text-secondary transition-all cursor-pointer"
                aria-label="X / Twitter Link"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display font-extrabold text-sm text-secondary uppercase tracking-wider">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-xs sm:text-sm text-gray-300 hover:text-white font-bold cursor-pointer transition-colors text-start"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-display font-extrabold text-sm text-secondary uppercase tracking-wider">
              {t('footer.contactInfo')}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <a
                    href={`tel:${getContent('contact.phone').replace(/\s+/g, '')}`}
                    className="text-xs sm:text-sm text-gray-300 hover:text-white font-extrabold transition-colors"
                  >
                    {getContent('contact.phone')}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-gray-300 font-semibold leading-relaxed">
                  {getContent('contact.address')}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs sm:text-sm text-gray-300 font-extrabold">{t('footer.hours.title')}</div>
                  <div className="text-[11px] text-gray-400 font-bold mt-1">
                    {t('footer.hours.days')} | {t('footer.hours.time')}
                  </div>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Copyright */}
        <div className="pt-8 text-center md:flex md:items-center md:justify-between text-xs font-semibold text-gray-400">
          <p>{t('footer.rights')}</p>
          <p className="mt-4 md:mt-0 font-bold">
            {language === 'ar' ? 'صمم بكل حب ⚽' : 'Designed with love ⚽'}
          </p>
        </div>

      </div>
    </footer>
  );
}
