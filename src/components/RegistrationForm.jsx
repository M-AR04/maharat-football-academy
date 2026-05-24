import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useDatabase } from '../context/DatabaseContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Phone, User, Check, Send } from 'lucide-react';

export default function RegistrationForm({ selectedSkill }) {
  const { language, t, isRtl } = useLanguage();
  const { addPlayer } = useDatabase();
  const [formData, setFormData] = useState({
    studentName: '',
    age: '',
    phone: '',
    skillLevel: 'beginner'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync selected skill from program cards
  useEffect(() => {
    if (selectedSkill) {
      setFormData(prev => ({ ...prev, skillLevel: selectedSkill }));
    }
  }, [selectedSkill]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.studentName.trim()) {
      newErrors.studentName = language === 'ar' ? 'اسم الطالب مطلوب' : 'Student name is required';
    }
    if (!formData.age.trim()) {
      newErrors.age = language === 'ar' ? 'العمر مطلوب' : 'Age is required';
    } else {
      const ageNum = parseInt(formData.age);
      if (isNaN(ageNum) || ageNum < 4 || ageNum > 18) {
        newErrors.age = language === 'ar' ? 'يجب أن يكون العمر بين 4 و 18 سنة' : 'Age must be between 4 and 18';
      }
    }
    if (!formData.phone.trim()) {
      newErrors.phone = language === 'ar' ? 'رقم الجوال مطلوب' : 'Phone number is required';
    } else if (!/^05\d{8}$/.test(formData.phone.trim()) && !/^\+9665\d{8}$/.test(formData.phone.trim())) {
      newErrors.phone = language === 'ar' ? 'صيغة الجوال غير صحيحة (مثال: 0507398888)' : 'Invalid Saudi phone format (e.g. 0507398888)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Map public skill options to internal database program structure
    const programMap = { beginner: 'foundation', intermediate: 'intermediate', advanced: 'advanced' };
    const priceMap = { beginner: '450', intermediate: '500', advanced: '600' };

    const newTrainee = {
      name: formData.studentName,
      age: formData.age,
      program: programMap[formData.skillLevel],
      coachId: '1', // default assign to Abu Rayan for evaluation
      duration: '1', // 1 month default trial
      price: priceMap[formData.skillLevel],
      phone: formData.phone,
      status: 'pending' // starts as pending verification
    };

    // Simulate database transaction latency
    setTimeout(() => {
      addPlayer(newTrainee);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleWhatsAppRedirect = () => {
    const coachNumber = '966507398888';
    const skillLabel = formData.skillLevel === 'beginner' 
      ? t('registration.form.skillBeginner') 
      : formData.skillLevel === 'intermediate' 
        ? t('registration.form.skillIntermediate') 
        : t('registration.form.skillAdvanced');

    const textAr = `السلام عليكم كابتن أبو ريان، أرغب في تسجيل طفلي في أكاديمية مهارات لكرة القدم!
• اسم الطالب: ${formData.studentName}
• العمر: ${formData.age} سنة
• رقم جوال ولي الأمر: ${formData.phone}
• مستوى المهارة: ${skillLabel}

أرجو التواصل لتنسيق موعد الحصة التجريبية المجانية. شكراً لكم!`;

    const textEn = `Hello Coach Abu Rayan, I would like to register my child for Maharat Football Academy!
• Student Name: ${formData.studentName}
• Age: ${formData.age} years old
• Parent Phone: ${formData.phone}
• Skill Level: ${skillLabel}

Please contact me to schedule the free try-out session. Thank you!`;

    const message = language === 'ar' ? textAr : textEn;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${coachNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <section id="register" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Promotional Box */}
          <div className="lg:col-span-5 space-y-6">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-bold text-sm tracking-widest uppercase bg-primary/5 px-4.5 py-1.5 rounded-full animate-pulse"
            >
              {t('registration.badge')}
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-display font-extrabold text-charcoal leading-snug"
            >
              {t('registration.title')}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base text-gray-500 font-semibold leading-relaxed"
            >
              {t('registration.subtitle')}
            </motion.p>

            {/* Checklist highlights */}
            <ul className="space-y-4 pt-4">
              {[
                language === 'ar' ? 'حصة تجريبية مجانية تماماً وبدون أي التزامات' : '100% Free evaluation session with no obligations',
                language === 'ar' ? 'إشراف وتدريب مباشر من الكابتن القدير أبو ريان' : 'Direct coaching & supervision by Coach Abu Rayan',
                language === 'ar' ? 'أرضيات ملاعب ممتازة عشبية صناعية بمواصفات الفيفا' : 'FIFA standard artificial turf pitches'
              ].map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: isRtl ? 15 : -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="p-1 bg-emerald-100 text-emerald-800 rounded-lg mt-0.5 flex items-center justify-center shrink-0">
                    <Check className="h-4 w-4 font-bold" />
                  </div>
                  <span className="text-sm font-bold text-gray-600 leading-normal">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Registration Form Box */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-100"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name */}
                <div>
                  <label htmlFor="studentName" className="block text-sm font-extrabold text-gray-700 mb-2">
                    {t('registration.form.studentName')}
                  </label>
                  <div className="relative">
                    <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none text-gray-400`}>
                      <User className="h-5 w-5" />
                    </div>
                    <input
                      type="text"
                      name="studentName"
                      id="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      placeholder={t('registration.form.studentNamePlaceholder')}
                      className={`block w-full py-4 bg-gray-50 border ${
                        errors.studentName 
                          ? 'border-red-400 focus:ring-red-400' 
                          : 'border-gray-200 focus:ring-primary focus:border-primary'
                      } rounded-2xl focus:outline-none focus:ring-2 focus:bg-white text-sm font-bold ${
                        isRtl ? 'pl-4 pr-12 text-right' : 'pl-12 pr-4 text-left'
                      }`}
                    />
                  </div>
                  {errors.studentName && (
                    <p className="text-xs text-red-500 mt-2 font-bold">{errors.studentName}</p>
                  )}
                </div>

                {/* Age */}
                <div>
                  <label htmlFor="age" className="block text-sm font-extrabold text-gray-700 mb-2">
                    {t('registration.form.age')}
                  </label>
                  <div className="relative">
                    <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none text-gray-400`}>
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <input
                      type="text"
                      name="age"
                      id="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder={t('registration.form.agePlaceholder')}
                      className={`block w-full py-4 bg-gray-50 border ${
                        errors.age 
                          ? 'border-red-400 focus:ring-red-400' 
                          : 'border-gray-200 focus:ring-primary focus:border-primary'
                      } rounded-2xl focus:outline-none focus:ring-2 focus:bg-white text-sm font-bold ${
                        isRtl ? 'pl-4 pr-12 text-right' : 'pl-12 pr-4 text-left'
                      }`}
                    />
                  </div>
                  {errors.age && (
                    <p className="text-xs text-red-500 mt-2 font-bold">{errors.age}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-extrabold text-gray-700 mb-2">
                    {t('registration.form.parentPhone')}
                  </label>
                  <div className="relative">
                    <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none text-gray-400`}>
                      <Phone className="h-5 w-5" />
                    </div>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t('registration.form.parentPhonePlaceholder')}
                      className={`block w-full py-4 bg-gray-50 border ${
                        errors.phone 
                          ? 'border-red-400 focus:ring-red-400' 
                          : 'border-gray-200 focus:ring-primary focus:border-primary'
                      } rounded-2xl focus:outline-none focus:ring-2 focus:bg-white text-sm font-bold ${
                        isRtl ? 'pl-4 pr-12 text-right' : 'pl-12 pr-4 text-left'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-red-500 mt-2 font-bold">{errors.phone}</p>
                  )}
                </div>

                {/* Skill Level */}
                <div>
                  <label className="block text-sm font-extrabold text-gray-700 mb-2">
                    {t('registration.form.skillLevel')}
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'beginner', label: t('registration.form.skillBeginner') },
                      { value: 'intermediate', label: t('registration.form.skillIntermediate') },
                      { value: 'advanced', label: t('registration.form.skillAdvanced') }
                    ].map((lvl) => (
                      <button
                        type="button"
                        key={lvl.value}
                        onClick={() => setFormData(prev => ({ ...prev, skillLevel: lvl.value }))}
                        className={`py-3.5 px-2 rounded-2xl text-xs font-bold text-center border cursor-pointer transition-all ${
                          formData.skillLevel === lvl.value
                            ? 'bg-primary border-primary text-white shadow-md shadow-primary/10'
                            : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300'
                        }`}
                      >
                        {lvl.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary-light text-white font-extrabold py-4.5 rounded-2xl shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all text-base cursor-pointer disabled:bg-primary/70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Send className="h-5 w-5" />
                  <span>{isSubmitting ? t('registration.form.submitting') : t('registration.form.submit')}</span>
                </button>
              </form>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Success Modal Overlay */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-gray-100 text-center relative overflow-hidden"
            >
              {/* Decorative glows */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/15 rounded-full blur-2xl pointer-events-none"></div>
              
              {/* Success Badge */}
              <div className="bg-emerald-100 text-emerald-800 p-4.5 rounded-full w-fit mx-auto mb-6 flex items-center justify-center">
                <Check className="h-10 w-10 font-bold" />
              </div>

              <h3 className="text-2xl font-display font-extrabold text-charcoal leading-tight">
                {t('registration.success.title')}
              </h3>
              
              <p className="text-sm font-semibold text-gray-500 mt-4 leading-relaxed">
                {t('registration.success.desc')}
              </p>
              <p className="text-xs font-bold text-gray-400 mt-2 leading-relaxed">
                {t('registration.success.subDesc')}
              </p>

              {/* High conversion WhatsApp CTA button */}
              <div className="mt-8 flex flex-col gap-3">
                <button
                  onClick={handleWhatsAppRedirect}
                  className="bg-[#25D366] hover:bg-[#20ba56] text-white font-extrabold py-4 px-6 rounded-2xl shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5 transition-all text-base cursor-pointer flex items-center justify-center gap-2.5"
                >
                  <Phone className="h-5 w-5 fill-current" />
                  <span>{t('registration.success.whatsappCTA')}</span>
                </button>
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setFormData({ studentName: '', age: '', phone: '', skillLevel: 'beginner' });
                  }}
                  className="text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors py-2 cursor-pointer"
                >
                  {language === 'ar' ? 'إغلاق نافذة التأكيد' : 'Close confirmation'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
