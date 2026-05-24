import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useDatabase } from '../../context/DatabaseContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, Calendar, Phone, Users, ShieldCheck, Mail, Plus, X, Edit2, Trash2, Sparkles, Save
} from 'lucide-react';

export default function Coaches() {
  const { t, language, isRtl } = useLanguage();
  const { coaches, addCoach, updateCoach, deleteCoach } = useDatabase();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [activeCoachId, setActiveCoachId] = useState(null);

  // Form local state
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    groups: '',
    slots: []
  });

  const [toast, setToast] = useState('');

  // Available training timeslots to choose from inside the form check-grid
  const availableSlots = [
    'Sun / Tue 4:00 PM',
    'Sun / Tue 6:30 PM',
    'Mon / Wed 4:30 PM',
    'Thu 4:00 PM',
    'Sat 9:00 AM'
  ];

  // Toast clear
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const openAddModal = () => {
    setModalMode('add');
    setFormData({
      name: '',
      role: '',
      email: '',
      phone: '',
      groups: '',
      slots: []
    });
    setIsModalOpen(true);
  };

  const openEditModal = (coach) => {
    setModalMode('edit');
    setActiveCoachId(coach.id);
    setFormData({
      name: coach.name,
      role: coach.role,
      email: coach.email,
      phone: coach.phone,
      groups: coach.groups,
      slots: coach.slots || []
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Timeslot checkbox toggle
  const handleSlotToggle = (slot) => {
    setFormData(prev => {
      const isSelected = prev.slots.includes(slot);
      const updatedSlots = isSelected
        ? prev.slots.filter(s => s !== slot)
        : [...prev.slots, slot];
      return { ...prev, slots: updatedSlots };
    });
  };

  const handleSaveCoach = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.role.trim() || !formData.phone.trim()) return;

    if (modalMode === 'add') {
      addCoach(formData);
      setToast(language === 'ar' ? 'تم إضافة المدرب بنجاح!' : 'Coach registered successfully!');
    } else {
      updateCoach(activeCoachId, formData);
      setToast(language === 'ar' ? 'تم تحديث بيانات المدرب بنجاح!' : 'Coach details updated successfully!');
    }
    setIsModalOpen(false);
  };

  const handleDeleteCoach = (id, isDirector) => {
    if (isDirector) {
      alert(language === 'ar' ? 'لا يمكن حذف المدير الفني للأكاديمية!' : 'Cannot delete the Head Technical Director!');
      return;
    }
    if (window.confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذا المدرب؟ سيتم إلغاء تعيينه من جميع لاعبيه تلقائياً.' : 'Are you sure you want to delete this coach? Affected players will be unassigned automatically.')) {
      deleteCoach(id);
      setToast(language === 'ar' ? 'تم حذف سجل المدرب بنجاح!' : 'Coach record deleted successfully!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 relative"
    >
      {/* Dynamic Toast Alerts */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-4 bg-primary-dark text-white rounded-2xl shadow-2xl border border-white/5 flex items-center gap-3 text-xs font-bold"
          >
            <Sparkles className="h-5 w-5 text-secondary animate-[spin_4s_linear_infinite]" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-start">
        <div>
          <h2 className="text-xl sm:text-2xl font-display font-extrabold text-charcoal">
            {t('admin.coaches.title')}
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-gray-400 mt-1">
            {t('admin.coaches.subtitle')}
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-primary hover:bg-primary-light text-white font-extrabold px-6 py-3.5 rounded-2xl text-xs sm:text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <Plus className="h-4.5 w-4.5 text-secondary-light" />
          <span>{t('admin.coaches.addCoach')}</span>
        </button>
      </div>

      {/* Roster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coaches.map((coach) => (
          <motion.div
            key={coach.id}
            whileHover={{ y: -5 }}
            className={`bg-white rounded-3xl p-6 border shadow-sm flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
              coach.isDirector 
                ? 'border-secondary shadow-md' 
                : 'border-gray-200/80 shadow-sm'
            }`}
          >
            {/* Director label tag */}
            {coach.isDirector ? (
              <div className="absolute top-0 right-0 bg-secondary text-primary-dark text-[9px] font-extrabold px-3 py-1.5 rounded-bl-xl uppercase tracking-wider">
                {language === 'ar' ? 'المدير الفني' : 'Director'}
              </div>
            ) : (
              <div className="absolute top-3 end-3 flex items-center gap-1.5">
                <button
                  onClick={() => openEditModal(coach)}
                  className="p-1.5 bg-gray-50 border border-gray-100 hover:border-primary text-gray-600 hover:text-primary rounded-lg transition-all cursor-pointer"
                  aria-label="Edit Coach"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteCoach(coach.id, coach.isDirector)}
                  className="p-1.5 bg-red-50/50 border border-red-100/50 hover:bg-red-50 text-red-600 rounded-lg transition-all cursor-pointer"
                  aria-label="Delete Coach"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            <div>
              {/* Badge Icon */}
              <div className={`p-3 rounded-2xl w-fit mb-5 ${
                coach.isDirector ? 'bg-secondary/10 text-secondary-dark' : 'bg-primary/5 text-primary'
              }`}>
                <Award className="h-6 w-6" />
              </div>

              {/* Title Info */}
              <div className="text-start">
                <h3 className="text-lg font-display font-extrabold text-charcoal flex items-center gap-1.5 leading-snug">
                  <span>{coach.name}</span>
                  {coach.isDirector && <ShieldCheck className="h-4.5 w-4.5 text-emerald-600 shrink-0" />}
                </h3>
                <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider mt-0.5 block">
                  {coach.role}
                </span>
              </div>

              {/* Contact parameters */}
              <ul className="mt-6 space-y-3 border-y border-gray-100 py-4 text-xs font-semibold text-gray-500 text-start">
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4.5 w-4.5 text-primary shrink-0" />
                  <span>{coach.phone}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4.5 w-4.5 text-primary shrink-0" />
                  <span>{coach.email}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Users className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
                  <span>{coach.groups}</span>
                </li>
              </ul>
            </div>

            {/* Time schedules */}
            <div className="mt-6 text-start">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 mb-2">
                <Calendar className="h-4 w-4" />
                <span>{t('admin.coaches.slots')}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {coach.slots && coach.slots.length > 0 ? (
                  coach.slots.map((slot, idx) => (
                    <span 
                      key={idx}
                      className="bg-primary/5 border border-primary/5 text-primary px-2.5 py-1 rounded-xl text-[10px] font-bold"
                    >
                      {slot}
                    </span>
                  ))
                ) : (
                  <span className="text-xs font-bold text-gray-400 italic">
                    {t('admin.coaches.noSlots')}
                  </span>
                )}
              </div>
            </div>

          </motion.div>
        ))}
      </div>

      {/* Add/Edit Coach Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
            <div className="fixed inset-0" onClick={() => setIsModalOpen(false)}></div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-gray-100 relative z-10 overflow-y-auto max-h-[90vh]"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                <h3 className="text-lg font-display font-extrabold text-charcoal">
                  {modalMode === 'add' ? t('admin.coaches.addCoach') : (language === 'ar' ? 'تعديل بيانات المدرب' : 'Edit Coach Profile')}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSaveCoach} className="space-y-5 text-start">
                {/* Full name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    {language === 'ar' ? 'اسم المدرب الكامل' : 'Coach Full Name'}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`block w-full py-3.5 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-xs sm:text-sm font-bold ${
                      isRtl ? 'text-right' : 'text-left'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Role */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">
                      {language === 'ar' ? 'المسمى الوظيفي' : 'Job Title'}
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Junior Coach"
                      className={`block w-full py-3.5 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-xs sm:text-sm font-bold ${
                        isRtl ? 'text-right' : 'text-left'
                      }`}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">
                      {t('admin.coaches.phone')}
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. +966 5X XXX XXXX"
                      className={`block w-full py-3.5 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-xs sm:text-sm font-bold ${
                        isRtl ? 'text-right' : 'text-left'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">
                      {t('admin.settings.adminEmail')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. coach@maharat.com"
                      className={`block w-full py-3.5 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-xs sm:text-sm font-bold ${
                        isRtl ? 'text-right' : 'text-left'
                      }`}
                    />
                  </div>

                  {/* Groups description */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">
                      {t('admin.coaches.group')}
                    </label>
                    <input
                      type="text"
                      name="groups"
                      value={formData.groups}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Foundation (Ages 4-7)"
                      className={`block w-full py-3.5 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-xs sm:text-sm font-bold ${
                        isRtl ? 'text-right' : 'text-left'
                      }`}
                    />
                  </div>
                </div>

                {/* Timeslots checkbox grid builder */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-3.5">
                    {language === 'ar' ? 'تحديد مواعيد الحصص الأسبوعية' : 'Build Weekly Training Schedules'}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-4.5 bg-gray-50 rounded-2xl border border-gray-100">
                    {availableSlots.map((slot) => {
                      const checked = formData.slots.includes(slot);
                      return (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => handleSlotToggle(slot)}
                          className={`py-3 px-4 rounded-xl text-[10px] sm:text-xs font-bold border text-start flex items-center justify-between cursor-pointer transition-all ${
                            checked
                              ? 'bg-primary border-primary text-white shadow-xs'
                              : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <span>{slot}</span>
                          {checked && <Check className="h-4 w-4 text-secondary-light shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Modal CTAs */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-3 border border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50 rounded-2xl font-bold text-xs cursor-pointer"
                  >
                    {t('admin.subscriptions.form.cancel')}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-primary hover:bg-primary-light text-white rounded-2xl font-extrabold text-xs cursor-pointer shadow-md flex items-center gap-1.5"
                  >
                    <Save className="h-4 w-4 text-secondary-light" />
                    <span>{t('admin.subscriptions.form.save')}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
