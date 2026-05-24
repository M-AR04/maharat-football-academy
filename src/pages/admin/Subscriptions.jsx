import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useDatabase } from '../../context/DatabaseContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Edit2, Trash2, X, Check, AlertCircle, Sparkles, Filter, Eye, Phone, Calendar, ArrowUpDown
} from 'lucide-react';

export default function Subscriptions() {
  const { t, language, isRtl } = useLanguage();
  const { players, coaches, addPlayer, updatePlayer, deletePlayer } = useDatabase();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'name', 'price'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [activePlayerId, setActivePlayerId] = useState(null);
  
  // Drawer local state
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // Form local state
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    coachId: '',
    program: 'foundation',
    duration: '1',
    price: '450',
    phone: '',
    status: 'paid'
  });

  const [toast, setToast] = useState('');

  // Toast clear
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Set default coach if none selected
  useEffect(() => {
    if (coaches.length > 0 && !formData.coachId) {
      setFormData(prev => ({ ...prev, coachId: coaches[0].id }));
    }
  }, [coaches, formData.coachId]);

  const openAddModal = () => {
    setModalMode('add');
    setFormData({
      name: '',
      age: '',
      coachId: coaches.length > 0 ? coaches[0].id : '',
      program: 'foundation',
      duration: '1',
      price: '450',
      phone: '',
      status: 'paid'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (player, e) => {
    e.stopPropagation(); // Avoid triggering row select drawer
    setModalMode('edit');
    setActivePlayerId(player.id);
    setFormData({
      name: player.name,
      age: player.age,
      coachId: player.coachId,
      program: player.program,
      duration: player.duration,
      price: player.price,
      phone: player.phone,
      status: player.status
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      
      // Auto tuition calculator
      if (name === 'duration' || name === 'program') {
        const baseRates = { foundation: 450, intermediate: 500, advanced: 600 };
        const pathRate = baseRates[updated.program] || 450;
        const multiplier = parseInt(updated.duration) || 1;
        
        let total = pathRate * multiplier;
        if (multiplier === 3) total = Math.round(total * 0.9);
        if (multiplier === 6) total = Math.round(total * 0.85);
        updated.price = String(total);
      }
      return updated;
    });
  };

  const handleSavePlayer = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.age.trim() || !formData.phone.trim()) return;

    if (modalMode === 'add') {
      addPlayer(formData);
      setToast(t('admin.subscriptions.successAdd'));
    } else {
      updatePlayer(activePlayerId, formData);
      setToast(t('admin.subscriptions.successEdit'));
      if (selectedPlayer && selectedPlayer.id === activePlayerId) {
        setSelectedPlayer({ id: activePlayerId, ...formData });
      }
    }
    setIsModalOpen(false);
  };

  const handleDeletePlayer = (id, e) => {
    e.stopPropagation();
    if (window.confirm(language === 'ar' ? 'هل أنت متأكد من حذف سجل هذا اللاعب نهائياً؟' : 'Are you sure you want to permanently delete this player?')) {
      deletePlayer(id);
      setToast(t('admin.subscriptions.successDelete'));
      if (selectedPlayer && selectedPlayer.id === id) {
        setSelectedPlayer(null);
      }
    }
  };

  // Searching, Filtering & Sorting logic
  const processedPlayers = players
    .filter(p => {
      const coach = coaches.find(c => c.id === p.coachId);
      const coachName = coach ? coach.name.toLowerCase() : '';
      const matchesSearch = 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.phone.includes(searchTerm) ||
        coachName.includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'price') {
        return parseInt(b.price) - parseInt(a.price);
      }
      return new Date(b.registrationDate) - new Date(a.registrationDate);
    });

  // Stagger loading animation configurations for table rows
  const tableContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
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
            {t('admin.subscriptions.title')}
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-gray-400 mt-1">
            {t('admin.subscriptions.subtitle')}
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-primary hover:bg-primary-light text-white font-extrabold px-6 py-3.5 rounded-2xl text-xs sm:text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <Plus className="h-4.5 w-4.5 text-secondary-light" />
          <span>{t('admin.subscriptions.addPlayer')}</span>
        </button>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-sm flex flex-col lg:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full lg:w-80 shrink-0">
          <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-3.5' : 'left-0 pl-3.5'} flex items-center pointer-events-none text-gray-400`}>
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            placeholder={language === 'ar' ? 'اسم اللاعب، الجوال، المدرب...' : 'Player, phone, coach...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`block w-full py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white text-xs font-semibold ${
              isRtl ? 'pl-4 pr-10 text-right' : 'pl-10 pr-4 text-left'
            }`}
          />
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Status filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-2 rounded-xl text-[11px] font-extrabold cursor-pointer border transition-all ${
                statusFilter === 'all'
                  ? 'bg-primary-dark border-primary-dark text-white'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {t('admin.subscriptions.filterStatus')}
            </button>
            <button
              onClick={() => setStatusFilter('paid')}
              className={`px-3 py-2 rounded-xl text-[11px] font-extrabold cursor-pointer border transition-all ${
                statusFilter === 'paid'
                  ? 'bg-emerald-600 border-emerald-600 text-white'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {t('admin.subscriptions.paid')}
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-3 py-2 rounded-xl text-[11px] font-extrabold cursor-pointer border transition-all ${
                statusFilter === 'pending'
                  ? 'bg-amber-600 border-amber-600 text-white'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {t('admin.subscriptions.pending')}
            </button>
          </div>

          {/* Sort selection */}
          <div className="flex items-center gap-1.5 ms-auto lg:ms-0">
            <div className="p-2 bg-gray-50 border border-gray-100 rounded-xl text-gray-400">
              <ArrowUpDown className="h-3.5 w-3.5" />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl text-[11px] font-bold border border-gray-200 text-gray-700 bg-white cursor-pointer"
            >
              <option value="newest">{language === 'ar' ? 'التسجيل الأحدث' : 'Newest First'}</option>
              <option value="name">{language === 'ar' ? 'الاسم (أبجدي)' : 'Sort by Name'}</option>
              <option value="price">{language === 'ar' ? 'الرسوم الأعلى' : 'Sort by Fee'}</option>
            </select>
          </div>
        </div>

      </div>

      {/* Main Grid Frame with Table */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className={`px-6 py-4.5 text-xs font-extrabold text-gray-400 uppercase tracking-wider ${isRtl ? 'text-right' : 'text-left'}`}>
                  {t('admin.subscriptions.cols.name')}
                </th>
                <th className={`px-6 py-4.5 text-xs font-extrabold text-gray-400 uppercase tracking-wider ${isRtl ? 'text-right' : 'text-left'}`}>
                  {t('admin.subscriptions.cols.age')}
                </th>
                <th className={`px-6 py-4.5 text-xs font-extrabold text-gray-400 uppercase tracking-wider ${isRtl ? 'text-right' : 'text-left'}`}>
                  {t('admin.subscriptions.cols.program')}
                </th>
                <th className={`px-6 py-4.5 text-xs font-extrabold text-gray-400 uppercase tracking-wider ${isRtl ? 'text-right' : 'text-left'}`}>
                  {t('admin.subscriptions.cols.coach')}
                </th>
                <th className={`px-6 py-4.5 text-xs font-extrabold text-gray-400 uppercase tracking-wider ${isRtl ? 'text-right' : 'text-left'}`}>
                  {t('admin.subscriptions.cols.price')}
                </th>
                <th className={`px-6 py-4.5 text-xs font-extrabold text-gray-400 uppercase tracking-wider ${isRtl ? 'text-right' : 'text-left'}`}>
                  {t('admin.subscriptions.cols.status')}
                </th>
                <th className={`px-6 py-4.5 text-xs font-extrabold text-gray-400 uppercase tracking-wider ${isRtl ? 'text-right' : 'text-left'}`}>
                  {t('admin.subscriptions.cols.actions')}
                </th>
              </tr>
            </thead>
            {/* Staggered load tbody */}
            <motion.tbody 
              variants={tableContainerVariants}
              initial="hidden"
              animate="visible"
              className="bg-white divide-y divide-gray-100 text-xs font-semibold text-charcoal"
            >
              {processedPlayers.length > 0 ? (
                processedPlayers.map((player) => {
                  const programName = player.program === 'foundation' 
                    ? t('programs.foundation.title') 
                    : player.program === 'intermediate' 
                      ? t('programs.intermediate.title') 
                      : t('programs.advanced.title');
                  
                  const coach = coaches.find(c => c.id === player.coachId);
                  const coachName = coach ? coach.name : (language === 'ar' ? 'غير معين' : 'Unassigned');

                  return (
                    <motion.tr 
                      key={player.id} 
                      variants={rowVariants}
                      onClick={() => setSelectedPlayer(player)}
                      className="hover:bg-gray-50/70 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap font-extrabold text-primary-dark text-start">
                        {player.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-start">
                        {player.age} {language === 'ar' ? 'سنوات' : 'yrs'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-start">
                        <span className="bg-primary/5 text-primary px-3 py-1.5 rounded-xl font-bold">
                          {programName}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-start">
                        {coachName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-extrabold text-secondary-dark text-start">
                        {player.price} SAR
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-start">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase border ${
                          player.status === 'paid'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-100'
                            : 'bg-amber-50 text-amber-800 border-amber-100'
                        }`}>
                          {player.status === 'paid' ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-600" />
                              <span>{t('admin.subscriptions.paid')}</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="h-3 w-3 text-amber-600" />
                              <span>{t('admin.subscriptions.pending')}</span>
                            </>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-start">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => openEditModal(player, e)}
                            className="p-2 bg-gray-50 border border-gray-100 text-gray-600 hover:text-primary hover:border-primary rounded-xl cursor-pointer transition-all"
                            aria-label="Edit Record"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleDeletePlayer(player.id, e)}
                            className="p-2 bg-red-50/50 border border-red-100/50 text-red-600 hover:bg-red-50 rounded-xl cursor-pointer transition-all"
                            aria-label="Delete Record"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })
              ) : (
                <motion.tr variants={rowVariants}>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-400 font-bold text-sm">
                    {language === 'ar' ? 'لا يوجد لاعبين يطابقون خيارات البحث.' : 'No active trainees match search criteria.'}
                  </td>
                </motion.tr>
              )}
            </motion.tbody>
          </table>
        </div>
      </div>

      {/* Dynamic Player Detail slide-out Drawer */}
      <AnimatePresence>
        {selectedPlayer && (
          <>
            {/* Drawer Backdrop */}
            <div 
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs" 
              onClick={() => setSelectedPlayer(null)}
            ></div>
            
            <motion.div
              initial={isRtl ? { x: '-100%' } : { x: '100%' }}
              animate={{ x: 0 }}
              exit={isRtl ? { x: '-100%' } : { x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className={`fixed top-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl p-6 flex flex-col justify-between border-y ${
                isRtl ? 'left-0 border-r border-gray-200' : 'right-0 border-l border-gray-200'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6 text-start">
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    <h3 className="font-display font-extrabold text-base text-charcoal">
                      {language === 'ar' ? 'تفاصيل اشتراك اللاعب' : 'Trainee Subscription Details'}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedPlayer(null)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Profile Overview Card */}
                <div className="bg-primary-dark text-white rounded-3xl p-5 shadow-inner relative overflow-hidden mb-6 text-start">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent/20 rounded-full blur-xl pointer-events-none"></div>
                  <span className="text-[10px] font-extrabold text-secondary uppercase tracking-widest block mb-1">
                    {selectedPlayer.program === 'foundation' 
                      ? t('programs.foundation.title') 
                      : selectedPlayer.program === 'intermediate' 
                        ? t('programs.intermediate.title') 
                        : t('programs.advanced.title')}
                  </span>
                  <h4 className="text-xl font-display font-extrabold">{selectedPlayer.name}</h4>
                  <div className="mt-4 flex items-center gap-4 text-xs font-bold text-gray-200">
                    <span>{language === 'ar' ? 'العمر:' : 'Age:'} {selectedPlayer.age}</span>
                    <span>•</span>
                    <span>{language === 'ar' ? 'الاشتراك:' : 'Plan:'} {selectedPlayer.duration} {language === 'ar' ? 'أشهر' : 'Months'}</span>
                  </div>
                </div>

                {/* Technical Coordinates (Coach timeslots) */}
                <div className="space-y-4 text-start">
                  <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {language === 'ar' ? 'التفاصيل التدريبية للمجموعة' : 'Training Coordinates'}
                  </h5>

                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-3">
                    <div>
                      <span className="text-[10px] font-extrabold text-gray-400 block uppercase">
                        {t('admin.subscriptions.form.coach')}
                      </span>
                      <span className="text-xs font-extrabold text-primary-dark mt-1 block">
                        {coaches.find(c => c.id === selectedPlayer.coachId)?.name || (language === 'ar' ? 'غير معين' : 'Unassigned')}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-extrabold text-gray-400 block uppercase">
                        {t('admin.coaches.slots')}
                      </span>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {coaches.find(c => c.id === selectedPlayer.coachId)?.slots.map((slot, i) => (
                          <span key={i} className="bg-white border border-gray-250 text-gray-600 px-2.5 py-1 rounded-lg text-[9px] font-bold shadow-xs">
                            {slot}
                          </span>
                        )) || <span className="text-xs font-bold text-gray-400 italic">{t('admin.coaches.noSlots')}</span>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Billing invoice Mock */}
                <div className="space-y-4 mt-6 text-start">
                  <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {language === 'ar' ? 'تفاصيل الفاتورة المالية' : 'Billing Invoice'}
                  </h5>

                  <div className="p-4 border border-dashed border-gray-200 rounded-2xl space-y-2.5 text-xs font-bold">
                    <div className="flex justify-between">
                      <span className="text-gray-400">{language === 'ar' ? 'رسوم الدورة الأساسية:' : 'Base Path Rate:'}</span>
                      <span className="text-gray-700">
                        {selectedPlayer.program === 'foundation' ? '450' : selectedPlayer.program === 'intermediate' ? '500' : '600'} SAR
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">{language === 'ar' ? 'المدة:' : 'Duration Multiplier:'}</span>
                      <span className="text-gray-700">x{selectedPlayer.duration}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-100 pt-2.5">
                      <span className="text-gray-700">{language === 'ar' ? 'المجموع المستحق (بعد الخصم):' : 'Total Amount Paid:'}</span>
                      <span className="text-secondary-dark font-extrabold text-sm">{selectedPlayer.price} SAR</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Drawer Action - WhatsApp Contact launcher */}
              <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                <a
                  href={`https://wa.me/966${selectedPlayer.phone.replace(/^0/, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20ba56] text-white font-extrabold py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2.5 shadow-md transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  <Phone className="h-4.5 w-4.5 fill-current" />
                  <span>{language === 'ar' ? 'تواصل مع ولي الأمر (واتساب)' : 'Chat with Parent on WhatsApp'}</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add/Edit Modal */}
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
                  {modalMode === 'add' ? t('admin.subscriptions.addPlayer') : t('admin.subscriptions.editPlayer')}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSavePlayer} className="space-y-5 text-start">
                
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    {t('admin.subscriptions.form.name')}
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
                  {/* Age */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">
                      {t('admin.subscriptions.form.age')}
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      required
                      min="4"
                      max="18"
                      className={`block w-full py-3.5 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-xs sm:text-sm font-bold ${
                        isRtl ? 'text-right' : 'text-left'
                      }`}
                    />
                  </div>

                  {/* Parent Mobile */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">
                      {t('registration.form.parentPhone')}
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. 0507398888"
                      className={`block w-full py-3.5 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-xs sm:text-sm font-bold ${
                        isRtl ? 'text-right' : 'text-left'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Program Path */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">
                      {t('admin.subscriptions.form.program')}
                    </label>
                    <select
                      name="program"
                      value={formData.program}
                      onChange={handleInputChange}
                      className="block w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-xs sm:text-sm font-bold"
                    >
                      <option value="foundation">{t('programs.foundation.title')}</option>
                      <option value="intermediate">{t('programs.intermediate.title')}</option>
                      <option value="advanced">{t('programs.advanced.title')}</option>
                    </select>
                  </div>

                  {/* Coach selection dynamically loaded from live database! */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">
                      {t('admin.subscriptions.form.coach')}
                    </label>
                    <select
                      name="coachId"
                      value={formData.coachId}
                      onChange={handleInputChange}
                      className="block w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-xs sm:text-sm font-bold"
                    >
                      {coaches.map(c => (
                        <option key={c.id} value={c.id}>{c.name} ({c.role === 'Head Technical Director' ? t('admin.settings.roles.super') : t('admin.settings.roles.coach')})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Duration */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">
                      {t('admin.subscriptions.form.duration')}
                    </label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="block w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-xs sm:text-sm font-bold"
                    >
                      <option value="1">{t('admin.subscriptions.form.duration1')}</option>
                      <option value="3">{t('admin.subscriptions.form.duration3')}</option>
                      <option value="6">{t('admin.subscriptions.form.duration6')}</option>
                    </select>
                  </div>

                  {/* Payment Status */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">
                      {t('admin.subscriptions.form.status')}
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="block w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-xs sm:text-sm font-bold"
                    >
                      <option value="paid">{t('admin.subscriptions.paid')}</option>
                      <option value="pending">{t('admin.subscriptions.pending')}</option>
                    </select>
                  </div>
                </div>

                {/* Autocalculated tuition */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    {t('admin.subscriptions.form.price')}
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    readOnly
                    className={`block w-full py-3.5 px-4 bg-gray-100 border border-gray-200 rounded-xl text-xs sm:text-sm font-extrabold text-secondary-dark ${
                      isRtl ? 'text-right' : 'text-left'
                    }`}
                  />
                </div>

                {/* Modals CTAs */}
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
                    className="px-6 py-3 bg-primary hover:bg-primary-light text-white rounded-2xl font-extrabold text-xs cursor-pointer shadow-md"
                  >
                    {t('admin.subscriptions.form.save')}
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
