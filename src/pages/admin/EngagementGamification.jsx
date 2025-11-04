import React from 'react';
import { 
  Trophy, BarChart3, Users, Clock, Medal, 
  Star, Video, Gamepad2, BookOpen, AlertTriangle 
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie,
  Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  RadialBarChart, RadialBar
} from 'recharts';
import { useTranslation } from 'react-i18next';

// KPI Card Component
const KPICard = ({ icon: Icon, title, value, change }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2 bg-green-100 rounded-lg">
        <Icon className="h-5 w-5 text-green-600" />
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

// Leaderboard Row Component
const LeaderboardRow = ({ rank, name, points, badges, pathway }) => (
  <div className="grid grid-cols-5 py-3 px-4 hover:bg-green-50 rounded-lg transition-colors cursor-pointer">
    <div className="font-semibold">{rank}</div>
    <div>{name}</div>
    <div>{points}</div>
    <div>{badges}</div>
    <div className="text-green-600">{pathway}</div>
  </div>
);

const EngagementGamification = () => {
  const { t } = useTranslation();

  // Sample data for charts - with translation support
  const interactionData = [
    { nameKey: 'mon', videos: 65, immersive: 45, gamified: 35, resources: 28 },
    { nameKey: 'tue', videos: 59, immersive: 49, gamified: 38, resources: 32 },
    { nameKey: 'wed', videos: 80, immersive: 55, gamified: 42, resources: 35 },
    { nameKey: 'thu', videos: 81, immersive: 56, gamified: 40, resources: 30 },
    { nameKey: 'fri', videos: 76, immersive: 61, gamified: 45, resources: 40 },
    { nameKey: 'sat', videos: 51, immersive: 49, gamified: 30, resources: 25 },
    { nameKey: 'sun', videos: 48, immersive: 43, gamified: 28, resources: 20 },
  ].map(item => ({ ...item, name: t(`admin.engagement.contentInteraction.days.${item.nameKey}`) }));

  const engagementMetrics = [
    { subjectKey: 'videoCompletion', A: 85, B: 90, fullMark: 100 },
    { subjectKey: 'quizPerformance', A: 75, B: 80, fullMark: 100 },
    { subjectKey: 'discussion', A: 65, B: 70, fullMark: 100 },
    { subjectKey: 'assignments', A: 80, B: 85, fullMark: 100 },
    { subjectKey: 'peerReview', A: 70, B: 75, fullMark: 100 },
  ].map(item => ({ ...item, subject: t(`admin.engagement.engagementMetrics.metrics.${item.subjectKey}`) }));

  const badgeDistribution = [
    { nameKey: 'beginner', value: 400, color: '#22c55e' },
    { nameKey: 'intermediate', value: 300, color: '#3b82f6' },
    { nameKey: 'advanced', value: 200, color: '#8b5cf6' },
    { nameKey: 'expert', value: 100, color: '#f59e0b' },
  ].map(item => ({ ...item, name: t(`admin.engagement.badgeDistribution.levels.${item.nameKey}`) }));

  const progressData = [
    { nameKey: 'week1', completion: 32, fill: '#8884d8' },
    { nameKey: 'week2', completion: 45, fill: '#83a6ed' },
    { nameKey: 'week3', completion: 68, fill: '#8dd1e1' },
    { nameKey: 'week4', completion: 85, fill: '#82ca9d' },
  ].map(item => ({ ...item, name: t(`admin.engagement.weeklyProgress.${item.nameKey}`) }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-green-200 p-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
              <Trophy className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{t('admin.engagement.title')}</h1>
              <p className="text-gray-600 mt-1">{t('admin.engagement.subtitle')}</p>
            </div>
          </div>

          {/* KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <KPICard icon={Users} title={t('admin.engagement.kpis.activeLearnersToday')} value="15" change={12} />
            <KPICard icon={Clock} title={t('admin.engagement.kpis.avgTimeSpent')} value="2.5h" change={8} />
            <KPICard icon={Medal} title={t('admin.engagement.kpis.totalBadges')} value="58" change={15} />
            <KPICard icon={Star} title={t('admin.engagement.kpis.avgPoints')} value="456" change={-3} />
          </div>
        </div>

        {/* Content Interaction Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">{t('admin.engagement.contentInteraction.title')}</h2>
              <select className="rounded-lg border-gray-200 text-sm">
                <option>{t('admin.engagement.contentInteraction.thisWeek')}</option>
                <option>{t('admin.engagement.contentInteraction.thisMonth')}</option>
                <option>{t('admin.engagement.contentInteraction.thisQuarter')}</option>
              </select>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={interactionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend 
                    formatter={(value) => {
                      const labels = {
                        'videos': t('admin.engagement.contentInteraction.types.videos'),
                        'immersive': t('admin.engagement.contentInteraction.types.immersive'),
                        'gamified': t('admin.engagement.contentInteraction.types.gamified'),
                        'resources': t('admin.engagement.contentInteraction.types.resources')
                      };
                      return labels[value] || value;
                    }}
                  />
                  <Area type="monotone" dataKey="videos" stackId="1" stroke="#3b82f6" fill="#93c5fd" />
                  <Area type="monotone" dataKey="immersive" stackId="1" stroke="#22c55e" fill="#86efac" />
                  <Area type="monotone" dataKey="gamified" stackId="1" stroke="#8b5cf6" fill="#c4b5fd" />
                  <Area type="monotone" dataKey="resources" stackId="1" stroke="#f59e0b" fill="#fcd34d" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gamification Analytics */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">{t('admin.engagement.leaderboard.title')}</h2>
            <div className="space-y-2">
              <div className="grid grid-cols-5 py-2 px-4 bg-gray-50 rounded-lg font-medium text-sm text-gray-600">
                <div>{t('admin.engagement.leaderboard.rank')}</div>
                <div>{t('admin.engagement.leaderboard.name')}</div>
                <div>{t('admin.engagement.leaderboard.points')}</div>
                <div>{t('admin.engagement.leaderboard.badges')}</div>
                <div>{t('admin.engagement.leaderboard.pathway')}</div>
              </div>
              <LeaderboardRow rank="#1" name={t('admin.engagement.learners.learner1')} points="2,456" badges="12" pathway={t('admin.engagement.leaderboard.pathways.advanced')} />
              <LeaderboardRow rank="#2" name={t('admin.engagement.learners.learner2')} points="2,123" badges="10" pathway={t('admin.engagement.leaderboard.pathways.intermediate')} />
              <LeaderboardRow rank="#3" name={t('admin.engagement.learners.learner3')} points="1,897" badges="8" pathway={t('admin.engagement.leaderboard.pathways.basic')} />
            </div>
          </div>
        </div>

        {/* Pathway Engagement */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">{t('admin.engagement.engagementMetrics.title')}</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} data={engagementMetrics}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name={t('admin.engagement.engagementMetrics.currentPeriod')} dataKey="A" stroke="#22c55e" fill="#22c55e" fillOpacity={0.5} />
                  <Radar name={t('admin.engagement.engagementMetrics.previousPeriod')} dataKey="B" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">{t('admin.engagement.badgeDistribution.title')}</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={badgeDistribution}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {badgeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Weekly Progress */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">{t('admin.engagement.weeklyProgress.title')}</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart 
                innerRadius="30%" 
                outerRadius="100%" 
                data={progressData} 
                startAngle={180} 
                endAngle={0}
              >
                <RadialBar
                  minAngle={15}
                  background
                  clockWise={true}
                  dataKey="completion"
                  label={{ fill: '#666', position: 'insideStart' }}
                />
                <Legend />
                <Tooltip formatter={(value) => `${value}% ${t('admin.engagement.weeklyProgress.completion')}`} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('admin.engagement.topEngaged.title')}</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
                <Medal className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">{t('admin.engagement.learners.learner1')}</p>
                  <p className="text-sm text-gray-600">{t('admin.engagement.topEngaged.badgesEarned', { count: 12 })}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-green-50/50 rounded-lg">
                <Medal className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">{t('admin.engagement.learners.learner2')}</p>
                  <p className="text-sm text-gray-600">{t('admin.engagement.topEngaged.badgesEarned', { count: 10 })}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-green-50/30 rounded-lg">
                <Medal className="h-5 w-5 text-green-400" />
                <div>
                  <p className="font-medium">{t('admin.engagement.learners.learner3')}</p>
                  <p className="text-sm text-gray-600">{t('admin.engagement.topEngaged.badgesEarned', { count: 8 })}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('admin.engagement.lowEngagement.title')}</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-red-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium">{t('admin.engagement.lowEngagement.inactive7Days', { count: 5 })}</p>
                  <p className="text-sm text-gray-600">{t('admin.engagement.lowEngagement.recommendations.sendReminder')}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-yellow-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-medium">{t('admin.engagement.lowEngagement.incompleteModules', { count: 3 })}</p>
                  <p className="text-sm text-gray-600">{t('admin.engagement.lowEngagement.recommendations.scheduleFollowup')}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-orange-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-medium">{t('admin.engagement.lowEngagement.lowQuizCompletion')}</p>
                  <p className="text-sm text-gray-600">{t('admin.engagement.lowEngagement.recommendations.reviewDifficulty')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngagementGamification;
