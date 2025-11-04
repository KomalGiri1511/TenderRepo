import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  BookOpen, 
  Headphones, 
  Gamepad2, 
  Users, 
  Clock, 
  Star,
  Eye,
  Hand,
  Trophy
} from 'lucide-react';
import { useLearningPersonalization } from '../../hooks/useLearningPersonalization';

const PersonalizedCourseCard = ({ course, onEnroll, onView }) => {
  const { 
    learningStyle, 
    shouldShowVisualContent, 
    shouldShowAudioContent, 
    shouldShowInteractiveContent, 
    shouldShowGamifiedContent 
  } = useLearningPersonalization();

  const getLearningStyleIcon = () => {
    switch (learningStyle) {
      case 'V': return <Eye className="w-4 h-4" />;
      case 'A': return <Headphones className="w-4 h-4" />;
      case 'K': return <Hand className="w-4 h-4" />;
      case 'G': return <Trophy className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getLearningStyleBadge = () => {
    const badges = {
      V: { text: "Visual", color: "bg-blue-100 text-blue-800 border-blue-200" },
      A: { text: "Audio", color: "bg-green-100 text-green-800 border-green-200" },
      K: { text: "Interactive", color: "bg-orange-100 text-orange-800 border-orange-200" },
      G: { text: "Gamified", color: "bg-purple-100 text-purple-800 border-purple-200" }
    };
    return badges[learningStyle] || { text: "Standard", color: "bg-gray-100 text-gray-800 border-gray-200" };
  };

  const getContentTypeIcons = () => {
    const icons = [];
    
    if (shouldShowVisualContent() && course.hasVideo) {
      icons.push({ icon: Play, label: "Videos", color: "text-blue-600" });
    }
    
    if (shouldShowAudioContent() && course.hasAudio) {
      icons.push({ icon: Headphones, label: "Audio", color: "text-green-600" });
    }
    
    if (shouldShowInteractiveContent() && course.hasInteractive) {
      icons.push({ icon: Hand, label: "Interactive", color: "text-orange-600" });
    }
    
    if (shouldShowGamifiedContent() && course.hasGamified) {
      icons.push({ icon: Trophy, label: "Gamified", color: "text-purple-600" });
    }

    return icons;
  };

  const badge = getLearningStyleBadge();
  const contentTypeIcons = getContentTypeIcons();

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </h3>
                <Badge className={badge.color}>
                  {getLearningStyleIcon()}
                  <span className="ml-1">{badge.text}</span>
                </Badge>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">
                {course.description}
              </p>
            </div>
            
            {shouldShowVisualContent() && course.thumbnail && (
              <div className="ml-4 w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Content Type Indicators */}
          {contentTypeIcons.length > 0 && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Content types:</span>
              <div className="flex items-center gap-3">
                {contentTypeIcons.map((item, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                    <span className="text-xs text-gray-600">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Course Stats */}
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{course.enrolled} enrolled</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>{course.rating}</span>
            </div>
          </div>

          {/* Progress Bar (if enrolled) */}
          {course.progress !== undefined && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="text-gray-900 font-medium">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            {course.isEnrolled ? (
              <Button 
                onClick={() => onView(course.id)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Play className="w-4 h-4 mr-2" />
                Continue Learning
              </Button>
            ) : (
              <Button 
                onClick={() => onEnroll(course.id)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Enroll Now
              </Button>
            )}
            
            <Button 
              variant="outline" 
              onClick={() => onView(course.id)}
              className="px-4"
            >
              View Details
            </Button>
          </div>

          {/* Learning Style Recommendation */}
          {learningStyle && (
            <div className="bg-blue-50 rounded-lg p-3 mt-4">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs">💡</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-1">
                    Personalized for your learning style
                  </p>
                  <p className="text-xs text-blue-700">
                    This course is optimized for {badge.text.toLowerCase()} learners like you.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalizedCourseCard;
