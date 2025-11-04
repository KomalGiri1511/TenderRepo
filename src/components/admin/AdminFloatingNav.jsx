import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  BookOpen, 
  Trophy, 
  Users, 
  Calendar,
  Layers,
  Video,
  Shield,
  MessageSquare 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

export function AdminFloatingNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check if we're in admin portal
  const isAdminPortal = location.pathname.startsWith('/admin-portal');

  // Detect if modals are open
  useEffect(() => {
    const checkForModals = () => {
      // Check for modal overlays (common patterns in admin pages)
      const modalOverlay = document.querySelector('[class*="fixed"][class*="inset-0"][class*="backdrop-blur"]');
      const hasModal = modalOverlay !== null;
      setIsModalOpen(hasModal);
    };

    // Check immediately
    checkForModals();

    // Use MutationObserver to detect when modals are added/removed from DOM
    const observer = new MutationObserver(checkForModals);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class']
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isAdminPortal) {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show nav when scrolling down past 100px
      // Hide when at top (less than 50px)
      if (currentScrollY < 50) {
        setIsVisible(false);
      } else if (currentScrollY > 100) {
        // Show when scrolling down or when past threshold
        if (currentScrollY > lastScrollY || currentScrollY > 100) {
          setIsVisible(true);
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial check
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, isAdminPortal]);

  // Don't render if not in admin portal
  if (!isAdminPortal) {
    return null;
  }

  const navItems = [
    {
      id: 'overview',
      icon: BarChart3,
      label: t('admin.nav.overview') || 'Overview',
      path: '/admin-portal/overview',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'analytics',
      icon: BookOpen,
      label: t('admin.nav.analytics') || 'Analytics',
      path: '/admin-portal/analytics',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'courses',
      icon: Layers,
      label: t('admin.nav.courses') || 'Courses',
      path: '/admin-portal/courses',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 'workshops',
      icon: Video,
      label: t('admin.nav.workshops') || 'Workshops',
      path: '/admin-portal/workshops',
      color: 'from-violet-500 to-violet-600'
    },
    {
      id: 'users',
      icon: Users,
      label: t('admin.nav.users') || 'Users',
      path: '/admin-portal/users',
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      id: 'compliance',
      icon: Shield,
      label: t('admin.nav.compliance') || 'Compliance',
      path: '/admin-portal/compliance',
      color: 'from-slate-600 to-slate-700'
    },
    {
      id: 'support',
      icon: MessageSquare,
      label: t('admin.nav.support') || 'Support',
      path: '/admin-portal/support',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      id: 'reporting',
      icon: Calendar,
      label: t('admin.nav.reporting') || 'Reporting',
      path: '/admin-portal/reporting',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <AnimatePresence>
      {isVisible && !isModalOpen && (
        <motion.div 
          className="fixed bottom-6 left-0 right-0 z-40 flex justify-center px-4"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ 
            duration: 0.3, 
            ease: "easeInOut",
            opacity: { duration: 0.2 }
          }}
        >
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 p-2.5 ring-1 ring-gray-900/5">
            <div className="flex items-center justify-center gap-1.5">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                  }}
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "group relative flex flex-col items-center gap-1 p-2.5 rounded-xl transition-all duration-300",
                    isActive(item.path)
                      ? "bg-gradient-to-br " + item.color + " shadow-lg scale-105"
                      : "hover:bg-gray-100 hover:scale-105"
                  )}
                  title={item.label}
                >
                  <div className={cn(
                    "relative transition-transform group-hover:scale-110",
                    isActive(item.path) ? "text-white" : "text-gray-600 group-hover:text-gray-900"
                  )}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className={cn(
                    "text-[10px] font-semibold whitespace-nowrap transition-all",
                    isActive(item.path) ? "text-white" : "text-gray-600 group-hover:text-gray-900"
                  )}>
                    {item.label}
                  </span>

                  {/* Active indicator */}
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-br rounded-xl -z-10"
                      style={{ background: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  {/* Hover glow effect */}
                  {!isActive(item.path) && (
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-gray-50 to-gray-100 -z-10" />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AdminFloatingNav;

