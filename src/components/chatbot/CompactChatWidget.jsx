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
      question: "Uut õppides, mis aitab Sind kõige rohkem?",
      options: [
        { text: "Video või visuaalse esitluse vaatamine.", value: "V", icon: EyeOpenIcon },
        { text: "Selget selgitust kuulamine.", value: "A", icon: SpeakerLoudIcon },
        { text: "Ise proovimine, et näha kuidas töötab.", value: "K", icon: HandIcon },
        { text: "Viktoriinis või mängus osalemine.", value: "G", icon: StarIcon }
      ]
    },
    {
      id: 2,
      question: "Veebisessioonil osaledes, millele keskendud kõige rohkem?",
      options: [
        { text: "Esineja slaidid, graafikud ja visuaalid.", value: "V", icon: EyeOpenIcon },
        { text: "Rääkimisviis, näited ja selgitused.", value: "A", icon: SpeakerLoudIcon },
        { text: "Võimalus osaleda või tegevust teha.", value: "K", icon: HandIcon },
        { text: "Hääletused, märgid või punktid, mis teevad lõbusaks.", value: "G", icon: StarIcon }
      ]
    },
    {
      id: 3,
      question: "Pead mõistma uut kultuurilist mõistet. Kuidas eelistad õppida?",
      options: [
        { text: "Lühikese selgitava video või infograafikaga.", value: "V", icon: EyeOpenIcon },
        { text: "Kuulates podcasti või jutustust.", value: "A", icon: SpeakerLoudIcon },
        { text: "Simuleerides päriselu olukorda.", value: "K", icon: HandIcon },
        { text: "Mängides mängu, mis toob normid esile.", value: "G", icon: StarIcon }
      ]
    },
    {
      id: 4,
      question: "Kuidas mäletad infot paremini?",
      options: [
        { text: "Kujutan seda ette piltide või diagrammidena.", value: "V", icon: EyeOpenIcon },
        { text: "Kuulen seda peas uuesti.", value: "A", icon: SpeakerLoudIcon },
        { text: "Mäletan tegemise kogemust.", value: "K", icon: HandIcon },
        { text: "Mäletan väljakutse võitu või viktoriini lahendust.", value: "G", icon: StarIcon }
      ]
    },
    {
      id: 5,
      question: "Koosolekul või tunnis, mis hoiab tähelepanu?",
      options: [
        { text: "Visuaalsed slaidid ja animatsioonid.", value: "V", icon: EyeOpenIcon },
        { text: "Esineja hääl, toon ja lood.", value: "A", icon: SpeakerLoudIcon },
        { text: "Tegevused, arutelud või demonstratsioonid.", value: "K", icon: HandIcon },
        { text: "Interaktiivsed hääletused, võistlused või viktoriinid.", value: "G", icon: StarIcon }
      ]
    },
    {
      id: 6,
      question: "Kuidas eelistad õpitut üle vaadata?",
      options: [
        { text: "Kokkuvõtlike videote või visuaalide vaatamine.", value: "V", icon: EyeOpenIcon },
        { text: "Salvestiste kuulamine või valjult lugemine.", value: "A", icon: SpeakerLoudIcon },
        { text: "Kiire harjutus või õpitu rakendamine.", value: "K", icon: HandIcon },
        { text: "Lühike mängustatud viktoriin või tasemete avamine.", value: "G", icon: StarIcon }
      ]
    },
    {
      id: 7,
      question: "Kui õpid ristkultuurilist läbirääkimist, mida teeksid?",
      options: [
        { text: "Vaata näidis-videoid päris kohtumistest.", value: "V", icon: EyeOpenIcon },
        { text: "Kuula ekspertarutelusid või kultuurilisi vaateid.", value: "A", icon: SpeakerLoudIcon },
        { text: "Proovi rollimängu või simulatsiooni.", value: "K", icon: HandIcon },
        { text: "Mängi \"Kultuurikompass\" väljakutset.", value: "G", icon: StarIcon }
      ]
    },
    {
      id: 8,
      question: "Probleemi korral, kuidas tavaliselt lahendad?",
      options: [
        { text: "Joonistan või kujutan lahendusi ette.", value: "V", icon: EyeOpenIcon },
        { text: "Räägin läbi või mõtlen valjusti.", value: "A", icon: SpeakerLoudIcon },
        { text: "Katsetan või proovin praktiliselt.", value: "K", icon: HandIcon },
        { text: "Teen sellest väljakutse või mõistatuse.", value: "G", icon: StarIcon }
      ]
    },
    {
      id: 9,
      question: "Milline sisu on koolitusel kõige kaasavam?",
      options: [
        { text: "Visuaalsed animatsioonid, infograafikad ja pildid.", value: "V", icon: EyeOpenIcon },
        { text: "Jutustatud lood või vestlus-podcastid.", value: "A", icon: SpeakerLoudIcon },
        { text: "Interaktiivsed simulatsioonid või juhtumipõhised harjutused.", value: "K", icon: HandIcon },
        { text: "Mängustatud missioonid, märgid ja viktoriinid.", value: "G", icon: StarIcon }
      ]
    },
    {
      id: 10,
      question: "Kui kirjeldaksid oma õppimisstiili ühe lausega, see oleks...",
      options: [
        { text: "\"Õpin nägemise kaudu.\"", value: "V", icon: EyeOpenIcon },
        { text: "\"Õpin kuulamise kaudu.\"", value: "A", icon: SpeakerLoudIcon },
        { text: "\"Õpin tehes.\"", value: "K", icon: HandIcon },
        { text: "\"Õpin mängides ja võisteldes.\"", value: "G", icon: StarIcon }
      ]
    }
  ];

  const learningStyles = {
    V: {
      name: "Visuaalne õppija",
      emoji: "🎨",
      gif: "/assets/vision.gif",
      description: "Töötled infot kõige paremini videote, graafikute ja piltide kaudu.",
      color: "from-blue-500 to-cyan-500"
    },
    A: {
      name: "Auditoorne õppija",
      emoji: "🎧",
      gif: "/assets/sound-wave-ear.gif",
      description: "Õpid kõige paremini kuulates ja mõtiskledes.",
      color: "from-green-500 to-emerald-500"
    },
    K: {
      name: "Praktiline õppija",
      emoji: "🤝",
      gif: "/assets/video-conference.gif",
      description: "Mõistad kontseptsioone tehes ja kogedes.",
      color: "from-orange-500 to-amber-500"
    },
    G: {
      name: "Mänguline õppija",
      emoji: "🏆",
      gif: "/assets/gamer.gif",
      description: "Sind motiveerivad väljakutsed ja preemiad.",
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
                  <p className="text-xs opacity-90">Õpiassistent</p>
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
                    Sina oled {learningStyles[learningStyle]?.name || 'õppija'}!
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    {learningStyles[learningStyle]?.description || 'Your learning style has been personalized.'}
                  </p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-800 font-medium mb-2">
                    🌍 Aitäh, et lõpetasid oma õppimisstiili hindamise!
                  </p>
                  <p className="text-sm text-blue-700">
                    Oleme kohandanud sinu õpikogemuse vastavalt sinu eelistustele.
                    Nüüd saad nautida personaliseeritud sisu kogu platvormil.
                  </p>
                </div>
                
                <Button 
                  onClick={closeChatbot}
                  size="lg" 
                  className="w-full text-sm bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3"
                >
                  <CheckIcon className="w-4 h-4 mr-2" />
                  Alusta teekonda
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
                      K{currentStep + 1}. {currentQuestion.question}
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
                      👋 Tere! Olen Athena, sinu isiklik õpiassistent.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <ChatBubbleIcon className="w-3 h-3 text-blue-600" />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-2 max-w-xs">
                    <p className="text-xs text-gray-700">
                      Enne kui alustame sinu teekonda kursusel <strong>Ristkultuuriline suhtlus rahvusvahelises äris</strong>,
                      soovin teada, kuidas õpid kõige paremini.
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
                    Alustame!
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
