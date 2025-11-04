import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, XCircle, Trophy, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const ScenarioPage = () => {
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const [currentDecision, setCurrentDecision] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const scenario = {
    title: "Launching a Labour Reform Awareness Campaign",
    context: "You are managing a digital campaign to raise awareness about new labour reforms. The campaign involves social media posts, LMS modules, and stakeholder outreach. You face three critical decisions along the way.",
    decisions: [
      {
        id: 1,
        title: "Decision 1: Choosing the Right Platform",
        situation: "You have to launch the first awareness message. Your options are:",
        choices: [
          { id: 'A', text: 'Post only on social media.' },
          { id: 'B', text: 'Use LMS and social media together.' },
          { id: 'C', text: 'Email all stakeholders directly without posting online.' }
        ],
        correctAnswer: 'B',
        feedback: {
          correct: "✅ Correct! Using both LMS and social media ensures wider reach — learners engage through structured content, while social media reaches a broader audience.",
          A: "❌ Only social media limits structured learning and tracking progress.",
          B: "✅ Correct! Using both LMS and social media ensures wider reach — learners engage through structured content, while social media reaches a broader audience.",
          C: "❌ Email alone may not reach the general workforce and misses public engagement."
        }
      },
      {
        id: 2,
        title: "Decision 2: Content Format",
        situation: "You need to decide the format for your first message. Options:",
        choices: [
          { id: 'A', text: 'A plain text announcement.' },
          { id: 'B', text: 'Infographic + short explainer video.' },
          { id: 'C', text: 'Long PDF report only.' }
        ],
        correctAnswer: 'B',
        feedback: {
          correct: "✅ Correct! Visual and short video content captures attention and improves understanding.",
          A: "❌ Plain text may be ignored or misunderstood.",
          B: "✅ Correct! Visual and short video content captures attention and improves understanding.",
          C: "❌ Long PDFs are less engaging and reduce reach."
        }
      },
      {
        id: 3,
        title: "Decision 3: Handling Negative Comments",
        situation: "After posting, several users misunderstand the reform and leave negative comments. Options:",
        choices: [
          { id: 'A', text: 'Ignore the comments.' },
          { id: 'B', text: 'Respond with a detailed clarification post/video.' },
          { id: 'C', text: 'Delete the negative comments immediately.' }
        ],
        correctAnswer: 'B',
        feedback: {
          correct: "✅ Correct! Addressing misunderstandings publicly maintains transparency and credibility.",
          A: "❌ Ignoring can worsen perception and confusion.",
          B: "✅ Correct! Addressing misunderstandings publicly maintains transparency and credibility.",
          C: "❌ Deleting comments may appear censoring and reduce trust."
        }
      }
    ]
  };

  const currentDecisionData = scenario.decisions[currentDecision];

  const handleAnswerSelect = (choiceId) => {
    if (!showFeedback) {
      setSelectedAnswer(choiceId);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer) {
      setShowFeedback(true);
      const isCorrect = selectedAnswer === currentDecisionData.correctAnswer;
      
      // Update score
      if (isCorrect) {
        setScore(score + 1);
      }
      
      // Save answer
      setAnswers([...answers, {
        decision: currentDecision + 1,
        selected: selectedAnswer,
        correct: currentDecisionData.correctAnswer,
        isCorrect: isCorrect
      }]);
    }
  };

  const handleNextDecision = () => {
    setShowFeedback(false);
    if (currentDecision < scenario.decisions.length - 1) {
      setTimeout(() => {
        setCurrentDecision(currentDecision + 1);
        setSelectedAnswer(null);
      }, 300); // Small delay for smooth transition
    } else {
      setTimeout(() => {
        setShowResults(true);
      }, 300);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleRetake = () => {
    setCurrentDecision(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    const percentage = Math.round((score / scenario.decisions.length) * 100);
    const passed = percentage >= 70;

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-6 py-4">
            <Button onClick={handleBack} variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Assessments
            </Button>
          </div>
        </div>

        <div className="container mx-auto px-6 py-12">
          <div className="max-w-3xl mx-auto">
            <Card className="border-2 border-gray-200">
              <CardContent className="p-12 text-center">
                <div className="mb-6">
                  <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${passed ? 'bg-green-100' : 'bg-orange-100'}`}>
                    {passed ? (
                      <Trophy className="h-12 w-12 text-green-600" />
                    ) : (
                      <AlertCircle className="h-12 w-12 text-orange-600" />
                    )}
                  </div>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {passed ? 'Excellent Decision Making!' : 'Good Effort!'}
                </h1>
                
                <p className="text-xl text-gray-600 mb-2">
                  You made <span className="font-bold text-gray-900">{score} out of {scenario.decisions.length}</span> correct decisions
                </p>
                <p className="text-lg text-gray-500 mb-8">
                  Score: {percentage}%
                </p>

                <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
                  <h3 className="font-semibold text-gray-900 mb-4">Decision Summary</h3>
                  <div className="space-y-3">
                    {answers.map((answer, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-600">Decision {answer.decision}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">Choice {answer.selected}</span>
                          {answer.isCorrect ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <Button 
                    onClick={handleRetake}
                    variant="outline"
                    className="px-8 py-6 text-lg"
                  >
                    Retry Scenario
                  </Button>
                  <Button 
                    onClick={handleBack}
                    className="bg-gray-900 hover:bg-gray-800 px-8 py-6 text-lg"
                  >
                    Return to Module
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button onClick={handleBack} variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Badge variant="outline" className="text-lg px-4 py-2">
              Decision {currentDecision + 1} of {scenario.decisions.length}
            </Badge>
          </div>
        </div>
      </div>

      {/* Scenario Context - Only show on first decision */}
      {currentDecision === 0 && !showFeedback && (
        <div className="bg-gray-900 text-white py-8">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold mb-4">{scenario.title}</h1>
              <p className="text-lg text-gray-300">{scenario.context}</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Scenario Content */}
      <div 
        className="py-8"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url('https://athena-user-assets.s3.eu-north-1.amazonaws.com/Scenario_assests/Empty+room.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <Card className="border-2 border-gray-200 overflow-hidden bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-12 min-h-[600px]">
                  {/* Left Side - Avatar */}
                  <div className="md:col-span-4 flex items-end justify-center p-6 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/50"></div>
                    <img 
                      src="https://athena-user-assets.s3.eu-north-1.amazonaws.com/Scenario_assests/business_women.png" 
                      alt="Campaign Manager"
                      className="h-[500px] w-auto object-contain drop-shadow-2xl relative z-10"
                    />
                  </div>

                  {/* Right Side - Question & Choices */}
                  <div className="md:col-span-8 p-8 flex flex-col justify-center">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-gray-200 shadow-xl">
                      <Badge className="bg-gray-900 text-white mb-4">
                        Scenario Assessment
                      </Badge>
                      
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {currentDecisionData.title}
                      </h2>
                      
                      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
                        <p className="text-gray-800 font-medium">
                          {currentDecisionData.situation}
                        </p>
                      </div>

                      {/* Choices */}
                      <div className="space-y-3 mb-6">
                        {currentDecisionData.choices.map((choice) => (
                          <button
                            key={choice.id}
                            onClick={() => handleAnswerSelect(choice.id)}
                            disabled={showFeedback}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                              selectedAnswer === choice.id
                                ? 'border-gray-900 bg-gray-50'
                                : 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'
                            } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 font-bold ${
                                selectedAnswer === choice.id
                                  ? 'border-gray-900 bg-gray-900 text-white'
                                  : 'border-gray-400 text-gray-600'
                              }`}>
                                {choice.id}
                              </div>
                              <span className="text-gray-900">{choice.text}</span>
                            </div>
                          </button>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-end gap-3">
                        <Button 
                          onClick={handleSubmitAnswer}
                          disabled={!selectedAnswer}
                          className="bg-gray-900 hover:bg-gray-800 px-8 py-6 text-lg"
                        >
                          Submit Decision
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      <Dialog open={showFeedback} onOpenChange={setShowFeedback}>
        <DialogContent className="max-w-lg border-2 border-gray-200">
          <div className="p-6">
            <DialogHeader>
              <div className="flex flex-col items-center mb-6">
                {/* Icon */}
                <div className={`mb-4 ${
                  selectedAnswer === currentDecisionData?.correctAnswer
                    ? 'animate-bounce'
                    : ''
                }`}>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    selectedAnswer === currentDecisionData?.correctAnswer
                      ? 'bg-green-100'
                      : 'bg-red-100'
                  }`}>
                    {selectedAnswer === currentDecisionData?.correctAnswer ? (
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    ) : (
                      <XCircle className="h-8 w-8 text-red-600" />
                    )}
                  </div>
                </div>

                {/* Title */}
                <DialogTitle className={`text-2xl font-bold text-center mb-2 ${
                  selectedAnswer === currentDecisionData?.correctAnswer
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  {selectedAnswer === currentDecisionData?.correctAnswer 
                    ? 'Excellent Choice!' 
                    : 'Not Quite'}
                </DialogTitle>

                {/* Subtitle */}
                <p className="text-gray-600 text-center text-sm">
                  {selectedAnswer === currentDecisionData?.correctAnswer
                    ? 'You made the right decision!'
                    : 'Every decision is a learning opportunity'}
                </p>
              </div>

              {/* Feedback Content */}
              <DialogDescription className="text-center space-y-4">
                <div className={`p-4 rounded-lg border ${
                  selectedAnswer === currentDecisionData?.correctAnswer
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                }`}>
                  <p className={`text-sm leading-relaxed ${
                    selectedAnswer === currentDecisionData?.correctAnswer
                      ? 'text-green-800'
                      : 'text-red-800'
                  }`}>
                    {currentDecisionData?.feedback[selectedAnswer]}
                  </p>
                </div>

                {/* Score Update */}
                <div className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <Trophy className="h-4 w-4 text-gray-700" />
                  <span className="text-gray-900 font-semibold text-sm">
                    Score: {score} / {scenario.decisions.length}
                  </span>
                </div>
              </DialogDescription>
            </DialogHeader>

            {/* Action Button */}
            <div className="mt-6 flex justify-center">
              <Button
                onClick={handleNextDecision}
                className="bg-gray-900 hover:bg-gray-800 px-8 py-5 text-base font-semibold"
              >
                {currentDecision < scenario.decisions.length - 1 ? (
                  <>Next Decision →</>
                ) : (
                  <>View Results</>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Progress Indicator */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-gray-200 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Progress:</span>
              <div className="flex gap-2">
                {scenario.decisions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index < currentDecision
                        ? 'bg-green-600'
                        : index === currentDecision
                        ? 'bg-gray-900'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {score} / {scenario.decisions.length}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScenarioPage;

