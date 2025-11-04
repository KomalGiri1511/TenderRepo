import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Video, Calendar, Users, ExternalLink, Eye, Download, Edit, Trash2, Plus, ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

// Event Card Component (similar to Course Card)
const EventCard = ({ event, onJoin, onEdit, onDelete, onViewRecording, onDownloadRecording, t }) => {
  const isUpcoming = !event.isCompleted;

  return (
    <Card className="h-[380px] border-2 bg-white hover:shadow-xl hover:scale-[1.02] transition-all duration-300 hover:border-purple-500/30 group overflow-hidden flex flex-col">
      {/* Event Image/Banner */}
      <div className="relative h-32 flex-shrink-0 overflow-hidden bg-gradient-to-br from-purple-500 to-blue-600">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 to-blue-700/90 backdrop-blur-sm">
          <div className="h-full flex flex-col items-center justify-center text-white">
            <Video className="h-12 w-12 mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-xs font-semibold opacity-90">
              {isUpcoming ? t('zoom.liveSession') : t('zoom.recorded')}
            </p>
          </div>
        </div>
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <Badge className={`${isUpcoming ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'} text-white border-0 font-medium text-xs px-2 py-1 shadow-md`}>
            {isUpcoming ? t('zoom.upcoming') : t('zoom.completed')}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4 flex flex-col flex-1">
        {/* Title and Details - Fixed Height */}
        <div className="mb-3 flex-1">
          <h3 className="font-bold text-gray-900 mb-2 text-sm leading-tight group-hover:text-purple-600 transition-colors line-clamp-2 min-h-[40px]" style={{ fontFamily: "'Inter', 'Nunito', sans-serif" }}>
            {event.titleKey ? t(`zoom.sampleClasses.${event.titleKey}.title`) : event.title}
          </h3>
          
          {/* Event Details */}
          <div className="space-y-1.5 text-xs text-gray-600">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-purple-500" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-purple-500" />
              <span>{event.time} • {event.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-purple-500" />
              <span>
                {isUpcoming 
                  ? `0/${event.totalStudents} ${t('zoom.registered')}`
                  : `${event.attendance}/${event.totalStudents} ${t('zoom.attended')}`
                }
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {isUpcoming ? (
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
              onClick={() => onJoin(event)}
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              {t('zoom.joinNow')}
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button 
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold"
                onClick={() => onViewRecording(event)}
              >
                <Eye className="h-4 w-4 mr-1" />
                {t('zoom.watch')}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onDownloadRecording(event)}
                className="hover:bg-purple-50"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          {/* Edit/Delete Buttons */}
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 text-xs hover:bg-purple-50"
              onClick={() => onEdit(event)}
            >
              <Edit className="h-3 w-3 mr-1" />
              {t('zoom.edit')}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 text-xs hover:bg-red-50 hover:text-red-600"
              onClick={() => onDelete(event.id)}
            >
              <Trash2 className="h-3 w-3 mr-1" />
              {t('zoom.delete')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ZoomClassesSection = () => {
  const { t } = useTranslation();
  
  const [classes, setClasses] = useState([
    {
      id: 1,
      titleKey: "insuranceSales",
      date: "Wed, Jun 12",
      time: "10:00 AM",
      duration: "1 hour",
      zoomLink: "https://zoom.us/j/123456789",
      meetingId: "123 456 789",
      attendance: 0,
      totalStudents: 25,
      isCompleted: false
    },
    {
      id: 2,
      titleKey: "lifeInsurance",
      date: "Sat, Jun 15",
      time: "2:00 PM",
      duration: "2 hours",
      zoomLink: "https://zoom.us/j/987654321",
      meetingId: "987 654 321",
      attendance: 0,
      totalStudents: 30,
      isCompleted: false
    },
    {
      id: 3,
      titleKey: "portfolioManagement",
      date: "Sat, Jun 8",
      time: "11:00 AM",
      duration: "1.5 hours",
      attendance: 18,
      totalStudents: 25,
      recordingUrl: "https://example.com/recording/insurance-portfolio-management.mp4",
      isCompleted: true
    },
    {
      id: 4,
      titleKey: "compliance",
      date: "Wed, Jun 5",
      time: "3:00 PM",
      duration: "1 hour",
      attendance: 22,
      totalStudents: 30,
      recordingUrl: "https://example.com/recording/insurance-compliance.mp4",
      isCompleted: true
    }
  ]);

  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isRecordingDialogOpen, setIsRecordingDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [selectedRecording, setSelectedRecording] = useState(null);
  const [newClass, setNewClass] = useState({
    title: '',
    date: '',
    time: '',
    duration: '1 hour',
    description: '',
    zoomLink: '',
    meetingId: ''
  });

  const upcomingClasses = classes.filter(cls => !cls.isCompleted);
  const completedClasses = classes.filter(cls => cls.isCompleted);

  // Carousel scroll functionality
  const upcomingScrollRef = useRef(null);
  const completedScrollRef = useRef(null);
  const [showUpcomingLeftNav, setShowUpcomingLeftNav] = useState(false);
  const [showUpcomingRightNav, setShowUpcomingRightNav] = useState(true);
  const [showCompletedLeftNav, setShowCompletedLeftNav] = useState(false);
  const [showCompletedRightNav, setShowCompletedRightNav] = useState(true);

  const checkScrollButtons = (ref, setLeftNav, setRightNav) => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      setLeftNav(scrollLeft > 10);
      setRightNav(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons(upcomingScrollRef, setShowUpcomingLeftNav, setShowUpcomingRightNav);
    checkScrollButtons(completedScrollRef, setShowCompletedLeftNav, setShowCompletedRightNav);
  }, [upcomingClasses, completedClasses]);

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 360; // card width + gap
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(() => {
        if (ref === upcomingScrollRef) {
          checkScrollButtons(ref, setShowUpcomingLeftNav, setShowUpcomingRightNav);
        } else {
          checkScrollButtons(ref, setShowCompletedLeftNav, setShowCompletedRightNav);
        }
      }, 300);
    }
  };

  const handleScheduleClass = () => {
    if (!newClass.title || !newClass.date || !newClass.time) {
      toast.error('Please fill in all required fields');
      return;
    }

    const formattedDate = new Date(newClass.date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    const newZoomClass = {
      id: Math.max(...classes.map(c => c.id)) + 1,
      title: newClass.title,
      date: formattedDate,
      time: newClass.time,
      duration: newClass.duration,
      description: newClass.description,
      zoomLink: newClass.zoomLink || `https://zoom.us/j/${Math.random().toString().substring(2, 11)}`,
      meetingId: newClass.meetingId || Math.random().toString().substring(2, 11).replace(/(.{3})/g, '$1 ').trim(),
      attendance: 0,
      totalStudents: 25,
      isCompleted: false
    };

    setClasses([...classes, newZoomClass]);
    setNewClass({
      title: '',
      date: '',
      time: '',
      duration: '1 hour',
      description: '',
      zoomLink: '',
      meetingId: ''
    });
    setIsScheduleDialogOpen(false);
    toast.success('Class scheduled successfully!');
  };

  const handleEditClass = () => {
    if (!editingClass) return;

    setClasses(classes.map(cls => 
      cls.id === editingClass.id ? editingClass : cls
    ));
    setIsEditDialogOpen(false);
    setEditingClass(null);
    toast.success('Class updated successfully!');
  };

  const handleDeleteClass = (id) => {
    setClasses(classes.filter(cls => cls.id !== id));
    toast.success('Class deleted successfully!');
  };

  const handleJoinZoom = (zoomLink, title) => {
    window.open(zoomLink, '_blank');
    toast.success(`Joining ${title} on Zoom`);
  };

  const handleViewRecording = (cls) => {
    setSelectedRecording(cls);
    setIsRecordingDialogOpen(true);
  };

  const handleDownloadRecording = (cls) => {
    if (cls.recordingUrl) {
      const link = document.createElement('a');
      link.href = cls.recordingUrl;
      link.download = `${cls.title.replace(/\s+/g, '-')}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success(`Downloading ${cls.title} recording`);
    }
  };

  return (
    <section className="mb-6">
      <Card className="overflow-hidden border-purple-100 shadow-md hover:shadow-lg transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-white flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-xl flex items-center gap-2 text-purple-800">
            <Video className="h-6 w-6" />
            {t('zoom.title')}
          </CardTitle>
          <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                {t('zoom.scheduleNewClass')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  {t('zoom.scheduleNewClass')}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">{t('zoom.classTitle')} *</Label>
                  <Input
                    id="title"
                    placeholder={t('zoom.enterClassTitle')}
                    value={newClass.title}
                    onChange={(e) => setNewClass({...newClass, title: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">{t('zoom.date')} *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newClass.date}
                      onChange={(e) => setNewClass({...newClass, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">{t('zoom.time')} *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newClass.time}
                      onChange={(e) => setNewClass({...newClass, time: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="duration">{t('zoom.duration')}</Label>
                  <Select value={newClass.duration} onValueChange={(value) => setNewClass({...newClass, duration: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30 minutes">{t('zoom.durations.30min')}</SelectItem>
                      <SelectItem value="1 hour">{t('zoom.durations.1hour')}</SelectItem>
                      <SelectItem value="1.5 hours">{t('zoom.durations.1.5hours')}</SelectItem>
                      <SelectItem value="2 hours">{t('zoom.durations.2hours')}</SelectItem>
                      <SelectItem value="3 hours">{t('zoom.durations.3hours')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">{t('zoom.description')}</Label>
                  <Textarea
                    id="description"
                    placeholder={t('zoom.enterDescription')}
                    value={newClass.description}
                    onChange={(e) => setNewClass({...newClass, description: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="zoomLink">{t('zoom.zoomMeetingLink')}</Label>
                  <Input
                    id="zoomLink"
                    placeholder="https://zoom.us/j/..."
                    value={newClass.zoomLink}
                    onChange={(e) => setNewClass({...newClass, zoomLink: e.target.value})}
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleScheduleClass} className="flex-1">
                    {t('zoom.scheduleClass')}
                  </Button>
                  <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>
                    {t('common.cancel')}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {t('zoom.upcomingClasses')}
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                {t('zoom.completedClasses')}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="mt-4">
              <div className="space-y-4">
                {upcomingClasses.length > 0 ? (
                  upcomingClasses.map((cls) => (
                    <div key={cls.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:border-purple-200 hover:shadow-sm transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-800">{t(`zoom.sampleClasses.${cls.titleKey}.title`)}</h3>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingClass(cls);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteClass(cls.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                        <div>
                          <p className="text-sm text-gray-600">{cls.date}</p>
                          <p className="text-sm text-gray-600">{cls.time}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">0/{cls.totalStudents}</span>
                        </div>
                        <div>
                          {cls.zoomLink && (
                            <Button
                              size="sm"
                              onClick={() => handleJoinZoom(cls.zoomLink, t(`zoom.sampleClasses.${cls.titleKey}.title`))}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              {t('zoom.joinViaZoom')}
                            </Button>
                          )}
                        </div>
                        <div>
                          <Badge variant="outline" className="text-green-600 border-green-200 ml-4">
                            {cls.duration}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Video className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>{t('zoom.noUpcoming')}</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="completed" className="mt-4">
              <div className="space-y-4">
                {completedClasses.length > 0 ? (
                  completedClasses.map((cls) => (
                    <div key={cls.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:border-purple-200 hover:shadow-sm transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-800">{t(`zoom.sampleClasses.${cls.titleKey}.title`)}</h3>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingClass(cls);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteClass(cls.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        <div>
                          <p className="text-sm text-gray-600">{cls.date}</p>
                          <p className="text-sm text-gray-600">{cls.time}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{cls.attendance}/{cls.totalStudents}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewRecording(cls)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            {t('zoom.viewRecording')}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownloadRecording(cls)}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            {t('zoom.download')}
                          </Button>
                        </div>
                        <div>
                          <Badge variant="secondary" className="text-gray-600">
                            {cls.duration}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Video className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>{t('zoom.noCompleted')}</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Edit Class Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              {t('zoom.editClass')}
            </DialogTitle>
          </DialogHeader>
          {editingClass && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-title">{t('zoom.classTitle')}</Label>
                <Input
                  id="edit-title"
                  value={editingClass.title}
                  onChange={(e) => setEditingClass({...editingClass, title: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-duration">{t('zoom.duration')}</Label>
                <Select 
                  value={editingClass.duration} 
                  onValueChange={(value) => setEditingClass({...editingClass, duration: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30 minutes">{t('zoom.durations.30min')}</SelectItem>
                    <SelectItem value="1 hour">{t('zoom.durations.1hour')}</SelectItem>
                    <SelectItem value="1.5 hours">{t('zoom.durations.1.5hours')}</SelectItem>
                    <SelectItem value="2 hours">{t('zoom.durations.2hours')}</SelectItem>
                    <SelectItem value="3 hours">{t('zoom.durations.3hours')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-description">{t('zoom.description')}</Label>
                <Textarea
                  id="edit-description"
                  value={editingClass.description}
                  onChange={(e) => setEditingClass({...editingClass, description: e.target.value})}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleEditClass} className="flex-1">
                  {t('zoom.updateClass')}
                </Button>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  {t('common.cancel')}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Recording Viewer Dialog */}
      <Dialog open={isRecordingDialogOpen} onOpenChange={setIsRecordingDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              {selectedRecording?.titleKey && t(`zoom.sampleClasses.${selectedRecording.titleKey}.title`)} - {t('zoom.viewRecording')}
            </DialogTitle>
          </DialogHeader>
          {selectedRecording && (
            <div className="space-y-4">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Video className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 mb-2">{t('zoom.recordingPlayer')}</p>
                  <p className="text-sm text-gray-500">
                    {t('zoom.classHeldOn', { date: selectedRecording.date, time: selectedRecording.time })}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t('zoom.attendance', { count: selectedRecording.attendance, total: selectedRecording.totalStudents })}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{t(`zoom.sampleClasses.${selectedRecording.titleKey}.title`)}</h3>
                  <p className="text-sm text-gray-600">{t(`zoom.sampleClasses.${selectedRecording.titleKey}.description`)}</p>
                </div>
                <Button onClick={() => handleDownloadRecording(selectedRecording)}>
                  <Download className="h-4 w-4 mr-2" />
                  {t('zoom.downloadRecording')}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default ZoomClassesSection;