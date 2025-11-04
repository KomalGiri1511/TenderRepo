import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Lightbulb, 
  Target, 
  TrendingUp, 
  BookOpen,
  Video,
  Headphones,
  Gamepad2,
  Eye,
  Hand,
  Trophy,
  ArrowRight
} from 'lucide-react';
import { useLearningPersonalization } from '../../hooks/useLearningPersonalization';

const PersonalizedLearningWidget = () => {
  const { 
    learningStyle, 
    getLearningStyleRecommendations,
    getPersonalizedGreeting,
    shouldShowVisualContent,
    shouldShowAudioContent,
    shouldShowInteractiveContent,
    shouldShowGamifiedContent
  } = useLearningPersonalization();

  if (!learningStyle) {
    return null;
  }

  const getLearningStyleInfo = () => {
    const styles = {
      V: {
        name: "Visual Learner",
        emoji: "🎨",
        color: "from-blue-500 to-cyan-500",
        icon: Eye,
        description: "You learn best through visual content and imagery"
      },
      A: {
        name: "Auditory Learner", 
        emoji: "🎧",
        color: "from-green-500 to-emerald-500",
        icon: Headphones,
        description: "You learn best through listening and audio content"
      },
      K: {
        name: "Interactive Learner",
        emoji: "🤝", 
        color: "from-orange-500 to-amber-500",
        icon: Hand,
        description: "You learn best through hands-on activities"
      },
      G: {
        name: "Game-Driven Learner",
        emoji: "🏆",
        color: "from-purple-500 to-pink-500", 
        icon: Trophy,
        description: "You learn best through gamified experiences"
      }
    };
    return styles[learningStyle];
  };

  const getRecommendedContent = () => {
    const content = [];
    
    if (shouldShowVisualContent()) {
      content.push({
        type: "Video Lessons",
        icon: Video,
        count: 12,
        description: "Visual-rich video content"
      });
    }
    
    if (shouldShowAudioContent()) {
      content.push({
        type: "Audio Podcasts", 
        icon: Headphones,
        count: 8,
        description: "Narrated learning content"
      });
    }
    
    if (shouldShowInteractiveContent()) {
      content.push({
        type: "Interactive Simulations",
        icon: Gamepad2,
        count: 5,
        description: "Hands-on learning experiences"
      });
    }
    
    if (shouldShowGamifiedContent()) {
      content.push({
        type: "Learning Games",
        icon: Trophy,
        count: 15,
        description: "Gamified learning challenges"
      });
    }

    return content;
  };

  const styleInfo = getLearningStyleInfo();
  const recommendations = getLearningStyleRecommendations();
  const recommendedContent = getRecommendedContent();

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 bg-gradient-to-br ${styleInfo.color} rounded-full flex items-center justify-center`}>
            <span className="text-2xl">{styleInfo.emoji}</span>
          </div>
          <div>
            <CardTitle className="text-lg text-gray-900">
              Your Learning Profile
            </CardTitle>
            <p className="text-sm text-gray-600">
              {styleInfo.description}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Personalized Greeting */}
        <div className="bg-white rounded-lg p-4 border border-blue-100">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 mb-1">
                Personalized Learning Path
              </p>
              <p className="text-xs text-gray-600">
                {getPersonalizedGreeting()}
              </p>
            </div>
          </div>
        </div>

        {/* Recommended Content Types */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            Recommended Content for You
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {recommendedContent.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-3 border border-gray-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-900">
                      {item.type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {item.description}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {item.count}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Learning Tips */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            Learning Tips for You
          </h4>
          <div className="space-y-2">
            {recommendations.slice(0, 3).map((tip, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-xs text-gray-600">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <Button 
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          size="sm"
        >
          <Target className="w-4 h-4 mr-2" />
          View My Learning Path
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default PersonalizedLearningWidget;
