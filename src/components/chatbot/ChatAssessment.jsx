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
      description: "Töötled infot kõige paremini videote, graafikute ja piltide kaudu.",
      pathway: "Sinu teekond sisaldab mikrovideosid, visuaalseid stsenaariume ja infograafikuid, mis aitavad mustreid \"näha\".",
      color: "from-blue-500 to-cyan-500"
    },
    A: {
      name: "Auditoorne õppija",
      emoji: "🎧",
      description: "Õpid kõige paremini kuulates ja mõtiskledes.",
      pathway: "Sinu kursus hõlmab jutustusega lugemist, arutelusid ja helipõhist jutustamist.",
      color: "from-green-500 to-emerald-500"
    },
    K: {
      name: "Praktiline õppija",
      emoji: "🤝",
      description: "Mõistad kontseptsioone tehes ja kogedes.",
      pathway: "Sinu teekond hõlmab interaktiivseid simulatsioone, harjutusi ja rollimänge.",
      color: "from-orange-500 to-amber-500"
    },
    G: {
      name: "Mänguline õppija",
      emoji: "🏆",
      description: "Sind motiveerivad väljakutsed ja preemiad.",
      pathway: "Sinu teekond sisaldab missioone, edetabeleid, punkte ja viktoriine — õppimine kui mäng!",
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
                  <p className="text-sm opacity-90">Õppimisstiili hindamine</p>
                </div>
              </div>
              <div className="text-sm opacity-90">
                Küsimus {currentStep + 1} / {questions.length}
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
