import { useChatbot } from '../contexts/ChatbotContext';

export const useLearningPersonalization = () => {
  const { learningStyle, learningScores } = useChatbot();

  const getPersonalizedContent = (contentType) => {
    if (!learningStyle) return contentType.default;

    const personalizations = {
      V: { // Visual Learner
        courseCard: {
          emphasis: 'visual',
          showThumbnails: true,
          showProgressBars: true,
          showIcons: true
        },
        lessonFormat: {
          preferred: 'video',
          secondary: 'infographic',
          avoid: 'text-heavy'
        },
        dashboard: {
          showCharts: true,
          showImages: true,
          compactText: false
        }
      },
      A: { // Auditory Learner
        courseCard: {
          emphasis: 'audio',
          showThumbnails: false,
          showProgressBars: true,
          showIcons: false
        },
        lessonFormat: {
          preferred: 'audio',
          secondary: 'narrated',
          avoid: 'silent-video'
        },
        dashboard: {
          showCharts: false,
          showImages: false,
          compactText: true
        }
      },
      K: { // Kinesthetic/Interactive Learner
        courseCard: {
          emphasis: 'interactive',
          showThumbnails: true,
          showProgressBars: true,
          showIcons: true
        },
        lessonFormat: {
          preferred: 'interactive',
          secondary: 'simulation',
          avoid: 'passive-content'
        },
        dashboard: {
          showCharts: true,
          showImages: true,
          compactText: false
        }
      },
      G: { // Gamified Learner
        courseCard: {
          emphasis: 'gamified',
          showThumbnails: true,
          showProgressBars: true,
          showIcons: true
        },
        lessonFormat: {
          preferred: 'gamified',
          secondary: 'quiz',
          avoid: 'lecture'
        },
        dashboard: {
          showCharts: true,
          showImages: true,
          compactText: false
        }
      }
    };

    return personalizations[learningStyle]?.[contentType] || contentType.default;
  };

  const getLearningStyleRecommendations = () => {
    if (!learningStyle) return [];

    const recommendations = {
      V: [
        'Watch video lessons with visual aids',
        'Use infographics and diagrams for complex topics',
        'Take visual notes with mind maps',
        'Look for courses with rich visual content'
      ],
      A: [
        'Listen to audio lectures and podcasts',
        'Read content out loud for better retention',
        'Join discussion groups and forums',
        'Use text-to-speech for written content'
      ],
      K: [
        'Engage in hands-on activities and simulations',
        'Participate in role-playing exercises',
        'Try interactive case studies',
        'Join study groups for collaborative learning'
      ],
      G: [
        'Complete quizzes and earn badges',
        'Track your progress on leaderboards',
        'Set learning goals and milestones',
        'Participate in learning challenges'
      ]
    };

    return recommendations[learningStyle] || [];
  };

  const getPersonalizedGreeting = () => {
    if (!learningStyle) return "Welcome to your learning journey!";

    const greetings = {
      V: "Welcome! I've prepared visual-rich content to help you learn effectively.",
      A: "Welcome! I've curated audio-focused materials that match your learning style.",
      K: "Welcome! I've set up interactive experiences to enhance your learning.",
      G: "Welcome! I've created a gamified learning path just for you!"
    };

    return greetings[learningStyle];
  };

  const shouldShowVisualContent = () => {
    return learningStyle === 'V' || learningStyle === 'K' || learningStyle === 'G';
  };

  const shouldShowAudioContent = () => {
    return learningStyle === 'A';
  };

  const shouldShowInteractiveContent = () => {
    return learningStyle === 'K' || learningStyle === 'G';
  };

  const shouldShowGamifiedContent = () => {
    return learningStyle === 'G';
  };

  return {
    learningStyle,
    learningScores,
    getPersonalizedContent,
    getLearningStyleRecommendations,
    getPersonalizedGreeting,
    shouldShowVisualContent,
    shouldShowAudioContent,
    shouldShowInteractiveContent,
    shouldShowGamifiedContent,
    hasCompletedAssessment: !!learningStyle
  };
};
