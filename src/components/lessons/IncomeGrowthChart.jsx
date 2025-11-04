import React, { useState, useEffect } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Play, Pause, Maximize2, BarChart3, PieChartIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const IncomeGrowthChart = () => {
  const [animatedData, setAnimatedData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chartType, setChartType] = useState('bar'); // 'bar' or 'pie'

  const chartData = [
    { platform: 'Facebook', engagement: 70, displayValue: '70%', color: '#3b82f6' },
    { platform: 'LMS Portal', engagement: 60, displayValue: '60%', color: '#8b5cf6' },
    { platform: 'LinkedIn', engagement: 55, displayValue: '55%', color: '#0ea5e9' },
    { platform: 'Telegram', engagement: 45, displayValue: '45%', color: '#06b6d4' }
  ];

  const COLORS = chartData.map(item => item.color);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      const animationDuration = 1200;
      const steps = 50;
      const stepDuration = animationDuration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        const animated = chartData.map(item => ({
          ...item,
          engagement: Math.floor(item.engagement * progress)
        }));

        setAnimatedData(animated);

        if (currentStep >= steps) {
          clearInterval(interval);
          setAnimatedData(chartData);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-gray-200 rounded-md shadow-sm p-3">
          <p className="font-semibold text-sm text-gray-800">{data.platform || label}</p>
          <p className="text-indigo-600 font-bold text-md">
            {data.displayValue}
          </p>
          <p className="text-xs text-gray-500">Engagement Rate</p>
        </div>
      );
    }
    return null;
  };

  const formatYAxis = (value) => {
    return `${value}%`;
  };

  const handleSpeakToggle = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const text = "Data tells the real story. Analytics reveal which channels and messages resonate most with audiences. Facebook leads with 70% engagement, followed by LMS Portal at 60%, LinkedIn at 55%, and Telegram at 45%. By tracking likes, shares, and completion rates, GIZ communicators refined their vocational reform campaigns and focused on what truly matters. This data-driven approach helped adapt communication strategies for maximum impact.";

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleFullView = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
        {/* Compact Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Analytics and Insights</h2>
            <p className="text-xs text-gray-500">Campaign Engagement by Platform</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleSpeakToggle}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100"
              title="Play audio summary"
            >
              {isSpeaking ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            </Button>
            <Button
              onClick={() => setChartType(chartType === 'bar' ? 'pie' : 'bar')}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-full bg-purple-50 text-purple-600 hover:bg-purple-100"
              title={chartType === 'bar' ? 'Switch to pie chart' : 'Switch to bar chart'}
            >
              {chartType === 'bar' ? <PieChartIcon className="h-3 w-3" /> : <BarChart3 className="h-3 w-3" />}
            </Button>
            <Button
              onClick={handleFullView}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
              title="Full view"
            >
              <Maximize2 className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Chart Container */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'bar' ? (
                <BarChart
                  data={animatedData}
                  margin={{
                    top: 10,
                    right: 20,
                    left: 20,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid 
                    strokeDasharray="2 2" 
                    stroke="#e5e7eb" 
                    opacity={0.5}
                  />
                  <XAxis 
                    dataKey="platform" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fontWeight: 500, fill: '#374151' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#6b7280' }}
                    tickFormatter={formatYAxis}
                    width={40}
                    domain={[0, 100]}
                  />
                  <Tooltip 
                    content={<CustomTooltip />}
                    cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }}
                  />
                  <Bar 
                    dataKey="engagement" 
                    radius={[3, 3, 0, 0]}
                    animationDuration={1000}
                    animationEasing="ease-out"
                    barSize={40}
                  >
                    {animatedData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              ) : (
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ platform, engagement }) => `${platform}: ${engagement}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="engagement"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Insights - Compact Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {chartData.map((item) => (
            <div 
              key={item.platform}
              className="bg-gray-50 border-l-4 rounded-md p-3 hover:shadow-sm transition-all"
              style={{ borderLeftColor: item.color }}
            >
              <div className="text-xs font-medium text-gray-600 mb-1">
                {item.platform}
              </div>
              <div className="text-lg font-bold" style={{ color: item.color }}>
                {item.displayValue}
              </div>
              <div className="text-[10px] text-gray-500">Engagement</div>
            </div>
          ))}
        </div>

        {/* Key Insight Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-md p-4">
          <p className="text-xs text-gray-700 leading-relaxed">
            <strong className="text-gray-900">📊 Key Insight:</strong> Data tells the real story. Analytics reveal which channels and messages resonate most with audiences. By tracking likes, shares, and completion rates, communicators can refine campaigns and focus on what truly matters.
          </p>
        </div>
      </div>

      {/* Full View Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-6">
          <DialogHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-2xl font-bold">Analytics and Insights</DialogTitle>
                <p className="text-sm text-gray-500 mt-1">Campaign Engagement by Platform</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setChartType(chartType === 'bar' ? 'pie' : 'bar')}
                  className="flex items-center gap-2"
                >
                  {chartType === 'bar' ? <PieChartIcon className="h-4 w-4" /> : <BarChart3 className="h-4 w-4" />}
                  {chartType === 'bar' ? 'Pie Chart' : 'Bar Chart'}
                </Button>
                <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          </DialogHeader>
          
          <div className="py-4">
            {/* Chart in Modal */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === 'bar' ? (
                    <BarChart
                      data={chartData}
                      margin={{
                        top: 15,
                        right: 25,
                        left: 25,
                        bottom: 15,
                      }}
                    >
                      <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke="#e5e7eb" 
                        opacity={0.5}
                      />
                      <XAxis 
                        dataKey="platform" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fontWeight: 600, fill: '#374151' }}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: '#6b7280' }}
                        tickFormatter={formatYAxis}
                        width={45}
                        domain={[0, 100]}
                      />
                      <Tooltip 
                        content={<CustomTooltip />}
                        cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
                      />
                      <Bar 
                        dataKey="engagement" 
                        radius={[4, 4, 0, 0]}
                        barSize={60}
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  ) : (
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine
                        label={({ platform, engagement }) => `${platform}: ${engagement}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="engagement"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                    </PieChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>

            {/* Key Insights in Modal */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {chartData.map((item) => (
                <div 
                  key={item.platform}
                  className="bg-white border-l-4 border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                  style={{ borderLeftColor: item.color }}
                >
                  <div className="text-sm font-semibold text-gray-700 mb-2">
                    {item.platform}
                  </div>
                  <div className="text-2xl font-bold mb-1" style={{ color: item.color }}>
                    {item.displayValue}
                  </div>
                  <div className="text-xs text-gray-500">
                    Engagement Rate
                  </div>
                </div>
              ))}
            </div>

            {/* Insights Summary in Modal */}
            <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>📊</span> Analytics Insights
              </h4>
              <div className="space-y-3 text-sm text-gray-700">
                <p>
                  <strong>Data tells the real story.</strong> Analytics reveal which channels and messages resonate most with audiences. Facebook leads with 70% engagement, showing the power of social media for quick updates and visual storytelling.
                </p>
                <p>
                  By tracking likes, shares, and completion rates, GIZ communicators refined their vocational reform campaigns and focused resources on high-performing platforms. This data-driven approach helped adapt communication strategies for maximum impact.
                </p>
                <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-blue-200">
                  <div className="text-center">
                    <div className="text-2xl mb-1">👥</div>
                    <p className="text-xs font-semibold text-gray-900">Track</p>
                    <p className="text-[11px] text-gray-600">Audience behavior</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1">📈</div>
                    <p className="text-xs font-semibold text-gray-900">Analyze</p>
                    <p className="text-[11px] text-gray-600">Performance metrics</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1">🎯</div>
                    <p className="text-xs font-semibold text-gray-900">Optimize</p>
                    <p className="text-[11px] text-gray-600">Campaign strategy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IncomeGrowthChart;