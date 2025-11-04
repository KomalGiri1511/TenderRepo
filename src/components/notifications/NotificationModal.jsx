import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Bell,
  X,
  Info,
  AlertTriangle,
  Calendar,
  MessageSquare,
  ExternalLink,
  Volume2,
  Globe,
  CheckCircle,
  Clock,
  FileText
} from 'lucide-react';

// Translations object
const translations = {
  en: {
    title: 'Notifications',
    newUpdate: 'New Update',
    viewDetails: 'View Details',
    dismiss: 'Dismiss',
    markAllRead: 'Mark All as Read',
    noNotifications: 'No notifications',
    allNotifications: 'All notifications have been read',
    filters: {
      all: 'All',
      updates: 'Updates',
      events: 'Events',
      messages: 'Messages'
    },
    types: {
      info: 'Information',
      warning: 'Important',
      update: 'Update',
      event: 'Event',
      message: 'Message'
    },
    timeAgo: {
      justNow: 'Just now',
      minuteAgo: 'minute ago',
      minutesAgo: 'minutes ago',
      hourAgo: 'hour ago',
      hoursAgo: 'hours ago',
      dayAgo: 'day ago',
      daysAgo: 'days ago'
    }
  },
  hi: {
    title: 'सूचनाएं',
    newUpdate: 'नया अपडेट',
    viewDetails: 'विवरण देखें',
    dismiss: 'खारिज करें',
    markAllRead: 'सभी को पढ़ा हुआ चिह्नित करें',
    noNotifications: 'कोई सूचना नहीं',
    allNotifications: 'सभी सूचनाएं पढ़ी जा चुकी हैं',
    filters: {
      all: 'सभी',
      updates: 'अपडेट',
      events: 'कार्यक्रम',
      messages: 'संदेश'
    },
    types: {
      info: 'जानकारी',
      warning: 'महत्वपूर्ण',
      update: 'अपडेट',
      event: 'कार्यक्रम',
      message: 'संदेश'
    },
    timeAgo: {
      justNow: 'अभी',
      minuteAgo: 'मिनट पहले',
      minutesAgo: 'मिनट पहले',
      hourAgo: 'घंटा पहले',
      hoursAgo: 'घंटे पहले',
      dayAgo: 'दिन पहले',
      daysAgo: 'दिन पहले'
    }
  },
  de: {
    title: 'Benachrichtigungen',
    newUpdate: 'Neue Aktualisierung',
    viewDetails: 'Details anzeigen',
    dismiss: 'Schließen',
    markAllRead: 'Alle als gelesen markieren',
    noNotifications: 'Keine Benachrichtigungen',
    allNotifications: 'Alle Benachrichtigungen wurden gelesen',
    filters: {
      all: 'Alle',
      updates: 'Aktualisierungen',
      events: 'Veranstaltungen',
      messages: 'Nachrichten'
    },
    types: {
      info: 'Information',
      warning: 'Wichtig',
      update: 'Aktualisierung',
      event: 'Veranstaltung',
      message: 'Nachricht'
    },
    timeAgo: {
      justNow: 'Gerade eben',
      minuteAgo: 'Vor einer Minute',
      minutesAgo: 'Vor Minuten',
      hourAgo: 'Vor einer Stunde',
      hoursAgo: 'Vor Stunden',
      dayAgo: 'Vor einem Tag',
      daysAgo: 'Vor Tagen'
    }
  },
  es: {
    title: 'Notificaciones',
    newUpdate: 'Nueva actualización',
    viewDetails: 'Ver detalles',
    dismiss: 'Descartar',
    markAllRead: 'Marcar todo como leído',
    noNotifications: 'No hay notificaciones',
    allNotifications: 'Todas las notificaciones han sido leídas',
    filters: {
      all: 'Todas',
      updates: 'Actualizaciones',
      events: 'Eventos',
      messages: 'Mensajes'
    },
    types: {
      info: 'Información',
      warning: 'Importante',
      update: 'Actualización',
      event: 'Evento',
      message: 'Mensaje'
    },
    timeAgo: {
      justNow: 'Justo ahora',
      minuteAgo: 'hace un minuto',
      minutesAgo: 'hace minutos',
      hourAgo: 'hace una hora',
      hoursAgo: 'hace horas',
      dayAgo: 'hace un día',
      daysAgo: 'hace días'
    }
  },
  fr: {
    title: 'Notifications',
    newUpdate: 'Nouvelle mise à jour',
    viewDetails: 'Voir les détails',
    dismiss: 'Fermer',
    markAllRead: 'Tout marquer comme lu',
    noNotifications: 'Aucune notification',
    allNotifications: 'Toutes les notifications ont été lues',
    filters: {
      all: 'Toutes',
      updates: 'Mises à jour',
      events: 'Événements',
      messages: 'Messages'
    },
    types: {
      info: 'Information',
      warning: 'Important',
      update: 'Mise à jour',
      event: 'Événement',
      message: 'Message'
    },
    timeAgo: {
      justNow: 'À l\'instant',
      minuteAgo: 'il y a une minute',
      minutesAgo: 'il y a minutes',
      hourAgo: 'il y a une heure',
      hoursAgo: 'il y a heures',
      dayAgo: 'il y a un jour',
      daysAgo: 'il y a jours'
    }
  }
};

const NotificationModal = ({ isOpen, onClose, onNotificationAction }) => {
  const [language, setLanguage] = useState('en');
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'update',
      title: {
        en: 'New Course Module Released',
        hi: 'नया पाठ्यक्रम मॉड्यूल जारी',
        de: 'Neues Kursmodul veröffentlicht',
        es: 'Nuevo módulo del curso publicado',
        fr: 'Nouveau module de cours publié'
      },
      description: {
        en: 'Module 3: Implementation, Feedback & Crisis Communication is now available. Learn advanced strategies for handling workplace communication challenges and managing stakeholder expectations during reform implementation.',
        hi: 'मॉड्यूल 3: कार्यान्वयन, प्रतिक्रिया और संकट संचार अब उपलब्ध है। सुधार कार्यान्वयन के दौरान कार्यस्थल संचार चुनौतियों को संभालने और हितधारक अपेक्षाओं के प्रबंधन के लिए उन्नत रणनीतियाँ सीखें।',
        de: 'Modul 3: Implementierung, Feedback & Krisenkommunikation ist jetzt verfügbar. Lernen Sie fortgeschrittene Strategien für den Umgang mit Kommunikationsherausforderungen am Arbeitsplatz.',
        es: 'Módulo 3: Implementación, retroalimentación y comunicación de crisis ya está disponible. Aprende estrategias avanzadas para manejar desafíos de comunicación en el lugar de trabajo.',
        fr: 'Module 3 : Mise en œuvre, feedback et communication de crise est maintenant disponible. Apprenez des stratégies avancées pour gérer les défis de communication au travail.'
      },
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      read: false,
      link: '/courses/modules/3/lessons',
      icon: FileText,
      image: '/assets/communication.PNG'
    },
    {
      id: 2,
      type: 'event',
      title: {
        en: 'Upcoming Webinar: Digital Learning Strategies',
        hi: 'आगामी वेबिनार: डिजिटल सीखने की रणनीतियाँ',
        de: 'Bevorstehendes Webinar: Digitale Lernstrategien',
        es: 'Próximo webinar: Estrategias de aprendizaje digital',
        fr: 'Webinaire à venir : Stratégies d\'apprentissage numérique'
      },
      description: {
        en: 'Join us for an interactive session on implementing effective digital learning pathways for labour reform initiatives. Date: Next Tuesday, 3:00 PM. Expert speakers from GIZ will share best practices.',
        hi: 'श्रम सुधार पहलों के लिए प्रभावी डिजिटल सीखने के मार्गों को लागू करने पर एक इंटरैक्टिव सत्र में शामिल हों। तारीख: अगले मंगलवार, दोपहर 3:00 बजे।',
        de: 'Nehmen Sie an einer interaktiven Sitzung zur Implementierung effektiver digitaler Lernwege teil. Datum: Nächsten Dienstag, 15:00 Uhr.',
        es: 'Únase a nosotros para una sesión interactiva sobre la implementación de rutas de aprendizaje digital efectivas. Fecha: próximo martes, 3:00 PM.',
        fr: 'Rejoignez-nous pour une session interactive sur la mise en œuvre de parcours d\'apprentissage numériques efficaces. Date : mardi prochain, 15h00.'
      },
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false,
      link: '/events/webinar-123',
      icon: Calendar
    },
    {
      id: 3,
      type: 'message',
      title: {
        en: 'New Message from Campaign Team',
        hi: 'अभियान टीम से नया संदेश',
        de: 'Neue Nachricht vom Kampagnenteam',
        es: 'Nuevo mensaje del equipo de campaña',
        fr: 'Nouveau message de l\'équipe de campagne'
      },
      description: {
        en: 'Your feedback on the labour reform awareness campaign has been reviewed. The team has incorporated your suggestions. Check the updated campaign materials in the resources section.',
        hi: 'श्रम सुधार जागरूकता अभियान पर आपकी प्रतिक्रिया की समीक्षा की गई है। टीम ने आपके सुझावों को शामिल किया है।',
        de: 'Ihr Feedback zur Arbeitsreform-Sensibilisierungskampagne wurde überprüft. Das Team hat Ihre Vorschläge eingearbeitet.',
        es: 'Se ha revisado su opinión sobre la campaña de concientización sobre la reforma laboral. El equipo ha incorporado sus sugerencias.',
        fr: 'Vos commentaires sur la campagne de sensibilisation à la réforme du travail ont été examinés. L\'équipe a intégré vos suggestions.'
      },
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      read: true,
      link: '/messages/campaign-123',
      icon: MessageSquare
    },
    {
      id: 4,
      type: 'warning',
      title: {
        en: 'Assessment Deadline Approaching',
        hi: 'मूल्यांकन की समय सीमा नजदीक',
        de: 'Bewertungsfrist nähert sich',
        es: 'Fecha límite de evaluación próxima',
        fr: 'Date limite d\'évaluation approchante'
      },
      description: {
        en: 'Complete your Module 2 assessment by Friday to maintain your course progress. The quiz covers digital communication channels and content strategy.',
        hi: 'अपनी पाठ्यक्रम प्रगति बनाए रखने के लिए शुक्रवार तक अपना मॉड्यूल 2 मूल्यांकन पूरा करें।',
        de: 'Schließen Sie Ihre Modul-2-Bewertung bis Freitag ab, um Ihren Kursfortschritt aufrechtzuerhalten.',
        es: 'Complete su evaluación del Módulo 2 para el viernes para mantener su progreso en el curso.',
        fr: 'Complétez votre évaluation du module 2 d\'ici vendredi pour maintenir votre progression dans le cours.'
      },
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      read: false,
      link: '/courses/modules/2/assessments',
      icon: AlertTriangle
    }
  ]);

  const t = translations[language];

  // Get notification icon and color
  const getNotificationStyle = (type) => {
    const styles = {
      update: { color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-200' },
      event: { color: 'text-purple-600', bg: 'bg-purple-100', border: 'border-purple-200' },
      message: { color: 'text-green-600', bg: 'bg-green-100', border: 'border-green-200' },
      warning: { color: 'text-orange-600', bg: 'bg-orange-100', border: 'border-orange-200' },
      info: { color: 'text-gray-600', bg: 'bg-gray-100', border: 'border-gray-200' }
    };
    return styles[type] || styles.info;
  };

  // Format timestamp
  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 1000); // seconds

    if (diff < 60) return t.timeAgo.justNow;
    if (diff < 120) return `1 ${t.timeAgo.minuteAgo}`;
    if (diff < 3600) return `${Math.floor(diff / 60)} ${t.timeAgo.minutesAgo}`;
    if (diff < 7200) return `1 ${t.timeAgo.hourAgo}`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} ${t.timeAgo.hoursAgo}`;
    if (diff < 172800) return `1 ${t.timeAgo.dayAgo}`;
    return `${Math.floor(diff / 86400)} ${t.timeAgo.daysAgo}`;
  };

  // Filter notifications
  const getFilteredNotifications = () => {
    if (filter === 'all') return notifications;
    if (filter === 'updates') return notifications.filter(n => n.type === 'update');
    if (filter === 'events') return notifications.filter(n => n.type === 'event');
    if (filter === 'messages') return notifications.filter(n => n.type === 'message');
    return notifications;
  };

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  // Dismiss notification
  const dismissNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  // Handle view details
  const handleViewDetails = (notification) => {
    markAsRead(notification.id);
    if (onNotificationAction) {
      onNotificationAction(notification);
    }
    onClose();
  };

  // Text-to-speech function
  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'en' ? 'en-US' : 
                       language === 'hi' ? 'hi-IN' :
                       language === 'de' ? 'de-DE' :
                       language === 'es' ? 'es-ES' : 'fr-FR';
      window.speechSynthesis.speak(utterance);
    }
  };

  const filteredNotifications = getFilteredNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 p-4 sm:p-6">
          {/* Top Row: Title and Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <DialogHeader className="flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-900 rounded-lg">
                  <Bell className="h-5 w-5 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900">
                    {t.title}
                  </DialogTitle>
                  {unreadCount > 0 && (
                    <p className="text-sm text-gray-600">
                      {unreadCount} unread
                    </p>
                  )}
                </div>
              </div>
            </DialogHeader>

            {/* Language Selector and Mark All Read */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[120px] sm:w-[140px]">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिन्दी</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>

              {unreadCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs sm:text-sm whitespace-nowrap"
                >
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                  <span className="hidden sm:inline">{t.markAllRead}</span>
                </Button>
              )}
            </div>
          </div>

          {/* Filter Tabs */}
          <Tabs value={filter} onValueChange={setFilter} className="w-full">
            <TabsList className="w-full grid grid-cols-4 gap-1">
              <TabsTrigger value="all" className="text-xs sm:text-sm">{t.filters.all}</TabsTrigger>
              <TabsTrigger value="updates" className="text-xs sm:text-sm">{t.filters.updates}</TabsTrigger>
              <TabsTrigger value="events" className="text-xs sm:text-sm">{t.filters.events}</TabsTrigger>
              <TabsTrigger value="messages" className="text-xs sm:text-sm">{t.filters.messages}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Notifications List */}
        <ScrollArea className="h-[450px] sm:h-[500px]">
          <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">{t.noNotifications}</p>
                <p className="text-sm text-gray-400 mt-2">{t.allNotifications}</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => {
                const style = getNotificationStyle(notification.type);
                const Icon = notification.icon;

                return (
                  <div
                    key={notification.id}
                    className={`border-2 rounded-lg p-3 sm:p-4 transition-all duration-200 hover:shadow-md ${
                      notification.read 
                        ? 'bg-white border-gray-200' 
                        : `bg-gray-50 ${style.border}`
                    }`}
                  >
                    <div className="flex gap-3 sm:gap-4">
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center ${style.bg}`}>
                        <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${style.color}`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 sm:gap-3 mb-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base line-clamp-2">
                              {notification.title[language]}
                            </h3>
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 flex-wrap">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{getTimeAgo(notification.timestamp)}</span>
                              </div>
                              {!notification.read && (
                                <Badge className="bg-blue-600 text-white text-xs">New</Badge>
                              )}
                            </div>
                          </div>

                          {/* Audio button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSpeak(notification.description[language])}
                            className="flex-shrink-0 h-8 w-8 p-0"
                            aria-label="Listen to notification"
                          >
                            <Volume2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Description */}
                        <DialogDescription className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2 sm:line-clamp-3">
                          {notification.description[language]}
                        </DialogDescription>

                        {/* Image if available */}
                        {notification.image && (
                          <img 
                            src={notification.image}
                            alt=""
                            className="w-full h-24 sm:h-32 object-cover rounded-lg mb-3"
                          />
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleViewDetails(notification)}
                            className="bg-gray-900 hover:bg-gray-800 text-xs sm:text-sm"
                          >
                            <ExternalLink className="h-3 w-3 mr-1 sm:mr-2" />
                            {t.viewDetails}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => dismissNotification(notification.id)}
                            className="text-xs sm:text-sm"
                          >
                            <X className="h-3 w-3 mr-1 sm:mr-2" />
                            {t.dismiss}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationModal;

