import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Trophy, ArrowRight, ArrowLeft } from 'lucide-react';

export default function Programs({ setSelectedSkill }) {
  const { t, isRtl } = useLanguage();

  const handleProgramSelect = (skillLevel) => {
    setSelectedSkill(skillLevel);
    const element = document.getElementById('register');
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

  const programs = [
    {
      id: 'foundation',
      skill: 'beginner',
      title: t('programs.foundation.title'),
      age: t('programs.foundation.age'),
      desc: t('programs.foundation.desc'),
      bgGradient: 'from-emerald-500/10 to-teal-500/10',
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 'intermediate',
      skill: 'intermediate',
      title: t('programs.intermediate.title'),
      age: t('programs.intermediate.age'),
      desc: t('programs.intermediate.desc'),
      bgGradient: 'from-amber-500/10 to-orange-500/10',
      badgeColor: 'bg-amber-100 text-amber-800',
      highlighted: true
    },
    {
      id: 'advanced',
      skill: 'advanced',
      title: t('programs.advanced.title'),
      age: t('programs.advanced.age'),
      desc: t('programs.advanced.desc'),
      bgGradient: 'from-blue-500/10 to-indigo-500/10',
      badgeColor: 'bg-blue-100 text-blue-800'
    }
  ];

  return (
    <section id="programs" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold text-sm tracking-widest uppercase bg-primary/5 px-4.5 py-1.5 rounded-full"
          >
            {t('programs.badge')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-display font-extrabold text-charcoal mt-4"
          >
            {t('programs.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-gray-500 mt-4 leading-relaxed font-medium"
          >
            {t('programs.subtitle')}
          </motion.p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className={`relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl border transition-all duration-300 ${
                program.highlighted 
                  ? 'border-secondary bg-primary-dark/5 p-[1px] md:scale-105 z-10 shadow-lg' 
                  : 'border-gray-100 bg-white'
              }`}
            >
              <div className="p-8 h-full flex flex-col justify-between rounded-[23px] bg-white">
                <div>
                  {/* Decorative soft glowing circle */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${program.bgGradient} rounded-full blur-2xl pointer-events-none`}></div>
                  
                  <div className="flex items-center justify-between mb-6 relative">
                    <span className={`px-3 py-1.5 rounded-xl text-xs font-extrabold ${program.badgeColor}`}>
                      {program.age}
                    </span>
                    <div className="p-3 bg-primary/5 rounded-2xl text-primary">
                      <Trophy className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-display font-extrabold text-charcoal mb-4 relative leading-snug">
                    {program.title}
                  </h3>
                  
                  <p className="text-sm leading-relaxed text-gray-500 relative font-medium">
                    {program.desc}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100/80">
                  <button
                    onClick={() => handleProgramSelect(program.skill)}
                    className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm cursor-pointer flex items-center justify-center gap-2 transition-all ${
                      program.highlighted
                        ? 'bg-primary hover:bg-primary-light text-white shadow-md shadow-primary/20 hover:-translate-y-0.5'
                        : 'bg-gray-50 hover:bg-gray-100 text-primary border border-gray-100'
                    }`}
                  >
                    <span>{t('programs.cta')}</span>
                    {isRtl ? (
                      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    ) : (
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
