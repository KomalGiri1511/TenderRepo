import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Bell, Search, User, Recycle, ExternalLink, Menu } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "../theme/ThemeToggle";
import { LanguageSelector } from "../ui/LanguageSelector";
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import NotificationModal from "../notifications/NotificationModal";
import { Badge } from "@/components/ui/badge";

export const Header = ({ onMenuClick }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userAvatar, setUserAvatar] = useState('/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png');
  const [avatarKey, setAvatarKey] = useState(Date.now());
  
  const [recycleBinDialogOpen, setRecycleBinDialogOpen] = useState(false);
  const [notificationDialogOpen, setNotificationDialogOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3); // Track unread notifications

  useEffect(() => {
    const handleAvatarUpdate = (event) => {
      console.log('Avatar update received in header:', event.detail);
      setUserAvatar(event.detail.avatar);
      setAvatarKey(Date.now());
    };

    const handleForceRefresh = (event) => {
      console.log('Force avatar refresh in header:', event.detail);
      setUserAvatar(event.detail.avatar);
      setAvatarKey(Date.now());
    };

    const handleStorageChange = (event) => {
      if (event.key === 'userAvatar' && event.newValue) {
        console.log('Storage change detected for avatar:', event.newValue);
        setUserAvatar(event.newValue);
        setAvatarKey(Date.now());
      }
    };

    const savedAvatar = localStorage.getItem('userAvatar');
    const savedTimestamp = localStorage.getItem('userAvatarTimestamp');
    
    if (savedAvatar) {
      console.log('Loading saved avatar:', savedAvatar);
      setUserAvatar(savedAvatar);
      setAvatarKey(Date.now());
    }

    window.addEventListener('avatarUpdated', handleAvatarUpdate);
    window.addEventListener('forceAvatarRefresh', handleForceRefresh);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('avatarUpdated', handleAvatarUpdate);
      window.removeEventListener('forceAvatarRefresh', handleForceRefresh);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleAthenaLMSClick = () => {
    navigate('/');
    toast({
      title: "Welcome to Athena LMS",
      description: "You're now on the homepage",
      duration: 2000,
    });
  };


  const handleRecycleBinClick = () => {
    setRecycleBinDialogOpen(true);
  };

  const handleNotificationsClick = () => {
    setNotificationDialogOpen(true);
  };

  const handleNotificationAction = (notification) => {
    // Navigate to the notification link
    if (notification.link) {
      navigate(notification.link);
    }
    // Optionally show a toast
    toast({
      title: "Opening Content",
      description: "Navigating to content...",
      duration: 2000,
    });
  };

  const handleJoinMeeting = (eventTitle) => {
    toast({
      title: "Joining Meeting",
      description: `Opening ${eventTitle}...`,
      duration: 3000,
    });
  };

  return (
    <>
      <header className="px-4 h-16 flex items-center justify-between bg-white shadow-sm z-40 border-b border-gray-100">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden mr-2"
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <h1 
            className="text-lg font-semibold cursor-pointer hover:text-slate-600 transition-colors text-slate-800"
            onClick={handleAthenaLMSClick}
          >
            {t('header.appName')}
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="hidden md:flex max-w-sm relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-500" />
            </div>
            <input
              type="search"
              className="w-full py-1.5 pl-10 pr-4 text-sm text-gray-900 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
              placeholder={t('header.search')}
            />
          </div>

          
          <ThemeToggle />
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative text-slate-600"
            onClick={handleNotificationsClick}
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-600 text-white px-1.5 py-0.5 text-xs min-w-[20px] h-5 flex items-center justify-center">
                {unreadCount}
              </Badge>
            )}
          </Button>
          
          <LanguageSelector />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar key={avatarKey} className="h-9 w-9">
                  <AvatarImage 
                    src={userAvatar} 
                    alt="User" 
                    onLoad={() => console.log('Avatar image loaded successfully')}
                    onError={() => console.log('Avatar image failed to load')}
                  />
                  <AvatarFallback>AL</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Instructor</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    instructor@athena.edu
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>{t('navigation.profile')}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {
                toast({
                  title: t('navigation.logout'),
                  description: "You have been logged out successfully",
                  duration: 2000,
                });
              }}>
                {t('navigation.logout')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>


      <Dialog open={recycleBinDialogOpen} onOpenChange={setRecycleBinDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Recycle className="h-5 w-5" />
              Recycle Bin
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="bg-gray-50 p-3 rounded border">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-sm">Draft Assignment - Financial Analysis</p>
                  <p className="text-xs text-gray-600">Deleted 3 days ago</p>
                </div>
                <Button size="sm" variant="outline" className="text-xs">Restore</Button>
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded border">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-sm">Course Notes - Module 2</p>
                  <p className="text-xs text-gray-600">Deleted 1 week ago</p>
                </div>
                <Button size="sm" variant="outline" className="text-xs">Restore</Button>
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded border">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-sm">Old Project Files</p>
                  <p className="text-xs text-gray-600">Deleted 2 weeks ago</p>
                </div>
                <Button size="sm" variant="outline" className="text-xs">Restore</Button>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t">
              <Button variant="destructive" size="sm" className="w-full">
                Empty Recycle Bin
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Multilingual Notification Modal */}
      <NotificationModal
        isOpen={notificationDialogOpen}
        onClose={() => setNotificationDialogOpen(false)}
        onNotificationAction={handleNotificationAction}
      />
    </>
  );
};