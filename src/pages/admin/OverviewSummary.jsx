import React, { useState, useMemo, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  Award, 
  ArrowUpRight, 
  ArrowDownRight,
  Search,
  ChevronDown,
  ChevronUp,
  Filter,
  Target,
  Download,
  FileText,
  FileSpreadsheet,
  Megaphone,
  Bell,
  X,
  Send
} from 'lucide-react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

// Counter component with animation
const Counter = ({ from = 0, to, duration = 1, delay = 0, decimals = 0 }) => {
  const [displayValue, setDisplayValue] = useState(from);

  useEffect(() => {
    const timer = setTimeout(() => {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplayValue(decimals > 0 ? latest.toFixed(decimals) : Math.round(latest));
        }
      });
      return controls.stop;
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [from, to, duration, delay, decimals]);

  return <>{displayValue}</>;
};

const OverviewSummary = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [announcementText, setAnnouncementText] = useState('');
  const [announcementPriority, setAnnouncementPriority] = useState('normal');

  // Mock data - Replace with real API data
  const programKPIs = {
    totalLearners: 15,
    completionRate: 73.3,
    averageScore: 84.8,
    activeToday: 8,
    trends: {
      learners: 7.1,
      completion: 4.2,
      score: 2.1,
      active: 14.3
    }
  };

  const pathwayData = [
    { 
      pathwayKey: 'digitalFinancial',
      moduleKey: 'digitalLiteracy',
      recommended: 100,
      actual: 100,
      matchRate: 100.0,
      statusKey: 'complete',
      learners: 15
    },
    { 
      pathwayKey: 'labourLegal',
      moduleKey: 'labourRights',
      recommended: 100,
      actual: 85,
      matchRate: 85.0,
      statusKey: 'inProgress',
      learners: 13
    },
    { 
      pathwayKey: 'commLeadership',
      moduleKey: 'communication',
      recommended: 100,
      actual: 72,
      matchRate: 72.0,
      statusKey: 'inProgress',
      learners: 11
    },
    { 
      pathwayKey: 'financialEntrepreneurship',
      moduleKey: 'financial',
      recommended: 100,
      actual: 45,
      matchRate: 45.0,
      statusKey: 'started',
      learners: 9
    },
    { 
      pathwayKey: 'workplaceRisk',
      moduleKey: 'workplace',
      recommended: 100,
      actual: 15,
      matchRate: 15.0,
      statusKey: 'justStarted',
      learners: 5
    }
  ];

  const overallPathwayCompletion = Math.round(
    pathwayData.reduce((acc, item) => acc + item.actual, 0) / pathwayData.length
  );

  const learnersData = [
    {
      id: 1,
      nameKey: 'learner1',
      email: 'anna.schmidt@example.com',
      modulesCompleted: 12,
      totalModules: 15,
      currentModuleKey: 'financialPlanning',
      score: 92.5,
      status: 'active',
      pathway: 'Digital Literacy',
      lastActive: '2 hours ago'
    },
    {
      id: 2,
      nameKey: 'learner2',
      email: 'hans.mueller@example.com',
      modulesCompleted: 8,
      totalModules: 15,
      currentModuleKey: 'labourRights',
      score: 88.3,
      status: 'active',
      pathway: 'Legal Compliance',
      lastActive: '5 hours ago'
    },
    {
      id: 3,
      nameKey: 'learner3',
      email: 'sophie.weber@example.com',
      modulesCompleted: 15,
      totalModules: 15,
      currentModuleKey: 'completed',
      score: 95.7,
      status: 'completed',
      pathway: 'Communication',
      lastActive: '1 day ago'
    },
    {
      id: 4,
      nameKey: 'learner4',
      email: 'klaus.fischer@example.com',
      modulesCompleted: 5,
      totalModules: 15,
      currentModuleKey: 'financialLiteracy',
      score: 76.2,
      status: 'at-risk',
      pathway: 'Entrepreneurship',
      lastActive: '3 days ago'
    },
    {
      id: 5,
      nameKey: 'learner5',
      email: 'maria.wagner@example.com',
      modulesCompleted: 15,
      totalModules: 15,
      currentModuleKey: 'completed',
      score: 94.8,
      status: 'completed',
      pathway: 'Digital Literacy',
      lastActive: '2 days ago'
    },
    {
      id: 6,
      nameKey: 'learner6',
      email: 'peter.becker@example.com',
      modulesCompleted: 10,
      totalModules: 15,
      currentModuleKey: 'communicationSkills',
      score: 85.6,
      status: 'active',
      pathway: 'Leadership',
      lastActive: '1 hour ago'
    },
    {
      id: 7,
      nameKey: 'learner7',
      email: 'laura.hoffmann@example.com',
      modulesCompleted: 3,
      totalModules: 15,
      currentModuleKey: 'basicComputerSkills',
      score: 72.4,
      status: 'at-risk',
      pathway: 'Digital Literacy',
      lastActive: '4 days ago'
    },
    {
      id: 8,
      nameKey: 'learner8',
      email: 'michael.schulz@example.com',
      modulesCompleted: 13,
      totalModules: 15,
      currentModuleKey: 'riskManagement',
      score: 89.2,
      status: 'active',
      pathway: 'Workplace Safety',
      lastActive: '3 hours ago'
    },
    {
      id: 9,
      nameKey: 'learner9',
      email: 'emma.koch@example.com',
      modulesCompleted: 15,
      totalModules: 15,
      currentModuleKey: 'completed',
      score: 91.3,
      status: 'completed',
      pathway: 'Legal Compliance',
      lastActive: '1 day ago'
    },
    {
      id: 10,
      nameKey: 'learner10',
      email: 'thomas.bauer@example.com',
      modulesCompleted: 7,
      totalModules: 15,
      currentModuleKey: 'labourCodeBasics',
      score: 80.5,
      status: 'active',
      pathway: 'Labour Rights',
      lastActive: '6 hours ago'
    },
    {
      id: 11,
      nameKey: 'learner11',
      email: 'lena.meyer@example.com',
      modulesCompleted: 15,
      totalModules: 15,
      currentModuleKey: 'completed',
      score: 93.1,
      status: 'completed',
      pathway: 'Communication',
      lastActive: '3 days ago'
    },
    {
      id: 12,
      nameKey: 'learner12',
      email: 'felix.richter@example.com',
      modulesCompleted: 2,
      totalModules: 15,
      currentModuleKey: 'financialLiteracy',
      score: 68.7,
      status: 'inactive',
      pathway: 'Financial Literacy',
      lastActive: '7 days ago'
    },
    {
      id: 13,
      nameKey: 'learner13',
      email: 'sarah.schneider@example.com',
      modulesCompleted: 9,
      totalModules: 15,
      currentModuleKey: 'digitalMarketing',
      score: 86.9,
      status: 'active',
      pathway: 'Entrepreneurship',
      lastActive: '4 hours ago'
    },
    {
      id: 14,
      nameKey: 'learner14',
      email: 'markus.wolf@example.com',
      modulesCompleted: 11,
      totalModules: 15,
      currentModuleKey: 'advancedSafetyProtocols',
      score: 87.4,
      status: 'active',
      pathway: 'Risk Management',
      lastActive: '2 hours ago'
    },
    {
      id: 15,
      nameKey: 'learner15',
      email: 'julia.zimmermann@example.com',
      modulesCompleted: 6,
      totalModules: 15,
      currentModuleKey: 'teamCollaboration',
      score: 79.8,
      status: 'active',
      pathway: 'Leadership',
      lastActive: '8 hours ago'
    }
  ];

  // Filtering and sorting logic
  const filteredAndSortedLearners = useMemo(() => {
    let filtered = learnersData.filter(learner => {
      const learnerName = t(`admin.overview.learnerProgress.learners.${learner.nameKey}`);
      const matchesSearch = learnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           learner.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || learner.status === filterStatus;
      return matchesSearch && matchesFilter;
    });

    filtered.sort((a, b) => {
      let aVal, bVal;
      
      if (sortConfig.key === 'name') {
        aVal = t(`admin.overview.learnerProgress.learners.${a.nameKey}`);
        bVal = t(`admin.overview.learnerProgress.learners.${b.nameKey}`);
      } else if (sortConfig.key === 'progress') {
        aVal = a.modulesCompleted / a.totalModules;
        bVal = b.modulesCompleted / b.totalModules;
      } else {
        aVal = a[sortConfig.key];
        bVal = b[sortConfig.key];
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [searchTerm, sortConfig, filterStatus, t]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      completed: 'bg-blue-50 text-blue-700 border-blue-200',
      'at-risk': 'bg-amber-50 text-amber-700 border-amber-200',
      inactive: 'bg-slate-50 text-slate-700 border-slate-200'
    };
    return colors[status] || colors.inactive;
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'bg-emerald-500';
    if (percentage >= 60) return 'bg-blue-500';
    if (percentage >= 40) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const getStatusText = (status) => {
    const statusMap = {
      'active': t('admin.overview.learnerStatus.active'),
      'completed': t('admin.overview.learnerStatus.completed'),
      'at-risk': t('admin.overview.learnerStatus.atRisk'),
      'inactive': t('admin.overview.learnerStatus.inactive')
    };
    return statusMap[status] || status;
  };

  const translateCurrentModule = (moduleKey) => {
    if (moduleKey === 'completed') {
      return t('admin.overview.learnerProgress.completedText');
    }
    // Try to get translation from modules object
    const translationKey = `admin.overview.learnerProgress.modules.${moduleKey}`;
    const translated = t(translationKey);
    // If translation key is returned as-is, it means no translation found, return original
    return translated !== translationKey ? translated : moduleKey;
  };

  const translateLastActive = (timeString) => {
    // Parse time strings like "2 hours ago", "1 day ago", etc.
    const hourMatch = timeString.match(/^(\d+) hours? ago$/);
    const dayMatch = timeString.match(/^(\d+) days? ago$/);
    
    if (hourMatch) {
      const count = parseInt(hourMatch[1]);
      return count === 1 
        ? t('admin.overview.learnerProgress.hourAgo')
        : t('admin.overview.learnerProgress.hoursAgo', { count });
    }
    
    if (dayMatch) {
      const count = parseInt(dayMatch[1]);
      return count === 1
        ? t('admin.overview.learnerProgress.dayAgo')
        : t('admin.overview.learnerProgress.daysAgo', { count });
    }
    
    return timeString;
  };

  const translateLearnerName = (nameKey) => {
    return t(`admin.overview.learnerProgress.learners.${nameKey}`);
  };

  // Export functions
  const exportToCSV = () => {
    const csvData = [
      ['Learner Name', 'Email', 'Progress', 'Current Module', 'Score', 'Status', 'Last Active'],
      ...filteredAndSortedLearners.map(learner => [
        translateLearnerName(learner.nameKey),
        learner.email,
        `${learner.modulesCompleted}/${learner.totalModules}`,
        translateCurrentModule(learner.currentModuleKey),
        `${learner.score}%`,
        getStatusText(learner.status),
        translateLastActive(learner.lastActive)
      ])
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `learner-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
    toast.success(t('admin.overview.exportSuccess') || 'Report exported successfully!');
  };

  const exportToPDF = () => {
    // Simplified PDF export - in production, use a library like jsPDF
    toast.info(t('admin.overview.pdfExportInfo') || 'PDF export feature - integrate with jsPDF library');
  };

  // Announcement function
  const publishAnnouncement = () => {
    if (!announcementText.trim()) {
      toast.error(t('admin.overview.announcementEmpty') || 'Please enter announcement text');
      return;
    }

    // In production, this would call an API
    toast.success(t('admin.overview.announcementPublished') || `Announcement published to all ${programKPIs.totalLearners} users`);
    setAnnouncementText('');
    setShowAnnouncementModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50/20 to-purple-50/10 p-6">
      <div className="max-w-[1800px] mx-auto space-y-5">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2"
        >
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <div className="inline-flex items-center gap-2 mb-2">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-3xl font-semibold text-slate-800">{t('admin.overview.title')}</h1>
              </div>
              <p className="text-sm text-slate-500">{t('admin.overview.subtitle')}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Announcement Button */}
              <button
                onClick={() => setShowAnnouncementModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all shadow-md hover:shadow-lg"
              >
                <Megaphone className="h-4 w-4" />
                <span className="text-sm font-medium">{t('admin.overview.announce') || 'Announce'}</span>
              </button>

              {/* Export Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg">
                  <Download className="h-4 w-4" />
                  <span className="text-sm font-medium">{t('admin.overview.export') || 'Export'}</span>
                  <ChevronDown className="h-3 w-3" />
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <button
                    onClick={exportToCSV}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-left border-b border-slate-100"
                  >
                    <FileSpreadsheet className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-slate-700 font-medium">{t('admin.overview.exportCSV') || 'Export as CSV'}</span>
                  </button>
                  <button
                    onClick={exportToPDF}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-left"
                  >
                    <FileText className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-slate-700 font-medium">{t('admin.overview.exportPDF') || 'Export as PDF'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 1. Overall Program KPIs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Total Learners */}
            <div className="bg-white rounded-lg p-5 border border-slate-200 hover:border-blue-200 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Users className="h-5 w-5 text-blue-500" />
                </div>
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className={`flex items-center gap-0.5 text-xs ${programKPIs.trends.learners >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}
                >
                  {programKPIs.trends.learners >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {Math.abs(programKPIs.trends.learners)}%
                </motion.div>
              </div>
              <div className="space-y-0.5">
                <p className="text-2xl font-semibold text-slate-900">
                  <Counter to={programKPIs.totalLearners} duration={1.5} delay={0.2} />
                </p>
                <p className="text-xs text-slate-500">{t('admin.overview.totalLearners')}</p>
              </div>
            </div>

            {/* Completion Rate */}
            <div className="bg-white rounded-lg p-5 border border-slate-200 hover:border-emerald-200 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <Award className="h-5 w-5 text-emerald-500" />
                </div>
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className={`flex items-center gap-0.5 text-xs ${programKPIs.trends.completion >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}
                >
                  {programKPIs.trends.completion >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {Math.abs(programKPIs.trends.completion)}%
                </motion.div>
              </div>
              <div className="space-y-0.5">
                <p className="text-2xl font-semibold text-slate-900">
                  <Counter to={programKPIs.completionRate} duration={1.5} delay={0.3} decimals={1} />%
                </p>
                <p className="text-xs text-slate-500">{t('admin.overview.completionRate')}</p>
              </div>
            </div>

            {/* Average Score */}
            <div className="bg-white rounded-lg p-5 border border-slate-200 hover:border-amber-200 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-amber-50 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-amber-500" />
                </div>
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className={`flex items-center gap-0.5 text-xs ${programKPIs.trends.score >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}
                >
                  {programKPIs.trends.score >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {Math.abs(programKPIs.trends.score)}%
                </motion.div>
              </div>
              <div className="space-y-0.5">
                <p className="text-2xl font-semibold text-slate-900">
                  <Counter to={programKPIs.averageScore} duration={1.5} delay={0.4} decimals={1} />%
                </p>
                <p className="text-xs text-slate-500">{t('admin.overview.averageScore')}</p>
              </div>
            </div>

            {/* Active Today */}
            <div className="bg-white rounded-lg p-5 border border-slate-200 hover:border-violet-200 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-violet-50 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-violet-500" />
                </div>
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className={`flex items-center gap-0.5 text-xs ${programKPIs.trends.active >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}
                >
                  {programKPIs.trends.active >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {Math.abs(programKPIs.trends.active)}%
                </motion.div>
              </div>
              <div className="space-y-0.5">
                <p className="text-2xl font-semibold text-slate-900">
                  <Counter to={programKPIs.activeToday} duration={1.5} delay={0.5} />
                </p>
                <p className="text-xs text-slate-500">{t('admin.overview.activeToday')}</p>
              </div>
            </div>

          </div>
        </motion.div>

        {/* 2. Two Column Layout: Pathway Tracker & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* Predictive Pathway Tracker - 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm"
          >
            {/* Header with Completion Badge */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">{t('admin.overview.pathwayTracker.title')}</h2>
                  <p className="text-xs text-slate-500">{t('admin.overview.pathwayTracker.subtitle')}</p>
                </div>
              </div>
              <div className="text-base font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2.5 rounded-full shadow-lg">
                {overallPathwayCompletion}% {t('admin.overview.pathwayTracker.overallProgress')}
              </div>
            </div>

            {/* Visual Progress Bars */}
            {/* Visual Progress Bars */}
            <div className="space-y-4">
              {pathwayData.map((pathway, idx) => {
                const progressPercentage = pathway.actual;
                const isComplete = progressPercentage === 100;
                const isInProgress = progressPercentage > 0 && progressPercentage < 100;
                const isNotStarted = progressPercentage === 0;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                    className="space-y-2"
                  >
                    {/* Module Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-sm font-bold text-gray-700 min-w-[180px]">{t(`admin.overview.pathwayTracker.modules.${pathway.moduleKey}`)}</span>
                        <div className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          isComplete 
                            ? 'bg-green-100 text-green-700 border border-green-300' 
                            : isInProgress 
                            ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                            : 'bg-gray-100 text-gray-600 border border-gray-300'
                        }`}>
                          {t(`admin.overview.pathwayTracker.statuses.${pathway.statusKey}`)}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Users className="h-3.5 w-3.5" />
                          <span>{pathway.learners} {t('admin.overview.pathwayTracker.learners')}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-blue-600">{progressPercentage}%</span>
                        <div className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                          pathway.matchRate >= 85 
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                            : pathway.matchRate >= 70
                            ? 'bg-blue-50 text-blue-600 border border-blue-200'
                            : 'bg-amber-50 text-amber-600 border border-amber-200'
                        }`}>
                          {pathway.matchRate}% {t('admin.overview.pathwayTracker.match')}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative w-full h-10 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200 shadow-inner">
                      {/* Recommended Background (Full Width) */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100"></div>
                      
                      {/* Actual Progress */}
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{ 
                          duration: 1.2, 
                          delay: 0.5 + idx * 0.1,
                          ease: [0.4, 0, 0.2, 1]
                        }}
                        className={`absolute inset-y-0 left-0 rounded-lg ${
                          isComplete 
                            ? 'bg-gradient-to-r from-green-400 to-green-500 shadow-md' 
                            : isInProgress 
                            ? 'bg-gradient-to-r from-blue-400 to-blue-600 shadow-md' 
                            : 'bg-gray-300'
                        }`}
                      >
                        {progressPercentage > 10 && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 + idx * 0.1, duration: 0.5 }}
                            className="h-full flex items-center justify-end pr-3"
                          >
                            <span className="text-xs font-bold text-white drop-shadow-md">
                              {progressPercentage}%
                            </span>
                          </motion.div>
                        )}
                      </motion.div>

                      {/* Milestone Markers */}
                      <div className="absolute inset-0 flex items-center pointer-events-none">
                        {[25, 50, 75].map(milestone => (
                          <div 
                            key={milestone}
                            className="absolute h-full border-l-2 border-dashed border-gray-300"
                            style={{ left: `${milestone}%` }}
                          >
                            <span className="absolute -top-1 -left-2 text-[10px] text-gray-400 font-medium">
                              {milestone}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pathway Description */}
                    <div className="flex items-center justify-between text-xs text-slate-500 pl-1">
                      <span className="italic">{t(`admin.overview.pathwayTracker.pathways.${pathway.pathwayKey}`)}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Statistics Summary */}
            <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t-2 border-gray-200">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="text-center p-3 bg-green-50 rounded-lg border border-green-200 shadow-sm"
              >
                <div className="text-2xl font-bold text-green-600">
                  <Counter to={pathwayData.filter(m => m.actual === 100).length} duration={1} delay={1.7} />
                </div>
                <div className="text-xs text-gray-600 font-medium mt-1">{t('admin.overview.pathwayTracker.completedPathways')}</div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.5 }}
                className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200 shadow-sm"
              >
                <div className="text-2xl font-bold text-blue-600">
                  <Counter to={pathwayData.filter(m => m.actual > 0 && m.actual < 100).length} duration={1} delay={1.8} />
                </div>
                <div className="text-xs text-gray-600 font-medium mt-1">{t('admin.overview.pathwayTracker.statuses.inProgress')}</div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7, duration: 0.5 }}
                className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200 shadow-sm"
              >
                <div className="text-2xl font-bold text-gray-600">
                  <Counter to={pathwayData.filter(m => m.actual === 0).length} duration={1} delay={1.9} />
                </div>
                <div className="text-xs text-gray-600 font-medium mt-1">{t('admin.overview.pathwayTracker.notStarted')}</div>
              </motion.div>
            </div>

          </motion.div>

          {/* Quick Stats - 1 column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="space-y-4"
          >
            {/* Status Distribution */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="text-sm font-semibold text-slate-800 mb-4">{t('admin.overview.learnerStatus.title')}</h3>
              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-600">{t('admin.overview.learnerStatus.active')} (8)</span>
                    <span className="font-medium text-emerald-600">53.3%</span>
                  </div>
                  <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '53.3%' }}
                      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                      className="h-full bg-emerald-500"
                    ></motion.div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-600">{t('admin.overview.learnerStatus.completed')} (4)</span>
                    <span className="font-medium text-blue-600">26.7%</span>
                  </div>
                  <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '26.7%' }}
                      transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                      className="h-full bg-blue-500"
                    ></motion.div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-600">{t('admin.overview.learnerStatus.atRisk')} (2)</span>
                    <span className="font-medium text-amber-600">13.3%</span>
                  </div>
                  <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '13.3%' }}
                      transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
                      className="h-full bg-amber-500"
                    ></motion.div>
                  </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-600">{t('admin.overview.learnerStatus.inactive')} (1)</span>
                    <span className="font-medium text-slate-600">6.7%</span>
                  </div>
                  <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '6.7%' }}
                      transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                      className="h-full bg-slate-400"
                    ></motion.div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Top Performers */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-xl border border-amber-100 p-5">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">{t('admin.overview.topPerformers.title')}</h3>
              <div className="space-y-2">
                {learnersData.slice(0, 3).sort((a, b) => b.score - a.score).map((learner, index) => {
                  const medals = ['🥇', '🥈', '🥉'];
                  const fullName = translateLearnerName(learner.nameKey);
                  const firstName = fullName.split(' ')[0];
                  return (
                    <div key={learner.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl leading-none">
                          {medals[index]}
                        </span>
                        <span className="text-xs text-slate-700 font-medium">{firstName}</span>
                      </div>
                      <span className="text-xs font-semibold text-amber-600">{learner.score}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

        </div>

        {/* 3. Learner Progress Tracker - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-slate-200 p-6"
        >
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-800 mb-1">{t('admin.overview.learnerProgress.title')}</h2>
            <p className="text-xs text-slate-500">{t('admin.overview.learnerProgress.subtitle')}</p>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder={t('admin.overview.learnerProgress.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all appearance-none cursor-pointer"
              >
                <option value="all">{t('admin.overview.learnerProgress.allStatus')}</option>
                <option value="active">{t('admin.overview.learnerStatus.active')}</option>
                <option value="completed">{t('admin.overview.learnerStatus.completed')}</option>
                <option value="at-risk">{t('admin.overview.learnerStatus.atRisk')}</option>
                <option value="inactive">{t('admin.overview.learnerStatus.inactive')}</option>
              </select>
            </div>
          </div>

          {/* Compact Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50">
                  <th 
                    onClick={() => handleSort('name')}
                    className="text-left py-2.5 px-3 text-xs font-medium text-slate-600 cursor-pointer hover:text-blue-500 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      {t('admin.overview.learnerProgress.learner')}
                      {sortConfig.key === 'name' && (
                        sortConfig.direction === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                      )}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('progress')}
                    className="text-left py-2.5 px-3 text-xs font-medium text-slate-600 cursor-pointer hover:text-blue-500 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      {t('admin.overview.learnerProgress.progress')}
                      {sortConfig.key === 'progress' && (
                        sortConfig.direction === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                      )}
                    </div>
                  </th>
                  <th className="text-left py-2.5 px-3 text-xs font-medium text-slate-600">
                    {t('admin.overview.learnerProgress.currentModule')}
                  </th>
                  <th 
                    onClick={() => handleSort('score')}
                    className="text-left py-2.5 px-3 text-xs font-medium text-slate-600 cursor-pointer hover:text-blue-500 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      {t('admin.overview.learnerProgress.score')}
                      {sortConfig.key === 'score' && (
                        sortConfig.direction === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                      )}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('status')}
                    className="text-left py-2.5 px-3 text-xs font-medium text-slate-600 cursor-pointer hover:text-blue-500 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      {t('admin.overview.learnerProgress.status')}
                      {sortConfig.key === 'status' && (
                        sortConfig.direction === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAndSortedLearners.map((learner, index) => {
                  const progress = (learner.modulesCompleted / learner.totalModules) * 100;
                  return (
                    <motion.tr
                      key={learner.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.02 }}
                      className="hover:bg-sky-50/30 transition-colors"
                    >
                      <td className="py-2.5 px-3">
                        <div>
                          <p className="text-sm text-slate-800 font-medium">{translateLearnerName(learner.nameKey)}</p>
                          <p className="text-xs text-slate-400">{learner.email}</p>
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="space-y-1 max-w-[140px]">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500">{learner.modulesCompleted}/{learner.totalModules}</span>
                            <span className="text-slate-700 font-medium">{progress.toFixed(0)}%</span>
                          </div>
                          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${progress}%` }}
                              transition={{ duration: 0.8, delay: 0.5 + index * 0.05, ease: "easeOut" }}
                              className={`h-full ${getProgressColor(progress)}`}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <p className="text-sm text-slate-700">{translateCurrentModule(learner.currentModuleKey)}</p>
                        <p className="text-xs text-slate-400">{translateLastActive(learner.lastActive)}</p>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm text-slate-700 font-medium">{learner.score}%</span>
                          {learner.score >= 90 && <Award className="h-3.5 w-3.5 text-amber-500" />}
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs border ${getStatusColor(learner.status)}`}>
                          {getStatusText(learner.status)}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredAndSortedLearners.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-slate-500">{t('admin.overview.learnerProgress.noLearnersFound')}</p>
            </div>
          )}

          {/* Results count */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              {t('admin.overview.learnerProgress.showing', { count: filteredAndSortedLearners.length, total: learnersData.length })}
            </p>
        </div>
        </motion.div>

      </div>

      {/* Announcement Modal */}
      {showAnnouncementModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-orange-500" />
                <h2 className="text-xl font-bold text-slate-800">{t('admin.overview.publishAnnouncement') || 'Publish Announcement'}</h2>
              </div>
              <button
                onClick={() => setShowAnnouncementModal(false)}
                className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {t('admin.overview.announcementMessage') || 'Message'}
                </label>
                <textarea
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  placeholder={t('admin.overview.announcementPlaceholder') || 'Enter your announcement...'}
                  className="w-full h-32 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {t('admin.overview.priority') || 'Priority'}
                </label>
                <select
                  value={announcementPriority}
                  onChange={(e) => setAnnouncementPriority(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">{t('admin.overview.priorityLow') || 'Low'}</option>
                  <option value="normal">{t('admin.overview.priorityNormal') || 'Normal'}</option>
                  <option value="high">{t('admin.overview.priorityHigh') || 'High'}</option>
                  <option value="urgent">{t('admin.overview.priorityUrgent') || 'Urgent'}</option>
                </select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">{t('admin.overview.recipients') || 'Recipients'}:</span> {t('admin.overview.allUsers') || 'All'} {programKPIs.totalLearners} {t('admin.overview.users') || 'users'}
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={publishAnnouncement}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg font-medium"
                >
                  <Send className="h-4 w-4" />
                  {t('admin.overview.publish') || 'Publish Now'}
                </button>
                <button
                  onClick={() => setShowAnnouncementModal(false)}
                  className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all font-medium"
                >
                  {t('admin.overview.cancel') || 'Cancel'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default OverviewSummary;

