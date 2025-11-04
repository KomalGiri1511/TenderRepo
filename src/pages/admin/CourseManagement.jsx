import React, { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  Tag, 
  Users,
  Clock,
  BarChart3,
  Search,
  Filter,
  X,
  Save,
  Eye,
  Copy,
  Award,
  FileText,
  Video,
  Image as ImageIcon,
  File,
  Package,
  CheckCircle,
  AlertCircle,
  Download,
  Play,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

const CourseManagement = () => {
  const { t } = useTranslation();
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Digital Literacy Fundamentals',
      description: 'Essential digital skills for modern workplace',
      department: 'IT',
      skillLevel: 'Beginner',
      duration: '4 weeks',
      modules: 12,
      enrolled: 45,
      completed: 32,
      status: 'published',
      tags: ['Digital Skills', 'IT', 'Fundamentals'],
      createdDate: '2024-01-15',
      contentType: 'manual'
    },
    {
      id: 2,
      title: 'AI & Machine Learning Basics',
      description: 'Introduction to artificial intelligence and ML concepts',
      department: 'Data Science',
      skillLevel: 'Intermediate',
      duration: '6 weeks',
      modules: 18,
      enrolled: 28,
      completed: 15,
      status: 'published',
      tags: ['AI', 'Machine Learning', 'Technology'],
      createdDate: '2024-02-01',
      contentType: 'manual'
    },
    {
      id: 3,
      title: 'Compliance & Risk Management',
      description: 'Understanding workplace compliance and risk mitigation',
      department: 'Legal',
      skillLevel: 'Advanced',
      duration: '8 weeks',
      modules: 24,
      enrolled: 19,
      completed: 8,
      status: 'draft',
      tags: ['Compliance', 'Legal', 'Risk'],
      createdDate: '2024-02-20',
      contentType: 'manual'
    },
    {
      id: 4,
      title: 'SCORM Interactive Training Module',
      description: 'Advanced SCORM 2004 package with interactive assessments',
      department: 'HR',
      skillLevel: 'Intermediate',
      duration: '3 hours',
      modules: 5,
      enrolled: 35,
      completed: 28,
      status: 'published',
      tags: ['SCORM', 'Interactive', 'Assessment'],
      createdDate: '2024-03-01',
      contentType: 'scorm',
      uploadedContent: {
        type: 'scorm',
        fileName: 'interactive_training_scorm.zip',
        fileSize: 15728640, // 15MB
        metadata: {
          title: 'SCORM Interactive Training Module',
          description: 'Advanced SCORM 2004 package with interactive assessments',
          version: '2004',
          duration: '3 hours',
          modules: 5,
          language: 'en'
        },
        manifest: {
          identifier: 'scorm_interactive_001',
          title: 'SCORM Interactive Training Module',
          description: 'Advanced SCORM 2004 package',
          version: '2004'
        }
      }
    },
    {
      id: 5,
      title: 'xAPI Learning Experience',
      description: 'Modern xAPI package with detailed learning analytics',
      department: 'Operations',
      skillLevel: 'Advanced',
      duration: '2.5 hours',
      modules: 3,
      enrolled: 22,
      completed: 18,
      status: 'published',
      tags: ['xAPI', 'Analytics', 'Modern'],
      createdDate: '2024-03-15',
      contentType: 'xapi',
      uploadedContent: {
        type: 'xapi',
        fileName: 'xapi_learning_experience.zip',
        fileSize: 25165824, // 24MB
        metadata: {
          title: 'xAPI Learning Experience',
          description: 'Modern xAPI package with detailed learning analytics',
          version: '1.0.0',
          duration: '2.5 hours',
          modules: 3,
          language: 'en'
        },
        manifest: {
          identifier: 'xapi_learning_001',
          title: 'xAPI Learning Experience',
          description: 'Modern xAPI package',
          version: '1.0.0'
        }
      }
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterContentType, setFilterContentType] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'edit', 'view'
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    department: '',
    skillLevel: 'Beginner',
    duration: '',
    modules: 0,
    tags: [],
    status: 'draft',
    contentType: 'manual', // 'manual', 'scorm', 'xapi'
    scormFile: null,
    xapiFile: null,
    uploadedContent: null
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); // 'success', 'error', 'processing'

  const departments = ['IT', 'Data Science', 'Legal', 'HR', 'Operations', 'Sales', 'Marketing'];
  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const statuses = ['draft', 'published', 'archived'];
  const contentTypes = [
    { value: 'manual', label: 'Manual Creation', description: 'Create course content manually' },
    { value: 'scorm', label: 'SCORM Package', description: 'Upload SCORM 1.2 or 2004 package' },
    { value: 'xapi', label: 'xAPI Package', description: 'Upload xAPI (Tin Can) package' }
  ];

  // SCORM/xAPI file handling functions
  const handleFileUpload = async (file, type) => {
    if (!file) return;

    // Validate file type
    const validExtensions = {
      scorm: ['.zip', '.scorm'],
      xapi: ['.zip', '.xapi']
    };

    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    if (!validExtensions[type].includes(fileExtension)) {
      toast.error(`Invalid file type. Please upload a ${type.toUpperCase()} package (.zip)`);
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadStatus('processing');

    try {
      // Simulate file upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      // Simulate file processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Validate SCORM/xAPI package
      const validationResult = await validatePackage(file, type);
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      if (validationResult.isValid) {
        setUploadStatus('success');
        setFormData(prev => ({
          ...prev,
          [`${type}File`]: file,
          uploadedContent: {
            type,
            fileName: file.name,
            fileSize: file.size,
            metadata: validationResult.metadata,
            manifest: validationResult.manifest
          }
        }));
        toast.success(`${type.toUpperCase()} package uploaded and validated successfully!`);
      } else {
        setUploadStatus('error');
        toast.error(`Invalid ${type.toUpperCase()} package: ${validationResult.error}`);
      }
    } catch (error) {
      setUploadStatus('error');
      toast.error(`Failed to upload ${type.toUpperCase()} package: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const validatePackage = async (file, type) => {
    // Simulate package validation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation logic - in real implementation, you would:
    // 1. Extract the ZIP file
    // 2. Check for required files (imsmanifest.xml for SCORM, etc.)
    // 3. Validate the manifest structure
    // 4. Extract metadata
    
    const mockMetadata = {
      title: file.name.replace(/\.[^/.]+$/, ""),
      description: `Uploaded ${type.toUpperCase()} package`,
      version: type === 'scorm' ? '1.2' : '1.0.0',
      duration: '2 hours',
      modules: type === 'scorm' ? 5 : 3,
      language: 'en'
    };

    return {
      isValid: true,
      metadata: mockMetadata,
      manifest: {
        identifier: `package_${Date.now()}`,
        title: mockMetadata.title,
        description: mockMetadata.description,
        version: mockMetadata.version
      }
    };
  };

  const removeUploadedFile = () => {
    setFormData(prev => ({
      ...prev,
      scormFile: null,
      xapiFile: null,
      uploadedContent: null,
      contentType: 'manual'
    }));
    setUploadStatus(null);
    setUploadProgress(0);
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || course.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || course.status === filterStatus;
    const matchesContentType = filterContentType === 'all' || course.contentType === filterContentType;
    return matchesSearch && matchesDepartment && matchesStatus && matchesContentType;
  });

  const openModal = (mode, course = null) => {
    setModalMode(mode);
    setSelectedCourse(course);
    if (course) {
      setFormData({
        title: course.title,
        description: course.description,
        department: course.department,
        skillLevel: course.skillLevel,
        duration: course.duration,
        modules: course.modules,
        tags: course.tags,
        status: course.status,
        contentType: course.contentType || 'manual',
        scormFile: course.scormFile || null,
        xapiFile: course.xapiFile || null,
        uploadedContent: course.uploadedContent || null
      });
    } else {
      setFormData({
        title: '',
        description: '',
        department: '',
        skillLevel: 'Beginner',
        duration: '',
        modules: 0,
        tags: [],
        status: 'draft',
        contentType: 'manual',
        scormFile: null,
        xapiFile: null,
        uploadedContent: null
      });
    }
    setUploadStatus(null);
    setUploadProgress(0);
    setIsUploading(false);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.department) {
      toast.error(t('admin.courses.fillRequired') || 'Please fill in all required fields');
      return;
    }

    if (modalMode === 'create') {
      const newCourse = {
        id: Math.max(...courses.map(c => c.id)) + 1,
        ...formData,
        enrolled: 0,
        completed: 0,
        createdDate: new Date().toISOString().split('T')[0]
      };
      setCourses([...courses, newCourse]);
      toast.success(t('admin.courses.created') || 'Course created successfully!');
    } else if (modalMode === 'edit') {
      setCourses(courses.map(c => c.id === selectedCourse.id ? { ...c, ...formData } : c));
      toast.success(t('admin.courses.updated') || 'Course updated successfully!');
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm(t('admin.courses.confirmDelete') || 'Are you sure you want to delete this course?')) {
      setCourses(courses.filter(c => c.id !== id));
      toast.success(t('admin.courses.deleted') || 'Course deleted successfully!');
    }
  };

  const handleDuplicate = (course) => {
    const duplicatedCourse = {
      ...course,
      id: Math.max(...courses.map(c => c.id)) + 1,
      title: `${course.title} (Copy)`,
      enrolled: 0,
      completed: 0,
      status: 'draft',
      createdDate: new Date().toISOString().split('T')[0]
    };
    setCourses([...courses, duplicatedCourse]);
    toast.success(t('admin.courses.duplicated') || 'Course duplicated successfully!');
  };

  const getStatusColor = (status) => {
    const colors = {
      draft: 'bg-slate-100 text-slate-700 border-slate-300',
      published: 'bg-green-100 text-green-700 border-green-300',
      archived: 'bg-orange-100 text-orange-700 border-orange-300'
    };
    return colors[status] || colors.draft;
  };

  const getSkillLevelColor = (level) => {
    const colors = {
      'Beginner': 'bg-blue-100 text-blue-700',
      'Intermediate': 'bg-purple-100 text-purple-700',
      'Advanced': 'bg-orange-100 text-orange-700',
      'Expert': 'bg-red-100 text-red-700'
    };
    return colors[level] || colors.Beginner;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/20 to-purple-50/10 p-6">
      <div className="max-w-[1800px] mx-auto space-y-6">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-800">{t('admin.courses.title') || 'Course & Module Management'}</h1>
            </div>
            <p className="text-sm text-slate-500">{t('admin.courses.subtitle') || 'Create, edit, and manage learning modules'}</p>
          </div>

          <button
            onClick={() => openModal('create')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl font-medium"
          >
            <Plus className="h-5 w-5" />
            {t('admin.courses.createNew') || 'Create New Course'}
          </button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <div className="bg-white rounded-lg p-5 border border-blue-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold text-blue-600">{courses.length}</span>
            </div>
            <p className="text-sm text-slate-600 font-medium">{t('admin.courses.totalCourses') || 'Total Courses'}</p>
          </div>

          <div className="bg-white rounded-lg p-5 border border-green-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Award className="h-8 w-8 text-green-500" />
              <span className="text-2xl font-bold text-green-600">{courses.filter(c => c.status === 'published').length}</span>
            </div>
            <p className="text-sm text-slate-600 font-medium">{t('admin.courses.published') || 'Published'}</p>
          </div>

          <div className="bg-white rounded-lg p-5 border border-purple-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-8 w-8 text-purple-500" />
              <span className="text-2xl font-bold text-purple-600">{courses.reduce((sum, c) => sum + c.enrolled, 0)}</span>
            </div>
            <p className="text-sm text-slate-600 font-medium">{t('admin.courses.totalEnrolled') || 'Total Enrolled'}</p>
          </div>

          <div className="bg-white rounded-lg p-5 border border-orange-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold text-orange-600">
                {Math.round((courses.reduce((sum, c) => sum + c.completed, 0) / courses.reduce((sum, c) => sum + c.enrolled, 0)) * 100) || 0}%
              </span>
            </div>
            <p className="text-sm text-slate-600 font-medium">{t('admin.courses.completionRate') || 'Completion Rate'}</p>
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
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder={t('admin.courses.searchPlaceholder') || 'Search courses...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Department Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer min-w-[180px]"
              >
                <option value="all">{t('admin.courses.allDepartments') || 'All Departments'}</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer min-w-[150px]"
              >
                <option value="all">{t('admin.courses.allStatus') || 'All Status'}</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                ))}
              </select>
            </div>

            {/* Content Type Filter */}
            <div className="relative">
              <select
                value={filterContentType}
                onChange={(e) => setFilterContentType(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer min-w-[150px]"
              >
                <option value="all">All Content Types</option>
                <option value="manual">Manual Creation</option>
                <option value="scorm">SCORM Package</option>
                <option value="xapi">xAPI Package</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Courses List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-xl border-2 border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Course Header */}
              <div className="p-5 border-b border-slate-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg text-slate-800 group-hover:text-blue-600 transition-colors">{course.title}</h3>
                      {course.contentType === 'scorm' && (
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full border border-blue-200">
                          <Package className="h-3 w-3" />
                          SCORM
                        </div>
                      )}
                      {course.contentType === 'xapi' && (
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full border border-purple-200">
                          <Package className="h-3 w-3" />
                          xAPI
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 line-clamp-2">{course.description}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(course.status)}`}>
                    {course.status}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {course.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Course Info */}
              <div className="p-5 space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-600">{course.department}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-600">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-600">{course.modules} modules</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-600">{course.enrolled} enrolled</span>
                  </div>
                </div>

                <div>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getSkillLevelColor(course.skillLevel)}`}>
                    {course.skillLevel}
                  </span>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                    <span>Completion</span>
                    <span className="font-semibold">{course.enrolled > 0 ? Math.round((course.completed / course.enrolled) * 100) : 0}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                      style={{ width: `${course.enrolled > 0 ? (course.completed / course.enrolled) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-5 pt-0 flex gap-2">
                <button
                  onClick={() => openModal('view', course)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-sm font-medium"
                >
                  <Eye className="h-4 w-4" />
                  View
                </button>
                <button
                  onClick={() => openModal('edit', course)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors text-sm font-medium"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDuplicate(course)}
                  className="px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors"
                  title="Duplicate"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">{t('admin.courses.noCourses') || 'No courses found'}</p>
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
              className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800">
                  {modalMode === 'create' && (t('admin.courses.createCourse') || 'Create New Course')}
                  {modalMode === 'edit' && (t('admin.courses.editCourse') || 'Edit Course')}
                  {modalMode === 'view' && (t('admin.courses.viewCourse') || 'View Course')}
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
                        {t('admin.courses.courseTitle') || 'Course Title'} *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter course title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('admin.courses.description') || 'Description'}
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        rows={3}
                        placeholder="Enter course description"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          {t('admin.courses.department') || 'Department'} *
                        </label>
                        <select
                          value={formData.department}
                          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select department</option>
                          {departments.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          {t('admin.courses.skillLevel') || 'Skill Level'}
                        </label>
                        <select
                          value={formData.skillLevel}
                          onChange={(e) => setFormData({ ...formData, skillLevel: e.target.value })}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {skillLevels.map(level => (
                            <option key={level} value={level}>{level}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          {t('admin.courses.duration') || 'Duration'}
                        </label>
                        <input
                          type="text"
                          value={formData.duration}
                          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., 4 weeks"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          {t('admin.courses.modules') || 'Number of Modules'}
                        </label>
                        <input
                          type="number"
                          value={formData.modules}
                          onChange={(e) => setFormData({ ...formData, modules: parseInt(e.target.value) || 0 })}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('admin.courses.status') || 'Status'}
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {statuses.map(status => (
                          <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                        ))}
                      </select>
                    </div>

                    {/* Content Type Selection */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-3">
                        Content Creation Method
                      </label>
                      <div className="grid grid-cols-1 gap-3">
                        {contentTypes.map((type) => (
                          <div
                            key={type.value}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              formData.contentType === type.value
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                            onClick={() => setFormData({ ...formData, contentType: type.value })}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                formData.contentType === type.value
                                  ? 'border-blue-500 bg-blue-500'
                                  : 'border-slate-300'
                              }`}>
                                {formData.contentType === type.value && (
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  {type.value === 'manual' && <FileText className="h-5 w-5 text-slate-600" />}
                                  {type.value === 'scorm' && <Package className="h-5 w-5 text-blue-600" />}
                                  {type.value === 'xapi' && <Package className="h-5 w-5 text-purple-600" />}
                                  <span className="font-medium text-slate-800">{type.label}</span>
                                </div>
                                <p className="text-sm text-slate-500 mt-1">{type.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* SCORM/xAPI Upload Section */}
                    {(formData.contentType === 'scorm' || formData.contentType === 'xapi') && (
                      <div className="space-y-4">
                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6">
                          <div className="text-center">
                            {!formData.uploadedContent ? (
                              <div>
                                <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-slate-800 mb-2">
                                  Upload {formData.contentType.toUpperCase()} Package
                                </h3>
                                <p className="text-slate-500 mb-4">
                                  Drag and drop your {formData.contentType.toUpperCase()} package here, or click to browse
                                </p>
                                <input
                                  type="file"
                                  accept=".zip,.scorm,.xapi"
                                  onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                      handleFileUpload(file, formData.contentType);
                                    }
                                  }}
                                  className="hidden"
                                  id="scorm-upload"
                                />
                                <label
                                  htmlFor="scorm-upload"
                                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer font-medium"
                                >
                                  <Upload className="h-5 w-5" />
                                  Choose File
                                </label>
                                <p className="text-xs text-slate-400 mt-2">
                                  Supported formats: .zip (max 100MB)
                                </p>
                              </div>
                            ) : (
                              <div>
                                <div className="flex items-center justify-center gap-2 mb-4">
                                  <CheckCircle className="h-8 w-8 text-green-500" />
                                  <span className="text-lg font-medium text-green-700">
                                    Package Uploaded Successfully
                                  </span>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-4 mb-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-slate-800">
                                      {formData.uploadedContent.fileName}
                                    </span>
                                    <span className="text-sm text-slate-500">
                                      {(formData.uploadedContent.fileSize / 1024 / 1024).toFixed(2)} MB
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <span className="text-slate-500">Type:</span>
                                      <span className="ml-2 font-medium">
                                        {formData.uploadedContent.type.toUpperCase()}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="text-slate-500">Version:</span>
                                      <span className="ml-2 font-medium">
                                        {formData.uploadedContent.metadata.version}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="text-slate-500">Duration:</span>
                                      <span className="ml-2 font-medium">
                                        {formData.uploadedContent.metadata.duration}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="text-slate-500">Modules:</span>
                                      <span className="ml-2 font-medium">
                                        {formData.uploadedContent.metadata.modules}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-2 justify-center">
                                  <button
                                    onClick={() => {
                                      // In real implementation, this would launch the SCORM/xAPI content
                                      toast.info('Launching SCORM/xAPI content...');
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                  >
                                    <Play className="h-4 w-4" />
                                    Preview Content
                                  </button>
                                  <button
                                    onClick={removeUploadedFile}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                  >
                                    <X className="h-4 w-4" />
                                    Remove
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Upload Progress */}
                          {isUploading && (
                            <div className="mt-4">
                              <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                                <span>Uploading and validating package...</span>
                                <span>{uploadProgress}%</span>
                              </div>
                              <div className="w-full bg-slate-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${uploadProgress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}

                          {/* Upload Status */}
                          {uploadStatus === 'error' && (
                            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                              <div className="flex items-center gap-2 text-red-700">
                                <AlertCircle className="h-5 w-5" />
                                <span className="font-medium">Upload Failed</span>
                              </div>
                              <p className="text-red-600 text-sm mt-1">
                                Please check your package format and try again.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={handleSave}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg font-medium"
                      >
                        <Save className="h-5 w-5" />
                        {modalMode === 'create' ? (t('admin.courses.create') || 'Create') : (t('admin.courses.save') || 'Save Changes')}
                      </button>
                      <button
                        onClick={() => setShowModal(false)}
                        className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all font-medium"
                      >
                        {t('admin.courses.cancel') || 'Cancel'}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* View Mode - Read Only */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Title</label>
                        <p className="text-lg font-semibold text-slate-800">{selectedCourse?.title}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Description</label>
                        <p className="text-slate-700">{selectedCourse?.description}</p>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-500 mb-1">Department</label>
                          <p className="text-slate-700 font-medium">{selectedCourse?.department}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-500 mb-1">Skill Level</label>
                          <p className="text-slate-700 font-medium">{selectedCourse?.skillLevel}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-500 mb-1">Duration</label>
                          <p className="text-slate-700 font-medium">{selectedCourse?.duration}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-500 mb-1">Modules</label>
                          <p className="text-slate-700 font-medium">{selectedCourse?.modules}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-500 mb-1">Enrolled</label>
                          <p className="text-slate-700 font-medium">{selectedCourse?.enrolled}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-500 mb-1">Completed</label>
                          <p className="text-slate-700 font-medium">{selectedCourse?.completed}</p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Tags</label>
                        <div className="flex flex-wrap gap-2">
                          {selectedCourse?.tags.map((tag, idx) => (
                            <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full border border-blue-200 font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() => {
                          setModalMode('edit');
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg font-medium"
                      >
                        <Edit className="h-5 w-5" />
                        {t('admin.courses.editCourse') || 'Edit Course'}
                      </button>
                      <button
                        onClick={() => setShowModal(false)}
                        className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all font-medium"
                      >
                        {t('admin.courses.close') || 'Close'}
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

export default CourseManagement;

