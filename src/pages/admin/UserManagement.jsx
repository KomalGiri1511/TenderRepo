import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2,
  Shield,
  Mail,
  Phone,
  Building,
  Search,
  Filter,
  X,
  Save,
  Eye,
  UserPlus,
  UserMinus,
  UserCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  MoreVertical,
  User,
  BookOpen,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

const UserManagement = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      phone: '+1 234 567 8900',
      role: 'Admin',
      department: 'IT',
      status: 'active',
      lastLogin: '2024-03-10',
      coursesCompleted: 12,
      joinedDate: '2023-01-15',
      enrolledCourses: [
        { id: 1, name: 'Digital Literacy Fundamentals', progress: 100, status: 'completed', grade: 95 },
        { id: 2, name: 'AI & Machine Learning Basics', progress: 85, status: 'in-progress', grade: 0 },
        { id: 3, name: 'Leadership Skills', progress: 100, status: 'completed', grade: 92 }
      ],
      enrolledModules: [
        { id: 1, name: 'Introduction to Digital Tools', courseId: 1, progress: 100, status: 'completed' },
        { id: 2, name: 'AI Fundamentals', courseId: 2, progress: 90, status: 'in-progress' },
        { id: 3, name: 'Machine Learning Basics', courseId: 2, progress: 80, status: 'in-progress' }
      ],
      paymentStatus: 'paid',
      paymentAmount: '$499',
      paymentDate: '2023-01-15',
      subscriptionType: 'Annual Premium'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@company.com',
      phone: '+1 234 567 8901',
      role: 'Trainer',
      department: 'Training',
      status: 'active',
      lastLogin: '2024-03-09',
      coursesCompleted: 8,
      joinedDate: '2023-03-20',
      enrolledCourses: [
        { id: 4, name: 'Compliance Training', progress: 100, status: 'completed', grade: 88 },
        { id: 5, name: 'Advanced Teaching Methods', progress: 60, status: 'in-progress', grade: 0 }
      ],
      enrolledModules: [
        { id: 4, name: 'Workplace Compliance', courseId: 4, progress: 100, status: 'completed' },
        { id: 5, name: 'Teaching Strategies', courseId: 5, progress: 60, status: 'in-progress' }
      ],
      paymentStatus: 'paid',
      paymentAmount: '$299',
      paymentDate: '2023-03-20',
      subscriptionType: 'Monthly Pro'
    },
    {
      id: 3,
      name: 'Emma Williams',
      email: 'emma.williams@company.com',
      phone: '+1 234 567 8902',
      role: 'Learner',
      department: 'Sales',
      status: 'active',
      lastLogin: '2024-03-08',
      coursesCompleted: 15,
      joinedDate: '2023-06-10',
      enrolledCourses: [
        { id: 6, name: 'Sales Mastery', progress: 100, status: 'completed', grade: 97 },
        { id: 7, name: 'Customer Relations', progress: 100, status: 'completed', grade: 93 },
        { id: 8, name: 'Digital Marketing', progress: 45, status: 'in-progress', grade: 0 }
      ],
      enrolledModules: [
        { id: 6, name: 'Sales Fundamentals', courseId: 6, progress: 100, status: 'completed' },
        { id: 7, name: 'Marketing Analytics', courseId: 8, progress: 45, status: 'in-progress' }
      ],
      paymentStatus: 'paid',
      paymentAmount: '$199',
      paymentDate: '2023-06-10',
      subscriptionType: 'Monthly Basic'
    },
    {
      id: 4,
      name: 'John Smith',
      email: 'john.smith@company.com',
      phone: '+1 234 567 8903',
      role: 'Manager',
      department: 'Operations',
      status: 'inactive',
      lastLogin: '2024-02-20',
      coursesCompleted: 5,
      joinedDate: '2023-02-28',
      enrolledCourses: [
        { id: 9, name: 'Project Management', progress: 30, status: 'in-progress', grade: 0 }
      ],
      enrolledModules: [
        { id: 8, name: 'Project Planning', courseId: 9, progress: 30, status: 'in-progress' }
      ],
      paymentStatus: 'pending',
      paymentAmount: '$399',
      paymentDate: null,
      subscriptionType: 'Annual Pro'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedUser, setSelectedUser] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Learner',
    department: '',
    status: 'active'
  });

  const roles = ['Admin', 'Trainer', 'Manager', 'Learner'];
  const departments = ['IT', 'Training', 'Sales', 'Operations', 'HR', 'Marketing', 'Legal'];
  const statuses = ['active', 'inactive', 'suspended'];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const openModal = (mode, user = null) => {
    setModalMode(mode);
    setSelectedUser(user);
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        department: user.department,
        status: user.status
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'Learner',
        department: '',
        status: 'active'
      });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.email || !formData.role) {
      toast.error(t('admin.users.fillRequired') || 'Please fill in all required fields');
      return;
    }

    if (modalMode === 'create') {
      const newUser = {
        id: Math.max(...users.map(u => u.id)) + 1,
        ...formData,
        lastLogin: 'Never',
        coursesCompleted: 0,
        joinedDate: new Date().toISOString().split('T')[0]
      };
      setUsers([...users, newUser]);
      toast.success(t('admin.users.created') || 'User created successfully!');
    } else if (modalMode === 'edit') {
      setUsers(users.map(u => u.id === selectedUser.id ? { ...u, ...formData } : u));
      toast.success(t('admin.users.updated') || 'User updated successfully!');
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm(t('admin.users.confirmDelete') || 'Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
      toast.success(t('admin.users.deleted') || 'User deleted successfully!');
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u));
    toast.success(t('admin.users.statusUpdated') || `User status updated to ${newStatus}`);
  };

  const handleMakeInstructor = (id) => {
    const user = users.find(u => u.id === id);
    if (user && user.role !== 'Trainer') {
      if (window.confirm(t('admin.users.confirmMakeInstructor') || `Are you sure you want to promote ${user.name} to Instructor/Trainer role?`)) {
        setUsers(users.map(u => u.id === id ? { ...u, role: 'Trainer' } : u));
        toast.success(t('admin.users.promotedToInstructor') || `${user.name} has been promoted to Instructor!`);
      }
    } else {
      toast.info(t('admin.users.alreadyInstructor') || 'User is already an instructor');
    }
  };

  const getPaymentStatusColor = (status) => {
    const colors = {
      paid: 'bg-green-100 text-green-700 border-green-300',
      pending: 'bg-amber-100 text-amber-700 border-amber-300',
      failed: 'bg-red-100 text-red-700 border-red-300',
      expired: 'bg-slate-100 text-slate-700 border-slate-300'
    };
    return colors[status] || colors.pending;
  };

  const getCourseStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-100 text-green-700',
      'in-progress': 'bg-blue-100 text-blue-700',
      'not-started': 'bg-slate-100 text-slate-700'
    };
    return colors[status] || colors['not-started'];
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-700 border-green-300',
      inactive: 'bg-slate-100 text-slate-700 border-slate-300',
      suspended: 'bg-red-100 text-red-700 border-red-300'
    };
    return colors[status] || colors.active;
  };

  const getStatusIcon = (status) => {
    const icons = {
      active: CheckCircle2,
      inactive: XCircle,
      suspended: AlertTriangle
    };
    return icons[status] || CheckCircle2;
  };

  const getRoleColor = (role) => {
    const colors = {
      'Admin': 'bg-purple-100 text-purple-700 border-purple-300',
      'Trainer': 'bg-blue-100 text-blue-700 border-blue-300',
      'Manager': 'bg-orange-100 text-orange-700 border-orange-300',
      'Learner': 'bg-green-100 text-green-700 border-green-300'
    };
    return colors[role] || colors.Learner;
  };

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const adminCount = users.filter(u => u.role === 'Admin').length;
  const newUsersThisMonth = users.filter(u => {
    const joinDate = new Date(u.joinedDate);
    const now = new Date();
    return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50/20 to-blue-50/10 p-6">
      <div className="max-w-[1800px] mx-auto space-y-6">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-800">{t('admin.users.title') || 'User & Role Management'}</h1>
            </div>
            <p className="text-sm text-slate-500">{t('admin.users.subtitle') || 'Manage users, roles, and access control'}</p>
          </div>

          <button
            onClick={() => openModal('create')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl font-medium"
          >
            <Plus className="h-5 w-5" />
            {t('admin.users.addNew') || 'Add New User'}
          </button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <div className="bg-white rounded-lg p-5 border border-indigo-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-8 w-8 text-indigo-500" />
              <span className="text-2xl font-bold text-indigo-600">{totalUsers}</span>
            </div>
            <p className="text-sm text-slate-600 font-medium">{t('admin.users.totalUsers') || 'Total Users'}</p>
          </div>

          <div className="bg-white rounded-lg p-5 border border-green-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <UserCheck className="h-8 w-8 text-green-500" />
              <span className="text-2xl font-bold text-green-600">{activeUsers}</span>
            </div>
            <p className="text-sm text-slate-600 font-medium">{t('admin.users.activeUsers') || 'Active Users'}</p>
          </div>

          <div className="bg-white rounded-lg p-5 border border-purple-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Shield className="h-8 w-8 text-purple-500" />
              <span className="text-2xl font-bold text-purple-600">{adminCount}</span>
            </div>
            <p className="text-sm text-slate-600 font-medium">{t('admin.users.administrators') || 'Administrators'}</p>
          </div>

          <div className="bg-white rounded-lg p-5 border border-blue-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <UserPlus className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold text-blue-600">{newUsersThisMonth}</span>
            </div>
            <p className="text-sm text-slate-600 font-medium">{t('admin.users.newThisMonth') || 'New This Month'}</p>
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
                placeholder={t('admin.users.searchPlaceholder') || 'Search users...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none cursor-pointer min-w-[180px]"
              >
                <option value="all">{t('admin.users.allRoles') || 'All Roles'}</option>
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none cursor-pointer min-w-[150px]"
              >
                <option value="all">{t('admin.users.allStatus') || 'All Status'}</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Last Login</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user, index) => {
                  const StatusIcon = getStatusIcon(user.status);
                  return (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-800">{user.name}</p>
                            <p className="text-xs text-slate-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border ${getRoleColor(user.role)}`}>
                          <Shield className="h-3 w-3" />
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-slate-400" />
                          <span className="text-sm text-slate-600">{user.department}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(user.status)}`}>
                          <StatusIcon className="h-3 w-3" />
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-600">{user.coursesCompleted} courses</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-600">{user.lastLogin}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openModal('view', user)}
                            className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-colors"
                            title="View"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => openModal('edit', user)}
                            className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <div className="relative group">
                            <button className="p-2 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                              {user.role !== 'Trainer' && (
                                <>
                                  <button
                                    onClick={() => handleMakeInstructor(user.id)}
                                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-emerald-50 transition-colors text-left text-sm"
                                  >
                                    <UserPlus className="h-4 w-4 text-emerald-600" />
                                    <span className="text-slate-700">Make Instructor</span>
                                  </button>
                                  <div className="border-t border-slate-100" />
                                </>
                              )}
                              <button
                                onClick={() => handleStatusChange(user.id, 'active')}
                                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-green-50 transition-colors text-left text-sm"
                              >
                                <UserCheck className="h-4 w-4 text-green-600" />
                                <span className="text-slate-700">Activate</span>
                              </button>
                              <button
                                onClick={() => handleStatusChange(user.id, 'inactive')}
                                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-slate-50 transition-colors text-left text-sm"
                              >
                                <UserMinus className="h-4 w-4 text-slate-600" />
                                <span className="text-slate-700">Deactivate</span>
                              </button>
                              <button
                                onClick={() => handleStatusChange(user.id, 'suspended')}
                                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-50 transition-colors text-left text-sm border-t border-slate-100"
                              >
                                <AlertTriangle className="h-4 w-4 text-red-600" />
                                <span className="text-slate-700">Suspend</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">{t('admin.users.noUsers') || 'No users found'}</p>
          </div>
        )}
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
                  {modalMode === 'create' && (t('admin.users.createUser') || 'Add New User')}
                  {modalMode === 'edit' && (t('admin.users.editUser') || 'Edit User')}
                  {modalMode === 'view' && (t('admin.users.viewUser') || 'User Details')}
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
                        {t('admin.users.fullName') || 'Full Name'} *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter full name"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          {t('admin.users.email') || 'Email'} *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="email@company.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          {t('admin.users.phone') || 'Phone'}
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="+1 234 567 8900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          {t('admin.users.role') || 'Role'} *
                        </label>
                        <select
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          {roles.map(role => (
                            <option key={role} value={role}>{role}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          {t('admin.users.department') || 'Department'}
                        </label>
                        <select
                          value={formData.department}
                          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="">Select department</option>
                          {departments.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('admin.users.status') || 'Status'}
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        {statuses.map(status => (
                          <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={handleSave}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg font-medium"
                      >
                        <Save className="h-5 w-5" />
                        {modalMode === 'create' ? (t('admin.users.create') || 'Create') : (t('admin.users.save') || 'Save Changes')}
                      </button>
                      <button
                        onClick={() => setShowModal(false)}
                        className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all font-medium"
                      >
                        {t('admin.users.cancel') || 'Cancel'}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* View Mode - Detailed Information */}
                    <div className="space-y-6">
                      {/* User Profile Header */}
                      <div className="text-center pb-4 border-b border-slate-200">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white font-bold text-3xl mx-auto mb-3 shadow-lg">
                          {selectedUser?.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800">{selectedUser?.name}</h3>
                        <p className="text-sm text-slate-500 mt-1">{selectedUser?.email}</p>
                        <div className="flex items-center justify-center gap-2 mt-2">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getRoleColor(selectedUser?.role)}`}>
                            {selectedUser?.role}
                          </span>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(selectedUser?.status)}`}>
                            {selectedUser?.status}
                          </span>
                        </div>
                      </div>

                      {/* Basic Information */}
                      <div className="bg-slate-50 rounded-lg p-4">
                        <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Basic Information
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Department</label>
                            <p className="text-sm font-semibold text-slate-800">{selectedUser?.department}</p>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Phone</label>
                            <p className="text-sm font-semibold text-slate-800">{selectedUser?.phone}</p>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Joined Date</label>
                            <p className="text-sm font-semibold text-slate-800">{selectedUser?.joinedDate}</p>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Last Login</label>
                            <p className="text-sm font-semibold text-slate-800">{selectedUser?.lastLogin}</p>
                          </div>
                        </div>
                      </div>

                      {/* Payment Status */}
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border-2 border-green-200">
                        <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          Payment & Subscription
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">Payment Status</label>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getPaymentStatusColor(selectedUser?.paymentStatus)}`}>
                              {selectedUser?.paymentStatus}
                            </span>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">Amount</label>
                            <p className="text-lg font-bold text-green-600">{selectedUser?.paymentAmount}</p>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">Subscription Type</label>
                            <p className="text-sm font-semibold text-slate-800">{selectedUser?.subscriptionType}</p>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">Payment Date</label>
                            <p className="text-sm font-semibold text-slate-800">{selectedUser?.paymentDate || 'Pending'}</p>
                          </div>
                        </div>
                      </div>

                      {/* Enrolled Courses */}
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-blue-600" />
                          Enrolled Courses ({selectedUser?.enrolledCourses?.length || 0})
                        </h4>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {selectedUser?.enrolledCourses?.map((course, idx) => (
                            <div key={idx} className="bg-white rounded-lg p-3 border border-blue-200">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="text-sm font-semibold text-slate-800">{course.name}</h5>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getCourseStatusColor(course.status)}`}>
                                  {course.status}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-600">Progress: {course.progress}%</span>
                                {course.grade > 0 && <span className="text-blue-600 font-bold">Grade: {course.grade}%</span>}
                              </div>
                              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-2">
                                <div
                                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all"
                                  style={{ width: `${course.progress}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Enrolled Modules */}
                      <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                        <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                          <Layers className="h-4 w-4 text-purple-600" />
                          Enrolled Modules ({selectedUser?.enrolledModules?.length || 0})
                        </h4>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {selectedUser?.enrolledModules?.map((module, idx) => (
                            <div key={idx} className="bg-white rounded-lg p-3 border border-purple-200">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="text-sm font-semibold text-slate-800">{module.name}</h5>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getCourseStatusColor(module.status)}`}>
                                  {module.status}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-xs text-slate-600">
                                <span>Progress: {module.progress}%</span>
                              </div>
                              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-2">
                                <div
                                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                                  style={{ width: `${module.progress}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Statistics Summary */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-3 text-center">
                          <p className="text-xs text-blue-800 font-medium">Total Courses</p>
                          <p className="text-2xl font-bold text-blue-900">{selectedUser?.enrolledCourses?.length || 0}</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg p-3 text-center">
                          <p className="text-xs text-green-800 font-medium">Completed</p>
                          <p className="text-2xl font-bold text-green-900">{selectedUser?.coursesCompleted || 0}</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg p-3 text-center">
                          <p className="text-xs text-purple-800 font-medium">Modules</p>
                          <p className="text-2xl font-bold text-purple-900">{selectedUser?.enrolledModules?.length || 0}</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      {selectedUser?.role !== 'Trainer' && (
                        <button
                          onClick={() => {
                            handleMakeInstructor(selectedUser?.id);
                            setShowModal(false);
                          }}
                          className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg hover:from-emerald-700 hover:to-green-700 transition-all shadow-md hover:shadow-lg font-medium text-sm"
                        >
                          <UserPlus className="h-4 w-4" />
                          Make Instructor
                        </button>
                      )}
                      <button
                        onClick={() => setModalMode('edit')}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg font-medium"
                      >
                        <Edit className="h-5 w-5" />
                        {t('admin.users.editUser') || 'Edit User'}
                      </button>
                      <button
                        onClick={() => setShowModal(false)}
                        className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all font-medium"
                      >
                        {t('admin.users.close') || 'Close'}
                      </button>
                    </div>
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

export default UserManagement;

