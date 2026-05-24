import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Phone } from 'lucide-react';

export default function WhatsAppButton() {
  const { t } = useLanguage();

  return (
    <a
      href="https://wa.me/966507398888"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 end-6 z-40 bg-[#25D366] hover:bg-[#20ba56] text-white p-4.5 rounded-full shadow-2xl flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 group transition-all duration-300"
      aria-label="Contact on WhatsApp"
    >
      {/* Radiant Glowing Ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping group-hover:opacity-50 pointer-events-none"></span>
      
      <Phone className="h-6 w-6 relative z-10 fill-current" />
      
      {/* Tooltip */}
      <span className="absolute bottom-16 end-0 bg-primary-dark text-white text-xs font-extrabold py-2 px-4 rounded-xl shadow-xl border border-white/5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {t('floatingWhatsApp')}
      </span>
    </a>
  );
}
