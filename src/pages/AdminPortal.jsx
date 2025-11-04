import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, BookOpen, Trophy, Users, Calendar, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminPortal = () => {
  const navigate = useNavigate();

  const adminSections = [
    {
      id: 1,
      title: 'Overview Summary',
      icon: BarChart3,
      description: 'Dashboard analytics and key metrics',
      path: '/admin-portal/overview',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      title: 'Module & Assessment Analytics',
      icon: BookOpen,
      description: 'Track learning outcomes and assessments',
      path: '/admin-portal/analytics',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      id: 3,
      title: 'Engagement & Gamification',
      icon: Trophy,
      description: 'Monitor engagement and achievements',
      path: '/admin-portal/engagement',
      gradient: 'from-green-500 to-green-600'
    },
    {
      id: 4,
      title: 'Stakeholder & Resources',
      icon: Users,
      description: 'Manage users and resource allocation',
      path: '/admin-portal/stakeholders',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      id: 5,
      title: 'Timeline & Reporting',
      icon: Calendar,
      description: 'Schedule and generate reports',
      path: '/admin-portal/reporting',
      gradient: 'from-pink-500 to-pink-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-50/50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 mt-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl mb-6 shadow-2xl">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Admin Portal
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage your LMS settings, analytics, and configurations
          </p>
        </div>

        {/* Floating Cards - Center Right */}
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
            {adminSections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(section.path)}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl border-2 border-gray-200 hover:border-blue-400 transition-all duration-300 cursor-pointer"
              >
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                
                <div className="relative">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${section.gradient} rounded-xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <section.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {section.description}
                  </p>

                  {/* Arrow Icon */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
