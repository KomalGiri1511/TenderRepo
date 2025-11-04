import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Edit, 
  Trash2, 
  Users,
  Clock,
  MapPin,
  Video,
  Search,
  Filter,
  X,
  Save,
  Eye,
  CheckCircle,
  UserCheck,
  TrendingUp,
  BarChart3,
  Globe,
  Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

const WorkshopManagement = () => {
  const { t } = useTranslation();
  const [workshops, setWorkshops] = useState([
    {
      id: 1,
      title: 'AI Implementation Workshop',
      description: 'Hands-on workshop on implementing AI solutions',
      type: 'workshop',
      date: '2024-03-15',
      time: '10:00',
      duration: '3 hours',
      timezone: 'CET',
      location: 'Virtual',
      maxParticipants: 50,
      registered: 42,
      attended: 0,
      status: 'upcoming',
      instructor: 'Dr. Sarah Johnson',
      platform: 'Zoom'
    },
    {
      id: 2,
      title: 'Leadership Skills Webinar',
      description: 'Essential leadership skills for modern managers',
      type: 'webinar',
      date: '2024-03-20',
      time: '14:00',
      duration: '2 hours',
      timezone: 'EST',
      location: 'Virtual',
      maxParticipants: 100,
      registered: 87,
      attended: 0,
      status: 'upcoming',
      instructor: 'Michael Chen',
      platform: 'Microsoft Teams'
    },
    {
      id: 3,
      title: 'Compliance Training Simulation',
      description: 'Interactive compliance scenarios and case studies',
      type: 'simulation',
      date: '2024-02-28',
      time: '09:00',
      duration: '4 hours',
      timezone: 'GMT',
      location: 'Virtual',
      maxParticipants: 30,
      registered: 30,
      attended: 28,
      status: 'completed',
      instructor: 'Emma Williams',
      platform: 'Custom Platform',
      feedback: 4.5
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'workshop',
    date: '',
    time: '',
    duration: '',
    timezone: 'CET',
    location: 'Virtual',
    maxParticipants: 50,
    instructor: '',
    platform: 'Zoom'
  });

  const types = ['workshop', 'webinar', 'simulation'];
  const statuses = ['upcoming', 'in-progress', 'completed', 'cancelled'];
  const timezones = ['CET', 'EST', 'PST', 'GMT', 'IST', 'JST'];
  const platforms = ['Zoom', 'Microsoft Teams', 'Google Meet', 'Custom Platform'];

  const filteredWorkshops = workshops.filter(workshop => {
    const matchesSearch = workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          workshop.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || workshop.type === filterType;
    const matchesStatus = filterStatus === 'all' || workshop.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const openModal = (mode, workshop = null) => {
    setModalMode(mode);
    setSelectedWorkshop(workshop);
    if (workshop) {
      setFormData({
        title: workshop.title,
        description: workshop.description,
        type: workshop.type,
        date: workshop.date,
        time: workshop.time,
        duration: workshop.duration,
        timezone: workshop.timezone,
        location: workshop.location,
        maxParticipants: workshop.maxParticipants,
        instructor: workshop.instructor,
        platform: workshop.platform
      });
    } else {
      setFormData({
        title: '',
        description: '',
        type: 'workshop',
        date: '',
        time: '',
        duration: '',
        timezone: 'CET',
        location: 'Virtual',
        maxParticipants: 50,
        instructor: '',
        platform: 'Zoom'
      });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.date || !formData.time) {
      toast.error(t('admin.workshops.fillRequired') || 'Please fill in all required fields');
      return;
    }

    if (modalMode === 'create') {
      const newWorkshop = {
        id: Math.max(...workshops.map(w => w.id)) + 1,
        ...formData,
        registered: 0,
        attended: 0,
        status: 'upcoming'
      };
      setWorkshops([...workshops, newWorkshop]);
      toast.success(t('admin.workshops.created') || 'Workshop created successfully!');
    } else if (modalMode === 'edit') {
      setWorkshops(workshops.map(w => w.id === selectedWorkshop.id ? { ...w, ...formData } : w));
      toast.success(t('admin.workshops.updated') || 'Workshop updated successfully!');
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm(t('admin.workshops.confirmDelete') || 'Are you sure you want to delete this workshop?')) {
      setWorkshops(workshops.filter(w => w.id !== id));
      toast.success(t('admin.workshops.deleted') || 'Workshop deleted successfully!');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      upcoming: 'bg-blue-100 text-blue-700 border-blue-300',
      'in-progress': 'bg-green-100 text-green-700 border-green-300',
      completed: 'bg-slate-100 text-slate-700 border-slate-300',
      cancelled: 'bg-red-100 text-red-700 border-red-300'
    };
    return colors[status] || colors.upcoming;
  };

  const getTypeIcon = (type) => {
    const icons = {
      workshop: Video,
      webinar: Users,
      simulation: BarChart3
    };
    return icons[type] || Video;
  };

  const totalRegistrations = workshops.reduce((sum, w) => sum + w.registered, 0);
  const totalAttendance = workshops.filter(w => w.status === 'completed').reduce((sum, w) => sum + w.attended, 0);
  const avgAttendanceRate = workshops.filter(w => w.status === 'completed').length > 0
    ? Math.round((totalAttendance / workshops.filter(w => w.status === 'completed').reduce((sum, w) => sum + w.registered, 0)) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/20 to-blue-50/10 p-6">
      <div className="max-w-[1800px] mx-auto space-y-6">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg">
                <CalendarIcon className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-800">{t('admin.workshops.title') || 'Workshop & Event Management'}</h1>
            </div>
            <p className="text-sm text-slate-500">{t('admin.workshops.subtitle') || 'Schedule and manage workshops, webinars, and simulations'}</p>
          </div>

          <button
            onClick={() => openModal('create')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl font-medium"
          >
            <Plus className="h-5 w-5" />
            {t('admin.workshops.scheduleNew') || 'Schedule New Event'}
          </button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <div className="bg-white rounded-lg p-5 border border-purple-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <CalendarIcon className="h-8 w-8 text-purple-500" />
              <span className="text-2xl font-bold text-purple-600">{workshops.length}</span>
            </div>
            <p className="text-sm text-slate-600 font-medium">{t('admin.workshops.totalEvents') || 'Total Events'}</p>
          </div>

          <div className="bg-white rounded-lg p-5 border border-blue-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold text-blue-600">{totalRegistrations}</span>
            </div>
            <p className="text-sm text-slate-600 font-medium">{t('admin.workshops.totalRegistrations') || 'Total Registrations'}</p>
          </div>

          <div className="bg-white rounded-lg p-5 border border-green-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <UserCheck className="h-8 w-8 text-green-500" />
              <span className="text-2xl font-bold text-green-600">{totalAttendance}</span>
            </div>
            <p className="text-sm text-slate-600 font-medium">{t('admin.workshops.totalAttendance') || 'Total Attendance'}</p>
          </div>

          <div className="bg-white rounded-lg p-5 border border-orange-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold text-orange-600">{avgAttendanceRate}%</span>
            </div>
            <p className="text-sm text-slate-600 font-medium">{t('admin.workshops.avgAttendance') || 'Avg. Attendance Rate'}</p>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-4 shadow-sm border border-slate-200"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder={t('admin.workshops.searchPlaceholder') || 'Search events...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none cursor-pointer min-w-[180px]"
              >
                <option value="all">{t('admin.workshops.allTypes') || 'All Types'}</option>
                {types.map(type => (
                  <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none cursor-pointer min-w-[150px]"
              >
                <option value="all">{t('admin.workshops.allStatus') || 'All Status'}</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Workshops Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {filteredWorkshops.map((workshop, index) => {
            const TypeIcon = getTypeIcon(workshop.type);
            const attendanceRate = workshop.status === 'completed' && workshop.registered > 0
              ? Math.round((workshop.attended / workshop.registered) * 100)
              : 0;

            return (
              <motion.div
                key={workshop.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-xl border-2 border-slate-200 hover:border-purple-400 hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Workshop Header */}
                <div className="p-5 bg-gradient-to-br from-purple-50 to-blue-50 border-b border-slate-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <TypeIcon className="h-5 w-5 text-purple-600" />
                      </div>
                      <span className="text-xs font-semibold text-purple-600 uppercase">{workshop.type}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(workshop.status)}`}>
                      {workshop.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-800 mb-1 group-hover:text-purple-600 transition-colors">{workshop.title}</h3>
                  <p className="text-sm text-slate-600 line-clamp-2">{workshop.description}</p>
                </div>

                {/* Workshop Info */}
                <div className="p-5 space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-600">{workshop.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-600">{workshop.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-600">{workshop.timezone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-600">{workshop.platform}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm py-2 px-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600">Instructor:</span>
                    <span className="font-medium text-slate-800">{workshop.instructor}</span>
                  </div>

                  {/* Registration Progress */}
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                      <span>Registrations</span>
                      <span className="font-semibold">{workshop.registered}/{workshop.maxParticipants}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                        style={{ width: `${(workshop.registered / workshop.maxParticipants) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Attendance for completed workshops */}
                  {workshop.status === 'completed' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-green-700 font-medium">Attendance Rate:</span>
                        <span className="text-green-800 font-bold">{attendanceRate}%</span>
                      </div>
                      <div className="text-xs text-green-600 mt-1">
                        {workshop.attended} of {workshop.registered} attended
                      </div>
                      {workshop.feedback && (
                        <div className="flex items-center gap-1 mt-2">
                          <span className="text-xs text-green-700">Feedback:</span>
                          <span className="text-yellow-500 font-bold text-sm">★ {workshop.feedback}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="p-5 pt-0 flex gap-2">
                  <button
                    onClick={() => openModal('view', workshop)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-sm font-medium"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </button>
                  <button
                    onClick={() => openModal('edit', workshop)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors text-sm font-medium"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </button>
                  {workshop.status === 'upcoming' && (
                    <button
                      onClick={() => {
                        setSelectedWorkshop(workshop);
                        setShowAttendanceModal(true);
                      }}
                      className="px-3 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
                      title="Track Attendance"
                    >
                      <UserCheck className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(workshop.id)}
                    className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Empty State */}
        {filteredWorkshops.length === 0 && (
          <div className="text-center py-12">
            <CalendarIcon className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">{t('admin.workshops.noEvents') || 'No events found'}</p>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800">
                  {modalMode === 'create' && (t('admin.workshops.createEvent') || 'Schedule New Event')}
                  {modalMode === 'edit' && (t('admin.workshops.editEvent') || 'Edit Event')}
                  {modalMode === 'view' && (t('admin.workshops.viewEvent') || 'Event Details')}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-slate-500" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {modalMode !== 'view' ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('admin.workshops.eventTitle') || 'Event Title'} *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter event title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('admin.workshops.description') || 'Description'}
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                        rows={3}
                        placeholder="Enter event description"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          {t('admin.workshops.type') || 'Event Type'} *
                        </label>
                        <select
                          value={formData.type}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          {types.map(type => (
                            <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          {t('admin.workshops.platform') || 'Platform'}
                        </label>
                        <select
                          value={formData.platform}
                          onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          {platforms.map(platform => (
                            <option key={platform} value={platform}>{platform}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          {t('admin.workshops.date') || 'Date'} *
                        </label>
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          {t('admin.workshops.time') || 'Time'} *
                        </label>
                        <input
                          type="time"
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          {t('admin.workshops.timezone') || 'Timezone'}
                        </label>
                        <select
                          value={formData.timezone}
                          onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          {timezones.map(tz => (
                            <option key={tz} value={tz}>{tz}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          {t('admin.workshops.duration') || 'Duration'}
                        </label>
                        <input
                          type="text"
                          value={formData.duration}
                          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="e.g., 2 hours"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          {t('admin.workshops.maxParticipants') || 'Max Participants'}
                        </label>
                        <input
                          type="number"
                          value={formData.maxParticipants}
                          onChange={(e) => setFormData({ ...formData, maxParticipants: parseInt(e.target.value) || 0 })}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('admin.workshops.instructor') || 'Instructor'}
                      </label>
                      <input
                        type="text"
                        value={formData.instructor}
                        onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Instructor name"
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={handleSave}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg font-medium"
                      >
                        <Save className="h-5 w-5" />
                        {modalMode === 'create' ? (t('admin.workshops.create') || 'Create') : (t('admin.workshops.save') || 'Save Changes')}
                      </button>
                      <button
                        onClick={() => setShowModal(false)}
                        className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all font-medium"
                      >
                        {t('admin.workshops.cancel') || 'Cancel'}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* View Mode */}
                    <div className="space-y-4">
                      {/* Add view mode content here if needed */}
                      <p className="text-slate-600">Event details view...</p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Attendance Tracking Modal */}
      {showAttendanceModal && selectedWorkshop && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-800">Track Attendance</h2>
              <button
                onClick={() => setShowAttendanceModal(false)}
                className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            <div className="text-center py-8">
              <UserCheck className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{selectedWorkshop.title}</h3>
              <p className="text-slate-600 mb-4">Real-time attendance tracking will be available during the live event.</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  Registered: <span className="font-bold">{selectedWorkshop.registered}</span> participants
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowAttendanceModal(false)}
              className="w-full px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors font-medium"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default WorkshopManagement;

