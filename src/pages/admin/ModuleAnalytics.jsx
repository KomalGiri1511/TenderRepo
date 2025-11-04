import React, { useState } from 'react';
import { 
  BookOpen, 
  TrendingUp, 
  Target, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Filter,
  ChevronDown,
  ChevronRight,
  Users,
  Award,
  BarChart2,
  PieChart,
  Activity,
  Star,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ModuleAnalytics = () => {
  const { t } = useTranslation();
  const [selectedModule, setSelectedModule] = useState(null);
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  // Mock data for modules with detailed info
  const moduleData = [
    {
      id: 1,
      nameKey: 'digitalLiteracy',
      icon: '💻',
      color: 'sky',
      completion: 92,
      avgScore: 87.5,
      enrolled: 15,
      completed: 14,
      inProgress: 1,
      notStarted: 0,
      avgTime: '4.2h',
      topScore: 98,
      lowestScore: 65,
      assessments: 3,
      passRate: 89.8
    },
    {
      id: 2,
      nameKey: 'financialPlanning',
      icon: '💰',
      color: 'purple',
      completion: 78,
      avgScore: 82.3,
      enrolled: 13,
      completed: 10,
      inProgress: 2,
      notStarted: 1,
      avgTime: '5.8h',
      topScore: 96,
      lowestScore: 58,
      assessments: 2,
      passRate: 83.2
    },
    {
      id: 3,
      nameKey: 'labourRights',
      icon: '⚖️',
      color: 'sky',
      completion: 85,
      avgScore: 88.9,
      enrolled: 14,
      completed: 12,
      inProgress: 1,
      notStarted: 1,
      avgTime: '3.9h',
      topScore: 99,
      lowestScore: 71,
      assessments: 4,
      passRate: 90.0
    },
    {
      id: 4,
      nameKey: 'communicationSkills',
      icon: '💬',
      color: 'purple',
      completion: 71,
      avgScore: 79.4,
      enrolled: 12,
      completed: 8,
      inProgress: 3,
      notStarted: 1,
      avgTime: '6.1h',
      topScore: 94,
      lowestScore: 54,
      assessments: 3,
      passRate: 83.4
    },
    {
      id: 5,
      nameKey: 'workplaceSafety',
      icon: '🛡️',
      color: 'sky',
      completion: 88,
      avgScore: 91.2,
      enrolled: 11,
      completed: 9,
      inProgress: 2,
      notStarted: 0,
      avgTime: '3.5h',
      topScore: 100,
      lowestScore: 78,
      assessments: 2,
      passRate: 93.9
    },
    {
      id: 6,
      nameKey: 'entrepreneurship',
      icon: '🚀',
      color: 'purple',
      completion: 65,
      avgScore: 76.8,
      enrolled: 10,
      completed: 6,
      inProgress: 3,
      notStarted: 1,
      avgTime: '7.2h',
      topScore: 92,
      lowestScore: 49,
      assessments: 4,
      passRate: 78.5
    }
  ];

  // Mock data for assessments
  const assessmentData = [
    {
      id: 1,
      nameKey: 'digitalLiteracyQuiz',
      typeKey: 'quiz',
      difficultyKey: 'easy',
      totalAttempts: 14,
      passed: 13,
      failed: 1,
      passRate: 92.9,
      avgScore: 87.5
    },
    {
      id: 2,
      nameKey: 'financialPlanningAssessment',
      typeKey: 'assessment',
      difficultyKey: 'medium',
      totalAttempts: 10,
      passed: 8,
      failed: 2,
      passRate: 80.0,
      avgScore: 82.3
    },
    {
      id: 3,
      nameKey: 'labourLawExam',
      typeKey: 'exam',
      difficultyKey: 'hard',
      totalAttempts: 12,
      passed: 11,
      failed: 1,
      passRate: 91.7,
      avgScore: 88.9
    },
    {
      id: 4,
      nameKey: 'communicationSkillsQuiz',
      typeKey: 'quiz',
      difficultyKey: 'easy',
      totalAttempts: 8,
      passed: 7,
      failed: 1,
      passRate: 87.5,
      avgScore: 79.4
    },
    {
      id: 5,
      nameKey: 'safetyProtocolAssessment',
      typeKey: 'assessment',
      difficultyKey: 'medium',
      totalAttempts: 9,
      passed: 9,
      failed: 0,
      passRate: 100.0,
      avgScore: 91.2
    }
  ];

  const getModuleColorClasses = (color) => {
    const colors = {
      sky: {
        bg: 'bg-gradient-to-br from-sky-50/80 to-blue-50/60',
        border: 'border-sky-200/60',
        hover: 'hover:border-sky-300/80',
        text: 'text-sky-600',
        badge: 'bg-sky-100/70 text-sky-700',
        progress: 'bg-sky-400'
      },
      purple: {
        bg: 'bg-gradient-to-br from-purple-50/80 to-violet-50/60',
        border: 'border-purple-200/60',
        hover: 'hover:border-purple-300/80',
        text: 'text-purple-600',
        badge: 'bg-purple-100/70 text-purple-700',
        progress: 'bg-purple-400'
      }
    };
    return colors[color] || colors.sky;
  };

  const getDifficultyColor = (difficultyKey) => {
    const colors = {
      easy: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      medium: 'bg-amber-50 text-amber-600 border-amber-200',
      hard: 'bg-rose-50 text-rose-600 border-rose-200'
    };
    return colors[difficultyKey] || colors.easy;
  };

  const getPassRateColor = (rate) => {
    if (rate >= 90) return 'text-emerald-600';
    if (rate >= 75) return 'text-sky-600';
    if (rate >= 60) return 'text-amber-600';
    return 'text-rose-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50/30 to-purple-50/20 p-6">
      <div className="max-w-[1800px] mx-auto space-y-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="p-2 bg-gradient-to-br from-sky-500 to-purple-500 rounded-lg">
              <BarChart2 className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-semibold text-slate-800">{t('admin.moduleAnalytics.title')}</h1>
          </div>
          <p className="text-sm text-slate-500">{t('admin.moduleAnalytics.subtitle')}</p>
        </motion.div>

        {/* Module Performance - Interactive Cards */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-5"
          >
            <h2 className="text-xl font-semibold text-slate-800 mb-2 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-sky-500" />
              {t('admin.moduleAnalytics.modulePerformance.title')}
            </h2>
            <p className="text-sm text-slate-500">{t('admin.moduleAnalytics.modulePerformance.subtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {moduleData.map((module, index) => {
              const colors = getModuleColorClasses(module.color);
              
              // Calculate percentages for pie chart
              const total = module.enrolled;
              const donePercent = (module.completed / total) * 100;
              const activePercent = (module.inProgress / total) * 100;
              const pendingPercent = (module.notStarted / total) * 100;
              
  return (
                <div
                  key={module.id}
                  onClick={() => setSelectedModule(module)}
                  className={`relative overflow-hidden bg-gradient-to-br ${module.color === 'sky' ? 'from-blue-50/50 via-white to-sky-50/30' : 'from-purple-50/50 via-white to-violet-50/30'} rounded-xl border-2 ${module.color === 'sky' ? 'border-blue-100/50' : 'border-purple-100/50'} p-5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${module.color === 'sky' ? 'hover:border-blue-200' : 'hover:border-purple-200'}`}
                >
                  {/* Decorative accent */}
                  <div className={`absolute top-0 right-0 w-32 h-32 ${module.color === 'sky' ? 'bg-blue-100/20' : 'bg-purple-100/20'} rounded-full blur-3xl -z-0`}></div>
                  
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2.5 ${module.color === 'sky' ? 'bg-gradient-to-br from-blue-100 to-blue-50' : 'bg-gradient-to-br from-purple-100 to-purple-50'} rounded-xl text-3xl shadow-sm ring-1 ${module.color === 'sky' ? 'ring-blue-200/50' : 'ring-purple-200/50'}`}>
                          {module.icon}
            </div>
            <div>
                          <h3 className="font-semibold text-slate-800">{t(`admin.moduleAnalytics.modules.${module.nameKey}`)}</h3>
                          <p className="text-xs text-slate-500 mt-0.5">{module.enrolled} {t('admin.moduleAnalytics.modulePerformance.learners')}</p>
                        </div>
                      </div>
                      <div className={`p-2 rounded-lg ${module.color === 'sky' ? 'bg-blue-100/50' : 'bg-purple-100/50'} transition-transform hover:translate-x-1`}>
                        <ChevronRight className={`h-4 w-4 ${module.color === 'sky' ? 'text-blue-600' : 'text-purple-600'}`} />
                      </div>
                    </div>

                    {/* 2D Pie Chart */}
                    <div className={`bg-gradient-to-br ${module.color === 'sky' ? 'from-blue-50/80 to-sky-50/50' : 'from-purple-50/80 to-violet-50/50'} rounded-xl p-4 mb-3 border ${module.color === 'sky' ? 'border-blue-100/50' : 'border-purple-100/50'} shadow-sm`}>
                      <div className="flex items-center justify-center">
                        <div className="relative">
                          {/* 2D Pie Chart */}
                          <motion.div 
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ 
                              duration: 0.8, 
                              delay: 0.2 + index * 0.05,
                              ease: [0.4, 0, 0.2, 1]
                            }}
                            className="relative w-32 h-32 rounded-full shadow-lg"
                            style={{
                              background: `conic-gradient(
                                from 0deg,
                                #10b981 0deg ${donePercent * 3.6}deg,
                                #f59e0b ${donePercent * 3.6}deg ${(donePercent + activePercent) * 3.6}deg,
                                #94a3b8 ${(donePercent + activePercent) * 3.6}deg 360deg
                              )`,
                            }}
                          >
                            {/* Center Label */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <motion.div 
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.5 + index * 0.05, duration: 0.4 }}
                                className="bg-white rounded-full w-16 h-16 flex flex-col items-center justify-center shadow-lg border-2 border-slate-200"
                              >
                                <div className="text-xl font-bold text-blue-900">
                                  {module.completion}%
                                </div>
                                <div className="text-[9px] text-slate-500 font-medium">{t('admin.moduleAnalytics.modal.done')}</div>
                              </motion.div>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    {/* Status Legend */}
                    <div className="flex items-center justify-between text-xs bg-white/60 rounded-lg p-2.5 backdrop-blur-sm">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-sm"></div>
                        <span className="text-slate-700 font-medium">{module.completed} {t('admin.moduleAnalytics.modulePerformance.done')}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 shadow-sm"></div>
                        <span className="text-slate-700 font-medium">{module.inProgress} {t('admin.moduleAnalytics.modulePerformance.active')}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 shadow-sm"></div>
                        <span className="text-slate-700 font-medium">{module.notStarted} {t('admin.moduleAnalytics.modulePerformance.pending')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Module Detail Modal */}
        <AnimatePresence>
          {selectedModule && (
            <>
              <style>{`
                /* Hide admin navigation bar when modal is open */
                nav[class*="bg-gradient"],
                header[class*="bg-gradient"],
                .admin-portal-nav,
                [class*="AdminFloatingNav"] {
                  display: none !important;
                }
              `}</style>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-md z-[9999] flex items-center justify-center p-4"
                onClick={() => setSelectedModule(null)}
              >
                <motion.div
                  initial={{ scale: 0.85, y: 40, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.85, y: 40, opacity: 0 }}
                  transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-gradient-to-br from-white via-white to-slate-50/80 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 module-modal-scroll border border-slate-200/80 ring-1 ring-white/40"
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                  }}
                >
                  <style>{`
                    .module-modal-scroll::-webkit-scrollbar {
                      display: none;
                    }
                  `}</style>
                  {/* Modal Header */}
                <div className="relative flex items-center justify-between mb-6 pb-4 border-b-2 border-gradient-to-r from-transparent via-slate-200 to-transparent">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100/50 to-transparent h-px top-0"></div>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 ${selectedModule.color === 'sky' ? 'bg-gradient-to-br from-blue-100 to-blue-50' : 'bg-gradient-to-br from-purple-100 to-purple-50'} rounded-xl text-2xl shadow-md ring-2 ${selectedModule.color === 'sky' ? 'ring-blue-200/50' : 'ring-purple-200/50'} flex-shrink-0 transform hover:scale-110 transition-transform`}>
                      {selectedModule.icon}
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-lg font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent truncate">{t(`admin.moduleAnalytics.modules.${selectedModule.nameKey}`)}</h2>
                      <p className="text-sm text-slate-500 truncate flex items-center gap-2">
                        <Users className="h-3.5 w-3.5" />
                        {selectedModule.enrolled} {t('admin.moduleAnalytics.modal.enrolled')} • {selectedModule.assessments} {t('admin.moduleAnalytics.modal.tests')}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedModule(null)}
                    className="p-2 hover:bg-rose-50 rounded-xl transition-all flex-shrink-0 hover:rotate-90 duration-300 group border border-transparent hover:border-rose-200"
                  >
                    <X className="h-5 w-5 text-slate-500 group-hover:text-rose-500 transition-colors" />
                  </button>
                </div>

                {/* Compact Stats Row */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {[
                    { labelKey: 'done', value: selectedModule.completed, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100/50', ring: 'ring-emerald-200/40', shadow: 'hover:shadow-emerald-200/50' },
                    { labelKey: 'active', value: selectedModule.inProgress, icon: Activity, color: 'text-amber-600', bg: 'bg-gradient-to-br from-amber-50 to-amber-100/50', ring: 'ring-amber-200/40', shadow: 'hover:shadow-amber-200/50' },
                    { labelKey: 'pending', value: selectedModule.notStarted, icon: AlertCircle, color: 'text-slate-600', bg: 'bg-gradient-to-br from-slate-50 to-slate-100/50', ring: 'ring-slate-200/40', shadow: 'hover:shadow-slate-200/50' },
                    { labelKey: 'passRate', value: `${selectedModule.passRate}%`, icon: Award, color: 'text-purple-600', bg: 'bg-gradient-to-br from-purple-50 to-purple-100/50', ring: 'ring-purple-200/40', shadow: 'hover:shadow-purple-200/50' }
                  ].map((stat, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`${stat.bg} rounded-xl p-3 text-center flex flex-col items-center justify-center min-h-[76px] border border-white shadow-sm ring-1 ${stat.ring} hover:shadow-md ${stat.shadow} transition-all duration-300 hover:scale-105 cursor-default`}
                    >
                      <div className={`p-1.5 bg-white/70 rounded-lg mb-2 shadow-sm`}>
                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                      </div>
                      <p className="text-base font-bold text-slate-800 leading-tight">{stat.value}</p>
                      <p className="text-[10px] text-slate-600 leading-tight mt-1 font-medium uppercase tracking-wide">{t(`admin.moduleAnalytics.modal.${stat.labelKey}`)}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Main Grid - 2 Columns */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Left: Performance Gauges */}
                  <div className="space-y-3">
                    {[
                      { labelKey: 'completion', value: selectedModule.completion, color: '#10b981', gradient: 'from-emerald-400 to-emerald-600', bg: 'from-emerald-50 to-emerald-100/50' },
                      { labelKey: 'avgScore', value: selectedModule.avgScore, color: '#3b82f6', gradient: 'from-blue-400 to-blue-600', bg: 'from-blue-50 to-blue-100/50' }
                    ].map((metric, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className={`bg-gradient-to-br ${metric.bg} rounded-xl p-4 border border-white shadow-md ring-1 ring-slate-200/50 flex items-center gap-4 min-h-[80px] hover:shadow-lg transition-all duration-300`}
                      >
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                            <circle cx="32" cy="32" r="26" fill="none" stroke="#f1f5f9" strokeWidth="5" />
                            <motion.circle
                              cx="32" cy="32" r="26" fill="none" stroke={metric.color} strokeWidth="5"
                              strokeDasharray={`${2 * Math.PI * 26}`}
                              initial={{ strokeDashoffset: `${2 * Math.PI * 26}` }}
                              animate={{ strokeDashoffset: `${2 * Math.PI * 26 * (1 - metric.value / 100)}` }}
                              transition={{ duration: 1.2, delay: 0.5 + i * 0.15, ease: "easeOut" }}
                              strokeLinecap="round"
                              className="drop-shadow-md"
                              style={{
                                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                              }}
                            />
                          </svg>
                          <motion.div 
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 + i * 0.15, duration: 0.4 }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <span className={`text-sm font-bold bg-gradient-to-br ${metric.gradient} bg-clip-text text-transparent`}>{metric.value}%</span>
                          </motion.div>
                        </div>
                        <div className="flex-1">
                          <span className="text-sm font-semibold text-slate-700">{t(`admin.moduleAnalytics.modal.${metric.labelKey}`)}</span>
                          <div className="h-2 bg-white/60 rounded-full mt-2 overflow-hidden shadow-inner">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${metric.value}%` }}
                              transition={{ duration: 1, delay: 0.6 + i * 0.15, ease: "easeOut" }}
                              className={`h-full bg-gradient-to-r ${metric.gradient} rounded-full`}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Time Info */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="bg-gradient-to-br from-sky-50 to-blue-100/50 rounded-xl p-4 border border-white shadow-md ring-1 ring-sky-200/50 flex items-center gap-3 min-h-[64px] hover:shadow-lg transition-all duration-300"
                    >
                      <div className="p-2.5 bg-white/70 rounded-lg shadow-sm">
                        <Clock className="h-5 w-5 text-sky-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-600 leading-tight font-medium">{t('admin.moduleAnalytics.modal.averageTime')}</p>
                        <p className="text-lg font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent leading-tight mt-1">{selectedModule.avgTime}</p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Right: Charts */}
                  <div className="space-y-4">
                    {/* Status Donut */}
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-gradient-to-br from-white to-slate-50/50 rounded-xl p-4 border border-white shadow-md ring-1 ring-slate-200/50 hover:shadow-lg transition-all duration-300"
                    >
                      <h3 className="text-xs font-bold text-slate-700 mb-3 uppercase tracking-wide flex items-center gap-2">
                        <PieChart className="h-3.5 w-3.5 text-slate-500" />
                        {t('admin.moduleAnalytics.modal.statusSplit')}
                      </h3>
                      <div className="flex items-center gap-3">
                        {(() => {
                          const total = selectedModule.enrolled;
                          const completedPercent = (selectedModule.completed / total) * 100;
                          const activePercent = (selectedModule.inProgress / total) * 100;
                          const radius = 26;
                          const circumference = 2 * Math.PI * radius;
                          const activeOffset = (completedPercent / 100) * circumference;
                          
                          return (
                            <>
                              <div className="relative flex-shrink-0">
                                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                                  <circle cx="32" cy="32" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="7" />
                                  <motion.circle
                                    cx="32" cy="32" r={radius} fill="none" stroke="#10b981" strokeWidth="7"
                                    strokeDasharray={circumference}
                                    initial={{ strokeDashoffset: circumference }}
                                    animate={{ strokeDashoffset: circumference - (completedPercent / 100) * circumference }}
                                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                                    strokeLinecap="round"
                                    className="drop-shadow-md"
                                  />
                                  <motion.circle
                                    cx="32" cy="32" r={radius} fill="none" stroke="#f59e0b" strokeWidth="7"
                                    strokeDasharray={circumference}
                                    initial={{ strokeDashoffset: circumference }}
                                    animate={{ strokeDashoffset: circumference - activeOffset - (activePercent / 100) * circumference }}
                                    transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
                                    strokeLinecap="round"
                                    className="drop-shadow-md"
                                  />
                                </svg>
                                <motion.div 
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.8, duration: 0.4 }}
                                  className="absolute inset-0 flex items-center justify-center"
                                >
                                  <div className="text-center">
                                    <div className="text-sm font-bold text-slate-800">{total}</div>
                                    <div className="text-[9px] text-slate-500">{t('admin.moduleAnalytics.modal.total')}</div>
                                  </div>
                                </motion.div>
                              </div>
                              <div className="flex-1 space-y-1.5 min-w-0">
                                {[
                                  { labelKey: 'done', value: selectedModule.completed, color: 'bg-emerald-500', percent: completedPercent.toFixed(1) },
                                  { labelKey: 'active', value: selectedModule.inProgress, color: 'bg-amber-400', percent: activePercent.toFixed(1) },
                                  { labelKey: 'pending', value: selectedModule.notStarted, color: 'bg-slate-400', percent: ((selectedModule.notStarted / total) * 100).toFixed(1) }
                                ].map((item, i) => (
                                  <div key={i} className="flex items-center justify-between text-xs gap-2">
                                    <div className="flex items-center gap-1.5 min-w-0">
                                      <div className={`w-2 h-2 rounded-full ${item.color} flex-shrink-0 shadow-sm`}></div>
                                      <span className="text-slate-600 truncate text-[11px]">{t(`admin.moduleAnalytics.modal.${item.labelKey}`)}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 flex-shrink-0">
                                      <span className="font-bold text-slate-800">{item.value}</span>
                                      <span className="text-slate-400 text-[10px]">({item.percent}%)</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </motion.div>

                    {/* Score Bars */}
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-gradient-to-br from-white to-slate-50/50 rounded-xl p-4 border border-white shadow-md ring-1 ring-slate-200/50 hover:shadow-lg transition-all duration-300"
                    >
                      <h3 className="text-xs font-bold text-slate-700 mb-3 uppercase tracking-wide flex items-center gap-2">
                        <BarChart2 className="h-3.5 w-3.5 text-slate-500" />
                        {t('admin.moduleAnalytics.modal.scoreRange')}
                      </h3>
                      <div className="flex items-end justify-around h-28 gap-3">
                        {[
                          { labelKey: 'top', value: selectedModule.topScore, color: 'from-amber-400 to-amber-500' },
                          { labelKey: 'avg', value: selectedModule.avgScore, color: 'from-blue-400 to-blue-500' },
                          { labelKey: 'low', value: selectedModule.lowestScore, color: 'from-slate-400 to-slate-500' }
                        ].map((item, i) => (
                          <motion.div 
                            key={i} 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                            className="flex flex-col items-center flex-1 gap-1.5 group"
                          >
                            <div className="text-xs mb-0.5">{item.icon}</div>
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.8 + i * 0.1, duration: 0.3 }}
                              className="text-sm font-bold text-slate-800"
                            >
                              {item.value}%
                            </motion.div>
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: `${(item.value / 100) * 64}px` }}
                              transition={{ duration: 1, delay: 0.7 + i * 0.1, ease: "easeOut" }}
                              className={`w-full max-w-[40px] bg-gradient-to-t ${item.color} rounded-t-lg shadow-md group-hover:shadow-lg relative overflow-hidden`}
                            >
                              <div className="absolute inset-0 bg-white/20"></div>
                            </motion.div>
                            <span className="text-[11px] text-slate-600 font-medium">{t(`admin.moduleAnalytics.modal.${item.labelKey}`)}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Assessment Performance */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-5 flex items-center justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <PieChart className="h-5 w-5 text-purple-500" />
                {t('admin.moduleAnalytics.assessmentPerformance.title')}
              </h2>
              <p className="text-sm text-slate-500">{t('admin.moduleAnalytics.assessmentPerformance.subtitle')}</p>
            </div>
            {/* Filter */}
            <div className="relative">
              <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="pl-8 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all appearance-none cursor-pointer"
              >
                <option value="all">{t('admin.moduleAnalytics.assessmentPerformance.allDifficulty')}</option>
                <option value="easy">{t('admin.moduleAnalytics.difficulty.easy')}</option>
                <option value="medium">{t('admin.moduleAnalytics.difficulty.medium')}</option>
                <option value="hard">{t('admin.moduleAnalytics.difficulty.hard')}</option>
              </select>
            </div>
          </motion.div>

          {/* Assessment Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assessmentData
              .filter(a => difficultyFilter === 'all' || a.difficultyKey === difficultyFilter)
              .map((assessment, index) => (
                <motion.div
                  key={assessment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.06 }}
                  className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg hover:border-purple-300 transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-slate-800 mb-1">{t(`admin.moduleAnalytics.assessments.${assessment.nameKey}`)}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">{t(`admin.moduleAnalytics.assessmentTypes.${assessment.typeKey}`)}</span>
                        <span className={`text-xs px-2 py-0.5 rounded border ${getDifficultyColor(assessment.difficultyKey)}`}>
                          {t(`admin.moduleAnalytics.difficulty.${assessment.difficultyKey}`)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pass Rate Circle */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <div className="text-xs text-slate-500 mb-1">{t('admin.moduleAnalytics.assessmentPerformance.passRate')}</div>
                      <div className={`text-2xl font-semibold ${getPassRateColor(assessment.passRate)}`}>
                        {assessment.passRate}%
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-500 mb-1">{t('admin.moduleAnalytics.assessmentPerformance.avgScore')}</div>
                      <div className="text-2xl font-semibold text-slate-700">
                        {assessment.avgScore}%
            </div>
          </div>
        </div>

                  {/* Pass/Fail Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{assessment.totalAttempts} {t('admin.moduleAnalytics.assessmentPerformance.totalAttempts')}</span>
                    </div>
                    <div className="h-3 bg-slate-50 rounded-full overflow-hidden flex">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(assessment.passed / assessment.totalAttempts) * 100}%` }}
                        transition={{ duration: 0.8, delay: 0.5 + index * 0.05, ease: "easeOut" }}
                        className="bg-gradient-to-r from-emerald-400 to-emerald-500"
                      />
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(assessment.failed / assessment.totalAttempts) * 100}%` }}
                        transition={{ duration: 0.8, delay: 0.7 + index * 0.05, ease: "easeOut" }}
                        className="bg-gradient-to-r from-rose-400 to-rose-500"
                      />
                    </div>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 + index * 0.05, duration: 0.4 }}
                      className="flex items-center justify-between text-xs"
                    >
                      <span className="text-emerald-600 font-medium">{assessment.passed} {t('admin.moduleAnalytics.assessmentPerformance.passed')}</span>
                      <span className="text-rose-600 font-medium">{assessment.failed} {t('admin.moduleAnalytics.assessmentPerformance.failed')}</span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ModuleAnalytics;


