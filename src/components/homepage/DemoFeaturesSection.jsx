import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Brain, 
  MessageSquare, 
  Users, 
  FileText, 
  TrendingUp,
  Info,
  Play,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const FeatureCard = ({ icon: Icon, title, description, status, demoLabel, tooltip }) => (
  <Card className="border-2 bg-white hover:shadow-lg transition-all duration-300 hover:border-[#004E9A]/30 group relative">
    {demoLabel && (
      <div className="absolute -top-2 -right-2 bg-[#004E9A] text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg">
        DEMO
      </div>
    )}
    <CardHeader className="pb-3">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-[#004E9A]/10">
          <Icon className="w-6 h-6 text-[#004E9A]" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Inter', 'Nunito', sans-serif" }}>
              {title}
            </CardTitle>
            {tooltip && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-xs">{tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <Badge className={`mt-2 ${
            status === 'active' ? 'bg-green-100 text-green-700 border-green-200' :
            status === 'demo' ? 'bg-blue-100 text-blue-700 border-blue-200' :
            'bg-gray-100 text-gray-700 border-gray-200'
          }`}>
            {status === 'active' ? 'Live' : status === 'demo' ? 'Demo Mode' : 'Coming Soon'}
          </Badge>
        </div>
      </div>
    </CardHeader>
    <CardContent className="pt-0">
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <Button className="w-full bg-[#004E9A] hover:bg-[#003d7a] text-white">
        {status === 'active' ? 'Access Now' : 'View Demo'}
      </Button>
    </CardContent>
  </Card>
);

const AssessmentCard = ({ title, type, questions, duration, status }) => (
  <Card className="border bg-white hover:shadow-md transition-all duration-200">
    <CardContent className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{type}</span>
            <span>•</span>
            <span>{questions} questions</span>
            <span>•</span>
            <span>{duration}</span>
          </div>
        </div>
        <Badge className={`text-xs ${
          status === 'completed' ? 'bg-green-100 text-green-700' :
          status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
          'bg-gray-100 text-gray-700'
        }`}>
          {status === 'completed' ? 'Completed' : status === 'in-progress' ? 'In Progress' : 'Not Started'}
        </Badge>
      </div>
      <Button size="sm" className="w-full">
        {status === 'completed' ? 'Review Results' : status === 'in-progress' ? 'Continue' : 'Start Assessment'}
      </Button>
    </CardContent>
  </Card>
);

export function DemoFeaturesSection() {
  const features = [
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Comprehensive learning analytics with progress tracking, performance insights, and detailed reporting capabilities.",
      status: "demo",
      tooltip: "Advanced analytics system providing detailed insights into learner progress, engagement metrics, and performance analytics"
    },
    {
      icon: Brain,
      title: "AI-Powered Chatbot",
      description: "Intelligent learning assistant providing 24/7 support, course recommendations, and personalized learning guidance.",
      status: "demo",
      tooltip: "AI-driven chatbot system offering personalized learning support, instant answers, and intelligent course recommendations"
    },
    {
      icon: Users,
      title: "Collaborative Learning",
      description: "Social learning features including discussion forums, peer collaboration, and group project management tools.",
      status: "demo",
      tooltip: "Social learning platform enabling peer-to-peer collaboration, group discussions, and community-driven learning experiences"
    },
    {
      icon: FileText,
      title: "Assessment Engine",
      description: "Advanced assessment system with multiple question types, automated grading, and detailed feedback mechanisms.",
      status: "demo",
      tooltip: "Comprehensive assessment platform supporting various question types, automated grading, and detailed performance analytics"
    }
  ];

  const assessments = [
    {
      title: "Digital Literacy Assessment",
      type: "Quiz",
      questions: 25,
      duration: "30 min",
      status: "completed"
    },
    {
      title: "Labour Rights Knowledge Test",
      type: "Exam",
      questions: 50,
      duration: "60 min",
      status: "in-progress"
    },
    {
      title: "Workplace Safety Certification",
      type: "Practical",
      questions: 15,
      duration: "45 min",
      status: "not-started"
    }
  ];

  return (
    <section className="w-full bg-gradient-to-br from-gray-50 to-blue-50/50 py-8 px-6 rounded-2xl shadow-sm border border-gray-100 relative">
      {/* Demo Label */}
      <div className="absolute -top-2 -right-2 bg-[#004E9A] text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg">
        DEMO FEATURES
      </div>
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2" style={{ fontFamily: "'Inter', 'Nunito', sans-serif" }}>
          <span className="text-2xl">🚀</span>
          Platform Features
        </h2>
        <p className="text-sm text-gray-600 max-w-3xl">
          Explore the key features and capabilities of our learning management system
        </p>
      </div>

      {/* Assessment Section */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Assessment Management */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Inter', 'Nunito', sans-serif" }}>
                Assessment Center
              </h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-xs">Comprehensive assessment management with automated grading and detailed analytics</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="space-y-3">
              {assessments.map((assessment, index) => (
                <AssessmentCard key={index} {...assessment} />
              ))}
            </div>
          </div>

          {/* Chatbot Demo */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Inter', 'Nunito', sans-serif" }}>
                AI Learning Assistant
              </h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-xs">AI-powered chatbot providing instant learning support and personalized guidance</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Card className="border-2 bg-white">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-[#004E9A] rounded-full flex items-center justify-center">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">AI Assistant</p>
                      <p className="text-xs text-gray-500">Ready to help with your learning</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700 text-xs">Online</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-700">"Hi! I can help you with course questions, provide study tips, or recommend learning resources. What would you like to know?"</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-[#004E9A] hover:bg-[#003d7a] text-white">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Start Chat
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Play className="w-4 h-4 mr-2" />
                        Demo
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer - Platform Capabilities */}
      <div className="max-w-7xl mx-auto mt-8">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2" style={{ fontFamily: "'Inter', 'Nunito', sans-serif" }}>
            <TrendingUp className="w-5 h-5 text-[#004E9A]" />
            Platform Capabilities Overview
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-xs font-medium text-gray-700">Automated Grading</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-xs font-medium text-gray-700">Real-time Analytics</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-xs font-medium text-gray-700">Collaborative Tools</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Brain className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="text-xs font-medium text-gray-700">AI Integration</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DemoFeaturesSection;
