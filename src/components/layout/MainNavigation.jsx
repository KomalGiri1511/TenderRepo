import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Home, Book, Users, Folder, FileText, MessageCircle, HelpCircle, BookOpen, Volume2
} from 'lucide-react';
import { NavItem } from './NavItem';
import { useSidebar } from '@/contexts/SidebarContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export const MainNavigation = ({ pathname, onItemClick }) => {
  const { t } = useTranslation();
  const { isMainCollapsed } = useSidebar();
  const navigate = useNavigate();

  const handleCourseClick = () => {
    // Always navigate to courses page when clicked
    navigate('/courses');
    if (onItemClick) onItemClick();
  };

  const handleGroupsClick = () => {
    navigate('/groups');
    if (onItemClick) onItemClick();
  };

  const handleNavItemClick = (path) => {
    navigate(path);
    if (onItemClick) onItemClick();
  };

  const handleHelpMenuClick = (section) => {
    navigate(`/help?section=${section}`);
    if (onItemClick) onItemClick();
  };

  const handleSpeechifyDemoClick = () => {
    window.open('https://speechifyclone.netlify.app/', '_blank', 'noopener,noreferrer');
    if (onItemClick) onItemClick();
  };
  
  const staggerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="flex-1 flex flex-col">
      <motion.div 
        className="flex-1 py-4 space-y-1.5 px-2"
        initial="hidden"
        animate="show"
        variants={staggerVariants}
      >
        {/* Home */}
        <motion.div variants={itemVariants}>
          <NavItem 
            icon={Home} 
            label={t('navigation.home')} 
            to="/" 
            active={pathname === '/'} 
            onClick={() => handleNavItemClick('/')}
            collapsed={isMainCollapsed}
            className="hover-lift"
          />
        </motion.div>
        
        {/* Courses */}
        <motion.div variants={itemVariants}>
          <NavItem 
            icon={Book} 
            label={t('navigation.courses')} 
            to="/courses" 
            active={pathname.startsWith('/courses')} 
            onClick={handleCourseClick}
            collapsed={isMainCollapsed}
            className="hover-lift"
          />
        </motion.div>
        
        {/* Groups */}
        <motion.div variants={itemVariants}>
          <NavItem 
            icon={Users} 
            label={t('navigation.groups')} 
            to="/groups" 
            active={pathname.startsWith('/groups')}
            onClick={handleGroupsClick}
            collapsed={isMainCollapsed}
            className="hover-lift"
          />
        </motion.div>
        
        {/* Catalog */}
        <motion.div variants={itemVariants}>
          <NavItem 
            icon={Folder}
            label={t('navigation.catalog')}
            to="/catalog"
            active={pathname.startsWith('/catalog')}
            onClick={() => handleNavItemClick('/catalog')}
            collapsed={isMainCollapsed}
            className="hover-lift"
          />
        </motion.div>
        
        {/* Resources & Knowledge Hub */}
        <motion.div variants={itemVariants}>
          <NavItem 
            icon={BookOpen}
            label={t('navigation.resources')}
            to="/resources"
            active={pathname.startsWith('/resources')}
            onClick={() => handleNavItemClick('/resources')}
            collapsed={isMainCollapsed}
            className="hover-lift"
          />
        </motion.div>
        
        {/* Messages */}
        <motion.div variants={itemVariants}>
          <NavItem 
            icon={MessageCircle}
            label={t('navigation.messages')}
            to="/messages"
            active={pathname.startsWith('/messages')}
            onClick={() => handleNavItemClick('/messages')}
            collapsed={isMainCollapsed}
            className="hover-lift"
          />
        </motion.div>
        
        {/* Speechify Demo */}
        <motion.div variants={itemVariants}>
          <NavItem 
            icon={Volume2}
            label="Speechify Demo"
            to="#"
            active={false}
            onClick={handleSpeechifyDemoClick}
            collapsed={isMainCollapsed}
            className="hover-lift"
          />
        </motion.div>
      </motion.div>

      {/* Help & Support - Sticky at bottom */}
      <div className="border-t border-gray-100 p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "group w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg",
                "transition-all duration-200 ease-in-out",
                "hover:bg-gray-50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/20",
                "text-gray-700 hover:text-gray-900 hover:shadow-sm",
                "transform hover:-translate-y-0.5",
                isMainCollapsed && "justify-center px-2"
              )}
              title={isMainCollapsed ? "Help & Support" : undefined}
            >
              <HelpCircle className={cn(
                "flex-shrink-0 transition-all duration-200", 
                isMainCollapsed ? "h-5 w-5" : "h-5 w-5",
                "text-gray-500 group-hover:text-blue-600 group-hover:scale-110"
              )} />
              
              {!isMainCollapsed && (
                <span className="truncate font-medium group-hover:text-blue-700 transition-colors duration-200">
                  {t('navigation.help')}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            side={isMainCollapsed ? "right" : "top"} 
            align="start"
            className="w-56 bg-white shadow-lg border border-gray-200 animate-in slide-in-from-bottom-2 duration-200"
          >
            <DropdownMenuItem 
              onClick={() => handleHelpMenuClick('faqs')}
              className="hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150 cursor-pointer"
            >
              <FileText className="mr-2 h-4 w-4" />
              {t('navigation.helpMenu.faqs')}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleHelpMenuClick('contact')}
              className="hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150 cursor-pointer"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              {t('navigation.helpMenu.contactSupport')}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleHelpMenuClick('guides')}
              className="hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150 cursor-pointer"
            >
              <Book className="mr-2 h-4 w-4" />
              {t('navigation.helpMenu.userGuides')}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleHelpMenuClick('ticket')}
              className="hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150 cursor-pointer"
            >
              <FileText className="mr-2 h-4 w-4" />
              {t('navigation.helpMenu.supportTicket')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default MainNavigation;