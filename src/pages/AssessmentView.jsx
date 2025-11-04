import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Play, Clock, Target, Trophy, MessageSquare, Layers, Zap, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AssessmentView = () => {
  const navigate = useNavigate();
  const { moduleId } = useParams();

  const handleBack = () => {
    navigate(-1);
  };

  const handleQuizStart = () => {
    // Navigate to quiz page
    navigate(`/courses/modules/${moduleId}/quiz`);
  };

  const handleScenarioStart = () => {
    // Navigate to scenario page
    navigate(`/courses/modules/${moduleId}/scenario`);
  };

  const handleSandboxStart = () => {
    // Navigate to sandbox assessment page
    navigate(`/courses/modules/${moduleId}/sandbox`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <Button 
            onClick={handleBack} 
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Module
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Module Assessments
            </h1>
            <p className="text-lg text-gray-600">
              Test your knowledge and apply your skills
            </p>
          </div>

          {/* Quiz Cards Section */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Trophy className="h-6 w-6 text-gray-700" />
              Knowledge Assessments
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quiz Card 1 */}
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 bg-white">
                <div className="bg-gray-900 p-6 text-white">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                      <Trophy className="h-6 w-6" />
                    </div>
                    <Badge className="bg-white text-gray-900 font-bold text-xs">
                      Quiz 1
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">Digital Communication</h3>
                  <p className="text-gray-300 text-sm">
                    Foundations and strategy basics
                  </p>
                </div>

                <CardContent className="p-5">
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <Target className="h-4 w-4 text-gray-700 mx-auto mb-1" />
                      <p className="text-xs text-gray-500">Questions</p>
                      <p className="font-bold text-gray-900 text-sm">10</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <Clock className="h-4 w-4 text-gray-700 mx-auto mb-1" />
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="font-bold text-gray-900 text-sm">15 min</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <Trophy className="h-4 w-4 text-gray-700 mx-auto mb-1" />
                      <p className="text-xs text-gray-500">Pass</p>
                      <p className="font-bold text-gray-900 text-sm">70%</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
                    <ul className="space-y-1 text-xs text-gray-700">
                      <li>• Digital media overview</li>
                      <li>• Channel selection</li>
                      <li>• 3M Framework basics</li>
                    </ul>
                  </div>

                  <Button 
                    onClick={handleQuizStart}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Quiz 1
                  </Button>
                </CardContent>
              </Card>

              {/* Quiz Card 2 */}
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 bg-white">
                <div className="bg-gray-800 p-6 text-white">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                      <Trophy className="h-6 w-6" />
                    </div>
                    <Badge className="bg-white text-gray-800 font-bold text-xs">
                      Quiz 2
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">Analytics & Insights</h3>
                  <p className="text-gray-300 text-sm">
                    Data interpretation and optimization
                  </p>
                </div>

                <CardContent className="p-5">
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <Target className="h-4 w-4 text-gray-700 mx-auto mb-1" />
                      <p className="text-xs text-gray-500">Questions</p>
                      <p className="font-bold text-gray-900 text-sm">12</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <Clock className="h-4 w-4 text-gray-700 mx-auto mb-1" />
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="font-bold text-gray-900 text-sm">18 min</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <Trophy className="h-4 w-4 text-gray-700 mx-auto mb-1" />
                      <p className="text-xs text-gray-500">Pass</p>
                      <p className="font-bold text-gray-900 text-sm">75%</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
                    <ul className="space-y-1 text-xs text-gray-700">
                      <li>• Campaign metrics analysis</li>
                      <li>• Platform performance</li>
                      <li>• Strategy optimization</li>
                    </ul>
                  </div>

                  <Button 
                    onClick={handleQuizStart}
                    className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Quiz 2
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Scenario Card - Full Width */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-gray-700" />
              Real-World Scenario Assessment
            </h2>
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white">
              {/* Full Width Background with Avatar and Title */}
              <div 
                className="relative w-full h-80 flex items-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url('https://athena-user-assets.s3.eu-north-1.amazonaws.com/Scenario_assests/Empty+room.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="container mx-auto px-8 flex items-center justify-between">
                  {/* Avatar on Left */}
                  <div className="flex-shrink-0">
                    <img 
                      src="https://athena-user-assets.s3.eu-north-1.amazonaws.com/Scenario_assests/business_women.png" 
                      alt="Business consultant"
                      className="h-72 w-auto object-contain drop-shadow-2xl"
                    />
                  </div>

                  {/* Title and Description on Right */}
                  <div className="flex-1 ml-12 text-white">
                    <Badge className="bg-white/90 text-gray-900 font-bold mb-4">
                      Interactive Scenario
                    </Badge>
                    <h3 className="text-5xl font-bold mb-4">Real-World Scenario</h3>
                    <p className="text-xl text-gray-200 mb-6 max-w-2xl">
                      Apply your skills in interactive role-play situations and make critical decisions that impact outcomes.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-white/20 text-white backdrop-blur-sm border border-white/30">Crisis Management</Badge>
                      <Badge className="bg-white/20 text-white backdrop-blur-sm border border-white/30">Stakeholder Relations</Badge>
                      <Badge className="bg-white/20 text-white backdrop-blur-sm border border-white/30">Decision Making</Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details Section Below */}
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="p-3 bg-gray-900 rounded-lg">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Type</p>
                      <p className="font-bold text-gray-900">Interactive Dialogue</p>
                      <p className="text-xs text-gray-600 mt-1">Conversational assessment</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="p-3 bg-gray-900 rounded-lg">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Duration</p>
                      <p className="font-bold text-gray-900">15-20 Minutes</p>
                      <p className="text-xs text-gray-600 mt-1">Self-paced scenario</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="p-3 bg-gray-900 rounded-lg">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Key Decisions</p>
                      <p className="font-bold text-gray-900">5-8 Choices</p>
                      <p className="text-xs text-gray-600 mt-1">Multiple pathways</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                    <span>🎯</span> What You'll Experience:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gray-900 rounded-full mt-2"></div>
                      <div>
                        <p className="font-semibold text-gray-900">Stakeholder Communication</p>
                        <p className="text-sm text-gray-600">Navigate complex conversations with different stakeholders</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gray-900 rounded-full mt-2"></div>
                      <div>
                        <p className="font-semibold text-gray-900">Crisis Response</p>
                        <p className="text-sm text-gray-600">Handle urgent situations under pressure</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gray-900 rounded-full mt-2"></div>
                      <div>
                        <p className="font-semibold text-gray-900">Strategic Decisions</p>
                        <p className="text-sm text-gray-600">Make impactful choices that affect outcomes</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gray-900 rounded-full mt-2"></div>
                      <div>
                        <p className="font-semibold text-gray-900">Cultural Awareness</p>
                        <p className="text-sm text-gray-600">Demonstrate sensitivity and understanding</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleScenarioStart}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Play className="h-6 w-6 mr-2" />
                  Start Interactive Scenario
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sandbox Exercises Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Layers className="h-6 w-6 text-gray-700" />
              Simulations & Labs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Drag & Drop Exercise */}
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 bg-white">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                      <Settings className="h-6 w-6" />
                    </div>
                    <Badge className="bg-white text-blue-700 font-bold text-xs">
                      Interactive Lab
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">Drag & Drop Builder</h3>
                  <p className="text-blue-100 text-sm">
                    Build communication strategies through interactive elements
                  </p>
                </div>

                <CardContent className="p-5">
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <Target className="h-4 w-4 text-gray-700 mx-auto mb-1" />
                      <p className="text-xs text-gray-500">Elements</p>
                      <p className="font-bold text-gray-900 text-sm">15+</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <Clock className="h-4 w-4 text-gray-700 mx-auto mb-1" />
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="font-bold text-gray-900 text-sm">20 min</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <Zap className="h-4 w-4 text-gray-700 mx-auto mb-1" />
                      <p className="text-xs text-gray-500">Auto-save</p>
                      <p className="font-bold text-gray-900 text-sm">✓</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
                    <ul className="space-y-1 text-xs text-gray-700">
                      <li>• Channel selection matrix</li>
                      <li>• Message hierarchy builder</li>
                      <li>• Stakeholder mapping tool</li>
                    </ul>
                  </div>

                  <Button 
                    onClick={handleSandboxStart}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Start Drag & Drop Lab
                  </Button>
                </CardContent>
              </Card>

              {/* Decision Tree Exercise */}
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 bg-white">
                <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                      <Layers className="h-6 w-6" />
                    </div>
                    <Badge className="bg-white text-green-700 font-bold text-xs">
                      Decision Tree
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">Strategic Decision Tree</h3>
                  <p className="text-green-100 text-sm">
                    Navigate complex communication scenarios
                  </p>
                </div>

                <CardContent className="p-5">
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <Target className="h-4 w-4 text-gray-700 mx-auto mb-1" />
                      <p className="text-xs text-gray-500">Scenarios</p>
                      <p className="font-bold text-gray-900 text-sm">8</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <Clock className="h-4 w-4 text-gray-700 mx-auto mb-1" />
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="font-bold text-gray-900 text-sm">25 min</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <Zap className="h-4 w-4 text-gray-700 mx-auto mb-1" />
                      <p className="text-xs text-gray-500">Auto-save</p>
                      <p className="font-bold text-gray-900 text-sm">✓</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
                    <ul className="space-y-1 text-xs text-gray-700">
                      <li>• Crisis communication paths</li>
                      <li>• Stakeholder engagement flows</li>
                      <li>• Multi-channel strategies</li>
                    </ul>
                  </div>

                  <Button 
                    onClick={handleSandboxStart}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Layers className="h-4 w-4 mr-2" />
                    Start Decision Tree
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-10 text-center">
            <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">📚 Assessment Tips</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Take your time and review the course materials before starting. All assessments contribute to your final module score and generate detailed reports.
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-xs">
                  <Badge variant="outline" className="bg-white">✓ Auto-save progress</Badge>
                  <Badge variant="outline" className="bg-white">✓ Interactive simulations</Badge>
                  <Badge variant="outline" className="bg-white">✓ Detailed score reports</Badge>
                  <Badge variant="outline" className="bg-white">✓ Performance insights</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentView;

