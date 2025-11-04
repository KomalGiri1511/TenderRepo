import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, TrendingUp, Target, Award, AlertCircle, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, Bar, PieChart, Pie, RadarChart, Radar, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Cell, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line
} from 'recharts';
import { cn } from '@/lib/utils';

// Sample data
const moduleProgressData = [
  { name: 'Module 1', completion: 85, engagement: 90 },
  { name: 'Module 2', completion: 70, engagement: 75 },
  { name: 'Module 3', completion: 45, engagement: 60 },
  { name: 'Module 4', completion: 20, engagement: 30 },
];

const assessmentData = [
  { name: 'Correct', value: 65, color: '#86efac' },
  { name: 'Incorrect', value: 25, color: '#fca5a5' },
  { name: 'Unattempted', value: 10, color: '#cbd5e1' },
];

// Heatmap data for module engagement
const heatmapData = [
  { module: 'Module 1', week1: 90, week2: 85, week3: 88, week4: 92 },
  { module: 'Module 2', week1: 75, week2: 80, week3: 78, week4: 85 },
  { module: 'Module 3', week1: 60, week2: 65, week3: 70, week4: 68 },
  { module: 'Module 4', week1: 30, week2: 35, week3: 40, week4: 45 },
];

const difficultyData = [
  { difficulty: 'Easy', score: 85 },
  { difficulty: 'Medium', score: 70 },
  { difficulty: 'Hard', score: 55 },
];

const pathwayData = [
  { module: 'Basics', recommended: 100, actual: 100, status: 'Complete' },
  { module: 'Intermediate', recommended: 100, actual: 85, status: 'In Progress' },
  { module: 'Advanced', recommended: 100, actual: 45, status: 'Started' },
  { module: 'Expert', recommended: 100, actual: 15, status: 'Just Started' },
  { module: 'Master', recommended: 100, actual: 0, status: 'Not Started' },
];

export function CourseAssessmentInsights() {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const slides = [
    { id: 'module-progress', component: 'ModuleProgress' },
    { id: 'pathway-tracker', component: 'PathwayTracker' },
    { id: 'assessment-breakdown', component: 'AssessmentBreakdown' },
    { id: 'engagement-heatmap', component: 'EngagementHeatmap' },
    { id: 'strengths-weaknesses', component: 'StrengthsWeaknesses' },
  ];

  const pathwayCompletion = Math.round(
    (pathwayData.reduce((acc, item) => acc + item.actual, 0) / 
    pathwayData.reduce((acc, item) => acc + item.recommended, 0)) * 100
  );

  // Auto-swipe every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  // Detect mobile for responsive chart heights
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const handler = (e) => setIsMobile(e.matches);
    handler(mq);
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const renderSlide = () => {
    const slide = slides[currentSlide];

    switch (slide.component) {
      case 'ModuleProgress':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">{t('insights.moduleProgress')}</h3>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg">
                  <div className="w-4 h-4 bg-blue-400 rounded"></div>
                  <span className="font-medium">{t('insights.completion')}</span>
                </div>
                <div className="flex items-center gap-2 bg-purple-50 px-3 py-1.5 rounded-lg">
                  <div className="w-4 h-4 bg-purple-400 rounded"></div>
                  <span className="font-medium">{t('insights.engagement')}</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={isMobile ? 220 : 320}>
              <BarChart data={moduleProgressData} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 14, fill: '#374151', fontWeight: 500 }} />
                <YAxis tick={{ fontSize: 14, fill: '#374151', fontWeight: 500 }} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '13px',
                    padding: '10px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Legend wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }} />
                <Bar dataKey="completion" fill="#93c5fd" name="Completion %" radius={[8, 8, 0, 0]} barSize={50} />
                <Bar dataKey="engagement" fill="#c4b5fd" name="Engagement %" radius={[8, 8, 0, 0]} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );

      case 'PathwayTracker':
        return (
          <div className="space-y-6">
            {/* Header with Completion Badge */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{t('insights.pathwayTracker')}</h3>
              </div>
              <div className="text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2.5 rounded-full shadow-lg">
                {pathwayCompletion}% {t('insights.pathwayMatch')}
              </div>
            </div>

            {/* Visual Progress Bars */}
            <div className="space-y-4">
              {pathwayData.map((item, idx) => {
                const progressPercentage = item.actual;
                const isComplete = progressPercentage === 100;
                const isInProgress = progressPercentage > 0 && progressPercentage < 100;
                const isNotStarted = progressPercentage === 0;

                return (
                  <div key={idx} className="space-y-2">
                    {/* Module Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-gray-700 w-28">{item.module}</span>
                        <div className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          isComplete 
                            ? 'bg-green-100 text-green-700 border border-green-300' 
                            : isInProgress 
                            ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                            : 'bg-gray-100 text-gray-600 border border-gray-300'
                        }`}>
                          {item.status}
                        </div>
                      </div>
                      <span className="text-lg font-bold text-blue-600">{progressPercentage}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative w-full h-10 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
                      {/* Recommended Background (Full Width) */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100"></div>
                      
                      {/* Actual Progress */}
                      <div 
                        className={`absolute inset-y-0 left-0 rounded-lg transition-all duration-1000 ${
                          isComplete 
                            ? 'bg-gradient-to-r from-green-400 to-green-500' 
                            : isInProgress 
                            ? 'bg-gradient-to-r from-blue-400 to-blue-600' 
                            : 'bg-gray-300'
                        }`}
                        style={{ width: `${progressPercentage}%` }}
                      >
                        {progressPercentage > 10 && (
                          <div className="h-full flex items-center justify-end pr-3">
                            <span className="text-xs font-bold text-white drop-shadow-md">
                              {progressPercentage}%
                            </span>
                          </div>
                        )}
                      </div>

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
                  </div>
                );
              })}
            </div>

            {/* Statistics Summary */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t-2 border-gray-200">
              <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-600">
                  {pathwayData.filter(m => m.actual === 100).length}
                </div>
                <div className="text-xs text-gray-600 font-medium mt-1">Completed Modules</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">
                  {pathwayData.filter(m => m.actual > 0 && m.actual < 100).length}
                </div>
                <div className="text-xs text-gray-600 font-medium mt-1">In Progress</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-2xl font-bold text-gray-600">
                  {pathwayData.filter(m => m.actual === 0).length}
                </div>
                <div className="text-xs text-gray-600 font-medium mt-1">Not Started</div>
              </div>
            </div>
          </div>
        );

      case 'AssessmentBreakdown':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('insights.assessmentBreakdown')}</h3>
              <ResponsiveContainer width="100%" height={isMobile ? 200 : 250}>
                <PieChart>
                  <Pie
                    data={assessmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ value }) => `${value}%`}
                    labelLine={false}
                  >
                    {assessmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={3} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '13px',
                      padding: '10px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Legend wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-2.5 mt-2">
                {assessmentData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                      <span className="text-gray-800 font-medium">{t(`insights.${item.name.toLowerCase()}`)}</span>
                    </div>
                    <span className="font-bold text-gray-900 text-base">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('insights.difficultyAnalysis')}</h3>
              <ResponsiveContainer width="100%" height={isMobile ? 200 : 250}>
                <RadarChart data={difficultyData}>
                  <PolarGrid stroke="#cbd5e1" strokeWidth={2} />
                  <PolarAngleAxis dataKey="difficulty" tick={{ fontSize: 14, fill: '#374151', fontWeight: 600 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <Radar 
                    name="Score" 
                    dataKey="score" 
                    stroke="#60a5fa" 
                    fill="#93c5fd" 
                    fillOpacity={0.7}
                    strokeWidth={3}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '13px',
                      padding: '10px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Legend wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }} />
                </RadarChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {difficultyData.map((item) => (
                  <div key={item.difficulty} className="flex items-center justify-between bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
                    <span className="text-sm font-medium text-gray-800">{item.difficulty}</span>
                    <span className="font-bold text-blue-600 text-base">{item.score}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'EngagementHeatmap':
        const getHeatmapColor = (value) => {
          if (value >= 80) return '#d1fae5'; // Very light green
          if (value >= 60) return '#fef3c7'; // Very light yellow
          if (value >= 40) return '#fed7aa'; // Very light orange
          return '#fecaca'; // Very light red
        };

        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-bold text-gray-900">{t('insights.engagementHeatmap')}</h3>
            </div>
            
            {/* Heatmap Grid */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-3 bg-gray-100 rounded-tl-lg font-bold text-gray-800">
                      {t('insights.module')}
                    </th>
                    <th className="text-center p-3 bg-gray-100 font-bold text-gray-800">{t('insights.week')} 1</th>
                    <th className="text-center p-3 bg-gray-100 font-bold text-gray-800">{t('insights.week')} 2</th>
                    <th className="text-center p-3 bg-gray-100 font-bold text-gray-800">{t('insights.week')} 3</th>
                    <th className="text-center p-3 bg-gray-100 rounded-tr-lg font-bold text-gray-800">{t('insights.week')} 4</th>
                  </tr>
                </thead>
                <tbody>
                  {heatmapData.map((row, idx) => (
                    <tr key={idx} className="border-t border-gray-200">
                      <td className="p-3 font-semibold text-gray-800 bg-gray-50">
                        {row.module}
                      </td>
                      <td className="p-3 text-center">
                        <div 
                          className="mx-auto w-16 h-16 rounded-lg flex items-center justify-center font-bold text-gray-700 text-base border-2 border-gray-200 shadow-sm transition-transform hover:scale-110"
                          style={{ backgroundColor: getHeatmapColor(row.week1) }}
                        >
                          {row.week1}%
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <div 
                          className="mx-auto w-16 h-16 rounded-lg flex items-center justify-center font-bold text-gray-700 text-base border-2 border-gray-200 shadow-sm transition-transform hover:scale-110"
                          style={{ backgroundColor: getHeatmapColor(row.week2) }}
                        >
                          {row.week2}%
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <div 
                          className="mx-auto w-16 h-16 rounded-lg flex items-center justify-center font-bold text-gray-700 text-base border-2 border-gray-200 shadow-sm transition-transform hover:scale-110"
                          style={{ backgroundColor: getHeatmapColor(row.week3) }}
                        >
                          {row.week3}%
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <div 
                          className="mx-auto w-16 h-16 rounded-lg flex items-center justify-center font-bold text-gray-700 text-base border-2 border-gray-200 shadow-sm transition-transform hover:scale-110"
                          style={{ backgroundColor: getHeatmapColor(row.week4) }}
                        >
                          {row.week4}%
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-4 mt-6 bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-semibold text-gray-700">{t('insights.legend')}:</span>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#fecaca] border-2 border-gray-300"></div>
                <span className="text-sm text-gray-700">Low (&lt;40%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#fed7aa] border-2 border-gray-300"></div>
                <span className="text-sm text-gray-700">Medium (40-59%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#fef3c7] border-2 border-gray-300"></div>
                <span className="text-sm text-gray-700">Good (60-79%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#d1fae5] border-2 border-gray-300"></div>
                <span className="text-sm text-gray-700">Excellent (≥80%)</span>
              </div>
            </div>
          </div>
        );

      case 'StrengthsWeaknesses':
        const strengthsWeaknesses = {
          strengths: [
            { topicKey: 'labourLaws', score: 92, difficulty: t('insights.easy') },
            { topicKey: 'digitalTools', score: 88, difficulty: t('insights.medium') },
            { topicKey: 'compliance', score: 85, difficulty: t('insights.easy') },
          ],
          weaknesses: [
            { topicKey: 'advancedPolicies', score: 45, difficulty: t('insights.hard') },
            { topicKey: 'legalFramework', score: 52, difficulty: t('insights.hard') },
            { topicKey: 'caseStudies', score: 58, difficulty: t('insights.medium') },
          ],
        };
        
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-6 w-6 text-green-500" />
                <h3 className="text-xl font-bold text-gray-900">{t('insights.strengths')}</h3>
              </div>
              <div className="space-y-3">
                {strengthsWeaknesses.strengths.map((item, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-base font-bold text-gray-900">{t(`insights.topics.${item.topicKey}`)}</span>
                      <span className="text-2xl font-bold text-green-500">{item.score}%</span>
                    </div>
                    <div className="w-full bg-green-100 rounded-full h-3 mb-2">
                      <div 
                        className="bg-gradient-to-r from-green-300 to-green-400 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${item.score}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 font-medium bg-white border border-green-200 px-2 py-1 rounded-full">{item.difficulty}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="h-6 w-6 text-orange-500" />
                <h3 className="text-xl font-bold text-gray-900">{t('insights.weaknesses')}</h3>
              </div>
              <div className="space-y-3">
                {strengthsWeaknesses.weaknesses.map((item, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-base font-bold text-gray-900">{t(`insights.topics.${item.topicKey}`)}</span>
                      <span className="text-2xl font-bold text-orange-500">{item.score}%</span>
                    </div>
                    <div className="w-full bg-orange-100 rounded-full h-3 mb-2">
                      <div 
                        className="bg-gradient-to-r from-orange-300 to-orange-400 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${item.score}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 font-medium bg-white border border-orange-200 px-2 py-1 rounded-full">{item.difficulty}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500 rounded-lg">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">{t('insights.title')}</h2>
            <p className="text-xs sm:text-sm text-gray-600">{t('insights.subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative min-h-[420px] sm:min-h-[480px]">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-all"
        >
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>
        <button
          onClick={nextSlide}
          className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-all"
        >
          <ChevronRight className="h-5 w-5 text-gray-700" />
        </button>

        {/* Slide Content */}
        <div className="px-3 sm:px-12 py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="min-h-[360px] sm:min-h-[420px]"
            >
              {renderSlide()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-4 sm:mt-6">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                currentSlide === idx 
                  ? "w-8 bg-blue-600" 
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseAssessmentInsights;

