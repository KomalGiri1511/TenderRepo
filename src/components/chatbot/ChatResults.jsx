import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ChatBubbleIcon, 
  CheckIcon,
  EyeOpenIcon,
  SpeakerLoudIcon,
  HandIcon,
  StarIcon,
  ArrowRightIcon,
  UpdateIcon
} from '@radix-ui/react-icons';

const ChatResults = ({ learningStyle, scores, onRestart, onClose }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const learningStyles = {
    V: {
      name: "Visuaalne õppija",
      emoji: "🎨",
      gif: "/assets/vision.gif",
      description: "Töötled infot kõige paremini videote, graafikute ja piltide kaudu.",
      pathway: "Sinu teekond sisaldab mikrovideosid, visuaalseid stsenaariume ja infograafikuid, mis aitavad mustreid selgelt näha.",
      color: "from-blue-500 to-cyan-500",
      icon: EyeOpenIcon
    },
    A: {
      name: "Auditoorne õppija",
      emoji: "🎧",
      gif: "/assets/sound-wave-ear.gif",
      description: "Õpid kõige paremini kuulates ja mõtiskledes.",
      pathway: "Sinu kursus hõlmab jutustusega lugemist, taskuhäälingu-laadseid arutelusid ja helipõhist jutustamist.",
      color: "from-green-500 to-emerald-500",
      icon: SpeakerLoudIcon
    },
    K: {
      name: "Praktiline õppija",
      emoji: "🤝",
      gif: "/assets/video-conference.gif",
      description: "Mõistad kontseptsioone tehes ja kogedes.",
      pathway: "Sinu teekond hõlmab interaktiivseid simulatsioone, harjutusi ja rollimänge.",
      color: "from-orange-500 to-amber-500",
      icon: HandIcon
    },
    G: {
      name: "Mänguline õppija",
      emoji: "🏆",
      gif: "/assets/gamer.gif",
      description: "Sind motiveerivad väljakutsed ja preemiad.",
      pathway: "Sinu teekond sisaldab missioone, edetabeleid, punkte ja viktoriine — õppimine kui mäng!",
      color: "from-purple-500 to-pink-500",
      icon: StarIcon
    }
  };

  const messages = [
    "🌍 Aitäh, et lõpetasid õppimisstiili hindamise!",
    `Sinu stiil on: ${learningStyles[learningStyle].name}!`,
    learningStyles[learningStyle].description,
    learningStyles[learningStyle].pathway,
    "Koostasime sinu vastuste põhjal isikupärastatud õpiteekonna. Alusta allpool nupuga."
  ];

  useEffect(() => {
    const showNextMessage = () => {
      if (currentMessage < messages.length) {
        setIsTyping(true);
        setTimeout(() => {
          setCurrentMessage(currentMessage + 1);
          setIsTyping(false);
        }, 2000);
      }
    };

    const timer = setTimeout(showNextMessage, 1000);
    return () => clearTimeout(timer);
  }, [currentMessage, messages.length]);

  const style = learningStyles[learningStyle];
  const Icon = style.icon;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardContent className="p-0">
          {/* Header */}
          <div className={`bg-gradient-to-r ${style.color} text-white p-4 rounded-t-lg`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <ChatBubbleIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Athena</h3>
                  <p className="text-sm opacity-90">Hindamine lõpetatud</p>
                </div>
              </div>
              <div className="text-2xl">{style.emoji}</div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
            {/* Bot Messages */}
            {messages.slice(0, currentMessage).map((message, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <ChatBubbleIcon className="w-4 h-4 text-blue-600" />
                </div>
                <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                  <p className="text-sm text-gray-700">{message}</p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <ChatBubbleIcon className="w-4 h-4 text-blue-600" />
                </div>
                <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Learning Style Card */}
            {currentMessage >= 2 && (
              <div className="flex justify-center">
                <div className={`bg-gradient-to-br ${style.color} rounded-lg p-4 text-white max-w-sm`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <img 
                        src={style.gif} 
                        alt={style.name}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{style.name}</h4>
                      <p className="text-sm opacity-90">{style.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Scores Display */}
            {currentMessage >= 3 && (
              <div className="flex justify-center">
                <div className="bg-white border rounded-lg p-4 max-w-sm w-full">
                  <h5 className="font-semibold text-gray-900 mb-3 text-center">Sinu õpistiili profiil</h5>
                  <div className="grid grid-cols-4 gap-2">
                    {Object.entries(scores).map(([key, score]) => {
                      const styleInfo = learningStyles[key];
                      const StyleIcon = styleInfo.icon;
                      const isDominant = key === learningStyle;
                      
                      return (
                        <div 
                          key={key}
                          className={`p-2 rounded-lg text-center ${
                            isDominant 
                              ? `bg-gradient-to-br ${styleInfo.color} text-white` 
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          <StyleIcon className="w-4 h-4 mx-auto mb-1" />
                          <div className="text-lg font-bold">{score}</div>
                          <div className="text-xs">{key}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {currentMessage >= messages.length && (
              <div className="flex justify-end space-x-2">
                <Button
                  onClick={onRestart}
                  variant="outline"
                  size="sm"
                >
                  <UpdateIcon className="w-4 h-4 mr-2" />
                  Tee uuesti
                </Button>
                <Button
                  onClick={onClose}
                  size="sm"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                >
                  <ArrowRightIcon className="w-4 h-4 mr-2" />
                  Alusta teekonda
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatResults;
