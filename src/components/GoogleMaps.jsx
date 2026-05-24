import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Navigation } from 'lucide-react';

export default function GoogleMaps() {
  const { t, language } = useLanguage();

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Location Details Card */}
          <div className="lg:col-span-4 space-y-6">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-bold text-sm tracking-widest uppercase bg-primary/5 px-4.5 py-1.5 rounded-full"
            >
              {language === 'ar' ? 'موقعنا الجغرافي' : 'Our Location'}
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-display font-extrabold text-charcoal leading-snug"
            >
              {language === 'ar' ? 'ملاعب الجوكر، حي الشفا' : 'Al-Joker Fields, Ash Shafa'}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base text-gray-500 font-semibold leading-relaxed"
            >
              {t('footer.address')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="pt-4 flex"
            >
              <a
                href="https://maps.google.com/?q=Al-Joker+Fields+Ash+Shafa+Riyadh"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary-light text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Navigation className="h-4 w-4 fill-current" />
                <span>{language === 'ar' ? 'افتح في خرائط جوجل' : 'Open in Google Maps'}</span>
              </a>
            </motion.div>
          </div>

          {/* Embedded Iframe Container */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full h-[400px] rounded-3xl overflow-hidden shadow-xl border border-gray-100 relative bg-gray-50"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3628.790757271424!2d46.7029583150033!3d24.561937984196165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f096288b14e3b%3A0x8ad2691fa04be2f6!2z2YXYhNin2LnYqCDYp9mE2KzZiNmD2LEgKCDYp9mE2LTZg9mGICk!5e0!3m2!1sar!2ssa!4v1653386297312!5m2!1sar!2ssa"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Al-Joker Fields Riyadh Map"
                className="absolute inset-0"
              ></iframe>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
