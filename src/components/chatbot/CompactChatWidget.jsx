import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ChatBubbleIcon, 
  Cross2Icon, 
  CheckIcon,
  EyeOpenIcon,
  SpeakerLoudIcon,
  HandIcon,
  StarIcon,
  ArrowRightIcon
} from '@radix-ui/react-icons';
import { useChatbot } from '../../contexts/ChatbotContext';

const CompactChatWidget = () => {
  const { 
    showChatbot, 
    hasCompletedAssessment, 
    learningStyle, 
    startAssessment, 
    closeChatbot,
    completeAssessment 
  } = useChatbot();
  
  const [currentStep, setCurrentStep] = useState(-1); // -1 = welcome, 0-9 = questions, 10+ = completed
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState({ V: 0, A: 0, K: 0, G: 0 });
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isAssessmentActive, setIsAssessmentActive] = useState(false);

  const questions = [
    {
      id: 1,
      question: "When learning something new, what helps you most?",
      options: [
        { text: "Watching a video or visual presentation.", value: "V", icon: EyeOpenIcon },
        { text: "Listening to someone explain it clearly.", value: "A", icon: SpeakerLoudIcon },
        { text: "Trying it out myself to see how it works.", value: "K", icon: HandIcon },
        { text: "Competing in a quiz or interactive game.", value: "G", icon: StarIcon }
      ]
    },
    {
      id: 2,
      question: "When you attend an online session, what do you focus on most?",
      options: [
        { text: "Slides, charts, and visuals used by the presenter.", value: "V", icon: EyeOpenIcon },
        { text: "The speaker's tone, examples, and explanations.", value: "A", icon: SpeakerLoudIcon },
        { text: "The chance to participate or do an activity.", value: "K", icon: HandIcon },
        { text: "Polls, badges, or points that make it fun.", value: "G", icon: StarIcon }
      ]
    },
    {
      id: 3,
      question: "You need to understand a new cultural concept. How would you prefer to learn it?",
      options: [
        { text: "Through a short explainer video or infographic.", value: "V", icon: EyeOpenIcon },
        { text: "By listening to a podcast or narrated story.", value: "A", icon: SpeakerLoudIcon },
        { text: "By simulating a real-world business scenario.", value: "K", icon: HandIcon },
        { text: "By playing a game that reveals cultural norms.", value: "G", icon: StarIcon }
      ]
    },
    {
      id: 4,
      question: "How do you remember information better?",
      options: [
        { text: "I visualize it in pictures or diagrams.", value: "V", icon: EyeOpenIcon },
        { text: "I hear it replayed in my mind.", value: "A", icon: SpeakerLoudIcon },
        { text: "I recall the experience of doing it.", value: "K", icon: HandIcon },
        { text: "I remember winning a challenge or solving a quiz.", value: "G", icon: StarIcon }
      ]
    },
    {
      id: 5,
      question: "During meetings or classes, what keeps your attention?",
      options: [
        { text: "Visual slides and motion graphics.", value: "V", icon: EyeOpenIcon },
        { text: "Voice, tone, and storytelling by the speaker.", value: "A", icon: SpeakerLoudIcon },
        { text: "Activities, discussions, or demonstrations.", value: "K", icon: HandIcon },
        { text: "Interactive polls, competitions, or live quizzes.", value: "G", icon: StarIcon }
      ]
    },
    {
      id: 6,
      question: "How do you prefer to review what you've learned?",
      options: [
        { text: "Watching summary videos or scanning visuals.", value: "V", icon: EyeOpenIcon },
        { text: "Listening to recordings or reading out loud.", value: "A", icon: SpeakerLoudIcon },
        { text: "Doing a quick exercise or applying it.", value: "K", icon: HandIcon },
        { text: "Taking a short gamified quiz or unlocking levels.", value: "G", icon: StarIcon }
      ]
    },
    {
      id: 7,
      question: "If you were learning about cross-cultural negotiation, what would you do?",
      options: [
        { text: "Watch sample negotiation videos from real meetings.", value: "V", icon: EyeOpenIcon },
        { text: "Listen to expert discussions or cultural insights.", value: "A", icon: SpeakerLoudIcon },
        { text: "Try a mock negotiation role-play online.", value: "K", icon: HandIcon },
        { text: "Play a \"Cultural Compass\" challenge.", value: "G", icon: StarIcon }
      ]
    },
    {
      id: 8,
      question: "When faced with a problem, how do you usually solve it?",
      options: [
        { text: "Sketch or visualize possible solutions.", value: "V", icon: EyeOpenIcon },
        { text: "Talk it through or think aloud.", value: "A", icon: SpeakerLoudIcon },
        { text: "Experiment or test it practically.", value: "K", icon: HandIcon },
        { text: "Turn it into a challenge or puzzle to solve.", value: "G", icon: StarIcon }
      ]
    },
    {
      id: 9,
      question: "What kind of content do you find most engaging during training?",
      options: [
        { text: "Visual animations, infographics, and images.", value: "V", icon: EyeOpenIcon },
        { text: "Narrated stories or conversational podcasts.", value: "A", icon: SpeakerLoudIcon },
        { text: "Interactive simulations or case-based exercises.", value: "K", icon: HandIcon },
        { text: "Gamified missions, badges, and cultural quizzes.", value: "G", icon: StarIcon }
      ]
    },
    {
      id: 10,
      question: "If you had to describe your learning personality in one line, it would be...",
      options: [
        { text: "\"I learn by seeing.\"", value: "V", icon: EyeOpenIcon },
        { text: "\"I learn by listening.\"", value: "A", icon: SpeakerLoudIcon },
        { text: "\"I learn by doing.\"", value: "K", icon: HandIcon },
        { text: "\"I learn by playing and competing.\"", value: "G", icon: StarIcon }
      ]
    }
  ];

  const learningStyles = {
    V: {
      name: "Visual Learner",
      emoji: "🎨",
      gif: "/assets/vision.gif",
      description: "You process information best through videos, charts, and images.",
      color: "from-blue-500 to-cyan-500"
    },
    A: {
      name: "Auditory Learner",
      emoji: "🎧",
      gif: "/assets/sound-wave-ear.gif",
      description: "You learn best by listening and reflecting.",
      color: "from-green-500 to-emerald-500"
    },
    K: {
      name: "Interactive Learner",
      emoji: "🤝",
      gif: "/assets/video-conference.gif",
      description: "You grasp concepts through doing and experiencing.",
      color: "from-orange-500 to-amber-500"
    },
    G: {
      name: "Game-Driven Learner",
      emoji: "🏆",
      gif: "/assets/gamer.gif",
      description: "You thrive on challenges and rewards.",
      color: "from-purple-500 to-pink-500"
    }
  };

  const handleAnswer = (questionId, answer) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);
    
    // Calculate scores
    const newScores = { V: 0, A: 0, K: 0, G: 0 };
    Object.values(newAnswers).forEach(answer => {
      newScores[answer]++;
    });
    setScores(newScores);

    // Auto-progress to next question after a short delay
    setIsTyping(true);
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
        setShowOptions(false);
        setIsTyping(false);
      } else {
        // Assessment complete
        const dominantStyle = getDominantStyle(newScores);
        completeAssessment(dominantStyle, newScores);
        setCurrentStep(10); // Mark as completed
        setIsAssessmentActive(false);
        setShowOptions(false);
        setIsTyping(false);
      }
    }, 1500);
  };

  const getDominantStyle = (scores) => {
    const maxScore = Math.max(...Object.values(scores));
    return Object.keys(scores).find(key => scores[key] === maxScore);
  };

  const startNewAssessment = () => {
    setCurrentStep(0);
    setAnswers({});
    setScores({ V: 0, A: 0, K: 0, G: 0 });
    setIsAssessmentActive(true);
    setShowOptions(false);
    setIsTyping(false);
  };

  // Show question with typing effect
  useEffect(() => {
    if (showChatbot && isAssessmentActive && currentStep >= 0 && currentStep < questions.length) {
      setShowOptions(false);
      setIsTyping(true);
      
      const timer = setTimeout(() => {
        setShowOptions(true);
        setIsTyping(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [currentStep, questions.length, showChatbot, isAssessmentActive]);

  const progress = currentStep >= 0 ? ((currentStep + 1) / questions.length) * 100 : 0;
  const currentQuestion = currentStep >= 0 ? questions[currentStep] : null;

  if (!showChatbot) return null;

  return (
    <div className="fixed bottom-24 right-6 z-[9998] w-80 max-h-96">
      <Card className="shadow-2xl border-0 bg-white">
        <CardContent className="p-0">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <ChatBubbleIcon className="w-3 h-3" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Athena</h3>
                  <p className="text-xs opacity-90">Learning Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {currentStep < questions.length && (
                  <span className="text-xs opacity-90">
                    {currentStep + 1}/{questions.length}
                  </span>
                )}
                <Button
                  onClick={closeChatbot}
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20 h-6 w-6 p-0"
                >
                  <Cross2Icon className="w-3 h-3" />
                </Button>
              </div>
            </div>
            
            {/* Progress Bar */}
            {isAssessmentActive && currentStep >= 0 && currentStep < questions.length && (
              <div className="mt-2">
                <div className="w-full bg-white/20 rounded-full h-1">
                  <div 
                    className="bg-white h-1 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
          
          {/* Chat Content */}
          <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
            {hasCompletedAssessment && currentStep >= 10 ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                    <img 
                      src={learningStyles[learningStyle]?.gif || '/assets/vision.gif'} 
                      alt={learningStyles[learningStyle]?.name || 'Learning Style'}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-lg mb-2">
                    You're a {learningStyles[learningStyle]?.name || 'Learner'}!
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    {learningStyles[learningStyle]?.description || 'Your learning style has been personalized.'}
                  </p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-800 font-medium mb-2">
                    🌍 Thank you for completing your learning style assessment!
                  </p>
                  <p className="text-sm text-blue-700">
                    I've customized your learning experience based on your preferences. 
                    You can now enjoy personalized content throughout the platform.
                  </p>
                </div>
                
                <Button 
                  onClick={closeChatbot}
                  size="lg" 
                  className="w-full text-sm bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3"
                >
                  <CheckIcon className="w-4 h-4 mr-2" />
                  Start My Journey
                </Button>
              </div>
            ) : isAssessmentActive && currentStep >= 0 && currentStep < questions.length ? (
              <div className="space-y-3">
                {/* Bot Message */}
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <ChatBubbleIcon className="w-3 h-3 text-blue-600" />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-2 max-w-xs">
                    {isTyping ? (
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-700">
                        Q{currentStep + 1}. {currentQuestion.question}
                      </p>
                    )}
                  </div>
                </div>

                {/* Options */}
                {showOptions && (
                  <div className="space-y-2">
                    {currentQuestion.options.map((option, index) => {
                      const Icon = option.icon;
                      return (
                        <button
                          key={index}
                          onClick={() => handleAnswer(currentQuestion.id, option.value)}
                          className="w-full p-2 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-left transition-all duration-200 group"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                              <Icon className="w-3 h-3 text-gray-600 group-hover:text-blue-600" />
                            </div>
                            <span className="text-xs text-gray-700 group-hover:text-gray-900">
                              {option.text}
                            </span>
                            <ArrowRightIcon className="w-3 h-3 text-gray-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <ChatBubbleIcon className="w-3 h-3 text-blue-600" />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-2 max-w-xs">
                    <p className="text-xs text-gray-700">
                      👋 Hello! I'm Athena, your personal learning assistant.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <ChatBubbleIcon className="w-3 h-3 text-blue-600" />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-2 max-w-xs">
                    <p className="text-xs text-gray-700">
                      Before we begin your journey on <strong>Cross-Cultural Communication in International Business</strong>, 
                      I'd like to know how you learn best.
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={startNewAssessment}
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-xs"
                  >
                    <CheckIcon className="w-3 h-3 mr-1" />
                    Let's Start!
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompactChatWidget;
