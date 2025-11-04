import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Volume2, Maximize2, Play, Pause, X, Facebook, Linkedin, Twitter, Youtube, Globe, MessageCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Section3Video from '@/components/lessons/Section3Video';
import IncomeGrowthChart from '@/components/lessons/IncomeGrowthChart';
import DragDropChallenge from '@/components/lessons/DragDropChallenge';
import VoiceInteraction from '@/components/lessons/VoiceInteraction';

const LessonMod2 = () => {
  const navigate = useNavigate();
  const [speakingBlocks, setSpeakingBlocks] = useState({});
  const [voices, setVoices] = useState([]);
  const [selectedLang, setSelectedLang] = useState('en-US');
  const [selectedVoiceURI, setSelectedVoiceURI] = useState('');
  const [isFullScreenModalOpen, setIsFullScreenModalOpen] = useState(false);
  const textRef = useRef(null);

  // Language options matching PreviewModal
  const languageOptions = React.useMemo(() => ([
    { code: 'en-US', label: 'English (US)' },
    { code: 'hi-IN', label: 'हिन्दी (Hindi)' },
    { code: 'mr-IN', label: 'मराठी (Marathi)' }
  ]), []);

  // UI text based on selected language
  const uiText = React.useMemo(() => {
    const map = {
      'en': { preview: 'Preview', language: 'Language', voice: 'Voice', listen: 'Listen', stop: 'Stop', download: 'Download' },
      'hi': { preview: 'पूर्वावलोकन', language: 'भाषा', voice: 'आवाज़', listen: 'सुनें', stop: 'रोकें', download: 'डाउनलोड' },
      'mr': { preview: 'पूर्वावलोकन', language: 'भाषा', voice: 'आवाज', listen: 'ऐका', stop: 'थांबवा', download: 'डाउनलोड' }
    };
    const key = (selectedLang || 'en-US').split('-')[0];
    return map[key] || map['en'];
  }, [selectedLang]);

  const handleBackToModules = () => {
    navigate(-1); // Go back to the previous page
  };

  // Load voices when component mounts
  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const load = () => {
      const v = synth.getVoices();
      setVoices(v);
      // Default selected voice for current lang
      const defaultVoice = v.find(voice => voice.lang === selectedLang) || v.find(voice => voice.lang?.startsWith(selectedLang.split('-')[0])) || v[0];
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
    utter.lang = selectedLang;
    const voice = voices.find(v => v.voiceURI === selectedVoiceURI) || voices.find(v => v.lang === selectedLang);
    if (voice) utter.voice = voice;
    utter.onend = () => setSpeakingBlocks(prev => ({ ...prev, [blockKey]: false }));
    setSpeakingBlocks(prev => ({ ...prev, [blockKey]: true }));
    synth.speak(utter);
  };

  const handleFullScreen = () => {
    setIsFullScreenModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <Button 
            onClick={handleBackToModules} 
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Modules
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Section 1: Overview — The Power of Digital Media */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Overview — The Power of Digital Media
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Introduce how digital tools amplify communication and awareness
            </p>
          </div>

          {/* Section Description */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                📝 Understanding Digital Communication
              </h2>
              
                             {/* Language and Voice Controls */}
               <div className="flex items-center gap-3">
                 {/* Language Selection */}
                 <select
                   value={selectedLang}
                   onChange={(e) => setSelectedLang(e.target.value)}
                   className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                 >
                   {languageOptions.map(opt => (
                     <option key={opt.code} value={opt.code}>{opt.label}</option>
                   ))}
                 </select>
                 
                 {/* Voice Selection */}
                 <select
                   value={selectedVoiceURI}
                   onChange={(e) => setSelectedVoiceURI(e.target.value)}
                   className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                 >
                   {voices
                     .filter(v => v.lang === selectedLang || v.lang?.startsWith(selectedLang.split('-')[0]))
                     .map(v => (
                       <option key={v.voiceURI} value={v.voiceURI}>
                         {v.name} ({v.lang})
                       </option>
                     ))}
                   {voices.length === 0 && (
                     <option value="">System default</option>
                   )}
                 </select>
                 
                 {/* Full Screen Button */}
                 <Button
                   onClick={handleFullScreen}
                   variant="outline"
                   size="icon"
                   className="p-2"
                 >
                   <Maximize2 className="h-4 w-4" />
                 </Button>
               </div>
            </div>
            
                         <div className="bg-gray-50 rounded-lg p-6 mb-6">
               <div className="flex items-center justify-end mb-3">
                 <Button 
                   size="sm" 
                   variant="outline" 
                   className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100" 
                  onClick={() => handleSpeakToggle('lesson-text', 'In today\'s interconnected world, digital platforms have become the backbone of reform communication. Whether it\'s a tweet, a webinar, or a short video, every message shared online shapes public perception and drives engagement.')}
                 >
                   {speakingBlocks['lesson-text'] ? <Pause className="h-3 w-3 mr-2" /> : <Play className="h-3 w-3 mr-2" />}
                   {speakingBlocks['lesson-text'] ? uiText.stop : uiText.listen}
                 </Button>
               </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                In today's interconnected world, digital platforms have become the backbone of reform communication. 
                Whether it's a tweet, a webinar, or a short video, every message shared online shapes public perception 
                and drives engagement.
               </p>
             </div>
            
            {/* Audio Clip Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Volume2 className="h-5 w-5 text-blue-600" />
                🎧 Audio Clip (1 min) — "Why Digital First?"
                 </h3>
                 <div className="bg-white rounded-lg p-4 shadow-md">
                   <audio
                     controls
                     className="w-full"
                     preload="metadata"
                   >
                     {selectedLang === 'en-US' && (
                       <source src="/English.mp3" type="audio/mpeg" />
                     )}
                     {selectedLang === 'hi-IN' && (
                       <source src="/hindi.mp3" type="audio/mpeg" />
                     )}
                     {selectedLang === 'mr-IN' && (
                       <source src="/ma.mp3" type="audio/mpeg" />
                     )}
                     Your browser does not support the audio element.
                   </audio>
                <p className="mt-3 text-sm text-gray-600">
                  A short voiceover summarizing how GIZ leverages digital tools to reach diverse audiences, 
                  including rural and urban workers.
                </p>
              </div>
            </div>

            {/* Para + Audio Together */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">🎙️ Bilingual Content</h3>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100" 
                  onClick={() => handleSpeakToggle('bilingual-text', 'Strategic communicators must adapt to digital behaviour — audiences consume short, visual, and mobile-first content.')}
                >
                  {speakingBlocks['bilingual-text'] ? <Pause className="h-3 w-3 mr-2" /> : <Play className="h-3 w-3 mr-2" />}
                  {speakingBlocks['bilingual-text'] ? uiText.stop : uiText.listen}
                </Button>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Strategic communicators must adapt to digital behaviour — audiences consume short, visual, 
                and mobile-first content.
              </p>
              <p className="text-sm text-gray-500 mt-3 italic">
                (Play audio to hear this paragraph in Hindi for bilingual accessibility.)
              </p>
            </div>

            {/* PDF Attachment */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
              <div className="flex items-center justify-center gap-3">
                <svg className="h-8 w-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                </svg>
                <div className="text-left">
                  <p className="font-semibold text-gray-800">📎 Digital_Media_Overview_GIZ.pdf</p>
                  <p className="text-sm text-gray-600">A two-page reference guide summarizing digital channels, use cases, and GIZ best practices.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

         {/* Section 2: Channels of Communication (Accordion Style) */}
         <section className="max-w-4xl mx-auto mb-12">
           <div className="bg-white rounded-2xl shadow-lg p-8">
             <div className="mb-8">
               <h2 className="text-3xl font-bold text-gray-900 mb-3">
                 Section 2: Channels of Communication
               </h2>
               <p className="text-gray-600 text-lg">
                 Understand various digital media channels and when to use each.
               </p>
             </div>
             
             <Accordion type="single" collapsible className="w-full space-y-4">
               {/* Social Media Platforms */}
               <AccordionItem value="social-media" className="border rounded-lg px-6 bg-gray-50">
                 <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                   <div className="flex items-center gap-3">
                     <div className="flex items-center gap-2">
                       <Facebook className="h-5 w-5 text-blue-600" />
                       <Linkedin className="h-5 w-5 text-blue-700" />
                       <Twitter className="h-5 w-5 text-sky-500" />
                     </div>
                     <span>Social Media Platforms (Facebook, LinkedIn, X)</span>
                   </div>
                 </AccordionTrigger>
                 <AccordionContent className="pt-4 pb-6">
                   <div className="flex gap-6">
                     <div className="w-64 flex-shrink-0 rounded-lg overflow-hidden">
                       <img 
                         src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=400&fit=crop&auto=format" 
                         alt="Social Media Platforms"
                         className="w-full h-48 object-cover"
                       />
                     </div>
                     <div className="flex-1 space-y-4">
                       <h4 className="font-semibold text-gray-800 text-lg">When to Use Social Media</h4>
                       <p className="text-gray-700 leading-relaxed">
                         Use for updates, infographics, and reform storytelling. Social media platforms are ideal for reaching diverse audiences and creating engagement through visual content.
                       </p>
                       <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                         <h5 className="font-semibold text-blue-800 mb-2">Best Practices:</h5>
                         <ul className="space-y-2 text-sm text-blue-700">
                           <li>• Share infographics and visual statistics</li>
                           <li>• Post regular updates on reform initiatives</li>
                           <li>• Engage with stakeholders through comments</li>
                           <li>• Use hashtags for wider reach</li>
                         </ul>
                       </div>
                     </div>
                   </div>
                 </AccordionContent>
               </AccordionItem>

               {/* Learning Platforms */}
               <AccordionItem value="learning-platforms" className="border rounded-lg px-6 bg-gray-50">
                 <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                   <div className="flex items-center gap-3">
                     <Youtube className="h-5 w-5 text-red-600" />
                     <span>Learning Platforms (LMS, YouTube, Coursera)</span>
                   </div>
                 </AccordionTrigger>
                 <AccordionContent className="pt-4 pb-6">
                   <div className="flex gap-6">
                     <div className="w-64 flex-shrink-0 rounded-lg overflow-hidden">
                       <img 
                         src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=400&fit=crop&auto=format" 
                         alt="Learning Platforms"
                         className="w-full h-48 object-cover"
                       />
                     </div>
                     <div className="flex-1 space-y-4">
                       <h4 className="font-semibold text-gray-800 text-lg">Structured Learning Delivery</h4>
                       <p className="text-gray-700 leading-relaxed">
                         Host structured learning and awareness campaigns. Learning platforms are ideal for hosting comprehensive training programs with course delivery and tracking capabilities.
                       </p>
                       <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                         <h5 className="font-semibold text-red-800 mb-2">Platform Benefits:</h5>
                         <ul className="space-y-2 text-sm text-red-700">
                           <li>• Host video tutorials and webinars</li>
                           <li>• Track learner progress and completion</li>
                           <li>• Create structured course pathways</li>
                           <li>• Certificate generation and validation</li>
                         </ul>
                       </div>
                     </div>
                   </div>
                 </AccordionContent>
               </AccordionItem>

               {/* Web Portals & Blogs */}
               <AccordionItem value="web-portals" className="border rounded-lg px-6 bg-gray-50">
                 <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                   <div className="flex items-center gap-3">
                     <Globe className="h-5 w-5 text-green-600" />
                     <span>Web Portals & Blogs</span>
                   </div>
                 </AccordionTrigger>
                 <AccordionContent className="pt-4 pb-6">
                   <div className="flex gap-6">
                     <div className="w-64 flex-shrink-0 rounded-lg overflow-hidden">
                       <img 
                         src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop&auto=format" 
                         alt="Web Portals and Blogs"
                         className="w-full h-48 object-cover"
                       />
                     </div>
                     <div className="flex-1 space-y-4">
                       <h4 className="font-semibold text-gray-800 text-lg">Long-Form Content & Archives</h4>
                       <p className="text-gray-700 leading-relaxed">
                         Use for policy briefs, long-form reform updates, and resource archives. Web portals and blogs are perfect for in-depth content delivery and maintaining comprehensive information repositories.
                       </p>
                       <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                         <h5 className="font-semibold text-green-800 mb-2">Content Types:</h5>
                         <ul className="space-y-2 text-sm text-green-700">
                           <li>• Policy briefs and white papers</li>
                           <li>• Detailed reform update articles</li>
                           <li>• Resource archives and documentation</li>
                           <li>• Success stories and case studies</li>
                         </ul>
                       </div>
                     </div>
                   </div>
                 </AccordionContent>
               </AccordionItem>

               {/* Messaging Tools */}
               <AccordionItem value="messaging-tools" className="border rounded-lg px-6 bg-gray-50">
                 <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                   <div className="flex items-center gap-3">
                     <MessageCircle className="h-5 w-5 text-emerald-600" />
                     <span>Messaging Tools (WhatsApp, Telegram)</span>
                   </div>
                 </AccordionTrigger>
                 <AccordionContent className="pt-4 pb-6">
                   <div className="flex gap-6">
                     <div className="w-64 flex-shrink-0 rounded-lg overflow-hidden">
                       <img 
                         src="https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&h=400&fit=crop&auto=format" 
                         alt="Messaging Tools"
                         className="w-full h-48 object-cover"
                       />
                     </div>
                     <div className="flex-1 space-y-4">
                       <h4 className="font-semibold text-gray-800 text-lg">Direct Grassroots Engagement</h4>
                       <p className="text-gray-700 leading-relaxed">
                         For micro-campaigns and grassroots engagement. Messaging tools like WhatsApp and Telegram are excellent for direct, personal communication with target audiences and building community networks.
                       </p>
                       <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
                         <h5 className="font-semibold text-emerald-800 mb-2">Engagement Strategies:</h5>
                         <ul className="space-y-2 text-sm text-emerald-700">
                           <li>• Create broadcast lists for updates</li>
                           <li>• Build community groups for discussions</li>
                           <li>• Share quick tips and reminders</li>
                           <li>• Enable peer-to-peer communication</li>
                         </ul>
                   </div>
                 </div>
               </div>
                 </AccordionContent>
               </AccordionItem>
             </Accordion>

             <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
               <p className="text-sm text-blue-800">
                 💡 <strong>Tip:</strong> Each channel serves a unique purpose. Choose based on your target audience, 
                 message format, and engagement goals. Combine multiple channels for maximum impact.
               </p>
               </div>
           </div>
         </section>

         {/* Section 3: Video Background */}
         <section className="max-w-4xl mx-auto mb-12">
           <Section3Video />
         </section>

         {/* Section 4: Income Growth Chart */}
         <section className="max-w-4xl mx-auto mb-12">
           <IncomeGrowthChart />
         </section>

         {/* Section 5: Drag & Drop Challenge */}
         <section className="max-w-4xl mx-auto mb-12">
           <DragDropChallenge />
         </section>

         {/* Section 6: Voice Interaction */}
         <section className="max-w-4xl mx-auto mb-12">
           <VoiceInteraction />
         </section>
       </div>
       
       {/* Full Screen Modal */}
       <Dialog open={isFullScreenModalOpen} onOpenChange={setIsFullScreenModalOpen}>
         <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
           <DialogHeader className="pb-4 border-b">
             <div className="flex items-center justify-between gap-3">
               <DialogTitle className="text-xl font-bold flex items-center gap-3 min-w-0">
                 <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm">👁️</span>
                 <span className="truncate">Lesson 2: Key Benefits & Smart Flexibility</span>
               </DialogTitle>
               <div className="flex items-center gap-2 flex-wrap bg-gray-50 border rounded-lg px-3 py-2">
                 <label className="text-xs text-gray-600" title={uiText.language}>
                   {uiText.language}
                 </label>
                 <select
                   value={selectedLang}
                   onChange={(e) => setSelectedLang(e.target.value)}
                   className="border rounded px-2 py-1 text-sm h-8"
                   title={uiText.language}
                 >
                   {languageOptions.map(opt => (
                     <option key={opt.code} value={opt.code}>{opt.label}</option>
                   ))}
                 </select>
                 <label className="text-xs text-gray-600">
                   {uiText.voice}
                 </label>
                 <select
                   value={selectedVoiceURI}
                   onChange={(e) => setSelectedVoiceURI(e.target.value)}
                   className="border rounded px-2 py-1 text-sm h-8 max-w-[260px]"
                   title={uiText.voice}
                 >
                   {voices
                     .filter(v => v.lang === selectedLang || v.lang?.startsWith(selectedLang.split('-')[0]))
                     .map(v => (
                       <option key={v.voiceURI} value={v.voiceURI}>
                         {v.name} ({v.lang})
                       </option>
                     ))}
                   {voices.length === 0 && (
                     <option value="">System default</option>
                   )}
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
                 <h1 className="text-4xl font-bold text-gray-900 mb-4">
                   Lesson 2: Key Benefits & Smart Flexibility
                 </h1>
                 <p className="text-xl text-gray-600 leading-relaxed">
                   Why this plan stands out for your financial future
                 </p>
               </div>
               
               <div className="bg-gray-50 rounded-lg p-8 mb-8">
                 <div className="flex items-center justify-end mb-4">
                   <Button 
                     size="sm" 
                     variant="outline" 
                     className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100" 
                     onClick={() => handleSpeakToggle('modal-lesson-text', 'In this comprehensive lesson, you\'ll discover the unique advantages that make Rakshak Smart an exceptional choice for life insurance protection. We\'ll explore the plan\'s innovative features, flexible premium options, and how it adapts to your changing financial needs throughout different life stages.')}
                   >
                     {speakingBlocks['modal-lesson-text'] ? <Pause className="h-3 w-3 mr-2" /> : <Play className="h-3 w-3 mr-2" />}
                     {speakingBlocks['modal-lesson-text'] ? uiText.stop : uiText.listen}
                   </Button>
                 </div>
                 <p className="text-gray-700 leading-relaxed text-lg">
                   In this comprehensive lesson, you'll discover the unique advantages that make 
                   Rakshak Smart an exceptional choice for life insurance protection. We'll explore 
                   the plan's innovative features, flexible premium options, and how it adapts to 
                   your changing financial needs throughout different life stages.
                 </p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-blue-50 rounded-lg p-6">
                   <h3 className="font-semibold text-blue-800 mb-3 text-lg">Key Benefits</h3>
                   <ul className="text-blue-700 space-y-2">
                     <li className="flex items-start">
                       <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                       <span>Comprehensive life coverage</span>
                     </li>
                     <li className="flex items-start">
                       <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                       <span>Flexible premium payments</span>
                     </li>
                     <li className="flex items-start">
                       <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                       <span>Assured returns on maturity</span>
                     </li>
                     <li className="flex items-start">
                       <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                       <span>Tax benefits under Section 80C</span>
                     </li>
                   </ul>
                 </div>
                 <div className="bg-green-50 rounded-lg p-6">
                   <h3 className="font-semibold text-green-800 mb-3 text-lg">Smart Flexibility</h3>
                   <ul className="text-green-700 space-y-2">
                     <li className="flex items-start">
                       <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                       <span>Adjustable coverage amounts</span>
                     </li>
                     <li className="flex items-start">
                       <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                       <span>Premium holiday options</span>
                     </li>
                     <li className="flex items-start">
                       <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                       <span>Easy policy modifications</span>
                     </li>
                     <li className="flex items-start">
                       <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                       <span>Online account management</span>
                     </li>
                   </ul>
                 </div>
               
                 {/* Section 2 in Modal */}
                 <div className="border-t pt-8 mt-8">
                   <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                     Section 2: Audio Narration
                   </h2>
                   
                   <div className="space-y-6">
                     {/* Language Selection */}
                     <div>
                       <label className="block text-lg font-medium text-gray-700 mb-3">
                         Choose Narration Language
                       </label>
                       <select
                         value={selectedLang}
                         onChange={(e) => setSelectedLang(e.target.value)}
                         className="w-full px-4 py-3 border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                       >
                         <option value="en-US">🇺🇸 English</option>
                         <option value="hi-IN">🇮🇳 Hindi</option>
                         <option value="mr-IN">🇮🇳 Marathi</option>
                       </select>
                     </div>

                     {/* Audio Player */}
                     <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-lg border border-blue-100">
                       <h3 className="text-lg font-semibold text-gray-800 mb-4">
                         Listen to Lesson in {selectedLang === 'en-US' ? 'English' : selectedLang === 'hi-IN' ? 'Hindi' : 'Marathi'}
                       </h3>
                       
                       <div className="bg-white rounded-lg p-4 shadow-md">
                         <audio
                           controls
                           className="w-full"
                           preload="metadata"
                         >
                           {selectedLang === 'en-US' && (
                             <source src="/English.mp3" type="audio/mpeg" />
                           )}
                           {selectedLang === 'hi-IN' && (
                             <source src="/hindi.mp3" type="audio/mpeg" />
                           )}
                           {selectedLang === 'mr-IN' && (
                             <source src="/ma.mp3" type="audio/mpeg" />
                           )}
                           Your browser does not support the audio element.
                         </audio>
                         
                         <div className="mt-3 text-sm text-gray-600">
                           <p className="flex items-center gap-2">
                             <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                             {selectedLang === 'en-US' && 'High-quality English narration with clear pronunciation'}
                             {selectedLang === 'hi-IN' && 'स्पष्ट उच्चारण के साथ उच्च गुणवत्ता वाली हिंदी कथा'}
                             {selectedLang === 'mr-IN' && 'स्पष्ट उच्चारणासह उच्च गुणवत्तेची मराठी कथा'}
                           </p>
                         </div>
                       </div>
                     </div>

                     {/* Section 3 in Modal */}
                     <div className="border-t pt-8 mt-8">
                       <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                         Section 3: Video Background
                       </h2>
                       <div className="w-full h-[400px] relative overflow-hidden rounded-xl">
                         <Section3Video />
                       </div>
                     </div>

                     {/* Section 4 in Modal */}
                     <div className="border-t pt-8 mt-8">
                       <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                         Section 4: Income Growth Chart
                       </h2>
                       <div className="w-full">
                         <IncomeGrowthChart />
                       </div>
                     </div>

                     {/* Section 5 in Modal */}
                     <div className="border-t pt-8 mt-8">
                       <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                         Section 5: Drag & Drop Challenge
                       </h2>
                       <div className="w-full">
                         <DragDropChallenge />
                       </div>
                     </div>

                     {/* Section 6 in Modal */}
                     <div className="border-t pt-8 mt-8">
                       <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                         Section 6: Voice Interaction
                       </h2>
                       <div className="w-full">
                         <VoiceInteraction />
                       </div>
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

export default LessonMod2;
