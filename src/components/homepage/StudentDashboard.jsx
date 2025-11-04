import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ICEXBranding } from './GIZBranding';
import { WelcomeStatsSection } from './WelcomeStatsSection';
import { CalendarEventsSection } from './CalendarEventsSection';
import { AwarenessUpdatesSection } from './AwarenessUpdatesSection';
import { LearningPathwaysSection } from './LearningPathwaysSection';
import { DemoFeaturesSection } from './DemoFeaturesSection';
import { GroupsCommunitySection } from './GroupsCommunitySection';
import { QuickActionsSection } from './QuickActionsSection';
import ZoomClassesSection from './ZoomClassesSection';
import { CourseAssessmentInsights } from './CourseAssessmentInsights';
import { useChatbot } from '../../contexts/ChatbotContext';

export function StudentDashboard() {
  const navigate = useNavigate();
  const { showChatbot, completeAssessment, closeChatbot } = useChatbot();
  const [insightsModalOpen, setInsightsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* ICEX Branding Header */}
      <ICEXBranding />
      
      {/* Top Section - Two Column Layout */}
      <div className="max-w-7xl mx-auto px-6 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Left Side - Welcome & Stats */}
          <div className="space-y-6">
            <WelcomeStatsSection />
          </div>
          
          {/* Right Side - Calendar & Events */}
          <div className="space-y-4 lg:sticky lg:top-6 lg:self-start">
            <CalendarEventsSection />
          </div>
        </div>

        {/* Awareness & Updates Timeline Section */}
        <div className="mb-8">
          <AwarenessUpdatesSection />
        </div>

        {/* My Courses Section */}
        <div className="mb-8">
          <LearningPathwaysSection />
        </div>

        {/* Demo Features Section */}
        {/* <div className="mb-8">
          <DemoFeaturesSection />
        </div> */}

        {/* Course & Assessment Insights Button */}
        <div className="mb-8 flex justify-center">
          <Button
            onClick={() => setInsightsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-200 flex items-center gap-2"
          >
            <TrendingUp className="h-5 w-5" />
            View Course & Assessment Insights
          </Button>
        </div>

        {/* Additional Sections Below */}
        <div className="space-y-8">
          {/* <ZoomClassesSection /> */}
          
          {/* Groups & Community Section */}
          {/* <GroupsCommunitySection /> */}

          {/* Quick Actions & Next Steps - Final Section */}
          {/* <QuickActionsSection /> */}
        </div>
      </div>

      {/* Course & Assessment Insights Modal */}
      <Dialog open={insightsModalOpen} onOpenChange={setInsightsModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              Course & Assessment Insights
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <CourseAssessmentInsights />
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}

export default StudentDashboard;