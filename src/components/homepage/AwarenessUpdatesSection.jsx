import React, { useState } from 'react';
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
  Info
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
            <h4 className={`font-bold text-xs leading-tight flex-1 line-clamp-2 ${isActive ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: "'Inter', 'Nunito', sans-serif" }}>
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

  // Demo announcements for pitch presentation
  const announcements = [
    {
      id: 1,
      type: 'reform',
      title: 'Policy Update',
      date: 'Oct 1, 2025',
      description: 'Latest policy updates and implementation guidelines for workplace practices.',
      thumbnail: '/assets/UnderstandingNewLabourCodes.PNG',
      isNew: true,
      hasVideo: false
    },
    {
      id: 2,
      type: 'webinar',
      title: 'Training Session',
      date: 'Sep 28, 2025',
      description: 'Interactive training session focusing on compliance and best practices.',
      thumbnail: '/assets/Workplace Compliance Awareness.PNG',
      isNew: true,
      hasVideo: true
    },
    {
      id: 3,
      type: 'video',
      title: 'Educational Content',
      date: 'Sep 25, 2025',
      description: 'Educational content covering essential skills and workplace competencies.',
      thumbnail: '/assets/Digital literacy.jpg',
      isNew: false,
      hasVideo: true
    },
  ];

  const currentAnnouncement = announcements[selectedAnnouncement];

  return (
    <section className="w-full bg-gradient-to-br from-gray-50 to-blue-50/50 py-8 px-6 rounded-2xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2" style={{ fontFamily: "'Inter', 'Nunito', sans-serif" }}>
          <span className="text-2xl">📢</span>
          User Awareness Section
        </h2>
        <p className="text-sm text-gray-600">
          This section shows user awareness content - all updates and events are here
        </p>
      </div>

      {/* Split View Layout */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Featured Media Panel */}
          <div className="lg:col-span-2">
            <Card className="border-2 shadow-xl bg-white overflow-hidden">
              <CardContent className="p-0">
                {/* Featured Image/Video */}
                <div className="relative h-[160px] bg-gradient-to-br from-gray-100 to-blue-100">
                  <img 
                    src={currentAnnouncement.thumbnail} 
                    alt={currentAnnouncement.title}
                    className="w-full h-full object-cover"
                  />
                  {currentAnnouncement.hasVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="text-center">
                        
                      </div>
                    </div>
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
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-[#004E9A] text-white text-xs px-2 py-0.5">
                      {t(`awareness.types.${currentAnnouncement.type}`)}
                    </Badge>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {currentAnnouncement.date}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2" style={{ fontFamily: "'Inter', 'Nunito', sans-serif" }}>
                    {currentAnnouncement.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-2">
                    {currentAnnouncement.description}
                  </p>

                  <Button className="w-full bg-[#004E9A] hover:bg-[#003d7a] text-white font-semibold py-2 text-sm">
                    {currentAnnouncement.hasVideo ? (
                      <>
                        <PlayCircle className="w-4 h-4 mr-2" />
                        {t('awareness.watchNow')}
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4 mr-2" />
                        {t('awareness.readMore')}
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Scrollable Announcements List */}
          <div className="lg:col-span-1">
            <Card className="border-2 shadow-lg bg-white">
              <CardContent className="p-4">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2" style={{ fontFamily: "'Inter', 'Nunito', sans-serif" }}>
                  <Bell className="w-4 h-4 text-[#004E9A]" />
                  {t('awareness.latestAnnouncements')}
                </h3>
                
                <div className="space-y-2">
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

      {/* Footer - Supported by GIZ */}
      <div className="max-w-7xl mx-auto mt-8 flex justify-end">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>{t('awareness.poweredBy')}</span>
          <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">
            <div className="w-5 h-5 bg-[#004E9A] rounded-sm flex items-center justify-center text-white font-bold text-[8px]">
              GIZ
            </div>
            <span className="font-semibold text-[#004E9A]">{t('awareness.labourReformInitiative')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AwarenessUpdatesSection;

