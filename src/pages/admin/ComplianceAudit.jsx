import React, { useState } from 'react';
import { 
  Shield, 
  FileText, 
  Lock, 
  Eye, 
  CheckCircle2, 
  AlertTriangle,
  Search,
  Filter,
  Calendar,
  User,
  Activity,
  Download,
  RefreshCw,
  Database,
  Key,
  FileCheck,
  XCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

const ComplianceAudit = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState('7days');

  const [auditLogs] = useState([
    {
      id: 1,
      timestamp: '2024-03-10 14:23:45',
      user: 'Sarah Johnson',
      action: 'User Created',
      resource: 'User: john.doe@company.com',
      ipAddress: '192.168.1.100',
      status: 'success',
      details: 'New user account created with Learner role'
    },
    {
      id: 2,
      timestamp: '2024-03-10 13:15:22',
      user: 'Michael Chen',
      action: 'Course Modified',
      resource: 'Course: Digital Literacy',
      ipAddress: '192.168.1.101',
      status: 'success',
      details: 'Course content updated, 3 modules modified'
    },
    {
      id: 3,
      timestamp: '2024-03-10 12:45:10',
      user: 'Admin System',
      action: 'Data Export',
      resource: 'Learner Analytics Report',
      ipAddress: '192.168.1.1',
      status: 'success',
      details: 'CSV export of learner progress data'
    },
    {
      id: 4,
      timestamp: '2024-03-10 11:30:00',
      user: 'Emma Williams',
      action: 'Login Failed',
      resource: 'Authentication System',
      ipAddress: '192.168.1.150',
      status: 'failed',
      details: 'Invalid credentials - 3rd attempt'
    },
    {
      id: 5,
      timestamp: '2024-03-10 10:15:33',
      user: 'Sarah Johnson',
      action: 'Permission Changed',
      resource: 'User: michael.chen@company.com',
      ipAddress: '192.168.1.100',
      status: 'warning',
      details: 'Role changed from Learner to Trainer'
    }
  ]);

  const complianceStatus = {
    gdpr: {
      status: 'compliant',
      lastReview: '2024-03-01',
      nextReview: '2024-06-01',
      score: 98
    },
    iso27001: {
      status: 'compliant',
      lastReview: '2024-02-15',
      nextReview: '2024-05-15',
      score: 95
    },
    dataRetention: {
      status: 'compliant',
      lastReview: '2024-03-05',
      nextReview: '2024-06-05',
      score: 100
    },
    accessControl: {
      status: 'review',
      lastReview: '2024-03-08',
      nextReview: '2024-03-22',
      score: 88
    }
  };

  const securityMetrics = {
    totalLogins: 1247,
    failedAttempts: 15,
    dataExports: 42,
    permissionChanges: 8,
    suspiciousActivity: 2
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.resource.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = filterAction === 'all' || log.action.toLowerCase().includes(filterAction.toLowerCase());
    const matchesStatus = filterStatus === 'all' || log.status === filterStatus;
    return matchesSearch && matchesAction && matchesStatus;
  });

  const getStatusColor = (status) => {
    const colors = {
      success: 'bg-green-100 text-green-700 border-green-300',
      failed: 'bg-red-100 text-red-700 border-red-300',
      warning: 'bg-amber-100 text-amber-700 border-amber-300'
    };
    return colors[status] || colors.success;
  };

  const getComplianceColor = (status) => {
    const colors = {
      compliant: 'text-green-600',
      review: 'text-amber-600',
      'non-compliant': 'text-red-600'
    };
    return colors[status] || colors.compliant;
  };

  const exportAuditLog = () => {
    const csvData = [
      ['Timestamp', 'User', 'Action', 'Resource', 'IP Address', 'Status', 'Details'],
      ...filteredLogs.map(log => [
        log.timestamp,
        log.user,
        log.action,
        log.resource,
        log.ipAddress,
        log.status,
        log.details
      ])
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `audit-log-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
    toast.success('Audit log exported successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50/20 to-blue-50/10 p-6">
      <div className="max-w-[1800px] mx-auto space-y-6">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-800">{t('admin.compliance.title') || 'Compliance & Security Audit'}</h1>
            </div>
            <p className="text-sm text-slate-500">{t('admin.compliance.subtitle') || 'Monitor compliance status, audit logs, and security events'}</p>
          </div>

          <button
            onClick={exportAuditLog}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-lg hover:from-slate-800 hover:to-black transition-all shadow-lg hover:shadow-xl font-medium"
          >
            <Download className="h-5 w-5" />
            {t('admin.compliance.exportLog') || 'Export Audit Log'}
          </button>
        </motion.div>

        {/* Compliance Status Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {Object.entries(complianceStatus).map(([key, data], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="bg-white rounded-lg p-5 border-2 border-slate-200 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <FileCheck className="h-5 w-5 text-slate-600" />
                </div>
                <span className={`text-2xl font-bold ${getComplianceColor(data.status)}`}>
                  {data.score}%
                </span>
              </div>
              <h3 className="font-semibold text-slate-800 mb-1 uppercase text-sm">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <div className="text-xs text-slate-500 space-y-1">
                <p>Status: <span className={`font-semibold ${getComplianceColor(data.status)}`}>{data.status}</span></p>
                <p>Next Review: {data.nextReview}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Security Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4"
        >
          <div className="bg-white rounded-lg p-4 border border-blue-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Activity className="h-6 w-6 text-blue-500" />
              <span className="text-xl font-bold text-blue-600">{securityMetrics.totalLogins}</span>
            </div>
            <p className="text-xs text-slate-600 font-medium">Total Logins</p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-red-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <XCircle className="h-6 w-6 text-red-500" />
              <span className="text-xl font-bold text-red-600">{securityMetrics.failedAttempts}</span>
            </div>
            <p className="text-xs text-slate-600 font-medium">Failed Attempts</p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-purple-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Download className="h-6 w-6 text-purple-500" />
              <span className="text-xl font-bold text-purple-600">{securityMetrics.dataExports}</span>
            </div>
            <p className="text-xs text-slate-600 font-medium">Data Exports</p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-orange-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Key className="h-6 w-6 text-orange-500" />
              <span className="text-xl font-bold text-orange-600">{securityMetrics.permissionChanges}</span>
            </div>
            <p className="text-xs text-slate-600 font-medium">Permission Changes</p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-amber-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="h-6 w-6 text-amber-500" />
              <span className="text-xl font-bold text-amber-600">{securityMetrics.suspiciousActivity}</span>
            </div>
            <p className="text-xs text-slate-600 font-medium">Suspicious Activity</p>
          </div>
        </motion.div>

        {/* Filters */}
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
                placeholder="Search audit logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <select
                value={filterAction}
                onChange={(e) => setFilterAction(e.target.value)}
                className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent appearance-none cursor-pointer min-w-[180px]"
              >
                <option value="all">All Actions</option>
                <option value="login">Login/Logout</option>
                <option value="user">User Management</option>
                <option value="course">Course Changes</option>
                <option value="export">Data Exports</option>
                <option value="permission">Permissions</option>
              </select>
            </div>

            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent appearance-none cursor-pointer min-w-[150px]"
              >
                <option value="all">All Status</option>
                <option value="success">Success</option>
                <option value="failed">Failed</option>
                <option value="warning">Warning</option>
              </select>
            </div>

            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent appearance-none cursor-pointer min-w-[150px]"
              >
                <option value="today">Today</option>
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Audit Log Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Action</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Resource</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">IP Address</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLogs.map((log, index) => (
                  <motion.tr
                    key={log.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-slate-600">{log.timestamp}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-slate-400" />
                        <span className="text-sm font-medium text-slate-800">{log.user}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-slate-700">{log.action}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{log.resource}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-slate-600 font-mono">
                        <Database className="h-3 w-3 text-slate-400" />
                        {log.ipAddress}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(log.status)}`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">{log.details}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredLogs.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-lg">No audit logs found</p>
            </div>
          )}
        </motion.div>

        {/* Compliance Footer Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg p-5 border-2 border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-800">GDPR Compliance</h3>
            </div>
            <p className="text-sm text-slate-600 mb-2">
              All user data is processed in accordance with GDPR regulations. Users have full control over their personal data.
            </p>
            <div className="flex items-center gap-2 text-xs text-blue-700">
              <CheckCircle2 className="h-4 w-4" />
              <span className="font-semibold">Last audit: March 1, 2024</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-lg p-5 border-2 border-purple-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Lock className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="font-bold text-slate-800">ISO 27001 Certified</h3>
            </div>
            <p className="text-sm text-slate-600 mb-2">
              Information security management system follows ISO 27001 standards for data protection and security.
            </p>
            <div className="flex items-center gap-2 text-xs text-purple-700">
              <CheckCircle2 className="h-4 w-4" />
              <span className="font-semibold">Certification valid until: Dec 2024</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ComplianceAudit;

