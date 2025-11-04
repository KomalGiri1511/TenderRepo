import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BookOpen, Users, Clock, Filter, Search, Plus, Grid, List, Compass, UserPlus, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/shared/PageHeader';
import { EnrollCourseDialog } from '@/components/courses/EnrollCourseDialog';
import { CourseOptionsMenu } from '@/components/courses/CourseOptionsMenu';
import { Tabs, TabsList, TabsTrigger, PillTabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from '@/hooks/use-toast';

const Courses = () => {
  const { t } = useTranslation();
  const [view, setView] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEnrollDialogOpen, setIsEnrollDialogOpen] = useState(false);
  // Removed course access type (open/sequential)
  const [activeTab, setActiveTab] = useState('courses');
  const navigate = useNavigate();

  // Single ICEX course
  const mockCourses = [
    {
      id: 'global-market',
      customTitle: 'Global Market Readiness: Competing Beyond Borders',
      customDescription: 'Build the mindset and skills needed to compete in international markets.',
      students: 342,
      duration: '6 weeks',
      fullDuration: '6 Weeks',
      format: 'Self-paced with practical tasks',
      output: 'Market Readiness Action Plan',
      level: 'Intermediate',
      status: 'Active',
      image: '/assets/c1.webp',
      archived: false,
      deleted: false,
      catalog: 'International Business'
    }
  ];

  const [courses, setCourses] = useState(mockCourses);

  const filteredCourses = courses.filter(course => {
    const courseTitle = course.customTitle || t(`courses.sampleCourses.${course.titleKey}.title`);
    const courseDescription = course.customDescription || t(`courses.sampleCourses.${course.titleKey}.description`);
    
    const matchesSearch = courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         courseDescription.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'courses') return matchesSearch && !course.archived && !course.deleted;
    if (activeTab === 'archived') return matchesSearch && course.archived && !course.deleted;
    if (activeTab === 'deleted') return matchesSearch && course.deleted;
    
    return matchesSearch;
  });

  const handleCourseClick = (courseId) => {
    navigate(`/courses/view/${courseId}`);
  };

  const handleCatalogClick = () => {
    navigate('/catalog');
    toast({
      title: t('courses.toasts.catalog'),
      description: t('courses.toasts.redirectingToCatalog'),
    });
  };

  const handleCreateCourse = () => {
    navigate('/courses/create');
  };

  const handleCourseEdit = (courseId, courseName) => {
    navigate(`/courses/edit/${courseId}`);
    toast({
      title: t('courses.toasts.editCourse'),
      description: t('courses.toasts.openingEditPage', { name: courseName }),
    });
  };

  const handleCourseArchive = (courseId, courseName) => {
    setCourses(prevCourses => 
      prevCourses.map(course => 
        course.id === courseId ? { ...course, archived: true } : course
      )
    );
    toast({
      title: t('courses.toasts.courseArchived'),
      description: t('courses.toasts.courseMovedToArchived', { name: courseName }),
    });
  };

  const handleCourseDelete = (courseId, courseName) => {
    setCourses(prevCourses => 
      prevCourses.map(course => 
        course.id === courseId ? { ...course, deleted: true, archived: false } : course
      )
    );
    toast({
      title: t('courses.toasts.courseDeleted'),
      description: t('courses.toasts.courseMovedToDeleted', { name: courseName }),
    });
  };

  const handleCourseRestore = (courseId, courseName) => {
    setCourses(prevCourses => 
      prevCourses.map(course => 
        course.id === courseId ? { ...course, deleted: false, archived: false } : course
      )
    );
    toast({
      title: t('courses.toasts.courseRestored'),
      description: t('courses.toasts.courseRestoredToActive', { name: courseName }),
    });
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTranslatedLevel = (level) => {
    return t(`courses.levels.${level.toLowerCase()}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Published': return 'bg-blue-100 text-blue-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTranslatedStatus = (status) => {
    return t(`courses.statuses.${status.toLowerCase()}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('courses.title')}</h1>
          <p className="text-muted-foreground mt-2">
            {t('courses.subtitle')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={() => setIsEnrollDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <UserPlus className="h-4 w-4" />
            {t('courses.enroll')}
          </Button>
          <Button onClick={handleCreateCourse}>
            <Plus className="h-4 w-4 mr-2" />
            {t('courses.createCourse')}
          </Button>
        </div>
      </div>

      {/* Course Tabs - Templates removed */}
      <div className="flex items-center gap-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-cyan-50 p-1">
            <PillTabsTrigger value="courses" className="data-[state=active]:bg-cyan-400 data-[state=active]:text-white">
              {t('courses.tabs.courses')} {courses.filter(c => !c.archived && !c.deleted).length}
            </PillTabsTrigger>
            <PillTabsTrigger value="archived" className="data-[state=active]:bg-cyan-400 data-[state=active]:text-white">
              {t('courses.tabs.archived')} {courses.filter(c => c.archived && !c.deleted).length}
            </PillTabsTrigger>
            <PillTabsTrigger value="deleted" className="data-[state=active]:bg-cyan-400 data-[state=active]:text-white">
              {t('courses.tabs.deleted')} {courses.filter(c => c.deleted).length}
            </PillTabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              className="pl-9" 
              placeholder={t('courses.searchPlaceholder')} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder={t('courses.allLevels')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('courses.allLevels')}</SelectItem>
              <SelectItem value="beginner">{t('courses.levels.beginner')}</SelectItem>
              <SelectItem value="intermediate">{t('courses.levels.intermediate')}</SelectItem>
              <SelectItem value="advanced">{t('courses.levels.advanced')}</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder={t('courses.allStatus')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('courses.allStatus')}</SelectItem>
              <SelectItem value="active">{t('courses.statuses.active')}</SelectItem>
              <SelectItem value="draft">{t('courses.statuses.draft')}</SelectItem>
              <SelectItem value="archived">{t('courses.statuses.archived')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          {/* Catalog Button */}
          <Button 
            variant="outline" 
            onClick={handleCatalogClick}
            className="flex items-center gap-2"
          >
            <Compass className="h-4 w-4" />
            {t('courses.catalog')}
          </Button>

          {/* Removed Sequential/Open Toggle */}

          {/* View Toggle */}
          <Tabs value={view} onValueChange={(value) => setView(value)}>
            <TabsList>
              <TabsTrigger value="grid" className="flex items-center gap-2">
                <Grid className="h-4 w-4" />
                {t('courses.grid')}
              </TabsTrigger>
              <TabsTrigger value="list" className="flex items-center gap-2">
                <List className="h-4 w-4" />
                {t('courses.list')}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content */}
      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer" >
              <div className="h-48 overflow-hidden relative">
                <img 
                 onClick={() => handleCourseClick(course.id)}
                  src={course.image} 
                  alt={course.customTitle || t(`courses.sampleCourses.${course.titleKey}.title`)} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                <div className="absolute top-2 right-2 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <Badge className={getStatusColor(course.status)}>
                    {getTranslatedStatus(course.status)}
                  </Badge>
                  <div className="bg-white/90 rounded-md">
                    <CourseOptionsMenu 
                      courseId={course.id} 
                      courseName={course.customTitle || t(`courses.sampleCourses.${course.titleKey}.title`)}
                      onEdit={handleCourseEdit}
                      onArchive={handleCourseArchive}
                      onDelete={handleCourseDelete}
                      onRestore={handleCourseRestore}
                      isDeleted={course.deleted}
                    />
                  </div>
                </div>
                {/* Removed Course Access Type Indicator */}
              </div>
              <CardHeader className="pb-2"  onClick={() => handleCourseClick(course.id)}>
                <CardTitle className="text-lg font-semibold line-clamp-1">
                  {course.customTitle || t(`courses.sampleCourses.${course.titleKey}.title`)}
                </CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {course.customDescription || t(`courses.sampleCourses.${course.titleKey}.description`)}
                </p>
              </CardHeader>
              <CardContent onClick={() => handleCourseClick(course.id)}>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className={getLevelColor(course.level)}>
                    {getTranslatedLevel(course.level)}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {course.catalog}
                  </Badge>
                </div>
                
                {/* Course Details - Clean Layout */}
                <div className="space-y-2.5 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <span className="line-clamp-1">{course.fullDuration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <BookOpen className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <span className="line-clamp-1">{course.format}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FileText className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <span className="line-clamp-1">{course.output}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{course.students} {t('courses.enrolled')}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 border-green-200">
                    {t('courses.enrolling')}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-4 font-medium">{t('courses.course')}</th>
                    <th className="text-left p-4 font-medium">{t('courses.catalog')}</th>
                    <th className="text-left p-4 font-medium">{t('courses.students')}</th>
                    <th className="text-left p-4 font-medium">{t('courses.duration')}</th>
                    <th className="text-left p-4 font-medium">{t('courses.level')}</th>
                    <th className="text-left p-4 font-medium">{t('courses.status')}</th>
                    <th className="text-left p-4 font-medium">{t('courses.accessType')}</th>
                    <th className="text-left p-4 font-medium">{t('courses.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course) => (
                    <tr key={course.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={course.image} 
                            alt={course.customTitle || t(`courses.sampleCourses.${course.titleKey}.title`)}
                            className="w-12 h-12 rounded object-cover"
                          />
                          <div 
                            className="cursor-pointer"
                            onClick={() => handleCourseClick(course.id)}
                          >
                            <h3 className="font-medium text-blue-600 hover:text-blue-800">
                              {course.customTitle || t(`courses.sampleCourses.${course.titleKey}.title`)}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {course.customDescription || t(`courses.sampleCourses.${course.titleKey}.description`)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className="text-xs">
                          {course.catalog}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{course.students}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{course.duration}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className={getLevelColor(course.level)}>
                          {getTranslatedLevel(course.level)}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge className={getStatusColor(course.status)}>
                          {getTranslatedStatus(course.status)}
                        </Badge>
                      </td>
                      <td className="p-4">
                        {courseType === 'sequential' ? (
                          <Badge variant="outline" className="text-orange-600 border-orange-300">
                            Sequential
                          </Badge>
                        ) : (
                          <Badge className="bg-green-500 text-white border-green-400">
                            Open Access
                          </Badge>
                        )}
                      </td>
                      <td className="p-4">
                        <CourseOptionsMenu 
                          courseId={course.id} 
                          courseName={t(`courses.sampleCourses.${course.titleKey}.title`)}
                          onEdit={handleCourseEdit}
                          onArchive={handleCourseArchive}
                          onDelete={handleCourseDelete}
                          onRestore={handleCourseRestore}
                          isDeleted={course.deleted}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      <EnrollCourseDialog 
        open={isEnrollDialogOpen} 
        onOpenChange={setIsEnrollDialogOpen} 
      />
    </div>
  );
};

export default Courses;