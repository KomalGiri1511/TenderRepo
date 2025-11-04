import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar,
  PlayCircle,
  FileText,
  Video,
  Bell,
  ChevronRight,
  Volume2
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Accessible Screen Reader Label Helper
const VisuallyHidden = ({ children }) => (
  <span className="sr-only">{children}</span>
);

const AnnouncementItem = ({ announcement, isActive, onClick }) => {
  const { t } = useTranslation();
  const typeIcons = {
    'reform': FileText,
    'webinar': Video,
    'video': PlayCircle,
  };

  const typeColors = {
    'reform': 'text-[#004E9A]',
    'webinar': 'text-purple-600',
    'video': 'text-red-600',
  };

  const Icon = typeIcons[announcement.type] || FileText;

  return (
    <button
      onClick={onClick}
      aria-label={`View ${announcement.title}`}
      className={`
        w-full text-left p-3 rounded-lg transition-all duration-300
        ${isActive 
          ? 'bg-[#004E9A] text-white shadow-lg' 
          : 'bg-white hover:bg-gray-50 border border-gray-200 hover:border-[#004E9A]/30'
        }
      `}
    >
      <div className="flex items-start gap-2.5">
        <div className={`
          p-1.5 rounded-lg flex-shrink-0
          ${isActive ? 'bg-white/20' : 'bg-gray-100'}
        `}>
          <Icon className={`w-4 h-4 ${isActive ? 'text-white' : typeColors[announcement.type]}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-1.5 mb-1">
            <h4 
              className={`font-bold text-xs leading-tight flex-1 line-clamp-2 ${isActive ? 'text-white' : 'text-gray-900'}`}
              style={{ fontFamily: "'Inter', 'Nunito', sans-serif" }}
            >
              {announcement.title}
            </h4>
            {announcement.isNew && !isActive && (
              <Badge className="bg-red-500 text-white border-none text-[10px] h-4 px-1.5 flex-shrink-0">
                {t('awareness.new')}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-[10px]">
            <Calendar className={`w-3 h-3 ${isActive ? 'text-white/80' : 'text-gray-500'}`} />
            <span className={isActive ? 'text-white/90' : 'text-gray-500'}>
              {announcement.date}
            </span>
          </div>
        </div>
        <ChevronRight className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-400'}`} />
      </div>
    </button>
  );
};

export function AwarenessUpdatesSection() {
  const { t } = useTranslation();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(0);
  const synthRef = useRef(window.speechSynthesis);

  // Accessible announcements (placeholders only)
  const announcements = [
    {
      id: 1,
      type: 'reform',
      title: 'Placeholder Update 1',
      date: 'Date Placeholder',
      description: 'This is placeholder text for an announcement description.',
      thumbnail: '/placeholder.svg',
      isNew: true,
      hasVideo: false
    },
    {
      id: 2,
      type: 'webinar',
      title: 'Placeholder Update 2',
      date: 'Date Placeholder',
      description: 'This is placeholder text for an announcement description.',
      thumbnail: '/placeholder.svg',
      isNew: true,
      hasVideo: true
    },
    {
      id: 3,
      type: 'video',
      title: 'Placeholder Update 3',
      date: 'Date Placeholder',
      description: 'This is placeholder text for an announcement description.',
      thumbnail: '/placeholder.svg',
      isNew: false,
      hasVideo: true
    },
  ];

  const currentAnnouncement = announcements[selectedAnnouncement];

  // 🗣️ Text-to-Speech handler
  const handleSpeak = () => {
    if (synthRef.current.speaking) synthRef.current.cancel();
    const text = `${currentAnnouncement.title}. ${currentAnnouncement.description}`;
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    utter.pitch = 1;
    utter.lang = 'en-US';
    synthRef.current.speak(utter);
  };

  return (
    <section 
      className="w-full bg-gradient-to-br from-gray-50 to-blue-50/50 py-8 px-6 rounded-2xl shadow-sm border border-gray-100"
      aria-labelledby="awareness-heading"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <h2 id="awareness-heading" className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span role="img" aria-label="megaphone">📢</span>
          Announcements (Placeholder)
        </h2>
        <p className="text-sm text-gray-600">
          Placeholder announcements for design and layout. Content to be updated.
        </p>
        <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 text-xs font-semibold">
          <Volume2 className="w-3.5 h-3.5" />
          Speaker available: tap the speaker to listen (placeholder)
        </div>
      </div>

      {/* Split Layout */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - Featured Content */}
          <div className="lg:col-span-2">
            <Card className="border-2 shadow-xl bg-white overflow-hidden">
              <CardContent className="p-0">
                {/* Thumbnail / Video Preview */}
                <div className="relative h-[200px] bg-gray-100">
                  <img 
                    src={currentAnnouncement.thumbnail} 
                    alt={currentAnnouncement.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {currentAnnouncement.hasVideo && (
                    <button
                      aria-label={`Play video for ${currentAnnouncement.title}`}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-all"
                    >
                      <PlayCircle className="w-14 h-14 text-white drop-shadow-lg" />
                    </button>
                  )}

                  {currentAnnouncement.isNew && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-red-500 text-white border-none shadow-lg flex items-center gap-1 px-2 py-0.5 text-xs">
                        <Bell className="w-3 h-3" />
                        {t('awareness.new')}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-[#004E9A] text-white text-xs px-2 py-0.5 capitalize">
                        {currentAnnouncement.type}
                      </Badge>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {currentAnnouncement.date}
                      </span>
                    </div>

                    {/* Speaker Button */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleSpeak}
                            aria-label="Listen to placeholder announcement"
                          >
                            <Volume2 className="w-5 h-5 text-[#004E9A]" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Listen to this placeholder update</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {currentAnnouncement.title}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-3 line-clamp-3">
                    {currentAnnouncement.description}
                  </p>

                  <Button className="w-full bg-[#004E9A] hover:bg-[#003d7a] text-white font-semibold py-2 text-sm">
                    {currentAnnouncement.hasVideo ? (
                      <>
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Play Placeholder
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4 mr-2" />
                        Open Placeholder
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right - Announcements List */}
          <div className="lg:col-span-1">
            <Card className="border-2 shadow-lg bg-white">
              <CardContent className="p-4">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#004E9A]" />
                  Placeholder Announcements
                </h3>
                
                <div className="space-y-2" role="list">
                  {announcements.map((announcement, index) => (
                    <AnnouncementItem
                      key={announcement.id}
                      announcement={announcement}
                      isActive={selectedAnnouncement === index}
                      onClick={() => setSelectedAnnouncement(index)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-8 flex justify-end">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>Powered by</span>
          <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">
            <div className="w-5 h-5 bg-[#004E9A] rounded-sm flex items-center justify-center text-white font-bold text-[8px]">
              LMS
            </div>
            <span className="font-semibold text-[#004E9A]">Placeholder Initiative</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AwarenessUpdatesSection;
