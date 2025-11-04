import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Newspaper, Users, MessageSquare, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGroup } from '@/contexts/GroupContext';
import GroupNewsPage from './groups/GroupNewsPage';
import GroupMembersPage from './groups/GroupMembersPage';
import GroupChatPage from './groups/GroupChatPage';

const GroupAnnouncementsPage = () => {
  const announcements = [
    {
      id: 1,
      title: "Welcome to the Group!",
      content: "We're excited to have you as part of our community. Please review the group guidelines and introduce yourself.",
      author: "Admin",
      date: "2025-05-20",
      important: true
    },
    {
      id: 2,
      title: "Upcoming Workshop",
      content: "Join us for a skill-building workshop next week. Details will be shared soon.",
      author: "Coordinator",
      date: "2025-05-18",
      important: false
    }
  ];

  return (
    <div className="space-y-4">
      {announcements.map((announcement) => (
        <Card key={announcement.id} className={announcement.important ? 'border-orange-400 bg-orange-50' : ''}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Bell className={`h-5 w-5 ${announcement.important ? 'text-orange-600' : 'text-gray-600'}`} />
                <h3 className="font-semibold text-lg">{announcement.title}</h3>
              </div>
              {announcement.important && (
                <Badge className="bg-orange-600">Important</Badge>
              )}
            </div>
            <p className="text-gray-700 mb-3">{announcement.content}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>By {announcement.author}</span>
              <span>•</span>
              <span>{new Date(announcement.date).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const GroupDetail = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { groups } = useGroup();
  const [activeTab, setActiveTab] = useState('news');

  // Find the current group
  const currentGroup = groups.find(g => g.id === parseInt(groupId));

  useEffect(() => {
    // Determine active tab from URL
    const path = location.pathname;
    if (path.includes('/news')) setActiveTab('news');
    else if (path.includes('/members')) setActiveTab('members');
    else if (path.includes('/chat')) setActiveTab('chat');
    else if (path.includes('/announcements')) setActiveTab('announcements');
    else setActiveTab('news'); // default
  }, [location.pathname]);

  const handleTabChange = (value) => {
    setActiveTab(value);
    navigate(`/groups/view/${groupId}/${value}`, { replace: true });
  };

  const handleBackToGroups = () => {
    navigate('/groups');
  };

  if (!currentGroup) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">Group not found</h2>
          <Button onClick={handleBackToGroups} variant="outline">
            Back to Groups
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Group Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleBackToGroups}
              className="hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-800">{currentGroup.name}</h1>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Enrolled
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mt-1">{currentGroup.description}</p>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                <Users className="h-4 w-4" />
                <span>{currentGroup.members.toLocaleString()} members</span>
                <span>•</span>
                <Badge variant="outline" className="text-xs">{currentGroup.category}</Badge>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger 
                value="news" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-6 py-3"
              >
                <Newspaper className="h-4 w-4 mr-2" />
                News
              </TabsTrigger>
              <TabsTrigger 
                value="members"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-6 py-3"
              >
                <Users className="h-4 w-4 mr-2" />
                Members
              </TabsTrigger>
              <TabsTrigger 
                value="chat"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-6 py-3"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Chats
              </TabsTrigger>
              <TabsTrigger 
                value="announcements"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-6 py-3"
              >
                <Bell className="h-4 w-4 mr-2" />
                Announcements
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Tabs value={activeTab} className="w-full">
          <TabsContent value="news" className="mt-0">
            <GroupNewsPage />
          </TabsContent>
          <TabsContent value="members" className="mt-0">
            <GroupMembersPage />
          </TabsContent>
          <TabsContent value="chat" className="mt-0">
            <GroupChatPage />
          </TabsContent>
          <TabsContent value="announcements" className="mt-0">
            <GroupAnnouncementsPage />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GroupDetail;