import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCMS } from '../context/CMSContext';
import { motion } from 'framer-motion';
import { Star, Award } from 'lucide-react';

export default function AboutUs() {
  const { language, t } = useLanguage();
  const { getContent } = useCMS();

  return (
    <section id="about" className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Visual Elements Stack */}
          <div className="lg:col-span-5 relative flex justify-center order-last lg:order-first">
            {/* Background design elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative bg-primary-dark text-white rounded-3xl p-8 shadow-xl max-w-sm border border-white/5"
            >
              {/* Green Glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/20 rounded-full blur-xl pointer-events-none"></div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/10 rounded-2xl text-secondary">
                  <Award className="h-8 w-8" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-base sm:text-lg text-white">
                    {t('about.leadCoach')}
                  </h4>
                  <div className="flex gap-1 mt-1 text-secondary">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-sm leading-relaxed text-gray-200/90 font-medium">
                {language === 'ar' 
                  ? 'برامج تدريبية متكاملة تحت قيادة الكابتن أبو ريان، لبناء جيل يعشق التحدي ويتقن المهارة الفنية والالتزام الأخلاقي.'
                  : 'Complete training programs under the guidance of Coach Abu Rayan, building a generation that loves challenge and masters technical skill.'}
              </p>

              {/* Vision 2030 Badge */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4">
                <div className="bg-white/10 px-3.5 py-2.5 rounded-2xl flex flex-col items-center justify-center border border-white/5 shrink-0">
                  <span className="text-[10px] font-extrabold text-accent leading-none tracking-widest uppercase">VISION رؤية</span>
                  <span className="text-lg font-display font-extrabold text-white mt-1.5 leading-none">2030</span>
                </div>
                <div>
                  <h5 className="font-display font-extrabold text-sm text-white">
                    {t('about.visionTitle')}
                  </h5>
                  <p className="text-[11px] text-gray-300 font-medium mt-1 leading-relaxed">
                    {t('about.visionDesc')}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Description Content */}
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-bold text-sm tracking-widest uppercase bg-primary/5 px-4.5 py-1.5 rounded-full"
            >
              {t('about.badge')}
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-display font-extrabold text-charcoal mt-4 leading-snug"
            >
              {getContent('about.title')}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6 space-y-4 text-base text-gray-500 leading-relaxed font-medium"
            >
              <p>{getContent('about.desc1')}</p>
              <p>{getContent('about.desc2')}</p>
            </motion.div>

            {/* Micro Details Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100/50"
              >
                <h4 className="font-display font-extrabold text-primary text-base">
                  {language === 'ar' ? 'الانضباط والروح الرياضية' : 'Discipline & Sportsmanship'}
                </h4>
                <p className="text-xs text-gray-400 mt-1.5 leading-relaxed font-medium">
                  {language === 'ar' 
                    ? 'نصقل شخصية اللاعب بالانضباط والتركيز الذهني والروح الرياضية العالية للارتقاء بسلوكه.' 
                    : 'Nurturing player intelligence, discipline, and high sportsmanship to elevate on-pitch behavior.'}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100/50"
              >
                <h4 className="font-display font-extrabold text-primary text-base">
                  {language === 'ar' ? 'رؤية مستقبلية محترفة' : 'Future Pro Path'}
                </h4>
                <p className="text-xs text-gray-400 mt-1.5 leading-relaxed font-medium">
                  {language === 'ar' 
                    ? 'تطوير جيل متمكن وقادر على الالتحاق بالأندية المحلية الرسمية والمنتخبات السعودية الوطنية.' 
                    : 'Preparing young athletes to successfully bridge into official Saudi clubs and national team setups.'}
                </p>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
