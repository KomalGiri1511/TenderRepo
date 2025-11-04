import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  MessageSquare, 
  Search,
  TrendingUp,
  Briefcase,
  GraduationCap,
  UserCheck,
  FileText,
  Flame
} from 'lucide-react';

const GroupCard = ({ nameKey, memberCount, category, posts, announcements, media, activeDate, isActive }) => {
  const { t } = useTranslation();
  const categoryStyles = {
    'Employer': {
      border: 'border-l-purple-500',
      bg: 'bg-gradient-to-r from-purple-50 to-white',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    'Learner': {
      border: 'border-l-blue-500',
      bg: 'bg-gradient-to-r from-blue-50 to-white',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    'Trainer': {
      border: 'border-l-green-500',
      bg: 'bg-gradient-to-r from-green-50 to-white',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    'Policy': {
      border: 'border-l-orange-500',
      bg: 'bg-gradient-to-r from-orange-50 to-white',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
    },
  };

  const categoryIcons = {
    'Employer': Briefcase,
    'Learner': GraduationCap,
    'Trainer': UserCheck,
    'Policy': FileText,
  };

  const CategoryIcon = categoryIcons[category] || Users;
  const style = categoryStyles[category] || {
    border: 'border-l-gray-500',
    bg: 'bg-gradient-to-r from-gray-50 to-white',
    iconBg: 'bg-gray-100',
    iconColor: 'text-gray-600'
  };

  return (
    <Card className={`group border-l-4 ${style.border} ${style.bg} hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}>
      <CardContent className="p-7">
        {/* Header: Icon, Title & Member Count */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-4 flex-1">
            <div className={`p-3 ${style.iconBg} rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300`}>
              <CategoryIcon className={`w-6 h-6 ${style.iconColor}`} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-xl leading-tight group-hover:text-[#004E9A] transition-colors mb-1" style={{ fontFamily: "'Inter', 'Nunito', sans-serif" }}>
                {t(`community.groups.${nameKey}.name`)}
              </h3>
              <Badge variant="outline" className="text-xs font-medium text-gray-600 border-gray-300">
                {t(`community.filters.${category.toLowerCase()}`)}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-4 py-2 bg-[#004E9A]/10 rounded-full border border-[#004E9A]/20">
            <Users className="w-4 h-4 text-[#004E9A]" />
            <span className="font-bold text-[#004E9A] text-sm">{memberCount}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 mb-6 leading-relaxed min-h-[40px]">
          {t(`community.groups.${nameKey}.description`)}
        </p>

        {/* Stats: Posts, Announcements, Media */}
        <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <MessageSquare className="w-4 h-4 text-[#004E9A]" />
            </div>
            <div className="font-bold text-gray-900 text-lg">{posts}</div>
            <div className="text-xs text-gray-500">{t('community.posts')}</div>
          </div>
          <div className="text-center border-x border-gray-200">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="w-4 h-4 text-[#004E9A]" />
            </div>
            <div className="font-bold text-gray-900 text-lg">{announcements}</div>
            <div className="text-xs text-gray-500">{t('community.announcements')}</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <FileText className="w-4 h-4 text-[#004E9A]" />
            </div>
            <div className="font-bold text-gray-900 text-lg">{media}</div>
            <div className="text-xs text-gray-500">{t('community.media')}</div>
          </div>
        </div>

        {/* Footer: Active Status & Button */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-sm text-gray-600 font-medium">
              {t('community.active')} • {activeDate}
            </span>
          </div>
          <Button 
            className="bg-[#004E9A] hover:bg-[#003d7a] text-white font-semibold transition-all duration-300 hover:shadow-lg px-6 py-2.5 rounded-lg group-hover:scale-105"
          >
            {t('community.viewGroup')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export function GroupsCommunitySection() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock groups data - replace with actual API data
  const allGroups = [
    {
      id: 1,
      nameKey: "employerHub",
      memberCount: 245,
      category: "Employer",
      posts: 124,
      announcements: 18,
      media: 45,
      activeDate: "17/09/2025",
      isActive: true,
      isJoined: true
    },
    {
      id: 2,
      nameKey: "trainerCircle",
      memberCount: 187,
      category: "Trainer",
      posts: 98,
      announcements: 12,
      media: 34,
      activeDate: "16/09/2025",
      isActive: true,
      isJoined: true
    },
    {
      id: 3,
      nameKey: "workerForum",
      memberCount: 892,
      category: "Learner",
      posts: 456,
      announcements: 32,
      media: 128,
      activeDate: "15/09/2025",
      isActive: true,
      isJoined: false
    },
    {
      id: 4,
      nameKey: "policyCompliance",
      memberCount: 156,
      category: "Policy",
      posts: 67,
      announcements: 24,
      media: 19,
      activeDate: "14/09/2025",
      isActive: true,
      isJoined: false
    },
  ];

  const filters = ['All', 'My Groups', 'Employer', 'Trainer', 'Learner', 'Policy'];

  // Filter logic
  const filteredGroups = allGroups.filter(group => {
    const matchesFilter = activeFilter === 'All' 
      || (activeFilter === 'My Groups' && group.isJoined)
      || group.category === activeFilter;
    
    const groupName = t(`community.groups.${group.nameKey}.name`);
    const groupDescription = t(`community.groups.${group.nameKey}.description`);
    
    const matchesSearch = groupName.toLowerCase().includes(searchQuery.toLowerCase()) 
      || groupDescription.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const myGroupsCount = allGroups.filter(g => g.isJoined).length;

  return (
    <section className="w-full bg-gradient-to-br from-gray-50 to-blue-50/50 py-8 px-6 rounded-2xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2" style={{ fontFamily: "'Inter', 'Nunito', sans-serif" }}>
              <span className="text-2xl">👥</span>
              {t('community.title')}
            </h2>
            <p className="text-sm text-gray-600">
              {t('community.subtitle')}
            </p>
          </div>

          {/* Summary Badge */}
          <div className="bg-white border-2 border-[#004E9A]/20 rounded-full px-4 py-2 shadow-sm">
            <span className="text-sm font-semibold text-[#004E9A]">
              {myGroupsCount} {t('community.groupsJoined')}
            </span>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2.5">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`
                    px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300
                    ${activeFilter === filter 
                      ? 'bg-[#004E9A] text-white shadow-md hover:bg-[#003d7a] scale-105' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
                    }
                    flex items-center gap-2
                  `}
                >
                  {t(`community.filters.${filter.toLowerCase().replace(' ', '')}`)}
                  {filter === 'My Groups' && myGroupsCount > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      activeFilter === filter ? 'bg-white/25 text-white' : 'bg-[#004E9A] text-white'
                    }`}>
                      {myGroupsCount}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder={t('community.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#004E9A] focus:ring-2 focus:ring-[#004E9A]/20 transition-all font-medium text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Groups Grid - 2 Column Layout */}
      <div className="max-w-7xl mx-auto">
        {filteredGroups.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredGroups.map((group) => (
              <GroupCard key={group.id} {...group} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium">{t('community.noGroupsFound')}</p>
            <p className="text-gray-400 text-sm mt-2">{t('community.tryAdjustingFilters')}</p>
          </div>
        )}
      </div>

      {/* Footer - Supported by ICEX */}
      <div className="max-w-7xl mx-auto mt-8 flex justify-end">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>{t('community.supportedBy')}</span>
          <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">
            <div className="w-5 h-5 bg-[#004E9A] rounded-sm flex items-center justify-center text-white font-bold text-[8px]">
              ICEX
            </div>
            <span className="font-semibold text-[#004E9A]">Consejo de Administración de ICEX España Exportación e Inversiones, E.P.E.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GroupsCommunitySection;

