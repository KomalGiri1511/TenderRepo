import React, { useState } from 'react';
import {
  MessageSquare,
  Ticket,
  HelpCircle,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  X,
  Save,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  MessageCircle,
  Send,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

const SupportCenter = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('tickets'); // 'tickets' or 'faqs'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedItem, setSelectedItem] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const [tickets, setTickets] = useState([
    {
      id: 1,
      title: 'Cannot access course materials',
      description: 'User reporting unable to view video content in Digital Literacy module',
      user: 'john.doe@company.com',
      category: 'Technical',
      priority: 'high',
      status: 'open',
      createdDate: '2024-03-10',
      lastUpdated: '2024-03-10',
      assignedTo: 'Support Team',
      responseTime: '2 hours'
    },
    {
      id: 2,
      title: 'Certificate not generated',
      description: 'Completed course but certificate download not available',
      user: 'sarah.johnson@company.com',
      category: 'Certificates',
      priority: 'medium',
      status: 'in-progress',
      createdDate: '2024-03-09',
      lastUpdated: '2024-03-10',
      assignedTo: 'Michael Chen',
      responseTime: '4 hours'
    },
    {
      id: 3,
      title: 'Account access issue',
      description: 'Unable to login despite correct credentials',
      user: 'emma.williams@company.com',
      category: 'Account',
      priority: 'urgent',
      status: 'open',
      createdDate: '2024-03-10',
      lastUpdated: '2024-03-10',
      assignedTo: 'Support Team',
      responseTime: '30 minutes'
    },
    {
      id: 4,
      title: 'Progress not saving',
      description: 'Course progress resets after each session',
      user: 'mike.brown@company.com',
      category: 'Technical',
      priority: 'high',
      status: 'resolved',
      createdDate: '2024-03-08',
      lastUpdated: '2024-03-09',
      assignedTo: 'Sarah Johnson',
      responseTime: '24 hours'
    }
  ]);

  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: 'How do I reset my password?',
      answer: 'Click on "Forgot Password" on the login page, enter your email, and follow the instructions sent to your inbox.',
      category: 'Account',
      views: 1245,
      helpful: 892,
      lastUpdated: '2024-03-01'
    },
    {
      id: 2,
      question: 'How long do I have to complete a course?',
      answer: 'Most courses have a 90-day completion window from enrollment date. Check your course details for specific timelines.',
      category: 'Courses',
      views: 987,
      helpful: 745,
      lastUpdated: '2024-02-28'
    },
    {
      id: 3,
      question: 'Can I download course materials?',
      answer: 'Yes, most course materials including PDFs, presentations, and resources can be downloaded from the "Resources" section of each module.',
      category: 'Courses',
      views: 856,
      helpful: 678,
      lastUpdated: '2024-03-05'
    },
    {
      id: 4,
      question: 'How do I access my certificate?',
      answer: 'After completing all course modules and assessments, go to "My Certificates" in your profile. Certificates are available for download in PDF format.',
      category: 'Certificates',
      views: 1524,
      helpful: 1234,
      lastUpdated: '2024-03-02'
    }
  ]);

  const [ticketForm, setTicketForm] = useState({
    title: '',
    description: '',
    category: 'Technical',
    priority: 'medium',
    status: 'open'
  });

  const [faqForm, setFaqForm] = useState({
    question: '',
    answer: '',
    category: 'General'
  });

  const categories = ['Technical', 'Account', 'Courses', 'Certificates', 'General', 'Billing'];
  const ticketStatuses = ['open', 'in-progress', 'resolved', 'closed'];
  const priorities = ['low', 'medium', 'high', 'urgent'];

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ticket.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleSaveTicket = () => {
    if (!ticketForm.title || !ticketForm.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (modalMode === 'create') {
      const newTicket = {
        id: Math.max(...tickets.map(t => t.id)) + 1,
        ...ticketForm,
        user: 'admin@company.com',
        createdDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0],
        assignedTo: 'Support Team',
        responseTime: 'Pending'
      };
      setTickets([...tickets, newTicket]);
      toast.success('Ticket created successfully!');
    } else if (modalMode === 'edit') {
      setTickets(tickets.map(t => t.id === selectedItem.id ? { ...t, ...ticketForm } : t));
      toast.success('Ticket updated successfully!');
    }
    setShowModal(false);
  };

  const handleSaveFaq = () => {
    if (!faqForm.question || !faqForm.answer) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (modalMode === 'create') {
      const newFaq = {
        id: Math.max(...faqs.map(f => f.id)) + 1,
        ...faqForm,
        views: 0,
        helpful: 0,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setFaqs([...faqs, newFaq]);
      toast.success('FAQ created successfully!');
    } else if (modalMode === 'edit') {
      setFaqs(faqs.map(f => f.id === selectedItem.id ? { ...f, ...faqForm } : f));
      toast.success('FAQ updated successfully!');
    }
    setShowModal(false);
  };

  const handleDeleteTicket = (id) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      setTickets(tickets.filter(t => t.id !== id));
      toast.success('Ticket deleted successfully!');
    }
  };

  const handleDeleteFaq = (id) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      setFaqs(faqs.filter(f => f.id !== id));
      toast.success('FAQ deleted successfully!');
    }
  };

  const openTicketModal = (mode, ticket = null) => {
    setModalMode(mode);
    setSelectedItem(ticket);
    if (ticket) {
      setTicketForm({
        title: ticket.title,
        description: ticket.description,
        category: ticket.category,
        priority: ticket.priority,
        status: ticket.status
      });
    } else {
      setTicketForm({
        title: '',
        description: '',
        category: 'Technical',
        priority: 'medium',
        status: 'open'
      });
    }
    setShowModal(true);
  };

  const openFaqModal = (mode, faq = null) => {
    setModalMode(mode);
    setSelectedItem(faq);
    if (faq) {
      setFaqForm({
        question: faq.question,
        answer: faq.answer,
        category: faq.category
      });
    } else {
      setFaqForm({
        question: '',
        answer: '',
        category: 'General'
      });
    }
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    const colors = {
      open: 'bg-blue-100 text-blue-700 border-blue-300',
      'in-progress': 'bg-amber-100 text-amber-700 border-amber-300',
      resolved: 'bg-green-100 text-green-700 border-green-300',
      closed: 'bg-slate-100 text-slate-700 border-slate-300'
    };
    return colors[status] || colors.open;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-slate-100 text-slate-700 border-slate-300',
      medium: 'bg-blue-100 text-blue-700 border-blue-300',
      high: 'bg-orange-100 text-orange-700 border-orange-300',
      urgent: 'bg-red-100 text-red-700 border-red-300'
    };
    return colors[priority] || colors.medium;
  };

  const supportMetrics = {
    totalTickets: tickets.length,
    openTickets: tickets.filter(t => t.status === 'open').length,
    avgResponseTime: '2.5 hours',
    resolvedToday: tickets.filter(t => t.status === 'resolved' && t.lastUpdated === new Date().toISOString().split('T')[0]).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50/20 to-blue-50/10 p-6">
      <div className="max-w-[1800px] mx-auto space-y-6">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-800">{t('admin.support.title') || 'Support Center'}</h1>
            </div>
            <p className="text-sm text-slate-500">{t('admin.support.subtitle') || 'Manage support tickets, FAQs, and user inquiries'}</p>
          </div>

          <button
            onClick={() => activeTab === 'tickets' ? openTicketModal('create') : openFaqModal('create')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg hover:from-emerald-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl font-medium"
          >
            <Plus className="h-5 w-5" />
            {activeTab === 'tickets' ? 'New Ticket' : 'New FAQ'}
          </button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <div className="bg-white rounded-lg p-5 border border-emerald-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Ticket className="h-8 w-8 text-emerald-500" />
              <span className="text-2xl font-bold text-emerald-600">{supportMetrics.totalTickets}</span>
            </div>
            <p className="text-sm text-slate-600 font-medium">Total Tickets</p>
          </div>

          <div className="bg-white rounded-lg p-5 border border-blue-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <AlertCircle className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold text-blue-600">{supportMetrics.openTickets}</span>
            </div>
            <p className="text-sm text-slate-600 font-medium">Open Tickets</p>
          </div>

          <div className="bg-white rounded-lg p-5 border border-purple-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Clock className="h-8 w-8 text-purple-500" />
              <span className="text-lg font-bold text-purple-600">{supportMetrics.avgResponseTime}</span>
            </div>
            <p className="text-sm text-slate-600 font-medium">Avg. Response Time</p>
          </div>

          <div className="bg-white rounded-lg p-5 border border-green-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <span className="text-2xl font-bold text-green-600">{supportMetrics.resolvedToday}</span>
            </div>
            <p className="text-sm text-slate-600 font-medium">Resolved Today</p>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-2 shadow-sm border border-slate-200 inline-flex gap-2"
        >
          <button
            onClick={() => setActiveTab('tickets')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'tickets'
                ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Ticket className="h-4 w-4" />
            Support Tickets
          </button>
          <button
            onClick={() => setActiveTab('faqs')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'faqs'
                ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <HelpCircle className="h-4 w-4" />
            FAQs
          </button>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-4 shadow-sm border border-slate-200"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder={activeTab === 'tickets' ? 'Search tickets...' : 'Search FAQs...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            {activeTab === 'tickets' && (
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none cursor-pointer min-w-[180px]"
                >
                  <option value="all">All Status</option>
                  {ticketStatuses.map(status => (
                    <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </motion.div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === 'tickets' ? (
            <motion.div
              key="tickets"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filteredTickets.map((ticket, index) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl border-2 border-slate-200 hover:border-emerald-400 hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="p-5 border-b border-slate-200 bg-gradient-to-br from-emerald-50 to-green-50">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-800 mb-1">{ticket.title}</h3>
                        <p className="text-sm text-slate-600 line-clamp-2">{ticket.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold border ml-2 flex-shrink-0 ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">User:</span>
                      <span className="font-medium text-slate-800 truncate ml-2">{ticket.user}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Category:</span>
                      <span className="font-medium text-slate-800">{ticket.category}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Response Time:</span>
                      <span className="font-medium text-slate-800">{ticket.responseTime}</span>
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex gap-2">
                      <button
                        onClick={() => openTicketModal('view', ticket)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-sm font-medium"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </button>
                      <button
                        onClick={() => openTicketModal('edit', ticket)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg transition-colors text-sm font-medium"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTicket(ticket.id)}
                        className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="faqs"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl border-2 border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    className="w-full p-5 flex items-center justify-between hover:bg-emerald-50/30 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1 text-left">
                      <HelpCircle className="h-6 w-6 text-emerald-600 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-800 mb-1">{faq.question}</h3>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {faq.views} views
                          </span>
                          <span className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            {faq.helpful} helpful
                          </span>
                          <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-600">{faq.category}</span>
                        </div>
                      </div>
                    </div>
                    {expandedFaq === faq.id ? (
                      <ChevronUp className="h-5 w-5 text-slate-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0" />
                    )}
                  </button>

                  <AnimatePresence>
                    {expandedFaq === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-slate-200"
                      >
                        <div className="p-5 bg-slate-50">
                          <p className="text-slate-700 mb-4">{faq.answer}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500">Last updated: {faq.lastUpdated}</span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => openFaqModal('edit', faq)}
                                className="flex items-center gap-1 px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg transition-colors text-xs font-medium"
                              >
                                <Edit className="h-3 w-3" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteFaq(faq.id)}
                                className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800">
                  {modalMode === 'create' && (activeTab === 'tickets' ? 'Create New Ticket' : 'Create New FAQ')}
                  {modalMode === 'edit' && (activeTab === 'tickets' ? 'Edit Ticket' : 'Edit FAQ')}
                  {modalMode === 'view' && 'Ticket Details'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-slate-500" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {activeTab === 'tickets' ? (
                  <>
                    {modalMode !== 'view' ? (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Title *</label>
                          <input
                            type="text"
                            value={ticketForm.title}
                            onChange={(e) => setTicketForm({ ...ticketForm, title: e.target.value })}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="Brief description of the issue"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Description *</label>
                          <textarea
                            value={ticketForm.description}
                            onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                            rows={4}
                            placeholder="Detailed description of the issue"
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                            <select
                              value={ticketForm.category}
                              onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                              {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Priority</label>
                            <select
                              value={ticketForm.priority}
                              onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}
                              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                              {priorities.map(priority => (
                                <option key={priority} value={priority}>{priority.charAt(0).toUpperCase() + priority.slice(1)}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                            <select
                              value={ticketForm.status}
                              onChange={(e) => setTicketForm({ ...ticketForm, status: e.target.value })}
                              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                              {ticketStatuses.map(status => (
                                <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                          <button
                            onClick={handleSaveTicket}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg hover:from-emerald-700 hover:to-green-700 transition-all shadow-md hover:shadow-lg font-medium"
                          >
                            <Save className="h-5 w-5" />
                            {modalMode === 'create' ? 'Create Ticket' : 'Save Changes'}
                          </button>
                          <button
                            onClick={() => setShowModal(false)}
                            className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-slate-600">Ticket view details...</p>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {modalMode !== 'view' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Question *</label>
                          <input
                            type="text"
                            value={faqForm.question}
                            onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="Enter the question"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Answer *</label>
                          <textarea
                            value={faqForm.answer}
                            onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                            rows={6}
                            placeholder="Enter the answer"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                          <select
                            value={faqForm.category}
                            onChange={(e) => setFaqForm({ ...faqForm, category: e.target.value })}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          >
                            {categories.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>

                        <div className="flex gap-3 pt-4">
                          <button
                            onClick={handleSaveFaq}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg hover:from-emerald-700 hover:to-green-700 transition-all shadow-md hover:shadow-lg font-medium"
                          >
                            <Save className="h-5 w-5" />
                            {modalMode === 'create' ? 'Create FAQ' : 'Save Changes'}
                          </button>
                          <button
                            onClick={() => setShowModal(false)}
                            className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SupportCenter;

