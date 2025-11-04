import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  ChatBubbleIcon, 
  CheckIcon,
  EyeOpenIcon,
  SpeakerLoudIcon,
  HandIcon,
  StarIcon,
  ArrowRightIcon
} from '@radix-ui/react-icons';

const ChatAssessment = ({ onComplete, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState({ V: 0, A: 0, K: 0, G: 0 });
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

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
      description: "You process information best through videos, charts, and images.",
      pathway: "Your pathway includes microlearning videos, visual scenarios, and infographics that help you \"see\" cultural patterns clearly.",
      color: "from-blue-500 to-cyan-500"
    },
    A: {
      name: "Auditory Learner",
      emoji: "🎧",
      description: "You learn best by listening and reflecting.",
      pathway: "Your course will include immersive reading with narration, podcast-style discussions, and audio-based storytelling.",
      color: "from-green-500 to-emerald-500"
    },
    K: {
      name: "Interactive Learner",
      emoji: "🤝",
      description: "You grasp concepts through doing and experiencing.",
      pathway: "Your path will include interactive simulations, cultural exercises, and role-play challenges.",
      color: "from-orange-500 to-amber-500"
    },
    G: {
      name: "Game-Driven Learner",
      emoji: "🏆",
      description: "You thrive on challenges and rewards.",
      pathway: "Your path will feature missions, leaderboards, points, and cultural quizzes — turning learning into play!",
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
        onComplete(dominantStyle, newScores);
      }
    }, 1500);
  };

  const getDominantStyle = (scores) => {
    const maxScore = Math.max(...Object.values(scores));
    return Object.keys(scores).find(key => scores[key] === maxScore);
  };

  // Show question with typing effect
  useEffect(() => {
    if (currentStep < questions.length) {
      setShowOptions(false);
      setIsTyping(true);
      
      const timer = setTimeout(() => {
        setShowOptions(true);
        setIsTyping(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [currentStep, questions.length]);

  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentQuestion = questions[currentStep];

  if (currentStep >= questions.length) {
    return null; // Assessment complete, handled by parent
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardContent className="p-0">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <ChatBubbleIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Athena</h3>
                  <p className="text-sm opacity-90">Learning Style Assessment</p>
                </div>
              </div>
              <div className="text-sm opacity-90">
                Question {currentStep + 1} of {questions.length}
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-3">
              <Progress value={progress} className="h-2 bg-white/20" />
            </div>
          </div>

          {/* Chat Interface */}
          <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
            {/* Bot Message */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <ChatBubbleIcon className="w-4 h-4 text-blue-600" />
              </div>
              <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                {isTyping ? (
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-700">
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
                      className="w-full p-3 rounded-lg border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-left transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                          <Icon className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                        </div>
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">
                          {option.text}
                        </span>
                        <ArrowRightIcon className="w-4 h-4 text-gray-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatAssessment;
