import React, { useState } from 'react';
import { UserRound, Mail, Phone, MapPin, Bell, ImagePlus, Shield, Clock, BarChart3, TrendingUp, Award, FileText, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import AvatarPickerDialog from '@/components/profile/AvatarPickerDialog';

const Profile = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [avatarPickerOpen, setAvatarPickerOpen] = useState(false);
  const [avatarUpdated, setAvatarUpdated] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Learning enthusiast and software developer',
    title: 'Software Developer',
    avatar: '/lovable-uploads/dc27ec74-b2e9-4467-8adc-6a66a52eb520.png',
    timezone: 'Asia/Kolkata',
  });

  const timezones = [
    { value: 'Asia/Kolkata', label: 'India Standard Time (IST) - UTC+05:30' },
    { value: 'America/New_York', label: 'Eastern Time (ET) - UTC-05:00' },
    { value: 'America/Chicago', label: 'Central Time (CT) - UTC-06:00' },
    { value: 'America/Denver', label: 'Mountain Time (MT) - UTC-07:00' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT) - UTC-08:00' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT) - UTC+00:00' },
    { value: 'Europe/Paris', label: 'Central European Time (CET) - UTC+01:00' },
    { value: 'Europe/Moscow', label: 'Moscow Time (MSK) - UTC+03:00' },
    { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST) - UTC+09:00' },
    { value: 'Asia/Shanghai', label: 'China Standard Time (CST) - UTC+08:00' },
    { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET) - UTC+10:00' },
    { value: 'Pacific/Auckland', label: 'New Zealand Time (NZST) - UTC+12:00' },
  ];

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    courseUpdates: true,
    newLessons: true,
    learningReminders: false,
    marketingCommunications: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTimezoneChange = (value) => {
    setFormData(prev => ({
      ...prev,
      timezone: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully."
    });
    setIsEditing(false);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "New password and confirm password do not match.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Password updated",
      description: "Your password has been updated successfully."
    });
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleNotificationSettingChange = (key, checked) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: checked
    }));
    
    toast({
      title: `${checked ? 'Enabled' : 'Disabled'} ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`,
      duration: 2000,
    });
  };

  const handleAvatarSave = (avatarSource) => {
    setFormData(prev => ({
      ...prev,
      avatar: avatarSource
    }));
    
    localStorage.setItem('userAvatar', avatarSource);
    localStorage.setItem('userAvatarTimestamp', Date.now().toString());
    
    setAvatarUpdated(true);
    setTimeout(() => setAvatarUpdated(false), 3000);
    
    window.dispatchEvent(new CustomEvent('avatarUpdated', { 
      detail: { 
        avatar: avatarSource, 
        timestamp: Date.now(),
        source: 'profile-update'
      } 
    }));

    window.dispatchEvent(new StorageEvent('storage', {
      key: 'userAvatar',
      newValue: avatarSource,
      oldValue: formData.avatar
    }));

    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('forceAvatarRefresh', { 
        detail: { avatar: avatarSource } 
      }));
    }, 100);

    toast({
      title: "Profile picture updated everywhere!",
      description: "Your new profile picture is now visible across the entire application.",
      duration: 4000,
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-8">
        <div className="relative group">
          <Avatar 
            className={`h-16 w-16 sm:h-20 sm:w-20 cursor-pointer group-hover:opacity-90 transition-all duration-200 border-2 ${avatarUpdated ? 'border-blue-500 shadow-lg' : 'border-gray-200'}`}
            onClick={() => setAvatarPickerOpen(true)}
          >
            {formData.avatar ? (
              <AvatarImage src={formData.avatar} alt={formData.name} className="object-cover" />
            ) : (
              <AvatarFallback className="text-lg bg-blue-100 text-blue-700">
                {formData.name.split(' ').map(name => name[0]).join('')}
              </AvatarFallback>
            )}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <ImagePlus className="h-6 w-6 text-white" />
            </div>
          </Avatar>
          {avatarUpdated && (
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-blue-600 font-medium whitespace-nowrap bg-blue-50 px-2 py-1 rounded-md shadow-sm">
              Profile picture updated everywhere!
            </div>
          )}
        </div>
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 mb-2">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Profile Settings</h1>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              Instructor
            </span>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">Manage your account settings and preferences</p>
        </div>
      </div>

      <AvatarPickerDialog 
        isOpen={avatarPickerOpen} 
        onClose={() => setAvatarPickerOpen(false)}
        onSave={handleAvatarSave}
        currentAvatar={formData.avatar}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="border-b border-gray-200 overflow-x-auto">
          <TabsList className="w-full sm:w-auto flex justify-start pl-0 h-12 bg-transparent min-w-max">
            <TabsTrigger 
              value="personal" 
              className="flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none data-[state=active]:text-blue-600 transition-all px-3 sm:px-4"
            >
              <UserRound className="h-4 w-4" />
              <span>Personal</span>
            </TabsTrigger>
            <TabsTrigger 
              value="notifications" 
              className="flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none data-[state=active]:text-blue-600 transition-all px-3 sm:px-4"
            >
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none data-[state=active]:text-blue-600 transition-all px-3 sm:px-4"
            >
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger 
              value="reports" 
              className="flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none data-[state=active]:text-blue-600 transition-all px-3 sm:px-4"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Reports & Insights</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="personal" className="space-y-6">
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">Personal Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2 lg:col-span-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2 lg:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    disabled={!isEditing}
                    rows={4}
                  />
                </div>
                <div className="space-y-2 lg:col-span-2">
                  <Label htmlFor="timezone" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Time Zone
                  </Label>
                  <Select 
                    value={formData.timezone} 
                    onValueChange={handleTimezoneChange}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your timezone" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      {timezones.map((timezone) => (
                        <SelectItem key={timezone.value} value={timezone.value}>
                          {timezone.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-2">
                {isEditing ? (
                  <>
                    <Button type="button" variant="outline" onClick={() => setIsEditing(false)} className="w-full sm:w-auto">
                      Cancel
                    </Button>
                    <Button type="submit" className="w-full sm:w-auto">Save Changes</Button>
                  </>
                ) : (
                  <Button type="button" onClick={() => setIsEditing(true)} className="w-full sm:w-auto">
                    Edit Profile
                  </Button>
                )}
              </div>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">Notification Settings</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-3 text-gray-700">Email Notifications</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Receive email notifications about your course progress</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.emailNotifications} 
                      onCheckedChange={(checked) => handleNotificationSettingChange('emailNotifications', checked)} 
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3 text-gray-700">Push Notifications</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Receive push notifications on your device</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.pushNotifications} 
                      onCheckedChange={(checked) => handleNotificationSettingChange('pushNotifications', checked)} 
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3 text-gray-700">Course Updates</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Get notified when courses are updated</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.courseUpdates} 
                      onCheckedChange={(checked) => handleNotificationSettingChange('courseUpdates', checked)} 
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3 text-gray-700">New Lessons</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Get notified when new lessons are available</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.newLessons} 
                      onCheckedChange={(checked) => handleNotificationSettingChange('newLessons', checked)} 
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3 text-gray-700">Learning Reminders</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Receive reminders to continue your learning</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.learningReminders} 
                      onCheckedChange={(checked) => handleNotificationSettingChange('learningReminders', checked)} 
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3 text-gray-700">Marketing Communications</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Receive updates about new courses and features</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.marketingCommunications} 
                      onCheckedChange={(checked) => handleNotificationSettingChange('marketingCommunications', checked)} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">Security Settings</h2>
            <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                />
              </div>
              <Button type="submit" className="w-full">
                Update Password
              </Button>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          {/* Performance Overview */}
          <Card className="p-4 sm:p-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-blue-900">87%</h3>
                  <p className="text-sm text-blue-700">Overall Score</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <BarChart3 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-green-900">12</h3>
                  <p className="text-sm text-green-700">Assessments Completed</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-purple-900">24h</h3>
                  <p className="text-sm text-purple-700">Learning Time</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assessment Reports */}
          <Card className="p-4 sm:p-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Assessment Reports
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {/* Quiz Reports */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">Digital Communication Quiz</h4>
                      <p className="text-sm text-gray-600">Completed on Dec 15, 2024</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">Passed</Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Score</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    <div className="text-xs text-gray-600">
                      <strong>Insights:</strong> Strong understanding of digital channels, areas for improvement in analytics interpretation
                    </div>
                  </div>
                </div>

                {/* Scenario Reports */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">Crisis Communication Scenario</h4>
                      <p className="text-sm text-gray-600">Completed on Dec 14, 2024</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">Passed</Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Score</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                    <div className="text-xs text-gray-600">
                      <strong>Insights:</strong> Excellent crisis response skills, demonstrated strong stakeholder communication
                    </div>
                  </div>
                </div>

                {/* Sandbox Exercise Reports */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">Drag & Drop Strategy Builder</h4>
                      <p className="text-sm text-gray-600">Completed on Dec 13, 2024</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-100 text-blue-800">Completed</Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Completion</span>
                      <span className="font-medium">100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                    <div className="text-xs text-gray-600">
                      <strong>Insights:</strong> Strong strategic thinking, effective channel selection, timeline optimization needs improvement
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Learning Insights */}
          <Card className="p-4 sm:p-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Learning Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Strengths</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Crisis communication management</li>
                    <li>• Stakeholder engagement strategies</li>
                    <li>• Digital channel selection</li>
                    <li>• Message hierarchy development</li>
                  </ul>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Areas for Improvement</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Analytics interpretation</li>
                    <li>• Timeline optimization</li>
                    <li>• Cross-cultural communication</li>
                    <li>• Performance measurement</li>
                  </ul>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Recommendations</h4>
                <p className="text-sm text-blue-800">
                  Focus on completing the Analytics & Insights module to strengthen your data interpretation skills. 
                  Consider practicing timeline optimization exercises to improve strategic planning capabilities.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;