import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import { useChatbot } from '@/contexts/ChatbotContext';

const ChatbotTrigger = () => {
  const { startAssessment, resetAssessment, learningStyle } = useChatbot();

  const learningStyleInfo = {
    V: { name: "Visual Learner", emoji: "🎨", color: "from-blue-500 to-cyan-500" },
    A: { name: "Auditory Learner", emoji: "🎧", color: "from-green-500 to-emerald-500" },
    K: { name: "Interactive Learner", emoji: "🤝", color: "from-orange-500 to-amber-500" },
    G: { name: "Game-Driven Learner", emoji: "🏆", color: "from-purple-500 to-pink-500" }
  };

  if (learningStyle) {
    const style = learningStyleInfo[learningStyle];
    
    return (
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 bg-gradient-to-br ${style.color} rounded-full flex items-center justify-center`}>
                <span className="text-2xl">{style.emoji}</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">Athena is Ready!</h3>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Personalized
                  </Badge>
                </div>
                <p className="text-gray-600 mb-3">
                  Your learning style: <strong>{style.name}</strong>
                </p>
                <p className="text-sm text-gray-500">
                  I've customized your learning experience based on your preferences.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={startAssessment}
                variant="outline"
                size="sm"
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake Assessment
              </Button>
              <Button
                onClick={startAssessment}
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                Chat with Athena
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Meet Athena, Your Learning Assistant
              </h3>
              <p className="text-gray-600 mb-3">
                Get a personalized learning experience tailored to your unique style.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  10 Quick Questions
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Personalized Path
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  AI-Powered
                </span>
              </div>
            </div>
          </div>
          <Button
            onClick={startAssessment}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Start Assessment
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatbotTrigger;
