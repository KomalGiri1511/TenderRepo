import React, { useState } from 'react';
import { 
  Users, FileText, BarChart3, AlertTriangle, 
  Download, BookOpen, Building2, GraduationCap 
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, ScatterChart, Scatter, ZAxis,
  PieChart, Pie, Cell, LineChart, Line, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { useTranslation } from 'react-i18next';

// KPI Card Component
const KPICard = ({ icon: Icon, title, value, change }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-orange-100 hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2 bg-orange-100 rounded-lg">
        <Icon className="h-5 w-5 text-orange-600" />
      </div>
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
    </div>
    <div className="flex items-baseline justify-between">
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <span className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {change > 0 ? '+' : ''}{change}%
      </span>
    </div>
  </div>
);

// Resource Row Component
const ResourceRow = ({ resource, t }) => (
  <div className="grid grid-cols-5 py-3 px-4 hover:bg-orange-50 rounded-lg transition-colors">
    <div className="font-medium">{t(`admin.stakeholder.resourceTable.resources.${resource.nameKey}`)}</div>
    <div className="text-gray-600">{t(`admin.stakeholder.resourceTable.types.${resource.typeKey}`)}</div>
    <div className="flex items-center gap-2">
      <span>{resource.downloads}</span>
      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-orange-400 rounded-full" 
             style={{ width: `${(resource.downloads / 150) * 100}%` }} />
      </div>
    </div>
    <div className="text-gray-600">{resource.lastAccess}</div>
    <div className="text-orange-600">{t(`admin.stakeholder.resourceTable.pathways.${resource.pathwayKey}`)}</div>
  </div>
);

const StakeholderResources = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('employer');

  // Sample data for charts and tables - with translation support
  const stakeholderData = {
    employer: [
      { groupKey: 'groupA', completion: 75, score: 82, learners: 12, engagement: 85 },
      { groupKey: 'groupB', completion: 68, score: 75, learners: 10, engagement: 72 },
      { groupKey: 'groupC', completion: 82, score: 88, learners: 15, engagement: 90 },
    ].map(item => ({ ...item, group: t(`admin.stakeholder.performanceByType.groups.${item.groupKey}`) })),
    educator: [
      { groupKey: 'groupA', completion: 85, score: 90, learners: 8, engagement: 88 },
      { groupKey: 'groupB', completion: 78, score: 85, learners: 6, engagement: 82 },
      { groupKey: 'groupC', completion: 92, score: 94, learners: 11, engagement: 95 },
    ].map(item => ({ ...item, group: t(`admin.stakeholder.performanceByType.groups.${item.groupKey}`) })),
    learner: [
      { groupKey: 'groupA', completion: 65, score: 72, learners: 5, engagement: 70 },
      { groupKey: 'groupB', completion: 58, score: 68, learners: 4, engagement: 65 },
      { groupKey: 'groupC', completion: 71, score: 76, learners: 6, engagement: 75 },
    ].map(item => ({ ...item, group: t(`admin.stakeholder.performanceByType.groups.${item.groupKey}`) })),
  };

  const resourceTrendData = [
    { monthKey: 'jan', downloads: 120, views: 240, shares: 80 },
    { monthKey: 'feb', downloads: 150, views: 280, shares: 100 },
    { monthKey: 'mar', downloads: 180, views: 320, shares: 120 },
    { monthKey: 'apr', downloads: 220, views: 380, shares: 150 },
    { monthKey: 'may', downloads: 250, views: 420, shares: 180 },
  ].map(item => ({ ...item, month: t(`admin.stakeholder.resourceTrends.months.${item.monthKey}`) }));

  const resourceTypeData = [
    { nameKey: 'pdfs', value: 35, color: '#22c55e' },
    { nameKey: 'videos', value: 25, color: '#3b82f6' },
    { nameKey: 'interactive', value: 20, color: '#8b5cf6' },
    { nameKey: 'documents', value: 15, color: '#f59e0b' },
    { nameKey: 'other', value: 5, color: '#64748b' },
  ].map(item => ({ ...item, name: t(`admin.stakeholder.resourceType.types.${item.nameKey}`) }));

  const engagementMetrics = [
    { metricKey: 'resourceAccess', value: 85, fullMark: 100 },
    { metricKey: 'completionRate', value: 75, fullMark: 100 },
    { metricKey: 'interaction', value: 90, fullMark: 100 },
    { metricKey: 'feedback', value: 70, fullMark: 100 },
    { metricKey: 'sharing', value: 65, fullMark: 100 },
  ].map(item => ({ ...item, metric: t(`admin.stakeholder.engagementMetrics.${item.metricKey}`) }));

  const resourcesData = [
    {
      nameKey: 'digitalSafetyToolkit',
      typeKey: 'pdf',
      downloads: 124,
      completion: 92,
      lastAccess: '2024-03-15',
      pathwayKey: 'allPathways',
      weeklyDownloads: [45, 52, 48, 65],
      size: 150
    },
    {
      nameKey: 'workplaceRightsGuide',
      typeKey: 'document',
      downloads: 98,
      completion: 88,
      lastAccess: '2024-03-14',
      pathwayKey: 'basicAdvanced',
      weeklyDownloads: [35, 42, 38, 41],
      size: 120
    },
    {
      nameKey: 'safetyTrainingVideo',
      typeKey: 'video',
      downloads: 75,
      completion: 78,
      lastAccess: '2024-03-13',
      pathwayKey: 'intermediate',
      weeklyDownloads: [28, 32, 35, 30],
      size: 100
    },
    {
      nameKey: 'employeeHandbook',
      typeKey: 'pdf',
      downloads: 110,
      completion: 85,
      lastAccess: '2024-03-15',
      pathwayKey: 'basic',
      weeklyDownloads: [40, 45, 42, 50],
      size: 130
    },
    {
      nameKey: 'leadershipTraining',
      typeKey: 'interactive',
      downloads: 85,
      completion: 95,
      lastAccess: '2024-03-14',
      pathwayKey: 'advanced',
      weeklyDownloads: [30, 35, 38, 40],
      size: 110
    },
    {
      nameKey: 'communicationSkills',
      typeKey: 'video',
      downloads: 92,
      completion: 82,
      lastAccess: '2024-03-13',
      pathwayKey: 'allPathways',
      weeklyDownloads: [35, 38, 40, 45],
      size: 140
    },
    {
      nameKey: 'projectManagementGuide',
      typeKey: 'document',
      downloads: 68,
      completion: 75,
      lastAccess: '2024-03-12',
      pathwayKey: 'advanced',
      weeklyDownloads: [25, 28, 30, 32],
      size: 90
    },
    {
      nameKey: 'teamBuildingWorkshop',
      typeKey: 'interactive',
      downloads: 55,
      completion: 98,
      lastAccess: '2024-03-11',
      pathwayKey: 'intermediate',
      weeklyDownloads: [20, 25, 28, 30],
      size: 80
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-orange-200 p-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg">
              <Users className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{t('admin.stakeholder.title')}</h1>
              <p className="text-gray-600 mt-1">{t('admin.stakeholder.subtitle')}</p>
            </div>
          </div>

          {/* KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <KPICard icon={Users} title={t('admin.stakeholder.kpis.totalStakeholders')} value="15" change={8} />
            <KPICard icon={BarChart3} title={t('admin.stakeholder.kpis.activeUsers')} value="12" change={12} />
            <KPICard icon={FileText} title={t('admin.stakeholder.kpis.avgCompletion')} value="76%" change={5} />
            <KPICard icon={Download} title={t('admin.stakeholder.kpis.totalDownloads')} value="807" change={15} />
          </div>
        </div>

        {/* Stakeholder Segmentation */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">{t('admin.stakeholder.performanceByType.title')}</h2>
          
          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab('employer')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'employer' ? 'bg-orange-100 text-orange-700' : 'text-gray-600 hover:bg-orange-50'
              }`}
            >
              <Building2 className="h-4 w-4" />
              {t('admin.stakeholder.performanceByType.tabs.employer')}
            </button>
            <button
              onClick={() => setActiveTab('educator')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'educator' ? 'bg-orange-100 text-orange-700' : 'text-gray-600 hover:bg-orange-50'
              }`}
            >
              <GraduationCap className="h-4 w-4" />
              {t('admin.stakeholder.performanceByType.tabs.educator')}
            </button>
            <button
              onClick={() => setActiveTab('learner')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'learner' ? 'bg-orange-100 text-orange-700' : 'text-gray-600 hover:bg-orange-50'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              {t('admin.stakeholder.performanceByType.tabs.learner')}
            </button>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Chart */}
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stakeholderData[activeTab]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="group" />
                  <YAxis />
                  <Tooltip />
                  <Legend 
                    formatter={(value) => {
                      const labels = {
                        'completion': t('admin.stakeholder.performanceByType.chartLabels.completion'),
                        'score': t('admin.stakeholder.performanceByType.chartLabels.avgScore'),
                        'engagement': t('admin.stakeholder.performanceByType.chartLabels.engagement')
                      };
                      return labels[value] || value;
                    }}
                  />
                  <Bar dataKey="completion" fill="#f97316" />
                  <Bar dataKey="score" fill="#fb923c" />
                  <Bar dataKey="engagement" fill="#fdba74" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Engagement Radar */}
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} data={engagementMetrics}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name={t('admin.stakeholder.engagementMetrics.engagement')} dataKey="value" stroke="#f97316" fill="#f97316" fillOpacity={0.5} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Resource Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Resource Type Distribution */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">{t('admin.stakeholder.resourceType.title')}</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={resourceTypeData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {resourceTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Resource Trends */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">{t('admin.stakeholder.resourceTrends.title')}</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={resourceTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend 
                    formatter={(value) => {
                      const labels = {
                        'downloads': t('admin.stakeholder.resourceTrends.labels.downloads'),
                        'views': t('admin.stakeholder.resourceTrends.labels.views'),
                        'shares': t('admin.stakeholder.resourceTrends.labels.shares')
                      };
                      return labels[value] || value;
                    }}
                  />
                  <Line type="monotone" dataKey="downloads" stroke="#f97316" />
                  <Line type="monotone" dataKey="views" stroke="#22c55e" />
                  <Line type="monotone" dataKey="shares" stroke="#3b82f6" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Resource Utilization Table */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">{t('admin.stakeholder.resourceTable.title')}</h2>
          
          {/* Table Header */}
          <div className="grid grid-cols-5 py-2 px-4 bg-gray-50 rounded-lg font-medium text-sm text-gray-600 mb-2">
            <div>{t('admin.stakeholder.resourceTable.headers.resourceName')}</div>
            <div>{t('admin.stakeholder.resourceTable.headers.type')}</div>
            <div>{t('admin.stakeholder.resourceTable.headers.downloads')}</div>
            <div>{t('admin.stakeholder.resourceTable.headers.lastAccess')}</div>
            <div>{t('admin.stakeholder.resourceTable.headers.usedByPathway')}</div>
          </div>

          {/* Table Body */}
          <div className="space-y-2">
            {resourcesData.map((resource, index) => (
              <ResourceRow key={index} resource={resource} t={t} />
            ))}
          </div>
        </div>

        {/* Resource Impact Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800">{t('admin.stakeholder.insights.topResource.title')}</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{t('admin.stakeholder.resourceTable.resources.digitalSafetyToolkit')}</p>
            <p className="text-gray-600 mt-1">{t('admin.stakeholder.insights.topResource.downloadsThisMonth', { count: 124 })}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800">{t('admin.stakeholder.insights.employerEngagement.title')}</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{t('admin.stakeholder.insights.employerEngagement.increase', { percent: 40 })}</p>
            <p className="text-gray-600 mt-1">{t('admin.stakeholder.insights.employerEngagement.inResourceAccess')}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BookOpen className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800">{t('admin.stakeholder.insights.immersiveLearning.title')}</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{t('admin.stakeholder.insights.immersiveLearning.moreDownloads', { multiplier: 2 })}</p>
            <p className="text-gray-600 mt-1">{t('admin.stakeholder.insights.immersiveLearning.byImmersiveLearners')}</p>
          </div>
        </div>

        {/* Correlation & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">{t('admin.stakeholder.resourceCorrelation.title')}</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    type="number" 
                    dataKey="downloads" 
                    name={t('admin.stakeholder.resourceCorrelation.xAxisLabel')} 
                    domain={[50, 130]}
                    label={{ value: t('admin.stakeholder.resourceCorrelation.xAxisLabel'), position: 'bottom' }}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="completion" 
                    name={t('admin.stakeholder.resourceCorrelation.yAxisLabel')} 
                    domain={[70, 100]}
                    label={{ value: t('admin.stakeholder.resourceCorrelation.yAxisLabel'), angle: -90, position: 'left' }}
                  />
                  <ZAxis type="number" dataKey="size" range={[60, 200]} />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
                            <p className="font-medium text-gray-900">{t(`admin.stakeholder.resourceTable.resources.${data.nameKey}`)}</p>
                            <p className="text-sm text-gray-600">{t('admin.stakeholder.resourceCorrelation.tooltipLabels.downloads')}: {data.downloads}</p>
                            <p className="text-sm text-gray-600">{t('admin.stakeholder.resourceCorrelation.tooltipLabels.completion')}: {data.completion}%</p>
                            <p className="text-sm text-gray-600">{t('admin.stakeholder.resourceCorrelation.tooltipLabels.type')}: {t(`admin.stakeholder.resourceTable.types.${data.typeKey}`)}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend formatter={() => t('admin.stakeholder.resourceCorrelation.legendLabel')} />
                  <Scatter 
                    data={resourcesData} 
                    fill="#f97316"
                    shape={(props) => {
                      const { cx, cy, fill } = props;
                      return (
                        <circle 
                          cx={cx} 
                          cy={cy} 
                          r={8} 
                          stroke="#fff"
                          strokeWidth={2}
                          fill={fill}
                          className="hover:opacity-80 transition-opacity cursor-pointer"
                        />
                      );
                    }}
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('admin.stakeholder.resourceAlerts.title')}</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-red-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium">{t('admin.stakeholder.resourceAlerts.lowUsageEducators')}</p>
                  <p className="text-sm text-gray-600">{t('admin.stakeholder.resourceAlerts.belowAverage', { percent: 25 })}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-yellow-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-medium">{t('admin.stakeholder.resourceAlerts.outdatedResources')}</p>
                  <p className="text-sm text-gray-600">{t('admin.stakeholder.resourceAlerts.lastUpdated')}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-orange-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-medium">{t('admin.stakeholder.resourceAlerts.formatPreference')}</p>
                  <p className="text-sm text-gray-600">{t('admin.stakeholder.resourceAlerts.videoHigherEngagement', { multiplier: 2 })}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakeholderResources;
