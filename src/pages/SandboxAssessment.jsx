import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save, CheckCircle, RotateCcw, Settings, Layers, Target, Clock, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const SandboxAssessment = () => {
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const [currentExercise, setCurrentExercise] = useState('drag-drop'); // 'drag-drop' or 'decision-tree'
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [dragDropItems, setDragDropItems] = useState([
    { id: 1, name: 'Social Media', category: 'channels', position: 'available' },
    { id: 2, name: 'Email Campaign', category: 'channels', position: 'available' },
    { id: 3, name: 'Press Release', category: 'channels', position: 'available' },
    { id: 4, name: 'Stakeholder Meeting', category: 'channels', position: 'available' },
    { id: 5, name: 'Crisis Message', category: 'messages', position: 'available' },
    { id: 6, name: 'Update Message', category: 'messages', position: 'available' },
    { id: 7, name: 'Informational Message', category: 'messages', position: 'available' },
    { id: 8, name: 'Urgent Message', category: 'messages', position: 'available' },
  ]);
  const [dropZones, setDropZones] = useState({
    channels: [],
    messages: [],
    timeline: []
  });

  // Auto-save functionality
  useEffect(() => {
    const saveInterval = setInterval(() => {
      saveProgress();
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(saveInterval);
  }, [dragDropItems, dropZones, progress]);

  const handleBack = () => {
    navigate(`/courses/modules/${moduleId}/assessments`);
  };

  const saveProgress = () => {
    const progressData = {
      moduleId,
      exercise: currentExercise,
      dragDropItems,
      dropZones,
      progress,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(`sandbox-progress-${moduleId}`, JSON.stringify(progressData));
    toast.success('Progress auto-saved');
  };

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('application/json', JSON.stringify(item));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, zone) => {
    e.preventDefault();
    const item = JSON.parse(e.dataTransfer.getData('application/json'));
    
    setDragDropItems(prev => 
      prev.map(dragItem => 
        dragItem.id === item.id 
          ? { ...dragItem, position: zone }
          : dragItem
      )
    );

    setDropZones(prev => ({
      ...prev,
      [zone]: [...prev[zone], item]
    }));

    // Update progress
    const totalItems = dragDropItems.length;
    const placedItems = dragDropItems.filter(item => item.position !== 'available').length + 1;
    const newProgress = Math.round((placedItems / totalItems) * 100);
    setProgress(newProgress);

    if (newProgress >= 100) {
      setIsCompleted(true);
      toast.success('Exercise completed!');
    }
  };

  const resetExercise = () => {
    setDragDropItems(prev => 
      prev.map(item => ({ ...item, position: 'available' }))
    );
    setDropZones({ channels: [], messages: [], timeline: [] });
    setProgress(0);
    setIsCompleted(false);
    toast.info('Exercise reset');
  };

  const submitAssessment = () => {
    // Generate score report
    const score = Math.round(progress + Math.random() * 20); // Simulate scoring
    const report = {
      moduleId,
      exercise: currentExercise,
      score,
      progress,
      completedAt: new Date().toISOString(),
      insights: [
        'Strong understanding of channel selection',
        'Good grasp of message hierarchy',
        'Effective stakeholder mapping',
        'Areas for improvement: Timeline optimization'
      ]
    };

    localStorage.setItem(`sandbox-report-${moduleId}`, JSON.stringify(report));
    toast.success('Assessment submitted successfully!');
    navigate(`/courses/modules/${moduleId}/assessments`);
  };

  const renderDragDropExercise = () => (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-gray-700">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex items-center gap-2 mt-2">
          <Zap className="h-4 w-4 text-green-600" />
          <span className="text-xs text-gray-600">Auto-save enabled</span>
        </div>
      </div>

      {/* Available Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Available Elements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {dragDropItems
              .filter(item => item.position === 'available')
              .map(item => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  className="p-3 bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg cursor-move hover:bg-blue-100 transition-colors"
                >
                  <div className="text-sm font-medium text-blue-900">{item.name}</div>
                  <div className="text-xs text-blue-600">{item.category}</div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Drop Zones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Communication Channels */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Communication Channels</CardTitle>
            <p className="text-sm text-gray-600">Drag communication channels here</p>
          </CardHeader>
          <CardContent>
            <div
              className="min-h-[200px] border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'channels')}
            >
              {dropZones.channels.map((item, index) => (
                <div key={index} className="p-2 bg-white border border-gray-200 rounded mb-2">
                  {item.name}
                </div>
              ))}
              {dropZones.channels.length === 0 && (
                <div className="text-gray-500 text-center py-8">Drop channels here</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Message Types */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Message Types</CardTitle>
            <p className="text-sm text-gray-600">Drag message types here</p>
          </CardHeader>
          <CardContent>
            <div
              className="min-h-[200px] border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'messages')}
            >
              {dropZones.messages.map((item, index) => (
                <div key={index} className="p-2 bg-white border border-gray-200 rounded mb-2">
                  {item.name}
                </div>
              ))}
              {dropZones.messages.length === 0 && (
                <div className="text-gray-500 text-center py-8">Drop messages here</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Timeline</CardTitle>
            <p className="text-sm text-gray-600">Arrange elements in order</p>
          </CardHeader>
          <CardContent>
            <div
              className="min-h-[200px] border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'timeline')}
            >
              {dropZones.timeline.map((item, index) => (
                <div key={index} className="p-2 bg-white border border-gray-200 rounded mb-2 flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">{index + 1}.</span>
                  {item.name}
                </div>
              ))}
              {dropZones.timeline.length === 0 && (
                <div className="text-gray-500 text-center py-8">Arrange timeline here</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderDecisionTreeExercise = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5" />
            Decision Tree Exercise
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Layers className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Decision Tree Coming Soon</h3>
            <p className="text-gray-600">Interactive decision tree scenarios will be available in the next update.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button 
              onClick={handleBack} 
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Assessments
            </Button>
            
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Zap className="h-3 w-3 mr-1" />
                Auto-save Active
              </Badge>
              <Button onClick={saveProgress} variant="outline" size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Sandbox Assessment
            </h1>
            <p className="text-lg text-gray-600">
              Interactive simulations and hands-on exercises
            </p>
          </div>

          {/* Exercise Selector */}
          <div className="mb-8">
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => setCurrentExercise('drag-drop')}
                variant={currentExercise === 'drag-drop' ? 'default' : 'outline'}
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Drag & Drop Builder
              </Button>
              <Button
                onClick={() => setCurrentExercise('decision-tree')}
                variant={currentExercise === 'decision-tree' ? 'default' : 'outline'}
                className="flex items-center gap-2"
              >
                <Layers className="h-4 w-4" />
                Decision Tree
              </Button>
            </div>
          </div>

          {/* Exercise Content */}
          {currentExercise === 'drag-drop' ? renderDragDropExercise() : renderDecisionTreeExercise()}

          {/* Action Buttons */}
          <div className="mt-8 flex justify-center gap-4">
            <Button onClick={resetExercise} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset Exercise
            </Button>
            {isCompleted && (
              <Button onClick={submitAssessment} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Submit Assessment
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SandboxAssessment;
