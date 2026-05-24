import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCMS } from '../context/CMSContext';
import { motion } from 'framer-motion';
import { Calendar, Users, Shield, Award, ArrowRight, ArrowLeft, Trophy } from 'lucide-react';

export default function Hero() {
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

  const statIcons = [
    <Users className="h-6 w-6 text-secondary" />,
    <Award className="h-6 w-6 text-secondary" />,
    <Shield className="h-6 w-6 text-secondary" />
  ];

  // Helper to dynamically highlight champion text blocks in gold gradients
  const renderStyledTitle = (titleText) => {
    const highlights = ["Future Legends", "أساطير الغد"];
    for (const term of highlights) {
      if (titleText.includes(term)) {
        const parts = titleText.split(term);
        return (
          <>
            {parts[0]}
            <span className="gold-gradient-text">{term}</span>
            {parts[1]}
          </>
        );
      }
    }
    return titleText;
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen pt-32 pb-16 flex items-center bg-primary-dark overflow-hidden"
    >
      {/* Background Graphic Patterns */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Deep Green/Teal Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-dark via-primary to-primary-dark/85 opacity-95"></div>
        {/* Subtle decorative grid lines mimicking a tactical football layout */}
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        {/* Glowing light beam representing stadium floodlights */}
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-accent/20 rounded-full blur-[140px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 text-center lg:text-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full bg-white/10 text-secondary-light text-xs sm:text-sm font-bold mb-6 border border-white/5 backdrop-blur-md"
            >
              <Calendar className="h-4 w-4 text-secondary-light" />
              <span>{getContent('hero.badge')}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white leading-tight tracking-tight"
            >
              {renderStyledTitle(getContent('hero.title'))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg lg:text-xl text-gray-200/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium"
            >
              {getContent('hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={() => scrollToSection('register')}
                className="bg-secondary hover:bg-secondary-light text-primary-dark font-extrabold px-8 py-4 rounded-2xl shadow-lg hover:shadow-secondary/25 hover:-translate-y-0.5 transition-all text-base cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>{getContent('hero.cta')}</span>
                {isRtl ? (
                  <ArrowLeft className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                )}
              </button>
              <button
                onClick={() => scrollToSection('programs')}
                className="bg-white/10 hover:bg-white/15 text-white border border-white/10 hover:border-white/20 font-bold px-8 py-4 rounded-2xl transition-all text-base cursor-pointer"
              >
                {getContent('hero.learnMore')}
              </button>
            </motion.div>
          </div>

          {/* Graphical Crest Center */}
          <div className="lg:col-span-5 flex justify-center relative mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
            >
              {/* Ambient radial lighting shadows */}
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary to-accent rounded-full opacity-[0.12] animate-pulse blur-2xl"></div>
              <div className="absolute inset-4 border border-dashed border-white/15 rounded-full animate-[spin_50s_linear_infinite]"></div>
              <div className="absolute inset-10 border border-dashed border-secondary/25 rounded-full animate-[spin_25s_linear_infinite_reverse]"></div>
              
              {/* Premium Core Crest */}
              <div className="absolute inset-16 bg-primary-dark border border-white/10 rounded-full flex flex-col items-center justify-center shadow-2xl">
                <div className="bg-primary/40 border border-white/5 p-5 rounded-3xl mb-3">
                  <Trophy className="h-16 w-16 text-secondary animate-[bounce_4s_infinite]" />
                </div>
                <span className="font-display font-extrabold text-white text-lg sm:text-xl tracking-widest uppercase">
                  {language === 'ar' ? 'مهارات' : 'MAHARAT'}
                </span>
                <span className="text-[9px] text-accent font-bold tracking-widest uppercase mt-1">
                  EST. 2026
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Section Overlay */}
        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['players', 'coaches', 'sessions'].map((key, index) => {
              const stat = t(`hero.stats.${key}`);
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center gap-5 hover:bg-white/10 transition-all shadow-lg backdrop-blur-md"
                >
                  <div className="bg-primary/50 border border-white/5 p-4 rounded-2xl flex items-center justify-center">
                    {statIcons[index]}
                  </div>
                  <div>
                    <div className="text-3xl font-display font-extrabold text-white tracking-tight">{stat.value}</div>
                    <div className="text-sm font-semibold text-gray-300 mt-1">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
