import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Volume2, Maximize2, Play, Pause, X, Heart, ExternalLink, FileDown, Languages } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';


const LessonMod1Dreams = () => {
  const navigate = useNavigate();
  const [speakingBlocks, setSpeakingBlocks] = useState({});
  const [voices, setVoices] = useState([]);
  const [selectedLang, setSelectedLang] = useState('en-US');
  const [selectedVoiceURI, setSelectedVoiceURI] = useState('');
  const [isFullScreenModalOpen, setIsFullScreenModalOpen] = useState(false);
  const [audioLang, setAudioLang] = useState('en-US'); // Local state for audio section only
  const [quizAnswers, setQuizAnswers] = useState({}); // State for quiz answers
  const textRef = useRef(null);

  // Language options - All available languages
  const languageOptions = React.useMemo(() => ([
    { code: 'en-US', label: '🇺🇸 English (US)' },
    { code: 'en-GB', label: '🇬🇧 English (UK)' },
    { code: 'en-AU', label: '🇦🇺 English (Australia)' },
    { code: 'en-CA', label: '🇨🇦 English (Canada)' },
    { code: 'hi-IN', label: '🇮🇳 हिन्दी (Hindi)' },
    { code: 'mr-IN', label: '🇮🇳 मराठी (Marathi)' },
    { code: 'ta-IN', label: '🇮🇳 தமிழ் (Tamil)' },
    { code: 'te-IN', label: '🇮🇳 తెలుగు (Telugu)' },
    { code: 'bn-IN', label: '🇮🇳 বাংলা (Bengali)' },
    { code: 'gu-IN', label: '🇮🇳 ગુજરાતી (Gujarati)' },
    { code: 'kn-IN', label: '🇮🇳 ಕನ್ನಡ (Kannada)' },
    { code: 'ml-IN', label: '🇮🇳 മലയാളം (Malayalam)' },
    { code: 'pa-IN', label: '🇮🇳 ਪੰਜਾਬੀ (Punjabi)' },
    { code: 'ur-IN', label: '🇮🇳 اردو (Urdu)' },
    { code: 'fr-FR', label: '🇫🇷 Français (French)' },
    { code: 'fr-CA', label: '🇨🇦 Français (Canada)' },
    { code: 'de-DE', label: '🇩🇪 Deutsch (German)' },
    { code: 'es-ES', label: '🇪🇸 Español (Spain)' },
    { code: 'es-MX', label: '🇲🇽 Español (Mexico)' },
    { code: 'it-IT', label: '🇮🇹 Italiano (Italian)' },
    { code: 'pt-PT', label: '🇵🇹 Português (Portugal)' },
    { code: 'pt-BR', label: '🇧🇷 Português (Brazil)' },
    { code: 'nl-NL', label: '🇳🇱 Nederlands (Dutch)' },
    { code: 'sv-SE', label: '🇸🇪 Svenska (Swedish)' },
    { code: 'no-NO', label: '🇳🇴 Norsk (Norwegian)' },
    { code: 'da-DK', label: '🇩🇰 Dansk (Danish)' },
    { code: 'fi-FI', label: '🇫🇮 Suomi (Finnish)' },
    { code: 'pl-PL', label: '🇵🇱 Polski (Polish)' },
    { code: 'ru-RU', label: '🇷🇺 Русский (Russian)' },
    { code: 'uk-UA', label: '🇺🇦 Українська (Ukrainian)' },
    { code: 'cs-CZ', label: '🇨🇿 Čeština (Czech)' },
    { code: 'sk-SK', label: '🇸🇰 Slovenčina (Slovak)' },
    { code: 'hu-HU', label: '🇭🇺 Magyar (Hungarian)' },
    { code: 'ro-RO', label: '🇷🇴 Română (Romanian)' },
    { code: 'bg-BG', label: '🇧🇬 Български (Bulgarian)' },
    { code: 'hr-HR', label: '🇭🇷 Hrvatski (Croatian)' },
    { code: 'sl-SI', label: '🇸🇮 Slovenščina (Slovenian)' },
    { code: 'et-EE', label: '🇪🇪 Eesti (Estonian)' },
    { code: 'lv-LV', label: '🇱🇻 Latviešu (Latvian)' },
    { code: 'lt-LT', label: '🇱🇹 Lietuvių (Lithuanian)' },
    { code: 'el-GR', label: '🇬🇷 Ελληνικά (Greek)' },
    { code: 'tr-TR', label: '🇹🇷 Türkçe (Turkish)' },
    { code: 'is-IS', label: '🇮🇸 Íslenska (Icelandic)' },
    { code: 'mt-MT', label: '🇲🇹 Malti (Maltese)' },
    { code: 'ja-JP', label: '🇯🇵 日本語 (Japanese)' },
    { code: 'ko-KR', label: '🇰🇷 한국어 (Korean)' },
    { code: 'zh-CN', label: '🇨🇳 中文 (Chinese Simplified)' },
    { code: 'zh-TW', label: '🇹🇼 繁體中文 (Chinese Traditional)' },
    { code: 'th-TH', label: '🇹🇭 ไทย (Thai)' },
    { code: 'vi-VN', label: '🇻🇳 Tiếng Việt (Vietnamese)' },
    { code: 'id-ID', label: '🇮🇩 Bahasa Indonesia (Indonesian)' },
    { code: 'ms-MY', label: '🇲🇾 Bahasa Melayu (Malay)' },
    { code: 'fil-PH', label: '🇵🇭 Filipino (Philippines)' },
    { code: 'ar-SA', label: '🇸🇦 العربية (Arabic)' },
    { code: 'he-IL', label: '🇮🇱 עברית (Hebrew)' },
    { code: 'fa-IR', label: '🇮🇷 فارسی (Persian)' }
  ]), []);

  // UI text based on selected language
  const uiText = React.useMemo(() => {
    const map = {
      'en': { 
        backToModules: 'Back to Modules',
        module1: 'Module 1: Understanding Labour Reform, Digital Transformation & Communication Context',
        courseTitle: 'Labour Reform & Digital Transformation',
        description: 'Understand labour reform priorities, digital transformation drivers, and communication needs',
        complete: 'Complete Module'
      },
      'hi': { 
        backToModules: 'मॉड्यूल्स पर वापस जाएं',
        module1: 'मॉड्यूल 1: श्रम सुधार, डिजिटल परिवर्तन और संचार संदर्भ को समझना',
        courseTitle: 'श्रम सुधार और डिजिटल परिवर्तन',
        description: 'श्रम सुधार प्राथमिकताओं, डिजिटल परिवर्तन ड्राइवरों और संचार आवश्यकताओं को समझें',
        complete: 'मॉड्यूल पूरा करें'
      },
      'mr': { 
        backToModules: 'मॉड्यूल्सकडे परत जा',
        module1: 'मॉड्यूल 1: श्रम सुधार, डिजिटल परिवर्तन आणि संप्रेषण संदर्भ समजून घेणे',
        courseTitle: 'श्रम सुधार आणि डिजिटल परिवर्तन',
        description: 'श्रम सुधार प्राधान्ये, डिजिटल परिवर्तन ड्राइव्हर्स आणि संप्रेषण गरजा समजून घ्या',
        complete: 'मॉड्यूल पूर्ण करा'
      },
      'de': { 
        backToModules: 'Zurück zu den Modulen',
        module1: 'Modul 1: Arbeitsreform, digitale Transformation und Kommunikationskontext verstehen',
        courseTitle: 'Arbeitsreform und digitale Transformation',
        description: 'Verstehen Sie Arbeitsreform-Prioritäten, digitale Transformationsantriebe und Kommunikationsbedürfnisse',
        complete: 'Modul abschließen'
      },
      'fr': { 
        backToModules: 'Retour aux modules',
        module1: 'Module 1: Comprendre la réforme du travail, la transformation numérique et le contexte de communication',
        courseTitle: 'Réforme du travail et transformation numérique',
        description: 'Comprendre les priorités de réforme du travail, les moteurs de transformation numérique et les besoins de communication',
        complete: 'Module complet'
      },
      'es': { 
        backToModules: 'Volver a los módulos',
        module1: 'Módulo 1: Entender la reforma laboral, transformación digital y contexto de comunicación',
        courseTitle: 'Reforma laboral y transformación digital',
        description: 'Entender las prioridades de reforma laboral, impulsores de transformación digital y necesidades de comunicación',
        complete: 'Módulo completo'
      }
    };
    const key = (selectedLang || 'en-US').split('-')[0];
    return map[key] || map['en'];
  }, [selectedLang]);

  const handleBackToModules = () => {
    navigate(-1);
  };

  // Load voices when component mounts
  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const load = () => {
      const v = synth.getVoices();
      setVoices(v);
      
      const defaultVoice = v.find(voice => voice.lang === selectedLang) || 
                          v.find(voice => voice.lang?.startsWith(selectedLang.split('-')[0])) || 
                          v[0];
      if (defaultVoice && !selectedVoiceURI) {
        setSelectedVoiceURI(defaultVoice.voiceURI);
      }
    };
    load();
    synth.onvoiceschanged = load;
    return () => {
      if (synth) synth.onvoiceschanged = null;
    };
  }, [selectedLang, selectedVoiceURI]);

  const handleSpeakToggle = (blockKey, text) => {
    if (!text) return;
    const synth = window.speechSynthesis;
    if (!synth) return;
    
    const isSpeaking = speakingBlocks[blockKey];
    if (isSpeaking) {
      synth.cancel();
      setSpeakingBlocks(prev => ({ ...prev, [blockKey]: false }));
      return;
    }
    
    const utter = new SpeechSynthesisUtterance(text);
    
    // Enhanced voice selection with fallback strategies
    const findBestVoice = (targetLang) => {
      // Strategy 1: Exact language code match
      let exactMatch = voices.find(voice => voice.lang === targetLang);
      if (exactMatch) return exactMatch;

      // Strategy 2: Case-insensitive exact match
      exactMatch = voices.find(voice => 
        voice.lang.toLowerCase() === targetLang.toLowerCase()
      );
      if (exactMatch) return exactMatch;

      // Strategy 3: Base language match (e.g., 'hi' for 'hi-IN')
      const baseLanguage = targetLang.substring(0, 2);
      const baseMatch = voices.find(voice => 
        voice.lang.startsWith(baseLanguage + '-') || 
        voice.lang === baseLanguage ||
        voice.lang.includes(baseLanguage)
      );
      if (baseMatch) return baseMatch;

      // Strategy 4: Language family matching for all languages
      const languageFamilyMap = {
        // Indian Languages
        'hi': ['hi', 'hin', 'hindi'],
        'ta': ['ta', 'tam', 'tamil'],
        'te': ['te', 'tel', 'telugu'],
        'bn': ['bn', 'ben', 'bengali'],
        'gu': ['gu', 'guj', 'gujarati'],
        'kn': ['kn', 'kan', 'kannada'],
        'ml': ['ml', 'mal', 'malayalam'],
        'mr': ['mr', 'mar', 'marathi'],
        'pa': ['pa', 'pan', 'punjabi'],
        'ur': ['ur', 'urd', 'urdu'],
        'or': ['or', 'ori', 'odia'],
        'as': ['as', 'asm', 'assamese'],
        'ne': ['ne', 'nep', 'nepali'],
        'sa': ['sa', 'san', 'sanskrit'],
        
        // European Languages
        'en': ['en', 'eng', 'english'],
        'fr': ['fr', 'fre', 'french'],
        'de': ['de', 'ger', 'german'],
        'es': ['es', 'spa', 'spanish'],
        'it': ['it', 'ita', 'italian'],
        'pt': ['pt', 'por', 'portuguese'],
        'nl': ['nl', 'dut', 'dutch'],
        'sv': ['sv', 'swe', 'swedish'],
        'no': ['no', 'nor', 'norwegian'],
        'da': ['da', 'dan', 'danish'],
        'fi': ['fi', 'fin', 'finnish'],
        'pl': ['pl', 'pol', 'polish'],
        'ru': ['ru', 'rus', 'russian'],
        'uk': ['uk', 'ukr', 'ukrainian'],
        'cs': ['cs', 'cze', 'czech'],
        'sk': ['sk', 'slo', 'slovak'],
        'hu': ['hu', 'hun', 'hungarian'],
        'ro': ['ro', 'rum', 'romanian'],
        'bg': ['bg', 'bul', 'bulgarian'],
        'hr': ['hr', 'hrv', 'croatian'],
        'sl': ['sl', 'slv', 'slovenian'],
        'et': ['et', 'est', 'estonian'],
        'lv': ['lv', 'lav', 'latvian'],
        'lt': ['lt', 'lit', 'lithuanian'],
        'el': ['el', 'gre', 'greek'],
        'tr': ['tr', 'tur', 'turkish'],
        'is': ['is', 'ice', 'icelandic'],
        'mt': ['mt', 'mlt', 'maltese'],
        
        // Asian Languages
        'ja': ['ja', 'jpn', 'japanese'],
        'ko': ['ko', 'kor', 'korean'],
        'zh': ['zh', 'chi', 'chinese'],
        'th': ['th', 'tha', 'thai'],
        'vi': ['vi', 'vie', 'vietnamese'],
        'id': ['id', 'ind', 'indonesian'],
        'ms': ['ms', 'may', 'malay'],
        'fil': ['fil', 'tag', 'filipino'],
        'ar': ['ar', 'ara', 'arabic'],
        'he': ['he', 'heb', 'hebrew'],
        'fa': ['fa', 'per', 'persian'],
        
        // African & Other Languages
        'af': ['af', 'afr', 'afrikaans'],
        'sw': ['sw', 'swa', 'swahili'],
        'am': ['am', 'amh', 'amharic'],
        'yo': ['yo', 'yor', 'yoruba'],
        'ig': ['ig', 'ibo', 'igbo'],
        'ha': ['ha', 'hau', 'hausa'],
        'zu': ['zu', 'zul', 'zulu'],
        'xh': ['xh', 'xho', 'xhosa'],
        'st': ['st', 'sot', 'sotho'],
        'tn': ['tn', 'tsn', 'tswana'],
        'so': ['so', 'som', 'somali'],
        'rw': ['rw', 'kin', 'kinyarwanda'],
        'lg': ['lg', 'lug', 'luganda'],
        'mg': ['mg', 'mlg', 'malagasy'],
        'ht': ['ht', 'hat', 'haitian'],
        'qu': ['qu', 'que', 'quechua'],
        'gn': ['gn', 'grn', 'guarani'],
        'ay': ['ay', 'aym', 'aymara'],
        'mi': ['mi', 'mao', 'maori'],
        'haw': ['haw', 'haw', 'hawaiian'],
        'fj': ['fj', 'fij', 'fijian'],
        'sm': ['sm', 'smo', 'samoan'],
        'to': ['to', 'ton', 'tongan'],
        'ty': ['ty', 'tah', 'tahitian']
      };
      
      const familyCodes = languageFamilyMap[baseLanguage] || [baseLanguage];
      const familyMatch = voices.find(voice => 
        familyCodes.some(code => 
          voice.lang.toLowerCase().includes(code.toLowerCase())
        )
      );
      
      if (familyMatch) return familyMatch;

      // Strategy 5: Fallback to any available voice
      return voices[0];
    };

    const voice = findBestVoice(selectedLang);
    if (voice) {
      utter.voice = voice;
      utter.lang = voice.lang; // Use the voice's actual language code
    } else {
      // Don't proceed if no voice is available
      toast.error(`No voice available for ${selectedLang}. Please try another language.`);
      return;
    }
    
    utter.rate = 0.8; // Slower for better pronunciation
    utter.pitch = 1.0;
    utter.volume = 1.0;
    
    utter.onend = () => setSpeakingBlocks(prev => ({ ...prev, [blockKey]: false }));
    setSpeakingBlocks(prev => ({ ...prev, [blockKey]: true }));
    synth.speak(utter);
  };

  const handleFullScreen = () => {
    setIsFullScreenModalOpen(true);
  };

  const handleCompleteModule = () => {
    // Mark module as complete and navigate back
    toast.success('Module 1 completed successfully!');
    navigate(-1);
  };

  const baseLang = (selectedLang || 'en-US').split('-')[0];
  const completionMsg = baseLang === 'en'
    ? 'Complete this module to unlock Module 2'
    : baseLang === 'hi'
    ? 'मॉड्यूल 2 को अनलॉक करने के लिए इस मॉड्यूल को पूरा करें'
    : 'मॉड्यूल 2 अनलॉक करण्यासाठी हे मॉड्यूल पूर्ण करा';

  const t = React.useMemo(() => {
    if (baseLang === 'hi') {
      return {
        introTitle: 'पाठ 1: श्रम सुधार और डिजिटल परिवर्तन',
        introSubtitle: 'श्रम सुधार प्राथमिकताओं, डिजिटल परिवर्तन ड्राइवरों और संचार आवश्यकताओं को समझें',
        learnTitle: 'इस पाठ में आप क्या सीखेंगे',
        listen: 'सुनें',
        stop: 'रोकें',
        outcomesTitle: 'परिणाम',
        toolsTitle: 'आप जिन उपकरणों का उपयोग करेंगे',
        paragraph:
          'इस पाठ में, आप श्रम सुधार की प्राथमिकताओं, डिजिटल परिवर्तन के ड्राइवरों और संचार की आवश्यकताओं को समझेंगे। आप अमेरिकी और अंतर्राष्ट्रीय ढांचे (ILO, GIZ, OECD) की पहचान करेंगे और सार्वजनिक नीति परिवर्तन में संचार की भूमिका को समझेंगे।',
        outcomes: ['• श्रम सुधार प्राथमिकताओं को समझें', '• डिजिटल परिवर्तन ड्राइवरों की पहचान करें', '• संचार आवश्यकताओं का विश्लेषण करें', '• हितधारक मैपिंग और प्रभाव विश्लेषण करें'],
        tools: ['• हितधारक प्रभाव मैप', '• संचार आवश्यकता विश्लेषण', '• डिजिटल परिवर्तन ढांचा', '• GIZ दृष्टिकोण टेम्प्लेट'],
        audioSection: 'सेक्शन 2: ऑडियो विवरण',
        chooseNarration: 'वर्णन भाषा चुनें',
        listenToLesson: 'पाठ सुनें',
        hoverToFlip: 'फ्लिप करने हेतु होवर करें',
        summary: 'सारांश',
        studyKeyIdeas: 'मुख्य विचारों का अध्ययन करने के लिए स्वाइप या होवर करें',
      };
    }
    if (baseLang === 'mr') {
      return {
        introTitle: 'पाठ 1: श्रम सुधार आणि डिजिटल परिवर्तन',
        introSubtitle: 'श्रम सुधार प्राधान्ये, डिजिटल परिवर्तन ड्राइव्हर्स आणि संप्रेषण गरजा समजून घ्या',
        learnTitle: 'या धड्यात तुम्ही काय शिकाल',
        listen: 'ऐका',
        stop: 'थांबवा',
        outcomesTitle: 'परिणाम',
        toolsTitle: 'तुम्ही वापरणारी साधने',
        paragraph:
          'या धड्यात, तुम्ही श्रम सुधाराच्या प्राधान्यांना, डिजिटल परिवर्तनाच्या ड्राइव्हर्सना आणि संप्रेषणाच्या गरजा समजून घ्याल. तुम्ही अमेरिकन आणि आंतरराष्ट्रीय फ्रेमवर्क्स (ILO, GIZ, OECD) ओळखाल आणि सार्वजनिक धोरण परिवर्तनात संप्रेषणाची भूमिका समजून घ्याल.',
        outcomes: ['• श्रम सुधार प्राधान्ये समजा', '• डिजिटल परिवर्तन ड्राइव्हर्स ओळखा', '• संप्रेषण गरजांचे विश्लेषण करा', '• स्टेकहोल्डर मॅपिंग आणि प्रभाव विश्लेषण करा'],
        tools: ['• स्टेकहोल्डर प्रभाव मॅप', '• संप्रेषण गरजा विश्लेषण', '• डिजिटल परिवर्तन फ्रेमवर्क', '• GIZ दृष्टिकोण टेम्प्लेट'],
        audioSection: 'विभाग 2: ऑडिओ निवेदन',
        chooseNarration: 'निवेदन भाषा निवडा',
        listenToLesson: 'पाठ ऐका',
        hoverToFlip: 'फ्लिपसाठी होवर करा',
        summary: 'सारांश',
        studyKeyIdeas: 'महत्त्वाच्या कल्पना अभ्यासण्यासाठी स्वाइप किंवा होवर करा',
      };
    }
    if (baseLang === 'de') {
      return {
        introTitle: 'Lektion 1: Arbeitsreform und digitale Transformation',
        introSubtitle: 'Verstehen Sie Arbeitsreform-Prioritäten, digitale Transformationsantriebe und Kommunikationsbedürfnisse',
        learnTitle: 'Was Sie in dieser Lektion lernen werden',
        listen: 'Anhören',
        stop: 'Stopp',
        outcomesTitle: 'Ergebnisse',
        toolsTitle: 'Werkzeuge, die Sie verwenden werden',
        paragraph:
          'In dieser Lektion verstehen Sie Arbeitsreform-Prioritäten, digitale Transformationsantriebe und Kommunikationsbedürfnisse. Sie identifizieren wichtige US-amerikanische und internationale Rahmenwerke (ILO, GIZ, OECD) und verstehen die Rolle der Kommunikation bei der Transformation öffentlicher Politik.',
        outcomes: [
          '• Arbeitsreform-Prioritäten verstehen',
          '• Digitale Transformationsantriebe identifizieren',
          '• Kommunikationsbedürfnisse analysieren',
          '• Stakeholder-Mapping und Einflussanalyse durchführen'
        ],
        tools: [
          '• Stakeholder-Einflusskarte',
          '• Kommunikationsbedarfsanalyse',
          '• Digitaler Transformationsrahmen',
          '• GIZ-Ansatz-Vorlage'
        ],
        audioSection: 'Abschnitt 2: Audio-Erzählung',
        chooseNarration: 'Erzählungssprache auswählen',
        listenToLesson: 'Lektion anhören',
        hoverToFlip: 'Zum Umdrehen schweben',
        summary: 'Zusammenfassung',
        studyKeyIdeas: 'Wischen oder schweben, um die wichtigsten Ideen zu studieren',
      };
    }
    if (baseLang === 'fr') {
      return {
        introTitle: 'Leçon 1 : Réforme du travail et transformation numérique',
        introSubtitle: "Comprendre les priorités de réforme du travail, les moteurs de transformation numérique et les besoins de communication",
        learnTitle: 'Ce que vous apprendrez dans cette leçon',
        listen: 'Écouter',
        stop: 'Arrêter',
        outcomesTitle: 'Résultats',
        toolsTitle: 'Outils que vous utiliserez',
        paragraph:
          "Dans cette leçon, vous comprendrez les priorités de réforme du travail, les moteurs de transformation numérique et les besoins de communication. Vous identifierez les cadres américains et internationaux clés (ILO, GIZ, OECD) et comprendrez le rôle de la communication dans la transformation des politiques publiques.",
        outcomes: [
          '• Comprendre les priorités de réforme du travail',
          '• Identifier les moteurs de transformation numérique',
          '• Analyser les besoins de communication',
          '• Effectuer un mapping des parties prenantes et une analyse d\'influence'
        ],
        tools: [
          '• Carte d\'influence des parties prenantes',
          '• Analyse des besoins de communication',
          '• Cadre de transformation numérique',
          '• Modèle d\'approche GIZ'
        ],
        audioSection: 'Section 2 : Narration audio',
        chooseNarration: 'Choisir la langue de narration',
        listenToLesson: 'Écouter la leçon',
        hoverToFlip: 'Survolez pour retourner',
        summary: 'Résumé',
        studyKeyIdeas: 'Balayez ou survolez pour étudier les idées clés',
      };
    }
    if (baseLang === 'es') {
      return {
        introTitle: 'Lección 1: Reforma laboral y transformación digital',
        introSubtitle: 'Entender las prioridades de reforma laboral, impulsores de transformación digital y necesidades de comunicación',
        learnTitle: 'Lo que aprenderás en esta lección',
        listen: 'Escuchar',
        stop: 'Detener',
        outcomesTitle: 'Resultados',
        toolsTitle: 'Herramientas que usarás',
        paragraph:
          "En esta lección, entenderás las prioridades de reforma laboral, los impulsores de transformación digital y las necesidades de comunicación. Identificarás marcos estadounidenses e internacionales clave (ILO, GIZ, OECD) y entenderás el papel de la comunicación en la transformación de políticas públicas.",
        outcomes: [
          '• Entender las prioridades de reforma laboral',
          '• Identificar impulsores de transformación digital',
          '• Analizar necesidades de comunicación',
          '• Realizar mapeo de partes interesadas y análisis de influencia'
        ],
        tools: [
          '• Mapa de influencia de partes interesadas',
          '• Análisis de necesidades de comunicación',
          '• Marco de transformación digital',
          '• Plantilla de enfoque GIZ'
        ],
        audioSection: 'Sección 2 : Narración audio',
        chooseNarration: 'Elegir el idioma de la narración',
        listenToLesson: 'Escuchar la lección',
        hoverToFlip: 'Pasar por encima para voltear',
        summary: 'Resumen',
        studyKeyIdeas: 'Deslizar o pasar por encima para estudiar las ideas clave',
      };
    }
    return {
      introTitle: 'Lesson 1: Labour Reform and Digital Transformation',
      introSubtitle: "Understand labour reform priorities, digital transformation drivers, and communication needs",
      learnTitle: "What You'll Learn in This Lesson",
      listen: 'Listen',
      stop: 'Stop',
      outcomesTitle: 'Outcomes',
      toolsTitle: "Tools You'll Use",
      paragraph:
        "In this lesson, you'll understand labour reform priorities, digital transformation drivers, and communication needs. You'll identify key U.S. and international frameworks (ILO, GIZ, OECD) and understand the role of communication in public policy transformation.",
      outcomes: ['• Understand labour reform priorities', '• Identify digital transformation drivers', '• Analyze communication needs', '• Conduct stakeholder mapping and influence analysis'],
      tools: ['• Stakeholder influence map', '• Communication need analysis', '• Digital transformation framework', '• GIZ approach template'],
      audioSection: 'Section 2: Audio Narration',
      chooseNarration: 'Choose Narration Language',
      listenToLesson: 'Listen to Lesson',
      hoverToFlip: 'Hover to flip',
      summary: 'Summary',
      studyKeyIdeas: 'Swipe or hover to study key ideas',
    };
  }, [baseLang]);

  const studyCards = React.useMemo(() => {
    if (baseLang === 'hi') {
      return [
        {
          title: 'श्रम सुधार क्या है?',
          front: ['डिजिटल युग में श्रम कानूनों का आधुनिकीकरण', 'कार्यस्थल सुरक्षा और अधिकारों की सुरक्षा', 'अंतर्राष्ट्रीय मानकों के साथ संरेखण'],
          back: 'श्रम सुधार में कार्यस्थल को अधिक न्यायसंगत और सुरक्षित बनाने के लिए कानूनों और नीतियों को अपडेट करना शामिल है।',
          color: 'from-blue-50 to-indigo-50 border-blue-100',
        },
        {
          title: 'डिजिटल परिवर्तन की भूमिका',
          front: ['कार्यस्थल में प्रौद्योगिकी का एकीकरण', 'दूरस्थ कार्य और लचीलेपन का समर्थन', 'डिजिटल कौशल विकास की आवश्यकता'],
          back: 'डिजिटल परिवर्तन श्रम बाजार को बदल रहा है और नए कौशल और दृष्टिकोण की मांग कर रहा है।',
          color: 'from-green-50 to-emerald-50 border-green-100',
        },
        {
          title: 'संचार की महत्वपूर्ण भूमिका',
          front: ['हितधारकों के बीच स्पष्ट संचार', 'नीति परिवर्तन की व्याख्या और समझ', 'सहयोग और समर्थन का निर्माण'],
          back: 'प्रभावी संचार सार्वजनिक नीति परिवर्तन की सफलता के लिए महत्वपूर्ण है।',
          color: 'from-purple-50 to-violet-50 border-purple-100',
        },
      ];
    }
    if (baseLang === 'mr') {
      return [
        {
          title: 'श्रम सुधार म्हणजे काय?',
          front: ['डिजिटल युगातील श्रम कायद्यांचे आधुनिकीकरण', 'कार्यस्थळ सुरक्षा आणि हक्कांचे संरक्षण', 'आंतरराष्ट्रीय मानकांशी संरेखन'],
          back: 'श्रम सुधारामध्ये कार्यस्थळ अधिक न्याय्य आणि सुरक्षित बनवण्यासाठी कायदे आणि धोरणे अपडेट करणे समाविष्ट आहे.',
          color: 'from-blue-50 to-indigo-50 border-blue-100',
        },
        {
          title: 'डिजिटल परिवर्तनाची भूमिका',
          front: ['कार्यस्थळात तंत्रज्ञानाचे एकत्रीकरण', 'दूरस्थ कार्य आणि लवचिकतेचे समर्थन', 'डिजिटल कौशल्य विकासाची गरज'],
          back: 'डिजिटल परिवर्तन श्रम बाजारपेठा बदलत आहे आणि नवीन कौशल्ये व दृष्टिकोन मागत आहे.',
          color: 'from-green-50 to-emerald-50 border-green-100',
        },
        {
          title: 'संप्रेषणाची महत्त्वाची भूमिका',
          front: ['स्टेकहोल्डर्स दरम्यान स्पष्ट संप्रेषण', 'धोरण बदलाचे स्पष्टीकरण आणि समज', 'सहकार्य आणि समर्थन निर्माण करणे'],
          back: 'प्रभावी संप्रेषण सार्वजनिक धोरण परिवर्तनाच्या यशासाठी महत्त्वाचे आहे.',
          color: 'from-purple-50 to-violet-50 border-purple-100',
        },
      ];
    }
    if (baseLang === 'de') {
      return [
        {
          title: 'Was ist Arbeitsreform?',
          front: ['Modernisierung der Arbeitsgesetze im digitalen Zeitalter', 'Schutz von Arbeitssicherheit und -rechten', 'Ausrichtung an internationalen Standards'],
          back: 'Arbeitsreform bedeutet, Gesetze und Richtlinien zu aktualisieren, um Arbeitsplätze gerechter und sicherer zu machen.',
          color: 'from-blue-50 to-indigo-50 border-blue-100',
        },
        {
          title: 'Rolle der digitalen Transformation',
          front: ['Technologieintegration am Arbeitsplatz', 'Unterstützung von Remote-Arbeit und Flexibilität', 'Bedarf an digitalen Kompetenzen'],
          back: 'Die digitale Transformation verändert den Arbeitsmarkt und verlangt neue Fähigkeiten und Herangehensweisen.',
          color: 'from-green-50 to-emerald-50 border-green-100',
        },
        {
          title: 'Kritische Rolle der Kommunikation',
          front: ['Klares Stakeholder-Management', 'Politikänderungen erklären und verstehen', 'Zusammenarbeit und Unterstützung aufbauen'],
          back: 'Effektive Kommunikation ist entscheidend für den Erfolg der Transformation der öffentlichen Politik.',
          color: 'from-purple-50 to-violet-50 border-purple-100',
        },
      ];
    }
    if (baseLang === 'es') {
      return [
        {
          title: '¿Qué es la reforma laboral?',
          front: ['Modernizar las leyes laborales en la era digital', 'Proteger la seguridad y los derechos en el trabajo', 'Alineación con estándares internacionales'],
          back: 'La reforma laboral implica actualizar leyes y políticas para que los lugares de trabajo sean más justos y seguros.',
          color: 'from-blue-50 to-indigo-50 border-blue-100',
        },
        {
          title: 'Rol de la transformación digital',
          front: ['Integración tecnológica en los lugares de trabajo', 'Apoyo al trabajo remoto y la flexibilidad', 'Necesidad de desarrollar habilidades digitales'],
          back: 'La transformación digital está cambiando el mercado laboral y exige nuevas habilidades y enfoques.',
          color: 'from-green-50 to-emerald-50 border-green-100',
        },
        {
          title: 'Rol crítico de la comunicación',
          front: ['Comunicación clara entre partes interesadas', 'Explicar y comprender cambios de política', 'Construir colaboración y apoyo'],
          back: 'La comunicación efectiva es crucial para el éxito de la transformación de la política pública.',
          color: 'from-purple-50 to-violet-50 border-purple-100',
        },
      ];
    }
    if (baseLang === 'fr') {
      return [
        {
          title: 'Qu’est-ce que la réforme du travail ?',
          front: ['Moderniser les lois du travail à l’ère numérique', 'Protéger la sécurité et les droits au travail', 'Alignement sur les normes internationales'],
          back: 'La réforme du travail consiste à mettre à jour les lois et politiques pour rendre les lieux de travail plus équitables et sûrs.',
          color: 'from-blue-50 to-indigo-50 border-blue-100',
        },
        {
          title: 'Rôle de la transformation numérique',
          front: ['Intégration des technologies au travail', 'Soutien du télétravail et de la flexibilité', 'Besoin de développer les compétences numériques'],
          back: 'La transformation numérique change le marché du travail et exige de nouvelles compétences et approches.',
          color: 'from-green-50 to-emerald-50 border-green-100',
        },
        {
          title: 'Rôle critique de la communication',
          front: ['Communication claire entre parties prenantes', 'Expliquer et comprendre les changements de politique', 'Construire la collaboration et le soutien'],
          back: 'Une communication efficace est cruciale pour la réussite de la transformation des politiques publiques.',
          color: 'from-purple-50 to-violet-50 border-purple-100',
        },
      ];
    }
    return [
      {
        title: 'What is Labour Reform?',
        front: ['Modernizing labour laws in the digital era', 'Protecting workplace safety and rights', 'Alignment with international standards'],
        back: 'Labour reform involves updating laws and policies to make workplaces more equitable and secure.',
        color: 'from-blue-50 to-indigo-50 border-blue-100',
      },
      {
        title: 'Role of Digital Transformation',
        front: ['Technology integration in workplaces', 'Supporting remote work and flexibility', 'Need for digital skills development'],
        back: 'Digital transformation is changing the labour market and demanding new skills and approaches.',
        color: 'from-green-50 to-emerald-50 border-green-100',
      },
      {
        title: 'Critical Role of Communication',
        front: ['Clear communication among stakeholders', 'Explaining and understanding policy changes', 'Building collaboration and support'],
        back: 'Effective communication is crucial for the success of public policy transformation.',
        color: 'from-purple-50 to-violet-50 border-purple-100',
      },
    ];
  }, [baseLang]);

  const pdfUi = React.useMemo(() => {
    if (baseLang === 'hi') return { title: 'श्रम सुधार पीडीएफ दस्तावेज', open: 'खोलें', download: 'डाउनलोड' };
    if (baseLang === 'mr') return { title: 'श्रम सुधार PDF दस्तऐवज', open: 'उघडा', download: 'डाउनलोड' };
    if (baseLang === 'de') return { title: 'PDF-Dokument zur Arbeitsreform', open: 'Öffnen', download: 'Herunterladen' };
    if (baseLang === 'es') return { title: 'Documento PDF de Reforma Laboral', open: 'Abrir', download: 'Descargar' };
    if (baseLang === 'fr') return { title: 'Document PDF sur la réforme du travail', open: 'Ouvrir', download: 'Télécharger' };
    return { title: 'Labour Reform PDF Document', open: 'Open', download: 'Download' };
  }, [baseLang]);
  const pdfUrl = '/assets/Lesson1LabourReform_DigitalTransformation.pdf';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Header */}
      <div className="relative w-full">
        <div
          className="relative w-full h-[220px] md:h-[320px] lg:h-[360px] overflow-hidden"
        >
          <img
            src={(history?.state && history.state.moduleImage) || '/assets/c1.webp'}
            alt="Module banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50"></div>

          {/* Top controls */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <Button 
              onClick={handleBackToModules} 
              variant="outline"
              className="flex items-center gap-2 bg-white/90 backdrop-blur hover:bg-white"
            >
              <ArrowLeft className="h-4 w-4" />
              {uiText.backToModules}
            </Button>

            {/* Quick language switcher */}
            <div className="relative">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-9 w-9 bg-white/90 backdrop-blur hover:bg-white"
                onClick={() => {
                  const el = document.getElementById('quick-lang-menu');
                  if (!el) return;
                  el.classList.toggle('hidden');
                }}
              >
                <Languages className="h-4 w-4" />
              </Button>
              <div
                id="quick-lang-menu"
                className="hidden absolute right-0 mt-2 w-44 rounded-md border bg-white shadow-lg z-20"
              >
                <ul className="py-1 text-sm text-gray-700">
                  {[
                    { code: 'en-US', label: 'English' },
                    { code: 'hi-IN', label: 'हिन्दी' },
                    { code: 'mr-IN', label: 'मराठी' },
                    { code: 'de-DE', label: 'Deutsch' },
                    { code: 'es-ES', label: 'Español' },
                    { code: 'fr-FR', label: 'Français' },
                  ].map((opt) => (
                    <li key={opt.code}>
                      <button
                        type="button"
                        onClick={() => {
                          const synth = window.speechSynthesis;
                          if (synth) synth.cancel();
                          setSpeakingBlocks({});
                          setSelectedLang(opt.code);
                          const el = document.getElementById('quick-lang-menu');
                          if (el) el.classList.add('hidden');
                        }}
                        className={`w-full text-left px-3 py-2 hover:bg-gray-50 ${selectedLang === opt.code ? 'bg-gray-100 font-medium' : ''}`}
                      >
                        {opt.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom meta */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div className="max-w-[70%]">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow">
                {(history?.state && history.state.moduleTitle) || uiText.module1}
              </h1>
            </div>
            <div className="text-white/95 bg-black/30 px-3 py-1.5 rounded-md text-sm font-medium">
              {(history?.state && history.state.duration) || 'Weeks 1–2'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Section 1: Intro */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.introTitle}</h1>
            <p className="text-xl text-gray-600 leading-relaxed">{t.introSubtitle}</p>
          </div>

          {/* Study Card Carousel (Flipping cards) */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="relative">
              <Carousel className="w-full">
                <CarouselContent>
                  {studyCards.map((card, idx) => (
                    <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                      <div className="group [perspective:1000px] h-[320px]">
                        <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                          {/* Front */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${card.color} border rounded-xl p-6 shadow-sm [backface-visibility:hidden] flex flex-col justify-between`}>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-3">{card.title}</h3>
                              <ul className="text-sm text-gray-700 space-y-2">
                                {card.front.map((pt, i) => (
                                  <li key={i} className="flex items-start">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                                    <span className="leading-relaxed">{pt}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <p className="text-xs text-gray-500 mt-4">{t.hoverToFlip}</p>
                          </div>
                          {/* Back */}
                          <div className={`absolute inset-0 bg-white border rounded-xl p-6 shadow-sm [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-between`}>
                            <div>
                              <h4 className="text-base font-semibold text-gray-900 mb-2">{baseLang === 'hi' ? 'सारांश' : baseLang === 'mr' ? 'सारांश' : 'Summary'}</h4>
                              <p className="text-sm text-gray-700 leading-relaxed">{card.back}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-4" />
                <CarouselNext className="-right-4" />
              </Carousel>
            </div>
            <p className="text-sm text-gray-500 text-center mt-4">{t.studyKeyIdeas}</p>
          </div>

          {/* Section Description with TTS and Controls */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">{t.learnTitle}</h2>
            
            <div className="flex items-center justify-center gap-3 mb-6">
                <select
                  value={selectedLang}
                  onChange={(e) => {
                    // Stop any currently playing audio when language changes
                    const synth = window.speechSynthesis;
                    if (synth) {
                      synth.cancel();
                      setSpeakingBlocks({});
                    }
                    setSelectedLang(e.target.value);
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-56"
                >
                  <optgroup label="🌍 English Variants">
                    {languageOptions.filter(opt => opt.code.startsWith('en-')).map(opt => (
                    <option key={opt.code} value={opt.code}>{opt.label}</option>
                  ))}
                  </optgroup>
                  <optgroup label="🇮🇳 Indian Languages">
                    {languageOptions.filter(opt => opt.code.includes('-IN')).map(opt => (
                      <option key={opt.code} value={opt.code}>{opt.label}</option>
                    ))}
                  </optgroup>
                  <optgroup label="🇪🇺 European Languages">
                    {languageOptions.filter(opt => 
                      ['fr-', 'de-', 'es-', 'it-', 'pt-', 'nl-', 'sv-', 'no-', 'da-', 'fi-', 'pl-', 'ru-', 'uk-', 'cs-', 'sk-', 'hu-', 'ro-', 'bg-', 'hr-', 'sl-', 'et-', 'lv-', 'lt-', 'el-', 'tr-', 'is-', 'mt-'].some(prefix => opt.code.startsWith(prefix))
                    ).map(opt => (
                      <option key={opt.code} value={opt.code}>{opt.label}</option>
                    ))}
                  </optgroup>
                  <optgroup label="🌏 Asian Languages">
                    {languageOptions.filter(opt => 
                      ['ja-', 'ko-', 'zh-', 'th-', 'vi-', 'id-', 'ms-', 'fil-', 'ar-', 'he-', 'fa-', 'hi-PK', 'ur-PK', 'bn-BD', 'si-', 'my-', 'km-', 'lo-', 'mn-', 'ka-', 'hy-', 'az-', 'kk-', 'ky-', 'uz-', 'tg-', 'tk-'].some(prefix => opt.code.startsWith(prefix) || opt.code === prefix)
                    ).map(opt => (
                      <option key={opt.code} value={opt.code}>{opt.label}</option>
                    ))}
                  </optgroup>
                </select>
                <select
                  value={selectedVoiceURI}
                  onChange={(e) => { const synth = window.speechSynthesis; if (synth) { synth.cancel(); setSpeakingBlocks({}); } setSelectedVoiceURI(e.target.value); }}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                >
                  {(() => {
                    // Enhanced voice filtering with fallback strategies
                    const findBestVoices = (targetLang) => {
                      const baseLanguage = targetLang.substring(0, 2);
                      
                      // Strategy 1: Exact language code match
                      let exactMatches = voices.filter(voice => voice.lang === targetLang);
                      
                      // Strategy 2: Case-insensitive exact match
                      if (exactMatches.length === 0) {
                        exactMatches = voices.filter(voice => 
                          voice.lang.toLowerCase() === targetLang.toLowerCase()
                        );
                      }
                      
                      // Strategy 3: Base language match
                      const baseMatches = voices.filter(voice => 
                        voice.lang.startsWith(baseLanguage + '-') || 
                        voice.lang === baseLanguage ||
                        voice.lang.includes(baseLanguage)
                      );
                      
                      // Strategy 4: Language family matching
                      const languageFamilyMap = {
                        'hi': ['hi', 'hin', 'hindi'],
                        'ta': ['ta', 'tam', 'tamil'],
                        'te': ['te', 'tel', 'telugu'],
                        'bn': ['bn', 'ben', 'bengali'],
                        'gu': ['gu', 'guj', 'gujarati'],
                        'kn': ['kn', 'kan', 'kannada'],
                        'ml': ['ml', 'mal', 'malayalam'],
                        'mr': ['mr', 'mar', 'marathi'],
                        'pa': ['pa', 'pan', 'punjabi'],
                        'ur': ['ur', 'urd', 'urdu'],
                        'or': ['or', 'ori', 'odia'],
                        'as': ['as', 'asm', 'assamese'],
                        'ne': ['ne', 'nep', 'nepali'],
                        'sa': ['sa', 'san', 'sanskrit'],
                        'en': ['en', 'eng', 'english']
                      };
                      
                      const familyCodes = languageFamilyMap[baseLanguage] || [baseLanguage];
                      const familyMatches = voices.filter(voice => 
                        familyCodes.some(code => 
                          voice.lang.toLowerCase().includes(code.toLowerCase())
                        )
                      );
                      
                      // Combine all matches and remove duplicates
                      const allMatches = [...exactMatches, ...baseMatches, ...familyMatches];
                      const uniqueMatches = allMatches.filter((voice, index, self) => 
                        index === self.findIndex(v => v.name === voice.name)
                    );
                      
                      return uniqueMatches;
                    };
                    
                    const bestVoices = findBestVoices(selectedLang);
                    
                    if (bestVoices.length > 0) {
                      return bestVoices.map(voice => (
                        <option key={voice.voiceURI} value={voice.voiceURI}>
                          {voice.name} ({voice.lang})
                        </option>
                      ));
                    } else {
                      return <option value="">No suitable voice found</option>;
                    }
                  })()}
                  {voices.length === 0 && <option value="">System default</option>}
                </select>
                <Button onClick={handleFullScreen} variant="outline" size="icon" className="p-2">
                  <Maximize2 className="h-4 w-4" />
                </Button>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-end mb-3">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100" 
                  onClick={() => handleSpeakToggle('lesson-text', t.paragraph)}
                >
                  {speakingBlocks['lesson-text'] ? <Pause className="h-3 w-3 mr-2" /> : <Play className="h-3 w-3 mr-2" />}
                  {speakingBlocks['lesson-text'] ? t.stop : t.listen}
                </Button>
              </div>
              <p className="text-gray-700 leading-relaxed">{t.paragraph}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">{t.outcomesTitle}</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  {t.outcomes.map((line, i) => (<li key={i}>{line}</li>))}
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">{t.toolsTitle}</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  {t.tools.map((line, i) => (<li key={i}>{line}</li>))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: PDF Document */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">{pdfUi.title}</h3>
              <div className="flex items-center gap-2">
                <Button asChild variant="outline" size="sm">
                  <a href={pdfUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" /> {pdfUi.open}
                  </a>
                </Button>
                <Button asChild size="sm">
                  <a href={pdfUrl} download className="flex items-center gap-2">
                    <FileDown className="h-4 w-4" /> {pdfUi.download}
                  </a>
                </Button>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border bg-white">
              {/* PDF Viewer - Like Module 2 */}
              <div className="w-full h-[60vh]">
                <iframe
                  src={pdfUrl}
                  className="w-full h-full border-0"
                  title="Lesson 1 Labour Reform Digital Transformation PDF"
                  frameBorder="0"
                >
                  <p className="p-4 text-gray-600">
                    {baseLang === 'hi' ? 'आपका ब्राउज़र PDF नहीं दिखा सकता।' : 
                     baseLang === 'mr' ? 'तुमचा ब्राउज़र PDF दाखवू शकत नाही.' : 
                     'Your browser does not support PDF viewing.'}
                    <a 
                      href={pdfUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline ml-2"
                    >
                      {baseLang === 'hi' ? 'यहां क्लिक करें' : baseLang === 'mr' ? 'येथे क्लिक करा' : 'Click here'}
                    </a>
                    {baseLang === 'hi' ? 'PDF देखने के लिए' : baseLang === 'mr' ? 'PDF पहण्यासाठी' : 'to view the PDF'}
                  </p>
                </iframe>
              </div>
              

            </div>
            <div className="mt-3 text-sm text-gray-500 text-center">
              {baseLang === 'hi' ? 'PDF फ़ाइल: Lesson1LabourReform_DigitalTransformation.pdf' : 
               baseLang === 'mr' ? 'PDF फाईल: Lesson1LabourReform_DigitalTransformation.pdf' : 
               'PDF File: Lesson1LabourReform_DigitalTransformation.pdf'}
            </div>
          </div>
        </section>

        {/* Section 3: Audio Narration (Translated) */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{t.audioSection}</h2>
            <p className="text-sm text-gray-600 text-center mb-4">
              {baseLang === 'hi' ? 'यह भाषा केवल ऑडियो के लिए है, पूरे पेज की भाषा नहीं बदलेगी' : 
               baseLang === 'mr' ? 'ही भाषा फक्त ऑडिओसाठी आहे, संपूर्ण पृष्ठाची भाषा बदलणार नाही' : 
               'This language is only for audio, it will not change the language of the entire page'}
            </p>
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">{t.chooseNarration}</label>
                <select
                  value={audioLang}
                  onChange={(e) => setAudioLang(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                >
                  <optgroup label="🌍 Available Audio Languages">
                    <option value="en-US">🇺🇸 English</option>
                    <option value="hi-IN">🇮🇳 Hindi</option>
                    <option value="de-DE">🇩🇪 German</option>
                    <option value="es-ES">🇪🇸 Spanish</option>
                    <option value="fr-FR">🇫🇷 French</option>
                  </optgroup>
                </select>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-lg border border-blue-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.listenToLesson}</h3>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  {/* Language-specific audio players */}
                  {audioLang === 'en-US' && (
                    <audio controls className="w-full" preload="metadata">
                      <source src="/English.mp3" type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                  {audioLang === 'hi-IN' && (
                    <audio controls className="w-full" preload="metadata">
                      <source src="/Hindi.mp3" type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                  {audioLang === 'de-DE' && (
                    <audio controls className="w-full" preload="metadata">
                      <source src="/German.mp3" type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                  {audioLang === 'es-ES' && (
                    <audio controls className="w-full" preload="metadata">
                      <source src="/Spanish.mp3" type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                  {audioLang === 'fr-FR' && (
                    <audio controls className="w-full" preload="metadata">
                      <source src="/French.mp3" type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                  
                  <div className="mt-2 text-xs text-gray-500">
                    {audioLang === 'hi-IN' ? 'हिंदी ऑडियो फ़ाइल: /Hindi.mp3' : 
                     audioLang === 'de-DE' ? 'Deutsche Audiodatei: /German.mp3' :
                     audioLang === 'es-ES' ? 'Archivo de audio en español: /Spanish.mp3' :
                     audioLang === 'fr-FR' ? 'Fichier audio français: /French.mp3' :
                     'English audio file: /English.mp3'}
                  </div>

                  <div className="mt-3 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      {audioLang === 'en-US' && 'High-quality English narration with clear pronunciation'}
                      {audioLang === 'hi-IN' && 'स्पष्ट उच्चारण के साथ उच्च गुणवत्ता वाली हिंदी कथा'}
                      {audioLang === 'de-DE' && 'Hochwertige deutsche Erzählung mit klarer Aussprache'}
                      {audioLang === 'es-ES' && 'Narración en español de alta calidad con pronunciación clara'}
                      {audioLang === 'fr-FR' && 'Narration française de haute qualité avec prononciation claire'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Labour Reform Framework */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {baseLang === 'hi' ? 'श्रम सुधार ढांचा' : baseLang === 'mr' ? 'श्रम सुधार रचना' : 'Labour Reform Framework'}
            </h2>
            <div className="space-y-6">
              {[
                {
                  level: baseLang === 'hi' ? 'स्तर 1: आधार' : baseLang === 'mr' ? 'स्तर 1: पाया' : 'Level 1: Foundation',
                  title: baseLang === 'hi' ? 'कानूनी ढांचा' : baseLang === 'mr' ? 'कायदेशीर रचना' : 'Legal Framework',
                  description: baseLang === 'hi' ? 'मौजूदा श्रम कानूनों का आधुनिकीकरण' : baseLang === 'mr' ? 'विद्यमान श्रम कायद्यांचे आधुनिकीकरण' : 'Modernizing existing labour laws',
                  icon: '⚖️',
                  priority: 'High'
                },
                {
                  level: baseLang === 'hi' ? 'स्तर 2: डिजिटल परिवर्तन' : baseLang === 'mr' ? 'स्तर 2: डिजिटल परिवर्तन' : 'Level 2: Digital Transformation',
                  title: baseLang === 'hi' ? 'प्रौद्योगिकी एकीकरण' : baseLang === 'mr' ? 'तंत्रज्ञान एकत्रीकरण' : 'Technology Integration',
                  description: baseLang === 'hi' ? 'कार्यस्थल में डिजिटल उपकरणों का उपयोग' : baseLang === 'mr' ? 'कार्यस्थळात डिजिटल साधनांचा वापर' : 'Digital tools in workplace',
                  icon: '💻',
                  priority: 'High'
                },
                {
                  level: baseLang === 'hi' ? 'स्तर 3: संचार' : baseLang === 'mr' ? 'स्तर 3: संप्रेषण' : 'Level 3: Communication',
                  title: baseLang === 'hi' ? 'हितधारक संचार' : baseLang === 'mr' ? 'स्टेकहोल्डर संप्रेषण' : 'Stakeholder Communication',
                  description: baseLang === 'hi' ? 'सभी पक्षों के साथ प्रभावी संचार' : baseLang === 'mr' ? 'सर्व पक्षांशी प्रभावी संप्रेषण' : 'Effective communication with all parties',
                  icon: '📢',
                  priority: 'Medium'
                },
                {
                  level: baseLang === 'hi' ? 'स्तर 4: कार्यान्वयन' : baseLang === 'mr' ? 'स्तर 4: अंमलबजावणी' : 'Level 4: Implementation',
                  title: baseLang === 'hi' ? 'नीति कार्यान्वयन' : baseLang === 'mr' ? 'धोरण अंमलबजावणी' : 'Policy Implementation',
                  description: baseLang === 'hi' ? 'सुधारों का व्यावहारिक कार्यान्वयन' : baseLang === 'mr' ? 'सुधारणांची व्यावहारिक अंमलबजावणी' : 'Practical implementation of reforms',
                  icon: '🚀',
                  priority: 'Low'
                }
              ].map((item, idx) => (
                <div key={idx} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-300 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">{item.icon}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                            {item.level}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            item.priority === 'High' ? 'bg-red-100 text-red-700' :
                            item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {item.priority === 'High' ? (baseLang === 'hi' ? 'उच्च' : baseLang === 'mr' ? 'उच्च' : 'High') :
                             item.priority === 'Medium' ? (baseLang === 'hi' ? 'मध्यम' : baseLang === 'mr' ? 'मध्यम' : 'Medium') :
                             (baseLang === 'hi' ? 'कम' : baseLang === 'mr' ? 'कमी' : 'Low')}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-gray-600">{idx + 1}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800 text-center">
                {baseLang === 'hi' ? 'इस क्रम में श्रम सुधार का निर्माण करें - आधार से शुरू करके ऊपर की ओर बढ़ें' : 
                 baseLang === 'mr' ? 'या क्रमाने श्रम सुधार तयार करा - पायाभरणीपासून सुरुवात करून वरच्या दिशेने जा' : 
                 'Build labour reform in this order - start from the foundation and work your way up'}
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Stakeholder Mapping */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {baseLang === 'hi' ? 'हितधारक मैपिंग' : baseLang === 'mr' ? 'स्टेकहोल्डर मॅपिंग' : 'Stakeholder Mapping'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  front: baseLang === 'hi' ? 'मंत्रालय और सरकार' : baseLang === 'mr' ? 'मंत्रालये आणि सरकार' : 'Ministries & Government',
                  back: baseLang === 'hi' ? 'श्रम नीति निर्माता और नियामक अधिकारी' : baseLang === 'mr' ? 'श्रम धोरण निर्माते आणि नियामक अधिकारी' : 'Labour policy makers and regulatory officials',
                  color: 'from-blue-50 to-indigo-50 border-blue-200'
                },
                {
                  front: baseLang === 'hi' ? 'नियोक्ता और उद्योग' : baseLang === 'mr' ? 'नियोक्ते आणि उद्योग' : 'Employers & Industry',
                  back: baseLang === 'hi' ? 'कंपनियां और व्यापार संघ जो श्रम सुधार से प्रभावित होते हैं' : baseLang === 'mr' ? 'कंपन्या आणि व्यापार संघ जे श्रम सुधाराने प्रभावित होतात' : 'Companies and trade associations affected by labour reform',
                  color: 'from-green-50 to-emerald-50 border-green-200'
                },
                {
                  front: baseLang === 'hi' ? 'शिक्षक और प्रशिक्षक' : baseLang === 'mr' ? 'शिक्षक आणि प्रशिक्षक' : 'Educators & Trainers',
                  back: baseLang === 'hi' ? 'कौशल विकास और शिक्षा प्रदाता' : baseLang === 'mr' ? 'कौशल्य विकास आणि शिक्षण प्रदाते' : 'Skills development and education providers',
                  color: 'from-purple-50 to-violet-50 border-purple-200'
                },
                {
                  front: baseLang === 'hi' ? 'संघ और कर्मचारी' : baseLang === 'mr' ? 'संघ आणि कर्मचारी' : 'Unions & Workers',
                  back: baseLang === 'hi' ? 'श्रमिक संघ और कर्मचारी जो सुधारों से प्रभावित होते हैं' : baseLang === 'mr' ? 'कामगार संघ आणि कर्मचारी जे सुधारणांनी प्रभावित होतात' : 'Worker unions and employees affected by reforms',
                  color: 'from-orange-50 to-yellow-50 border-orange-200'
                }
              ].map((card, idx) => (
                <div key={idx} className="group [perspective:1000px] h-48">
                  <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.color} rounded-xl p-6 shadow-sm [backface-visibility:hidden] flex items-center justify-center`}>
                      <h3 className="text-xl font-semibold text-gray-800 text-center">{card.front}</h3>
                    </div>
                    <div className={`absolute inset-0 bg-white border rounded-xl p-6 shadow-sm [transform:rotateY(180deg)] [backface-visibility:hidden] flex items-center justify-center`}>
                      <p className="text-gray-700 text-center leading-relaxed">{card.back}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: Implementation Plan Builder */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {baseLang === 'hi' ? 'कार्यान्वयन योजना निर्माता' : baseLang === 'mr' ? 'अंमलबजावणी योजना तयार करणारा' : 'Implementation Plan Builder'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700">
                  {baseLang === 'hi' ? 'अल्पकालिक लक्ष्य (1-2 वर्ष)' : baseLang === 'mr' ? 'अल्पकालीन ध्येय (1-2 वर्ष)' : 'Short-term Goals (1-2 years)'}
                </h3>
                <div className="space-y-3">
                  {[
                    baseLang === 'hi' ? 'कानूनी ढांचे का आधुनिकीकरण' : baseLang === 'mr' ? 'कायदेशीर रचनेचे आधुनिकीकरण' : 'Modernize legal framework',
                    baseLang === 'hi' ? 'डिजिटल उपकरणों का परिचय' : baseLang === 'mr' ? 'डिजिटल साधनांचा परिचय' : 'Introduce digital tools',
                    baseLang === 'hi' ? 'हितधारक संचार स्थापित करें' : baseLang === 'mr' ? 'स्टेकहोल्डर संप्रेषण स्थापित करा' : 'Establish stakeholder communication'
                  ].map((goal, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">{goal}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700">
                  {baseLang === 'hi' ? 'दीर्घकालिक लक्ष्य (5+ वर्ष)' : baseLang === 'mr' ? 'दीर्घकालीन ध्येय (5+ वर्ष)' : 'Long-term Goals (5+ years)'}
                </h3>
                <div className="space-y-3">
                  {[
                    baseLang === 'hi' ? 'पूर्ण डिजिटल परिवर्तन' : baseLang === 'mr' ? 'पूर्ण डिजिटल परिवर्तन' : 'Complete digital transformation',
                    baseLang === 'hi' ? 'अंतर्राष्ट्रीय मानकों के साथ संरेखण' : baseLang === 'mr' ? 'आंतरराष्ट्रीय मानकांशी संरेखन' : 'Alignment with international standards',
                    baseLang === 'hi' ? 'स्थायी नीति कार्यान्वयन' : baseLang === 'mr' ? 'स्थायी धोरण अंमलबजावणी' : 'Sustainable policy implementation'
                  ].map((goal, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">{goal}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6.5: Interactive Quiz Section */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {baseLang === 'hi' ? 'अपने ज्ञान का परीक्षण करें' : baseLang === 'mr' ? 'तुमचे ज्ञान तपासा' : 'Test Your Knowledge'}
            </h2>
            <div className="space-y-6">
              {[
                {
                  question: baseLang === 'hi' ? 'श्रम सुधार में सबसे महत्वपूर्ण क्या है?' : baseLang === 'mr' ? 'श्रम सुधारात सर्वात महत्त्वाचे काय आहे?' : 'What is most important in labour reform?',
                  options: [
                    baseLang === 'hi' ? 'केवल कानूनी परिवर्तन' : baseLang === 'mr' ? 'फक्त कायदेशीर बदल' : 'Only legal changes',
                    baseLang === 'hi' ? 'हितधारकों के साथ संचार और सहयोग' : baseLang === 'mr' ? 'स्टेकहोल्डर्ससह संप्रेषण आणि सहकार्य' : 'Communication and collaboration with stakeholders',
                    baseLang === 'hi' ? 'केवल तकनीकी उन्नयन' : baseLang === 'mr' ? 'फक्त तांत्रिक सुधारणा' : 'Only technological upgrades'
                  ],
                  correct: 1,
                  explanation: baseLang === 'hi' ? 'हितधारकों के साथ प्रभावी संचार और सहयोग श्रम सुधार की सफलता के लिए महत्वपूर्ण है।' : baseLang === 'mr' ? 'स्टेकहोल्डर्ससह प्रभावी संप्रेषण आणि सहकार्य श्रम सुधाराच्या यशासाठी महत्त्वाचे आहे.' : 'Effective communication and collaboration with stakeholders is crucial for successful labour reform.'
                },
                {
                  question: baseLang === 'hi' ? 'डिजिटल परिवर्तन श्रम बाजार को कैसे प्रभावित करता है?' : baseLang === 'mr' ? 'डिजिटल परिवर्तन श्रम बाजारपेठेवर कसा परिणाम करतो?' : 'How does digital transformation affect the labour market?',
                  options: [
                    baseLang === 'hi' ? 'केवल नौकरियां कम करता है' : baseLang === 'mr' ? 'फक्त नोकऱ्या कमी करतो' : 'Only reduces jobs',
                    baseLang === 'hi' ? 'नए कौशल और दृष्टिकोण की मांग करता है' : baseLang === 'mr' ? 'नवीन कौशल्ये आणि दृष्टिकोन मागतो' : 'Demands new skills and approaches',
                    baseLang === 'hi' ? 'केवल प्रौद्योगिकी कंपनियों को लाभ देता है' : baseLang === 'mr' ? 'फक्त तंत्रज्ञान कंपन्यांना फायदा देतो' : 'Only benefits technology companies'
                  ],
                  correct: 1,
                  explanation: baseLang === 'hi' ? 'डिजिटल परिवर्तन नए कौशल और दृष्टिकोण की मांग करता है, जो श्रम बाजार को बदलता है।' : baseLang === 'mr' ? 'डिजिटल परिवर्तन नवीन कौशल्ये आणि दृष्टिकोन मागतो, जे श्रम बाजारपेठा बदलतो.' : 'Digital transformation demands new skills and approaches, changing the labour market.'
                }
              ].map((quiz, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-medium text-gray-800 mb-4">{quiz.question}</h3>
                  <div className="space-y-2">
                    {quiz.options.map((option, optIdx) => (
                      <label key={optIdx} className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="radio" 
                          name={`quiz-${idx}`} 
                          value={optIdx} 
                          className="text-blue-600"
                          onChange={(e) => {
                            const selectedAnswer = parseInt(e.target.value);
                            setQuizAnswers(prev => ({
                              ...prev,
                              [idx]: selectedAnswer
                            }));
                          }}
                        />
                        <span className={`text-gray-700 ${
                          quizAnswers[idx] !== undefined && optIdx === quiz.correct ? 'font-semibold text-green-600' : ''
                        } ${
                          quizAnswers[idx] !== undefined && optIdx === quizAnswers[idx] && optIdx !== quiz.correct ? 'font-semibold text-red-600' : ''
                        }`}>
                          {option}
                          {quizAnswers[idx] !== undefined && optIdx === quiz.correct && (
                            <span className="ml-2 text-green-600">✓</span>
                          )}
                          {quizAnswers[idx] !== undefined && optIdx === quizAnswers[idx] && optIdx !== quiz.correct && (
                            <span className="ml-2 text-red-600">✗</span>
                          )}
                        </span>
                      </label>
                    ))}
                  </div>
                  {quizAnswers[idx] !== undefined && (
                    <div className={`mt-4 p-3 rounded-lg ${
                      quizAnswers[idx] === quiz.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                    }`}>
                      <p className={`text-sm ${
                        quizAnswers[idx] === quiz.correct ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {quizAnswers[idx] === quiz.correct ? 
                          (baseLang === 'hi' ? 'सही उत्तर! ' : baseLang === 'mr' ? 'बरोबर उत्तर! ' : 'Correct! ') : 
                          (baseLang === 'hi' ? 'गलत उत्तर। ' : baseLang === 'mr' ? 'चुकीचे उत्तर। ' : 'Incorrect. ')
                        }
                        {quiz.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7: Dream Visualization Board */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {baseLang === 'hi' ? 'सपनों का विज़ुअल बोर्ड' : baseLang === 'mr' ? 'स्वप्नांचे विज्युअल बोर्ड' : 'Dream Visualization Board'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700 text-center">
                  {baseLang === 'hi' ? 'मेरे सपने' : baseLang === 'mr' ? 'माझी स्वप्ने' : 'My Dreams'}
                </h3>
                <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-200">
                  <div className="space-y-3">
                    {[
                      baseLang === 'hi' ? '🏠 अपना घर' : baseLang === 'mr' ? '🏠 माझे घर' : '🏠 Own Home',
                      baseLang === 'hi' ? '🎓 बच्चों की शिक्षा' : baseLang === 'mr' ? '🎓 मुलांचे शिक्षण' : '🎓 Children\'s Education',
                      baseLang === 'hi' ? '🌍 विश्व यात्रा' : baseLang === 'mr' ? '🌍 जगभर प्रवास' : '🌍 World Travel',
                      baseLang === 'hi' ? '💼 सफल व्यवसाय' : baseLang === 'mr' ? '💼 यशस्वी व्यवसाय' : '💼 Successful Business'
                    ].map((dream, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2 bg-white rounded-lg shadow-sm">
                        <span className="text-lg">{dream.split(' ')[0]}</span>
                        <span className="text-gray-700">{dream.split(' ').slice(1).join(' ')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700 text-center">
                  {baseLang === 'hi' ? 'सुरक्षा योजना' : baseLang === 'mr' ? 'संरक्षण योजना' : 'Protection Plan'}
                </h3>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <div className="space-y-3">
                    {[
                      baseLang === 'hi' ? '🛡️ जीवन बीमा' : baseLang === 'mr' ? '🛡️ जीवन विमा' : '🛡️ Life Insurance',
                      baseLang === 'hi' ? '💊 स्वास्थ्य बीमा' : baseLang === 'mr' ? '💊 आरोग्य विमा' : '💊 Health Insurance',
                      baseLang === 'hi' ? '🚗 दुर्घटना बीमा' : baseLang === 'mr' ? '🚗 अपघात विमा' : '🚗 Accident Insurance',
                      baseLang === 'hi' ? '💰 आपातकालीन बचत' : baseLang === 'mr' ? '💰 आणीबाणी बचत' : '💰 Emergency Savings'
                    ].map((protection, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2 bg-white rounded-lg shadow-sm">
                        <span className="text-lg">{protection.split(' ')[0]}</span>
                        <span className="text-gray-700">{protection.split(' ').slice(1).join(' ')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Dream Achievement Timeline */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {baseLang === 'hi' ? 'सपनों की प्राप्ति का समय' : baseLang === 'mr' ? 'स्वप्नांच्या साध्याचा काळ' : 'Dream Achievement Timeline'}
            </h2>
            <p className="text-gray-600 text-center mb-8">
              {baseLang === 'hi' ? 'अपने सपनों को वास्तविकता में बदलने का रोडमैप' : 
               baseLang === 'mr' ? 'तुमच्या स्वप्नांना वास्तवात आणण्याचा रोडमॅप' : 
               'Roadmap to turn your dreams into reality'}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  year: '2024',
                  title: baseLang === 'hi' ? 'आपातकालीन निधि' : baseLang === 'mr' ? 'आणीबाणी निधी' : 'Emergency Fund',
                  description: baseLang === 'hi' ? '6 महीने के खर्च के बराबर बचत' : 
                               baseLang === 'mr' ? '6 महिन्यांच्या खर्चाइतकी बचत' : 
                               'Save 6 months of expenses',
                  icon: '💰',
                  status: 'active',
                  action: baseLang === 'hi' ? 'मासिक बचत: ₹25,000' : 
                         baseLang === 'mr' ? 'मासिक बचत: ₹25,000' : 
                         'Monthly Savings: ₹25,000'
                },
                {
                  year: '2025',
                  title: baseLang === 'hi' ? 'जीवन बीमा' : baseLang === 'mr' ? 'जीवन विमा' : 'Life Insurance',
                  description: baseLang === 'hi' ? 'परिवार की सुरक्षा के लिए कवरेज' : 
                               baseLang === 'mr' ? 'कुटुंबाच्या सुरक्षेसाठी कव्हरेज' : 
                               'Coverage for family protection',
                  icon: '🛡️',
                  status: 'pending',
                  action: baseLang === 'hi' ? 'बीमा एजेंट से संपर्क करें' : 
                         baseLang === 'mr' ? 'विमा एजंटाशी संपर्क साधा' : 
                         'Contact insurance agent'
                },
                {
                  year: '2026',
                  title: baseLang === 'hi' ? 'शिक्षा निधि' : baseLang === 'mr' ? 'शिक्षण निधी' : 'Education Fund',
                  description: baseLang === 'hi' ? 'बच्चों की उच्च शिक्षा के लिए बचत' : 
                               baseLang === 'mr' ? 'मुलांच्या उच्च शिक्षणासाठी बचत' : 
                               'Save for children\'s higher education',
                  icon: '🎓',
                  status: 'future',
                  action: baseLang === 'hi' ? 'योजना तैयार करें' : 
                         baseLang === 'mr' ? 'योजना तयार करा' : 
                         'Plan ahead'
                },
                {
                  year: '2028',
                  title: baseLang === 'hi' ? 'घर खरीदना' : baseLang === 'mr' ? 'घर खरेदी' : 'Home Purchase',
                  description: baseLang === 'hi' ? 'अपना सपनों का घर खरीदें' : 
                               baseLang === 'mr' ? 'तुमचे स्वप्नांचे घर खरेदी करा' : 
                               'Buy your dream home',
                  icon: '🏠',
                  status: 'future',
                  action: baseLang === 'hi' ? 'बचत जारी रखें' : 
                         baseLang === 'mr' ? 'बचत सुरू ठेवा' : 
                         'Continue saving'
                }
              ].map((milestone, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl ${
                      milestone.status === 'active' ? 'bg-blue-500 text-white' :
                      milestone.status === 'pending' ? 'bg-yellow-500 text-white' :
                      'bg-gray-400 text-white'
                    }`}>
                      {milestone.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-gray-600 bg-white px-2 py-1 rounded border">
                          {milestone.year}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          milestone.status === 'active' ? 'bg-blue-100 text-blue-700' :
                          milestone.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {milestone.status === 'active' ? 
                            (baseLang === 'hi' ? 'चालू' : baseLang === 'mr' ? 'चालू' : 'Active') :
                           milestone.status === 'pending' ? 
                            (baseLang === 'hi' ? 'आगामी' : baseLang === 'mr' ? 'आगामी' : 'Upcoming') :
                            (baseLang === 'hi' ? 'भविष्य' : baseLang === 'mr' ? 'भविष्य' : 'Future')
                          }
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{milestone.description}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className={`w-2 h-2 rounded-full ${
                          milestone.status === 'active' ? 'bg-blue-500' :
                          milestone.status === 'pending' ? 'bg-yellow-500' :
                          'bg-gray-400'
                        }`}></span>
                        <span>{milestone.action}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                {baseLang === 'hi' ? 'सफलता के लिए टिप्स' : 
                 baseLang === 'mr' ? 'यशस्वी होण्यासाठी टिप्स' : 
                 'Tips for Success'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">1</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    {baseLang === 'hi' ? 'एक समय में एक लक्ष्य पर ध्यान दें' : 
                     baseLang === 'mr' ? 'एकावेळी एक ध्येयावर लक्ष केंद्रित करा' : 
                     'Focus on one goal at a time'}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">2</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    {baseLang === 'hi' ? 'नियमित रूप से प्रगति की जांच करें' : 
                     baseLang === 'mr' ? 'नियमितपणे प्रगती तपासा' : 
                     'Regularly review progress'}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">3</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    {baseLang === 'hi' ? 'छोटे लक्ष्यों से शुरू करें' : 
                     baseLang === 'mr' ? 'लहान ध्येयांपासून सुरुवात करा' : 
                     'Start with small goals'}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">4</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    {baseLang === 'hi' ? 'उत्सव मनाएं और प्रेरित रहें' : 
                     baseLang === 'mr' ? 'साजरा करा आणि प्रेरित रहा' : 
                     'Celebrate wins and stay motivated'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
           
      {/* Module Completion */}
      <div className="bg-white border-t mt-12">
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">{completionMsg}</div>
            <Button 
              onClick={handleCompleteModule}
              className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white"
            >
              {uiText.complete}
            </Button>
          </div>
        </div>
      </div>

      {/* Full Screen Modal */}
      <Dialog open={isFullScreenModalOpen} onOpenChange={setIsFullScreenModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
          <DialogHeader className="pb-4 border-b">
            <div className="flex items-center justify-between gap-3">
              <DialogTitle className="text-xl font-bold flex items-center gap-3 min-w-0">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-pink-100 text-pink-700 text-sm">💡</span>
                <span className="truncate">{t.introTitle}</span>
              </DialogTitle>
              <div className="flex items-center gap-2 flex-wrap bg-gray-50 border rounded-lg px-3 py-2">
                <label className="text-xs text-gray-600">Language</label>
                <select
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value)}
                  className="border rounded px-2 py-1 text-sm h-8"
                >
                  {languageOptions.map(opt => (
                    <option key={opt.code} value={opt.code}>{opt.label}</option>
                  ))}
                </select>
                <label className="text-xs text-gray-600">Voice</label>
                <select
                  value={selectedVoiceURI}
                  onChange={(e) => { const synth = window.speechSynthesis; if (synth) { synth.cancel(); setSpeakingBlocks({}); } setSelectedVoiceURI(e.target.value); }}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {(() => {
                    // Enhanced voice filtering with fallback strategies
                    const findBestVoices = (targetLang) => {
                      const baseLanguage = targetLang.substring(0, 2);
                      
                      // Strategy 1: Exact language code match
                      let exactMatches = voices.filter(voice => voice.lang === targetLang);
                      
                      // Strategy 2: Case-insensitive exact match
                      if (exactMatches.length === 0) {
                        exactMatches = voices.filter(voice => 
                          voice.lang.toLowerCase() === targetLang.toLowerCase()
                        );
                      }
                      
                      // Strategy 3: Base language match
                      const baseMatches = voices.filter(voice => 
                        voice.lang.startsWith(baseLanguage + '-') || 
                        voice.lang === baseLanguage ||
                        voice.lang.includes(baseLanguage)
                      );
                      
                      // Strategy 4: Language family matching
                      const languageFamilyMap = {
                        'hi': ['hi', 'hin', 'hindi'],
                        'ta': ['ta', 'tam', 'tamil'],
                        'te': ['te', 'tel', 'telugu'],
                        'bn': ['bn', 'ben', 'bengali'],
                        'gu': ['gu', 'guj', 'gujarati'],
                        'kn': ['kn', 'kan', 'kannada'],
                        'ml': ['ml', 'mal', 'malayalam'],
                        'mr': ['mr', 'mar', 'marathi'],
                        'pa': ['pa', 'pan', 'punjabi'],
                        'ur': ['ur', 'urd', 'urdu'],
                        'or': ['or', 'ori', 'odia'],
                        'as': ['as', 'asm', 'assamese'],
                        'ne': ['ne', 'nep', 'nepali'],
                        'sa': ['sa', 'san', 'sanskrit'],
                        'en': ['en', 'eng', 'english']
                      };
                      
                      const familyCodes = languageFamilyMap[baseLanguage] || [baseLanguage];
                      const familyMatches = voices.filter(voice => 
                        familyCodes.some(code => 
                          voice.lang.toLowerCase().includes(code.toLowerCase())
                        )
                      );
                      
                      // Combine all matches and remove duplicates
                      const allMatches = [...exactMatches, ...baseMatches, ...familyMatches];
                      const uniqueMatches = allMatches.filter((voice, index, self) => 
                        index === self.findIndex(v => v.name === voice.name)
                      );
                      
                      return uniqueMatches;
                    };
                    
                    const bestVoices = findBestVoices(selectedLang);
                    
                    if (bestVoices.length > 0) {
                      return bestVoices.map(voice => (
                        <option key={voice.voiceURI} value={voice.voiceURI}>
                          {voice.name} ({voice.lang})
                        </option>
                      ));
                    } else {
                      return <option value="">No suitable voice found</option>;
                    }
                  })()}
                  {voices.length === 0 && <option value="">System default</option>}
                </select>
                <Button variant="outline" size="sm" className="h-8" onClick={() => setIsFullScreenModalOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto py-8 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.introTitle}</h1>
                <p className="text-xl text-gray-600 leading-relaxed">{t.introSubtitle}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-8 mb-8">
                <div className="flex items-center justify-end mb-4">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100" 
                    onClick={() => handleSpeakToggle('modal-lesson-text', t.paragraph)}
                  >
                    {speakingBlocks['modal-lesson-text'] ? <Pause className="h-3 w-3 mr-2" /> : <Play className="h-3 w-3 mr-2" />}
                    {speakingBlocks['modal-lesson-text'] ? t.stop : t.listen}
                  </Button>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">{t.paragraph}</p>
              </div>

              {/* Carousel inside modal (Flipping) */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                <Carousel className="w-full">
                  <CarouselContent>
                    {studyCards.map((card, idx) => (
                      <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                        <div className="group [perspective:1000px] h-[320px]">
                          <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} border rounded-xl p-6 shadow-sm [backface-visibility:hidden] flex flex-col justify-between`}>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">{card.title}</h3>
                                <ul className="text-sm text-gray-700 space-y-2">
                                  {card.front.map((pt, i) => (
                                    <li key={i} className="flex items-start">
                                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                                      <span className="leading-relaxed">{pt}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <p className="text-xs text-gray-500 mt-4">{t.hoverToFlip}</p>
                            </div>
                            <div className={`absolute inset-0 bg-white border rounded-xl p-6 shadow-sm [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-between`}>
                              <div>
                                <h4 className="text-base font-semibold text-gray-900 mb-2">{baseLang === 'hi' ? 'सारांश' : baseLang === 'mr' ? 'सारांश' : 'Summary'}</h4>
                                <p className="text-sm text-gray-700 leading-relaxed">{card.back}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="-left-4" />
                  <CarouselNext className="-right-4" />
                </Carousel>
              </div>

              {/* Additional sections in modal */}
              <div className="border-t pt-8 mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  {baseLang === 'hi' ? 'वित्तीय सुरक्षा ढांचा' : baseLang === 'mr' ? 'आर्थिक सुरक्षा रचना' : 'Financial Protection Framework'}
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      level: baseLang === 'hi' ? 'स्तर 1: आधार' : baseLang === 'mr' ? 'स्तर 1: पाया' : 'Level 1: Foundation',
                      title: baseLang === 'hi' ? 'आपातकालीन बचत' : baseLang === 'mr' ? 'आणीबाणी बचत' : 'Emergency Savings',
                      icon: '🛡️',
                      priority: 'High'
                    },
                    {
                      level: baseLang === 'hi' ? 'स्तर 2: सुरक्षा' : baseLang === 'mr' ? 'स्तर 2: संरक्षण' : 'Level 2: Protection',
                      title: baseLang === 'hi' ? 'बीमा कवरेज' : baseLang === 'mr' ? 'विमा कव्हरेज' : 'Insurance Coverage',
                      icon: '🔄',
                      priority: 'High'
                    },
                    {
                      level: baseLang === 'hi' ? 'स्तर 3: विकास' : baseLang === 'mr' ? 'स्तर 3: विकास' : 'Level 3: Growth',
                      title: baseLang === 'hi' ? 'निवेश और बचत' : baseLang === 'mr' ? 'गुंतवणूक आणि बचत' : 'Investment & Savings',
                      icon: '📈',
                      priority: 'Medium'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-gradient-to-r from-gray-50 to-white">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-xl">{item.icon}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              {item.level}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              item.priority === 'High' ? 'bg-red-100 text-red-700' :
                              item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {item.priority === 'High' ? (baseLang === 'hi' ? 'उच्च' : baseLang === 'mr' ? 'उच्च' : 'High') :
                               item.priority === 'Medium' ? (baseLang === 'hi' ? 'मध्यम' : baseLang === 'mr' ? 'मध्यम' : 'Medium') :
                               (baseLang === 'hi' ? 'कम' : baseLang === 'mr' ? 'कमी' : 'Low')}
                            </span>
                          </div>
                          <h3 className="text-sm font-semibold text-gray-800">{item.title}</h3>
                        </div>
                        <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-gray-600">{idx + 1}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-8 mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  {baseLang === 'hi' ? 'जोखिम मूल्यांकन' : baseLang === 'mr' ? 'जोखीम मूल्यांकन' : 'Risk Assessment'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      front: baseLang === 'hi' ? 'आय हानि' : baseLang === 'mr' ? 'उत्पन्न घट' : 'Income Loss',
                      back: baseLang === 'hi' ? 'अचानक नौकरी छूटना या बीमारी के कारण आय बंद होना' : baseLang === 'mr' ? 'अचानक नोकरी गमावणे किंवा आजारामुळे उत्पन्न थांबणे' : 'Sudden job loss or illness stopping income',
                      color: 'from-red-50 to-pink-50 border-red-200'
                    },
                    {
                      front: baseLang === 'hi' ? 'चिकित्सा खर्च' : baseLang === 'mr' ? 'वैद्यकीय खर्च' : 'Medical Expenses',
                      back: baseLang === 'hi' ? 'अप्रत्याशित स्वास्थ्य समस्याओं के लिए बड़े खर्च' : baseLang === 'mr' ? 'अनपेक्षित आरोग्य समस्या साठी मोठे खर्च' : 'Large expenses for unexpected health issues',
                      color: 'from-orange-50 to-yellow-50 border-orange-200'
                    }
                  ].map((card, idx) => (
                    <div key={idx} className="group [perspective:1000px] h-32">
                      <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                        <div className={`absolute inset-0 bg-gradient-to-br ${card.color} rounded-xl p-4 shadow-sm [backface-visibility:hidden] flex items-center justify-center`}>
                          <h3 className="text-lg font-semibold text-gray-800 text-center">{card.front}</h3>
                        </div>
                        <div className={`absolute inset-0 bg-white border rounded-xl p-4 shadow-sm [transform:rotateY(180deg)] [backface-visibility:hidden] flex items-center justify-center`}>
                          <p className="text-gray-700 text-center text-sm leading-relaxed">{card.back}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-8 mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  {baseLang === 'hi' ? 'कार्य योजना निर्माता' : baseLang === 'mr' ? 'कृती योजना तयार करणारा' : 'Action Plan Builder'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="text-base font-medium text-gray-700">
                      {baseLang === 'hi' ? 'अल्पकालिक लक्ष्य (1-2 वर्ष)' : baseLang === 'mr' ? 'अल्पकालीन ध्येय (1-2 वर्ष)' : 'Short-term Goals (1-2 years)'}
                    </h3>
                    <div className="space-y-2">
                      {[
                        baseLang === 'hi' ? 'आपातकालीन बचत बनाएं' : baseLang === 'mr' ? 'आणीबाणी बचत तयार करा' : 'Build emergency savings',
                        baseLang === 'hi' ? 'बीमा कवरेज प्राप्त करें' : baseLang === 'mr' ? 'विमा कव्हरेज मिळवा' : 'Get insurance coverage'
                      ].map((goal, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">{goal}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-base font-medium text-gray-700">
                      {baseLang === 'hi' ? 'दीर्घकालिक लक्ष्य (5+ वर्ष)' : baseLang === 'mr' ? 'दीर्घकालीन ध्येय (5+ वर्ष)' : 'Long-term Goals (5+ years)'}
                    </h3>
                    <div className="space-y-2">
                      {[
                        baseLang === 'hi' ? 'बच्चों की शिक्षा के लिए बचत' : baseLang === 'mr' ? 'मुलांच्या शिक्षणासाठी बचत' : 'Save for children\'s education',
                        baseLang === 'hi' ? 'घर खरीदने की योजना' : baseLang === 'mr' ? 'घर खरेदीची योजना' : 'Plan for home purchase'
                      ].map((goal, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">{goal}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-8 mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  {baseLang === 'hi' ? 'प्रगति ट्रैकर' : baseLang === 'mr' ? 'प्रगती ट्रॅकर' : 'Progress Tracker'}
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      title: baseLang === 'hi' ? 'आपातकालीन बचत' : baseLang === 'mr' ? 'आणीबाणी बचत' : 'Emergency Savings',
                      progress: 60,
                      color: 'bg-blue-500'
                    },
                    {
                      title: baseLang === 'hi' ? 'जीवन बीमा कवरेज' : baseLang === 'mr' ? 'जीवन विमा कव्हरेज' : 'Life Insurance Coverage',
                      progress: 40,
                      color: 'bg-green-500'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">{item.title}</span>
                        <span className="text-sm text-gray-500">{item.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${item.color} transition-all duration-500`}
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-8 mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  {baseLang === 'hi' ? 'वित्तीय लक्ष्य कैलकुलेटर' : baseLang === 'mr' ? 'आर्थिक ध्येय कॅल्क्युलेटर' : 'Financial Goal Calculator'}
                </h2>
                <p className="text-gray-600 mb-6">
                  {baseLang === 'hi' ? 'अपने सपनों को वास्तविकता में बदलने के लिए अपने वित्तीय लक्ष्यों की योजना बनाएं' : 
                   baseLang === 'mr' ? 'तुमच्या स्वप्नांना वास्तवात आणण्यासाठी तुमच्या आर्थिक ध्येयांची योजना करा' : 
                   'Plan your financial goals to turn your dreams into reality'}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Emergency Fund Calculator */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">💰</span>
                      </div>
                      <h3 className="text-base font-semibold text-gray-800">
                        {baseLang === 'hi' ? 'आपातकालीन निधि' : baseLang === 'mr' ? 'आणीबाणी निधी' : 'Emergency Fund'}
                      </h3>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">
                          {baseLang === 'hi' ? 'मासिक खर्च:' : baseLang === 'mr' ? 'मासिक खर्च:' : 'Monthly Expenses:'}
                        </span>
                        <span className="font-medium">₹25,000</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">
                          {baseLang === 'hi' ? 'लक्ष्य राशि:' : baseLang === 'mr' ? 'ध्येय रक्कम:' : 'Target Amount:'}
                        </span>
                        <span className="font-medium text-blue-600">₹1,50,000</span>
                      </div>
                    </div>
                  </div>

                  {/* Life Insurance Calculator */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">🛡️</span>
                      </div>
                      <h3 className="text-base font-semibold text-gray-800">
                        {baseLang === 'hi' ? 'जीवन बीमा' : baseLang === 'mr' ? 'जीवन विमा' : 'Life Insurance'}
                      </h3>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">
                          {baseLang === 'hi' ? 'वार्षिक आय:' : baseLang === 'mr' ? 'वार्षिक उत्पन्न:' : 'Annual Income:'}
                        </span>
                        <span className="font-medium">₹6,00,000</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">
                          {baseLang === 'hi' ? 'सुझाया गया कवरेज:' : baseLang === 'mr' ? 'सूचवलेले कव्हरेज:' : 'Recommended Coverage:'}
                        </span>
                        <span className="font-medium text-green-600">₹30,00,000</span>
                      </div>
                    </div>
                  </div>

                  {/* Education Fund Calculator */}
                  <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg p-4 border border-purple-200">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">🎓</span>
                      </div>
                      <h3 className="text-base font-semibold text-gray-800">
                        {baseLang === 'hi' ? 'शिक्षा निधि' : baseLang === 'mr' ? 'शिक्षण निधी' : 'Education Fund'}
                      </h3>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">
                          {baseLang === 'hi' ? 'वर्तमान आयु:' : baseLang === 'mr' ? 'सध्याचे वय:' : 'Current Age:'}
                        </span>
                        <span className="font-medium">5 वर्ष</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">
                          {baseLang === 'hi' ? 'आवश्यक राशि:' : baseLang === 'mr' ? 'आवश्यक रक्कम:' : 'Required Amount:'}
                        </span>
                        <span className="font-medium text-purple-600">₹15,00,000</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-base font-semibold text-gray-800 mb-3">
                    {baseLang === 'hi' ? 'अपने लक्ष्यों को प्राप्त करने के लिए टिप्स' : 
                     baseLang === 'mr' ? 'तुमची ध्येये साध्य करण्यासाठी टिप्स' : 
                     'Tips to achieve your goals'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">1</span>
                      </div>
                      <p className="text-xs text-gray-700">
                        {baseLang === 'hi' ? 'हर महीने अपनी आय का 20% बचाएं' : 
                         baseLang === 'mr' ? 'दर महिन्याला तुमच्या उत्पन्नाचे 20% बचवा' : 
                         'Save 20% of your income every month'}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">2</span>
                      </div>
                      <p className="text-xs text-gray-700">
                        {baseLang === 'hi' ? 'अपने लक्ष्यों को प्राथमिकता दें' : 
                         baseLang === 'mr' ? 'तुमच्या ध्येयांना प्राधान्य द्या' : 
                         'Prioritize your goals'}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">3</span>
                      </div>
                      <p className="text-xs text-gray-700">
                        {baseLang === 'hi' ? 'नियमित रूप से अपनी प्रगति की जांच करें' : 
                         baseLang === 'mr' ? 'नियमितपणे तुमची प्रगती तपासा' : 
                         'Regularly review your progress'}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">4</span>
                      </div>
                      <p className="text-xs text-gray-700">
                        {baseLang === 'hi' ? 'पेशेवर सलाह लें' : 
                         baseLang === 'mr' ? 'व्यावसायिक सल्ला घ्या' : 
                         'Seek professional advice'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LessonMod1Dreams;
