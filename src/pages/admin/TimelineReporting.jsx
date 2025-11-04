import React, { useState } from 'react';
import { 
  Calendar, Bell, AlertTriangle, CheckCircle2, Clock, 
  Download, FileText, TrendingDown, Users, Target,
  FileSpreadsheet, File, Filter, ChevronRight, X,
  AlertCircle, Zap, Calendar as CalendarIcon, BarChart3, Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, AreaChart, Area, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

// KPI Card Component
const KPICard = ({ icon: Icon, title, value, change, color = 'pink' }) => (
  <div className={`bg-white p-6 rounded-xl shadow-sm border border-${color}-100 hover:shadow-md transition-shadow`}>
    <div className="flex items-center gap-3 mb-3">
      <div className={`p-2 bg-${color}-100 rounded-lg`}>
        <Icon className={`h-5 w-5 text-${color}-600`} />
      </div>
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
    </div>
    <div className="flex items-baseline justify-between">
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {change && (
        <span className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change > 0 ? '+' : ''}{change}%
        </span>
      )}
    </div>
  </div>
);

// Alert Card Component
const AlertCard = ({ alert, onClick, t }) => {
  const severityColors = {
    critical: 'border-red-200 bg-red-50',
    warning: 'border-yellow-200 bg-yellow-50',
    info: 'border-blue-200 bg-blue-50'
  };

  const severityIcons = {
    critical: AlertTriangle,
    warning: AlertCircle,
    info: Bell
  };

  const severityIconColors = {
    critical: 'text-red-600',
    warning: 'text-yellow-600',
    info: 'text-blue-600'
  };

  const Icon = severityIcons[alert.severity];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`border-2 rounded-xl p-4 cursor-pointer hover:shadow-md transition-all ${severityColors[alert.severity]}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <Icon className={`h-5 w-5 ${severityIconColors[alert.severity]} mt-0.5`} />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{t(`admin.timeline.alerts.items.${alert.titleKey}`)}</h3>
            <p className="text-sm text-gray-600 mt-1">{t(`admin.timeline.alerts.items.${alert.descKey}`)}</p>
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {alert.time}
              </span>
              {alert.count && (
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {alert.count} {t('admin.timeline.alerts.affectedLearners')}
                </span>
              )}
            </div>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </div>
    </motion.div>
  );
};

// Milestone Component for Gantt Chart
const MilestoneRow = ({ milestone, t }) => {
  const statusColors = {
    completed: 'bg-green-500',
    inProgress: 'bg-blue-500',
    upcoming: 'bg-gray-300',
    delayed: 'bg-red-500'
  };

  const statusTextColors = {
    completed: 'text-green-700',
    inProgress: 'text-blue-700',
    upcoming: 'text-gray-700',
    delayed: 'text-red-700'
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-pink-300 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{t(`admin.timeline.milestones.items.${milestone.nameKey}`)}</h4>
          <p className="text-sm text-gray-600 mt-1">{milestone.date}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusTextColors[milestone.status]} bg-opacity-20`}
              style={{ backgroundColor: `${statusColors[milestone.status]}20` }}>
          {t(`admin.timeline.milestones.statuses.${milestone.status}`)}
        </span>
      </div>
      
      {/* Timeline Bar */}
      <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`absolute h-full ${statusColors[milestone.status]} transition-all duration-500 flex items-center justify-end pr-3`}
          style={{ width: `${milestone.progress}%` }}
        >
          {milestone.progress > 15 && (
            <span className="text-xs font-bold text-white">{milestone.progress}%</span>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-3 gap-4 mt-3 text-xs text-gray-600">
        <div>
          <span className="font-medium">{t('admin.timeline.milestones.startDate')}:</span> {milestone.startDate}
        </div>
        <div>
          <span className="font-medium">{t('admin.timeline.milestones.endDate')}:</span> {milestone.endDate}
        </div>
        <div>
          <span className="font-medium">{t('admin.timeline.milestones.owner')}:</span> {milestone.owner}
        </div>
      </div>
    </div>
  );
};

const TimelineReporting = () => {
  const { t } = useTranslation();
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [exportFormat, setExportFormat] = useState('pdf');

  // Chart data for alert trends
  const alertTrendData = [
    { weekKey: 'week1', critical: 12, warning: 18, info: 8 },
    { weekKey: 'week2', critical: 8, warning: 15, info: 12 },
    { weekKey: 'week3', critical: 6, warning: 12, info: 10 },
    { weekKey: 'week4', critical: 4, warning: 10, info: 14 }
  ].map(item => ({ ...item, week: t(`admin.timeline.charts.${item.weekKey}`) }));

  // Engagement trend data
  const engagementTrendData = [
    { monthKey: 'jan', atRisk: 15, active: 120, inactive: 10 },
    { monthKey: 'feb', atRisk: 12, active: 135, inactive: 8 },
    { monthKey: 'mar', atRisk: 8, active: 142, inactive: 5 },
    { monthKey: 'apr', atRisk: 10, active: 138, inactive: 7 }
  ].map(item => ({ ...item, month: t(`admin.timeline.charts.months.${item.monthKey}`) }));

  // Milestone status distribution
  const milestoneStatusData = [
    { nameKey: 'completed', value: 1, color: '#10b981' },
    { nameKey: 'inProgress', value: 2, color: '#3b82f6' },
    { nameKey: 'upcoming', value: 2, color: '#94a3b8' },
    { nameKey: 'delayed', value: 1, color: '#ef4444' }
  ].map(item => ({ ...item, name: t(`admin.timeline.milestones.statuses.${item.nameKey}`) }));

  // Alert category distribution
  const alertDistributionData = [
    { nameKey: 'critical', value: 2, color: '#ef4444' },
    { nameKey: 'warning', value: 2, color: '#f59e0b' },
    { nameKey: 'info', value: 2, color: '#3b82f6' }
  ].map(item => ({ ...item, name: t(`admin.timeline.alerts.filters.${item.nameKey}`) }));

  // Learner risk analysis
  const riskAnalysisData = [
    { categoryKey: 'engagement', current: 85, target: 95, fullMark: 100 },
    { categoryKey: 'completion', current: 73, target: 85, fullMark: 100 },
    { categoryKey: 'assessment', current: 80, target: 90, fullMark: 100 },
    { categoryKey: 'attendance', current: 88, target: 95, fullMark: 100 },
    { categoryKey: 'participation', current: 75, target: 85, fullMark: 100 }
  ].map(item => ({ ...item, category: t(`admin.timeline.charts.riskCategories.${item.categoryKey}`) }));

  // Function to download chart data as CSV
  const downloadChartData = (data, filename) => {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(',')).join('\n');
    const csv = `${headers}\n${rows}`;
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  // Mock data for alerts/notifications
  const alerts = [
    {
      id: 1,
      titleKey: 'lowEngagement',
      descKey: 'lowEngagementDesc',
      severity: 'critical',
      time: '2h ago',
      count: 5,
      learners: ['Anna Schmidt', 'Klaus Fischer', 'Laura Hoffmann', 'Felix Richter', 'Thomas Bauer']
    },
    {
      id: 2,
      titleKey: 'moduleDropout',
      descKey: 'moduleDropoutDesc',
      severity: 'critical',
      time: '4h ago',
      count: 3,
      learners: ['Peter Becker', 'Sarah Schneider', 'Julia Zimmermann']
    },
    {
      id: 3,
      titleKey: 'assessmentDue',
      descKey: 'assessmentDueDesc',
      severity: 'warning',
      time: '1d ago',
      count: 8
    },
    {
      id: 4,
      titleKey: 'lowQuizScores',
      descKey: 'lowQuizScoresDesc',
      severity: 'warning',
      time: '2d ago',
      count: 4
    },
    {
      id: 5,
      titleKey: 'courseCompletion',
      descKey: 'courseCompletionDesc',
      severity: 'info',
      time: '3h ago',
      count: 3
    },
    {
      id: 6,
      titleKey: 'newModuleRelease',
      descKey: 'newModuleReleaseDesc',
      severity: 'info',
      time: '1d ago'
    }
  ];

  // Mock data for milestones
  const milestones = [
    {
      id: 1,
      nameKey: 'digitalLiteracyLaunch',
      date: 'Jan 15, 2024',
      startDate: 'Jan 1, 2024',
      endDate: 'Jan 15, 2024',
      progress: 100,
      status: 'completed',
      owner: 'Admin Team'
    },
    {
      id: 2,
      nameKey: 'labourRightsModule',
      date: 'Feb 20, 2024',
      startDate: 'Feb 1, 2024',
      endDate: 'Feb 20, 2024',
      progress: 85,
      status: 'inProgress',
      owner: 'Legal Team'
    },
    {
      id: 3,
      nameKey: 'communicationSkills',
      date: 'Mar 10, 2024',
      startDate: 'Mar 1, 2024',
      endDate: 'Mar 10, 2024',
      progress: 65,
      status: 'inProgress',
      owner: 'HR Team'
    },
    {
      id: 4,
      nameKey: 'financialPlanning',
      date: 'Apr 5, 2024',
      startDate: 'Apr 1, 2024',
      endDate: 'Apr 5, 2024',
      progress: 0,
      status: 'upcoming',
      owner: 'Finance Team'
    },
    {
      id: 5,
      nameKey: 'workplaceSafety',
      date: 'Feb 25, 2024',
      startDate: 'Feb 10, 2024',
      endDate: 'Feb 25, 2024',
      progress: 45,
      status: 'delayed',
      owner: 'Safety Team'
    },
    {
      id: 6,
      nameKey: 'entrepreneurship',
      date: 'May 1, 2024',
      startDate: 'May 1, 2024',
      endDate: 'May 15, 2024',
      progress: 0,
      status: 'upcoming',
      owner: 'Business Team'
    }
  ];

  // Report types
  const reportTypes = [
    { key: 'programOverview', icon: Target, color: 'blue' },
    { key: 'learnerProgress', icon: Users, color: 'green' },
    { key: 'moduleAnalytics', icon: FileText, color: 'purple' },
    { key: 'engagementMetrics', icon: TrendingDown, color: 'orange' },
    { key: 'alertsSummary', icon: Bell, color: 'red' },
    { key: 'milestonesReport', icon: Calendar, color: 'pink' }
  ];

  const filteredAlerts = filterSeverity === 'all' 
    ? alerts 
    : alerts.filter(a => a.severity === filterSeverity);

  const handleExport = (reportKey) => {
    // Simulate export functionality
    const formats = {
      pdf: 'PDF',
      excel: 'Excel',
      csv: 'CSV'
    };
    alert(t('admin.timeline.export.exportingMessage', { 
      report: t(`admin.timeline.export.reportTypes.${reportKey}`),
      format: formats[exportFormat]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-pink-200 p-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg">
              <Calendar className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{t('admin.timeline.title')}</h1>
              <p className="text-gray-600 mt-1">{t('admin.timeline.subtitle')}</p>
            </div>
          </div>

          {/* KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <KPICard icon={Bell} title={t('admin.timeline.kpis.activeAlerts')} value="6" color="red" />
            <KPICard icon={Users} title={t('admin.timeline.kpis.atRiskLearners')} value="8" change={-12} color="yellow" />
            <KPICard icon={Target} title={t('admin.timeline.kpis.upcomingMilestones')} value="2" color="blue" />
            <KPICard icon={CheckCircle2} title={t('admin.timeline.kpis.completedMilestones')} value="1" change={25} color="green" />
          </div>
        </div>

        {/* Alerts & Notifications Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Bell className="h-5 w-5 text-pink-500" />
                {t('admin.timeline.alerts.title')}
              </h2>
              <p className="text-sm text-gray-500 mt-1">{t('admin.timeline.alerts.subtitle')}</p>
            </div>
            
            {/* Severity Filter */}
            <div className="relative">
              <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="pl-8 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-300 transition-all appearance-none cursor-pointer"
              >
                <option value="all">{t('admin.timeline.alerts.filters.all')}</option>
                <option value="critical">{t('admin.timeline.alerts.filters.critical')}</option>
                <option value="warning">{t('admin.timeline.alerts.filters.warning')}</option>
                <option value="info">{t('admin.timeline.alerts.filters.info')}</option>
              </select>
            </div>
          </div>

          {/* Alerts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredAlerts.map((alert, index) => (
              <AlertCard 
                key={alert.id} 
                alert={alert} 
                onClick={() => setSelectedAlert(alert)}
                t={t}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredAlerts.length === 0 && (
            <div className="text-center py-12">
              <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-3" />
              <p className="text-gray-500">{t('admin.timeline.alerts.noAlerts')}</p>
            </div>
          )}
        </div>

        {/* Analytics Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Alert Trends Over Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-pink-500" />
                  {t('admin.timeline.charts.alertTrends')}
                </h2>
                <p className="text-sm text-gray-500 mt-1">{t('admin.timeline.charts.alertTrendsDesc')}</p>
              </div>
              <button
                onClick={() => downloadChartData(alertTrendData, 'alert-trends')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                title="Download Data"
              >
                <Download className="h-5 w-5 text-gray-600 group-hover:text-pink-600" />
              </button>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={alertTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="critical" stroke="#ef4444" strokeWidth={2} name={t('admin.timeline.alerts.filters.critical')} />
                  <Line type="monotone" dataKey="warning" stroke="#f59e0b" strokeWidth={2} name={t('admin.timeline.alerts.filters.warning')} />
                  <Line type="monotone" dataKey="info" stroke="#3b82f6" strokeWidth={2} name={t('admin.timeline.alerts.filters.info')} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Learner Engagement Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  {t('admin.timeline.charts.engagementTrends')}
                </h2>
                <p className="text-sm text-gray-500 mt-1">{t('admin.timeline.charts.engagementTrendsDesc')}</p>
              </div>
              <button
                onClick={() => downloadChartData(engagementTrendData, 'engagement-trends')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                title="Download Data"
              >
                <Download className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
              </button>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={engagementTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="active" stackId="1" stroke="#10b981" fill="#86efac" name={t('admin.timeline.charts.active')} />
                  <Area type="monotone" dataKey="atRisk" stackId="1" stroke="#f59e0b" fill="#fcd34d" name={t('admin.timeline.charts.atRisk')} />
                  <Area type="monotone" dataKey="inactive" stackId="1" stroke="#ef4444" fill="#fca5a5" name={t('admin.timeline.charts.inactive')} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

        </div>

        {/* Distribution Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Alert Distribution */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{t('admin.timeline.charts.alertDistribution')}</h2>
                <p className="text-xs text-gray-500 mt-1">{t('admin.timeline.charts.currentPeriod')}</p>
              </div>
              <button
                onClick={() => downloadChartData(alertDistributionData, 'alert-distribution')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Download className="h-4 w-4 text-gray-600" />
              </button>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={alertDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {alertDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Milestone Status Distribution */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{t('admin.timeline.charts.milestoneStatus')}</h2>
                <p className="text-xs text-gray-500 mt-1">{t('admin.timeline.charts.totalMilestones', { count: 6 })}</p>
              </div>
              <button
                onClick={() => downloadChartData(milestoneStatusData, 'milestone-status')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Download className="h-4 w-4 text-gray-600" />
              </button>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={milestoneStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {milestoneStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Risk Analysis Radar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{t('admin.timeline.charts.riskAnalysis')}</h2>
                <p className="text-xs text-gray-500 mt-1">{t('admin.timeline.charts.currentVsTarget')}</p>
              </div>
              <button
                onClick={() => downloadChartData(riskAnalysisData, 'risk-analysis')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Download className="h-4 w-4 text-gray-600" />
              </button>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={riskAnalysisData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="category" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name={t('admin.timeline.charts.current')} dataKey="current" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.6} />
                  <Radar name={t('admin.timeline.charts.target')} dataKey="target" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

        </div>

        {/* Timeline / Milestone Tracker Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-pink-500" />
              {t('admin.timeline.milestones.title')}
            </h2>
            <p className="text-sm text-gray-500 mt-1">{t('admin.timeline.milestones.subtitle')}</p>
          </div>

          {/* Milestones List */}
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <MilestoneRow milestone={milestone} t={t} />
              </motion.div>
            ))}
          </div>

          {/* Timeline Summary */}
          <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">1</div>
              <div className="text-xs text-gray-600 mt-1">{t('admin.timeline.milestones.statuses.completed')}</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">2</div>
              <div className="text-xs text-gray-600 mt-1">{t('admin.timeline.milestones.statuses.inProgress')}</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">2</div>
              <div className="text-xs text-gray-600 mt-1">{t('admin.timeline.milestones.statuses.upcoming')}</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">1</div>
              <div className="text-xs text-gray-600 mt-1">{t('admin.timeline.milestones.statuses.delayed')}</div>
            </div>
          </div>
        </div>

        {/* Custom Reports Export Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Download className="h-5 w-5 text-pink-500" />
              {t('admin.timeline.export.title')}
            </h2>
            <p className="text-sm text-gray-500 mt-1">{t('admin.timeline.export.subtitle')}</p>
          </div>

          {/* Export Format Selection */}
          <div className="mb-6 flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">{t('admin.timeline.export.selectFormat')}:</span>
            <div className="flex gap-2">
              {[
                { key: 'pdf', icon: FileText, color: 'red' },
                { key: 'excel', icon: FileSpreadsheet, color: 'green' },
                { key: 'csv', icon: File, color: 'blue' }
              ].map(format => (
                <button
                  key={format.key}
                  onClick={() => setExportFormat(format.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                    exportFormat === format.key
                      ? `border-${format.color}-500 bg-${format.color}-50 text-${format.color}-700`
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <format.icon className="h-4 w-4" />
                  {t(`admin.timeline.export.formats.${format.key}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Report Types Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportTypes.map((report, index) => (
              <motion.div
                key={report.key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-gradient-to-br from-${report.color}-50 to-white border-2 border-${report.color}-100 rounded-xl p-5 hover:shadow-lg hover:border-${report.color}-300 transition-all cursor-pointer group`}
                onClick={() => handleExport(report.key)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-3 bg-${report.color}-100 rounded-lg group-hover:scale-110 transition-transform`}>
                    <report.icon className={`h-6 w-6 text-${report.color}-600`} />
                  </div>
                  <Download className={`h-5 w-5 text-${report.color}-400 group-hover:text-${report.color}-600 transition-colors`} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {t(`admin.timeline.export.reportTypes.${report.key}`)}
                </h3>
                <p className="text-xs text-gray-600">
                  {t(`admin.timeline.export.reportDescriptions.${report.key}`)}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Bulk Export */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button className="w-full py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
              <Zap className="h-5 w-5" />
              {t('admin.timeline.export.exportAll')}
            </button>
          </div>
        </div>

        {/* Alert Detail Modal */}
        <AnimatePresence>
          {selectedAlert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedAlert(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
              >
                {/* Modal Header */}
                <div className="flex items-start justify-between mb-6 pb-4 border-b">
                  <div className="flex items-start gap-3">
                    <div className={`p-3 rounded-lg ${
                      selectedAlert.severity === 'critical' ? 'bg-red-100' :
                      selectedAlert.severity === 'warning' ? 'bg-yellow-100' :
                      'bg-blue-100'
                    }`}>
                      {selectedAlert.severity === 'critical' && <AlertTriangle className="h-6 w-6 text-red-600" />}
                      {selectedAlert.severity === 'warning' && <AlertCircle className="h-6 w-6 text-yellow-600" />}
                      {selectedAlert.severity === 'info' && <Bell className="h-6 w-6 text-blue-600" />}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {t(`admin.timeline.alerts.items.${selectedAlert.titleKey}`)}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">{selectedAlert.time}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedAlert(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{t('admin.timeline.alertModal.description')}</h3>
                    <p className="text-gray-600">
                      {t(`admin.timeline.alerts.items.${selectedAlert.descKey}`)}
                    </p>
                  </div>

                  {selectedAlert.learners && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {t('admin.timeline.alertModal.affectedLearners')} ({selectedAlert.learners.length})
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                        {selectedAlert.learners.map((learner, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                            <Users className="h-4 w-4 text-gray-400" />
                            {learner}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{t('admin.timeline.alertModal.recommendedActions')}</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        {t('admin.timeline.alertModal.action1')}
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        {t('admin.timeline.alertModal.action2')}
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        {t('admin.timeline.alertModal.action3')}
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex gap-3 mt-6 pt-4 border-t">
                  <button className="flex-1 py-2 px-4 bg-pink-500 text-white font-medium rounded-lg hover:bg-pink-600 transition-colors">
                    {t('admin.timeline.alertModal.takeAction')}
                  </button>
                  <button 
                    onClick={() => setSelectedAlert(null)}
                    className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    {t('admin.timeline.alertModal.dismiss')}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default TimelineReporting;

