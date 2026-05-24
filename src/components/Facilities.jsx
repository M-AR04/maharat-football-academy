import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Shield, Eye, Settings, Compass } from 'lucide-react';

export default function Facilities() {
  const { t } = useLanguage();

  const facilities = [
    {
      key: 'turf',
      icon: <Compass className="h-6 w-6 text-primary" />,
      title: t('facilities.turf.title'),
      desc: t('facilities.turf.desc')
    },
    {
      key: 'safety',
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: t('facilities.safety.title'),
      desc: t('facilities.safety.desc')
    },
    {
      key: 'viewing',
      icon: <Eye className="h-6 w-6 text-primary" />,
      title: t('facilities.viewing.title'),
      desc: t('facilities.viewing.desc')
    },
    {
      key: 'equipment',
      icon: <Settings className="h-6 w-6 text-primary" />,
      title: t('facilities.equipment.title'),
      desc: t('facilities.equipment.desc')
    }
  ];

  return (
    <section id="facilities" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold text-sm tracking-widest uppercase bg-primary/5 px-4.5 py-1.5 rounded-full"
          >
            {t('facilities.badge')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-display font-extrabold text-charcoal mt-4"
          >
            {t('facilities.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-gray-500 mt-4 leading-relaxed font-medium"
          >
            {t('facilities.subtitle')}
          </motion.p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-gray-50 hover:bg-white rounded-3xl p-7 border border-gray-100 hover:border-secondary hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="p-3 bg-primary/5 rounded-2xl w-fit text-primary mb-6">
                  {facility.icon}
                </div>
                <h3 className="text-lg font-display font-extrabold text-charcoal mb-3 leading-snug">
                  {facility.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-medium">
                  {facility.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
