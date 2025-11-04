import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useChatbot } from '../contexts/ChatbotContext';
import { useLearningPersonalization } from '../hooks/useLearningPersonalization';
import PersonalizedCourseCard from '../components/courses/PersonalizedCourseCard';
import PersonalizedLearningWidget from '../components/homepage/PersonalizedLearningWidget';
import { sampleCourses } from '../data/sampleCourses';
import { RotateCcw, Bot, Eye, Headphones, Hand, Trophy } from 'lucide-react';

const ChatbotDemo = () => {
  const { 
    showChatbot, 
    hasCompletedAssessment, 
    learningStyle, 
    learningScores, 
    startAssessment, 
    resetAssessment 
  } = useChatbot();

  const { 
    getPersonalizedGreeting, 
    getLearningStyleRecommendations,
    shouldShowVisualContent,
    shouldShowAudioContent,
    shouldShowInteractiveContent,
    shouldShowGamifiedContent
  } = useLearningPersonalization();

  const handleEnroll = (courseId) => {
    console.log('Enrolling in course:', courseId);
  };

  const handleView = (courseId) => {
    console.log('Viewing course:', courseId);
  };

  const getLearningStyleIcon = (style) => {
    const icons = {
      V: Eye,
      A: Headphones,
      K: Hand,
      G: Trophy
    };
    return icons[style] || Bot;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Athena Chatbot Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience personalized learning with Athena, your AI learning assistant. 
            Complete the assessment to see how content adapts to your learning style.
          </p>
        </div>

        {/* Assessment Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-6 h-6" />
              Assessment Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            {hasCompletedAssessment ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Assessment Completed!
                    </h3>
                    <p className="text-gray-600">
                      Learning Style: <strong>{learningStyle}</strong>
                    </p>
                    <p className="text-sm text-gray-500">
                      {getPersonalizedGreeting()}
                    </p>
                  </div>
                </div>
                
                {/* Learning Style Scores */}
                <div className="grid grid-cols-4 gap-4">
                  {Object.entries(learningScores || {}).map(([style, score]) => {
                    const Icon = getLearningStyleIcon(style);
                    const isDominant = style === learningStyle;
                    return (
                      <div 
                        key={style}
                        className={`p-4 rounded-lg border-2 ${
                          isDominant 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{style}</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          {score}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-4">
                  <Button onClick={startAssessment} variant="outline">
                    <Bot className="w-4 h-4 mr-2" />
                    Retake Assessment
                  </Button>
                  <Button onClick={resetAssessment} variant="outline">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset All Data
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Bot className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Ready to Start Your Learning Journey?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Take our quick 10-question assessment to get personalized learning recommendations.
                  </p>
                  <Button onClick={startAssessment} size="lg">
                    <Bot className="w-5 h-5 mr-2" />
                    Start Assessment
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Personalized Learning Widget */}
        {hasCompletedAssessment && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PersonalizedLearningWidget />
            
            {/* Learning Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Your Learning Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getLearningStyleRecommendations().map((recommendation, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-sm font-bold">{index + 1}</span>
                      </div>
                      <p className="text-sm text-gray-700">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Content Type Preferences */}
        {hasCompletedAssessment && (
          <Card>
            <CardHeader>
              <CardTitle>Content Preferences Based on Your Learning Style</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className={`p-4 rounded-lg border-2 ${
                  shouldShowVisualContent() 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-5 h-5" />
                    <span className="font-medium">Visual</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {shouldShowVisualContent() ? 'Recommended' : 'Not preferred'}
                  </p>
                </div>
                
                <div className={`p-4 rounded-lg border-2 ${
                  shouldShowAudioContent() 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Headphones className="w-5 h-5" />
                    <span className="font-medium">Audio</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {shouldShowAudioContent() ? 'Recommended' : 'Not preferred'}
                  </p>
                </div>
                
                <div className={`p-4 rounded-lg border-2 ${
                  shouldShowInteractiveContent() 
                    ? 'border-orange-500 bg-orange-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Hand className="w-5 h-5" />
                    <span className="font-medium">Interactive</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {shouldShowInteractiveContent() ? 'Recommended' : 'Not preferred'}
                  </p>
                </div>
                
                <div className={`p-4 rounded-lg border-2 ${
                  shouldShowGamifiedContent() 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-5 h-5" />
                    <span className="font-medium">Gamified</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {shouldShowGamifiedContent() ? 'Recommended' : 'Not preferred'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Personalized Course Cards */}
        {hasCompletedAssessment && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Personalized Course Recommendations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sampleCourses.map((course) => (
                <PersonalizedCourseCard
                  key={course.id}
                  course={course}
                  onEnroll={handleEnroll}
                  onView={handleView}
                />
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              How to Test the Chatbot
            </h3>
            <div className="space-y-2 text-blue-800">
              <p>1. Click "Start Assessment" to begin the learning style assessment</p>
              <p>2. Answer the 10 questions about your learning preferences</p>
              <p>3. See how the content adapts based on your learning style</p>
              <p>4. Try different learning styles by resetting and retaking the assessment</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatbotDemo;
