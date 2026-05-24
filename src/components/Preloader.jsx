import React from 'react';
import { motion } from 'framer-motion';

export default function Preloader() {
  // SVG drawing line transitions
  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 0.35,
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  };

  const ballVariants = {
    hidden: { scale: 0, opacity: 0, y: -40 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      y: 0,
      transition: { delay: 1, duration: 0.8, type: "spring", stiffness: 120 }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 1.5, duration: 0.6 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        y: -100, 
        filter: "blur(20px)",
        transition: { duration: 0.6, ease: "easeInOut" }
      }}
      className="fixed inset-0 z-50 bg-[#032A20] flex flex-col items-center justify-center select-none overflow-hidden"
    >
      {/* Dynamic floodlight stadium glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="flex flex-col items-center gap-8 relative z-10 scale-90 sm:scale-100">
        
        {/* Glowing SVG Soccer Field Draw */}
        <div className="relative w-64 h-80 flex items-center justify-center">
          <svg 
            viewBox="0 0 200 280" 
            className="absolute w-full h-full text-white pointer-events-none"
            style={{ filter: "drop-shadow(0 0 10px rgba(245,158,11,0.15))" }}
          >
            {/* Outter boundary */}
            <motion.rect 
              x="10" y="10" width="180" height="260" rx="6" 
              fill="none" stroke="#F59E0B" strokeWidth="2"
              variants={lineVariants} initial="hidden" animate="visible"
            />
            {/* Center Line */}
            <motion.line 
              x1="10" y1="140" x2="190" y2="140" 
              stroke="#F59E0B" strokeWidth="2"
              variants={lineVariants} initial="hidden" animate="visible"
            />
            {/* Center Circle */}
            <motion.circle 
              cx="100" cy="140" r="30" 
              fill="none" stroke="#F59E0B" strokeWidth="2"
              variants={lineVariants} initial="hidden" animate="visible"
            />
            {/* Penalty Box Top */}
            <motion.rect 
              x="45" y="10" width="110" height="45" 
              fill="none" stroke="#F59E0B" strokeWidth="2"
              variants={lineVariants} initial="hidden" animate="visible"
            />
            {/* Penalty Box Bottom */}
            <motion.rect 
              x="45" y="225" width="110" height="45" 
              fill="none" stroke="#F59E0B" strokeWidth="2"
              variants={lineVariants} initial="hidden" animate="visible"
            />
          </svg>

          {/* Bouncing glowing football at center spot */}
          <motion.div 
            variants={ballVariants}
            initial="hidden"
            animate="visible"
            className="w-16 h-16 bg-gradient-to-tr from-secondary to-secondary-light rounded-full shadow-[0_0_25px_rgba(245,158,11,0.6)] flex items-center justify-center relative border border-white/20"
          >
            {/* Inner soccer geometry details */}
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-primary-dark fill-current">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
            <span className="absolute inset-0 rounded-full bg-secondary opacity-30 animate-ping"></span>
          </motion.div>
        </div>

        {/* Text Reveal Title */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-2 mt-4"
        >
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-widest leading-none flex flex-col items-center">
            <span>أكاديمية مهارات</span>
            <span className="text-secondary font-bold text-xs uppercase tracking-[0.3em] mt-2">
              MAHARAT ACADEMY
            </span>
          </h2>
          <div className="w-12 h-0.5 bg-accent/40 mx-auto rounded-full mt-4"></div>
        </motion.div>

      </div>
    </motion.div>
  );
}
