import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Video, School, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const UpcomingEventCard = ({ title, date, time, type, eventId }) => {
  const { t } = useTranslation();
  const icons = {
    live: { icon: Video, emoji: '🎥', color: 'text-red-600', bgColor: 'bg-red-50' },
    workshop: { icon: School, emoji: '🏫', color: 'text-[#004E9A]', bgColor: 'bg-blue-50' },
    default: { icon: Calendar, emoji: '📅', color: 'text-gray-600', bgColor: 'bg-gray-50' },
  };

  const eventType = icons[type] || icons.default;
  const Icon = eventType.icon;

  return (
    <Card className="border shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-3">
        <div className="flex items-start gap-2">
          <div className={`p-1.5 rounded-lg ${eventType.bgColor}`}>
            <Icon className={`w-4 h-4 ${eventType.color}`} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 mb-1 text-xs">{title}</h4>
            <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {date}
              </span>
              <span>•</span>
              <span>{time}</span>
            </div>
            <Button 
              size="sm" 
              className="w-full bg-[#004E9A] hover:bg-[#003d7a] text-white text-xs h-7"
            >
              {type === 'live' ? t('calendar.joinNow') : t('calendar.addToCalendar')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export function CalendarEventsSection() {
  const { t } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const scrollContainerRef = React.useRef(null);
  
  // Demo upcoming events for pitch presentation
  const upcomingEvents = [
    {
      id: 1,
      title: "Digital Skills Masterclass",
      date: "Oct 15, 2025",
      time: "10:00 AM",
      type: "workshop"
    },
    {
      id: 2,
      title: "Labour Rights Webinar",
      date: "Oct 16, 2025",
      time: "2:00 PM",
      type: "live"
    },
    {
      id: 3,
      title: "Career Development Session",
      date: "Oct 18, 2025",
      time: "11:00 AM",
      type: "workshop"
    },
    {
      id: 4,
      title: "Assessment Review Meeting",
      date: "Oct 20, 2025",
      time: "3:00 PM",
      type: "live"
    },
  ];

  const scrollToEvent = (index) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.offsetWidth;
      container.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth'
      });
      setCurrentEventIndex(index);
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.offsetWidth;
      const newIndex = Math.round(container.scrollLeft / cardWidth);
      setCurrentEventIndex(newIndex);
    }
  };

  // Calendar logic
  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isToday = (day) => {
    return day === today.getDate() && 
           month === today.getMonth() && 
           year === today.getFullYear();
  };

  // Generate calendar days
  const calendarDays = [];
  
  // Empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="h-8"></div>);
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const isTodayDate = isToday(day);
    calendarDays.push(
      <div
        key={day}
        className={`h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-colors cursor-pointer
          ${isTodayDate 
            ? 'bg-[#004E9A] text-white shadow-md' 
            : 'hover:bg-gray-100 text-gray-700'
          }`}
      >
        {day}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Monthly Calendar */}
      <Card className="bg-white shadow-md border relative">
        <div className="absolute -top-2 -right-2 bg-[#004E9A] text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg">
          DEMO
        </div>
        <CardHeader className="pb-2 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base font-bold text-gray-900" style={{ fontFamily: "'Inter', 'Nunito', sans-serif" }}>
                {monthNames[month]} {year}
              </CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-xs">Interactive calendar showing scheduled events, workshops, and learning sessions with real-time updates</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex gap-1">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-7 w-7"
                onClick={prevMonth}
              >
                <ChevronLeft className="h-3 w-3" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-7 w-7"
                onClick={nextMonth}
              >
                <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          {/* Week day headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="h-6 flex items-center justify-center text-xs font-semibold text-gray-600">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events - Carousel */}
      <Card className="bg-white shadow-md border relative">
        <div className="absolute -top-2 -right-2 bg-[#004E9A] text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg">
          DEMO
        </div>
        <CardHeader className="pb-2 pt-4">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-bold text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Inter', 'Nunito', sans-serif" }}>
              <Calendar className="w-4 h-4 text-[#004E9A]" />
              Upcoming Events
            </CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-xs">Live event management system showing upcoming workshops, webinars, and learning sessions with interactive carousel navigation</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          {/* Carousel Container */}
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-3 -mx-1 px-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {upcomingEvents.map(event => (
              <div key={event.id} className="flex-shrink-0 w-full snap-center">
                <UpcomingEventCard {...event} />
              </div>
            ))}
          </div>

          {/* Carousel Dots Navigation */}
          {upcomingEvents.length > 1 && (
            <div className="flex justify-center gap-1.5 mt-3">
              {upcomingEvents.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToEvent(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentEventIndex === index 
                      ? 'w-6 bg-[#004E9A]' 
                      : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to event ${index + 1}`}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default CalendarEventsSection;

