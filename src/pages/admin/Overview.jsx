import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';
import { 
  Users, TrendingUp, AlertCircle, Calendar,
  ArrowUpRight, Trophy, Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend 
} from 'recharts';

export default function Overview() {
  const { t, language } = useLanguage();

  // Mock enrollment statistics
  const enrollmentData = [
    { name: language === 'ar' ? 'يناير' : 'Jan', players: 45 },
    { name: language === 'ar' ? 'فبراير' : 'Feb', players: 62 },
    { name: language === 'ar' ? 'مارس' : 'Mar', players: 55 },
    { name: language === 'ar' ? 'أبريل' : 'Apr', players: 80 },
    { name: language === 'ar' ? 'مايو' : 'May', players: 95 },
    { name: language === 'ar' ? 'يونيو' : 'Jun', players: 120 }
  ];

  // Expiring Trainees mock
  const urgentAlerts = [
    { name: language === 'ar' ? 'سلمان القحطاني' : 'Salman Al-Qahtani', coach: 'Coach Abu Rayan', days: 2 },
    { name: language === 'ar' ? 'ريان العتيبي' : 'Rayan Al-Otaibi', coach: 'Coach Abu Rayan', days: 4 },
    { name: language === 'ar' ? 'يوسف المطيري' : 'Youssef Al-Mutairi', coach: 'Coach Abu Rayan', days: 6 }
  ];

  // Elite staggered animations config
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header Info */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div className="text-start">
          <h2 className="text-xl sm:text-2xl font-display font-extrabold text-charcoal">
            {t('admin.overview.title')}
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-gray-400 mt-1">
            {t('admin.overview.subtitle')}
          </p>
        </div>
        <div className="bg-white px-4 py-2 rounded-2xl border border-gray-200/80 shadow-sm flex items-center gap-2 w-fit text-xs font-bold text-gray-500">
          <Calendar className="h-4.5 w-4.5 text-primary" />
          <span>May 24, 2026</span>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Active Players Card */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4 }}
          className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200/80 flex items-center justify-between cursor-default transition-shadow hover:shadow-md"
        >
          <div className="space-y-3 text-start">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
              {t('admin.overview.activePlayers')}
            </span>
            <span className="text-3xl sm:text-4xl font-display font-extrabold text-primary block leading-none">
              524
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-emerald-600 flex items-center gap-1">
              <ArrowUpRight className="h-4 w-4" />
              <span>+12% {language === 'ar' ? 'هذا الشهر' : 'this month'}</span>
            </span>
          </div>
          <div className="bg-primary/5 p-4 rounded-2xl text-primary flex items-center justify-center">
            <Users className="h-6 w-6" />
          </div>
        </motion.div>

        {/* Revenue Card */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4 }}
          className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200/80 flex items-center justify-between cursor-default transition-shadow hover:shadow-md"
        >
          <div className="space-y-3 text-start">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
              {t('admin.overview.revenue')}
            </span>
            <span className="text-3xl sm:text-4xl font-display font-extrabold text-secondary block leading-none">
              45,800 <span className="text-xs sm:text-sm font-extrabold text-gray-400">SAR</span>
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-emerald-600 flex items-center gap-1">
              <ArrowUpRight className="h-4 w-4" />
              <span>+8% {language === 'ar' ? 'مقارنة بالماضي' : 'vs last month'}</span>
            </span>
          </div>
          <div className="bg-secondary/5 p-4 rounded-2xl text-secondary flex items-center justify-center">
            <TrendingUp className="h-6 w-6" />
          </div>
        </motion.div>

        {/* Expiring Subscriptions Card */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4 }}
          className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200/80 flex items-center justify-between sm:col-span-2 lg:col-span-1 cursor-default transition-shadow hover:shadow-md"
        >
          <div className="space-y-3 text-start">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
              {t('admin.overview.expiring')}
            </span>
            <span className="text-3xl sm:text-4xl font-display font-extrabold text-red-600 block leading-none">
              14
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-gray-400 block">
              {t('admin.overview.daysSuffix')}
            </span>
          </div>
          <div className="bg-red-50 p-4 rounded-2xl text-red-500 flex items-center justify-center">
            <AlertCircle className="h-6 w-6" />
          </div>
        </motion.div>

      </div>

      {/* Main Analytics & Alerts Rows */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recharts Analytics Line Chart */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-8 bg-white rounded-3xl p-6 border border-gray-200/80 shadow-sm"
        >
          <div className="mb-6 text-start">
            <h3 className="text-base sm:text-lg font-display font-extrabold text-charcoal">
              {t('admin.overview.trendTitle')}
            </h3>
            <p className="text-xs font-semibold text-gray-400 mt-1">
              {t('admin.overview.trendSub')}
            </p>
          </div>

          <div className="h-[300px] w-full text-xs font-semibold">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={enrollmentData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#9CA3AF" tickLine={false} />
                <YAxis stroke="#9CA3AF" tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    background: '#032A20', 
                    borderRadius: '12px', 
                    color: '#fff', 
                    border: 'none',
                    fontFamily: 'sans-serif'
                  }} 
                />
                <Legend iconType="circle" />
                <Line 
                  name={language === 'ar' ? 'اللاعبين الجدد' : 'New Trainees'} 
                  type="monotone" 
                  dataKey="players" 
                  stroke="#064E3B" 
                  strokeWidth={3} 
                  activeDot={{ r: 6 }} 
                  dot={{ stroke: '#F59E0B', strokeWidth: 2, r: 4, fill: '#fff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Critical Alerts panel */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-4 bg-white rounded-3xl p-6 border border-gray-200/80 shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="mb-6 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-secondary" />
              <h3 className="text-base sm:text-lg font-display font-extrabold text-charcoal leading-none">
                {language === 'ar' ? 'إجراءات عاجلة' : 'Action Required'}
              </h3>
            </div>

            <div className="space-y-4">
              {urgentAlerts.map((alert, idx) => (
                <div 
                  key={idx} 
                  className="p-4 bg-red-50/50 hover:bg-red-50 border border-red-100/50 rounded-2xl flex items-center justify-between transition-colors cursor-pointer"
                >
                  <div className="space-y-1 text-start">
                    <div className="text-xs sm:text-sm font-extrabold text-charcoal">{alert.name}</div>
                    <div className="text-[10px] text-gray-400 font-bold">{alert.coach}</div>
                  </div>
                  <span className="text-[10px] font-extrabold bg-red-100 text-red-800 px-3 py-1.5 rounded-xl shrink-0">
                    {language === 'ar' ? `تنتهي خلال ${alert.days} يوم` : `Expires in ${alert.days}d`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-100">
            <div className="bg-primary/5 p-4.5 rounded-2xl flex items-center gap-3">
              <Trophy className="h-5 w-5 text-primary shrink-0" />
              <div className="text-start">
                <div className="text-xs font-extrabold text-primary-dark">
                  {language === 'ar' ? 'المسار التدريبي الأنشط' : 'Active Training Track'}
                </div>
                <div className="text-[10px] text-gray-400 font-bold mt-0.5">
                  {language === 'ar' ? 'أكاديمية التطوير (سن 8-12)' : 'Development Path (Ages 8-12)'}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
