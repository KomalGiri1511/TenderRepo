import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Users, Search, Filter, Plus, Compass, GraduationCap, BriefcaseIcon, Building2, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/shared/PageHeader';
import { AddGroupDialog } from '@/components/groups/AddGroupDialog';
import { GroupEditDialog } from '@/components/groups/GroupEditDialog';
import { GroupOptionsMenu } from '@/components/groups/GroupOptionsMenu';
import { useGroup } from '@/contexts/GroupContext';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';

/**
 * @typedef {object} Group
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {number} members
 * @property {string} category
 * @property {string} image
 */

const GroupsContent = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false);
  const [isEditGroupOpen, setIsEditGroupOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const navigate = useNavigate();
  
  const { groups, updateGroup, deleteGroup, addGroup } = useGroup();

  const filteredGroups = groups.filter(group => {
    const groupName = t(`groups.sampleGroups.${group.nameKey}.name`);
    const groupDescription = t(`groups.sampleGroups.${group.nameKey}.description`);
    
    const matchesSearch = groupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         groupDescription.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || group.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group by category
  const groupsByCategory = filteredGroups.reduce((acc, group) => {
    if (!acc[group.category]) {
      acc[group.category] = [];
    }
    acc[group.category].push(group);
    return acc;
  }, {});

  const categories = [
    { 
      key: 'learnerFocused',
      name: 'Learner-Focused', 
      icon: GraduationCap, 
      color: 'bg-blue-500'
    },
    { 
      key: 'trainerFocused',
      name: 'Trainer-Focused', 
      icon: BriefcaseIcon, 
      color: 'bg-green-500'
    },
    { 
      key: 'employerFocused',
      name: 'Employer-Focused', 
      icon: Building2, 
      color: 'bg-purple-500'
    },
    { 
      key: 'initiativeWide',
      name: 'Initiative-Wide', 
      icon: Sparkles, 
      color: 'bg-orange-500'
    },
  ];
  
  /** @param {number} id */
  const handleViewGroup = (id) => {
    navigate(`/groups/view/${id}`);
  };
  
  const handleDiscoverGroups = () => {
    navigate('/groups/catalog');
  };

  /** @param {Group} group */
  const handleEditGroup = (group) => {
    setSelectedGroup(group);
    setIsEditGroupOpen(true);
  };

  /** @param {number} groupId */
  const handleDeleteGroup = (groupId) => {
    deleteGroup(groupId);
  };

  /** 
   * @param {number} groupId 
   * @param {Partial<Group>} updatedData 
   */
  const handleSaveGroup = (groupId, updatedData) => {
    updateGroup(groupId, updatedData);
  };

  /** @param {object} groupData - Data from the add group form. */
  const handleAddGroup = (groupData) => {
    const newGroup = {
      name: groupData.name,
      description: groupData.description || '',
      members: 0,
      category: 'Learner-Focused', // Default category
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop&auto=format' // Default image
    };
    addGroup(newGroup);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title={t('groups.title')}
        description={t('groups.subtitle')}
        action={{
          label: t('groups.createGroup'),
          onClick: () => setIsAddGroupOpen(true)
        }}
      />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={handleDiscoverGroups}
            className="flex items-center gap-2"
          >
            <Compass className="h-4 w-4" />
            {t('groups.discoverGroups')}
          </Button>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            className="pl-9" 
            placeholder={t('groups.searchPlaceholder')} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder={t('groups.allCategories')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('groups.allCategories')}</SelectItem>
              <SelectItem value="Learner-Focused">{t('groups.categories.learnerFocused.name')}</SelectItem>
              <SelectItem value="Trainer-Focused">{t('groups.categories.trainerFocused.name')}</SelectItem>
              <SelectItem value="Employer-Focused">{t('groups.categories.employerFocused.name')}</SelectItem>
              <SelectItem value="Initiative-Wide">{t('groups.categories.initiativeWide.name')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Display groups by category */}
      <div className="space-y-8">
        {categories.map((category) => {
          const categoryGroups = groupsByCategory[category.name] || [];
          if (categoryGroups.length === 0) return null;
          
          const CategoryIcon = category.icon;
          
          return (
            <div key={category.name} className="space-y-4">
              {/* Category Header */}
              <div className="flex items-center gap-3 pb-2 border-b-2 border-gray-200">
                <div className={`${category.color} p-2 rounded-lg`}>
                  <CategoryIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{t(`groups.categories.${category.key}.name`)} {t('common.groups', 'Groups')}</h2>
                  <p className="text-sm text-gray-600">{t(`groups.categories.${category.key}.description`)}</p>
                </div>
              </div>

              {/* Groups Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {categoryGroups.map((group) => (
                  <Card key={group.id} className="hover:shadow-lg transition-all duration-300 overflow-hidden group">
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={group.image} 
                        alt={t(`groups.sampleGroups.${group.nameKey}.name`)} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute top-3 right-3 flex items-center gap-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200 shadow-sm">
                          {t('groups.enrolled')}
                        </Badge>
                        <div className="bg-white/95 rounded-md shadow-sm">
                          <GroupOptionsMenu 
                            groupId={group.id} 
                            groupName={t(`groups.sampleGroups.${group.nameKey}.name`)}
                            onEdit={() => handleEditGroup(group)}
                            onDelete={() => handleDeleteGroup(group.id)}
                          />
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white font-bold text-xl mb-1">{t(`groups.sampleGroups.${group.nameKey}.name`)}</h3>
                      </div>
                    </div>
                    <CardHeader className="space-y-2 pb-3">
                      <CardDescription className="text-sm text-gray-600 line-clamp-2 min-h-[40px]">
                        {t(`groups.sampleGroups.${group.nameKey}.description`)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Users className="h-4 w-4" />
                            <span>{group.members} {t('groups.members')}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {t(`groups.categories.${category.key}.name`)}
                          </Badge>
                        </div>
                        <Button 
                          variant="default" 
                          className="w-full bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
                          onClick={() => handleViewGroup(group.id)}
                        >
                          {t('groups.openGroup')}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {filteredGroups.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">{t('groups.noGroupsFound')}</h3>
          <p className="text-gray-500">{t('groups.tryAdjustingFilters')}</p>
        </div>
      )}

      <AddGroupDialog 
        open={isAddGroupOpen} 
        onOpenChange={setIsAddGroupOpen}
        onSave={handleAddGroup}
      />

      <GroupEditDialog
        open={isEditGroupOpen}
        onOpenChange={setIsEditGroupOpen}
        group={selectedGroup}
        onSave={handleSaveGroup}
      />
    </div>
  );
};

const Groups = () => {
  return <GroupsContent />;
};

export default Groups;