import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Check, X, Trophy, GripVertical } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const QuizPage = () => {
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Drag & Drop Question State
  const [draggedItem, setDraggedItem] = useState(null);
  const [droppedItems, setDroppedItems] = useState({
    'social-media': [],
    'lms-platform': [],
    'press-media': [],
    'internal-stakeholder': []
  });

  // Sequence Question State
  const [sequenceItems, setSequenceItems] = useState([
    { id: 1, text: '🎯 Define Campaign Goals', order: null },
    { id: 2, text: '👥 Identify Target Audience', order: null },
    { id: 3, text: '📝 Create Content Strategy', order: null },
    { id: 4, text: '📢 Launch Campaign', order: null },
    { id: 5, text: '📊 Monitor & Analyze Results', order: null }
  ]);
  const [draggedSequenceItem, setDraggedSequenceItem] = useState(null);

  // Available items to drag
  const availableItems = [
    { id: '1', text: '🎥 Short Explainer Videos', emoji: '🎥' },
    { id: '2', text: '🧾 Infographics & Carousel Posts', emoji: '🧾' },
    { id: '3', text: '📚 Course Modules / Microlearning Lessons', emoji: '📚' },
    { id: '4', text: '🗞️ Press Releases & Articles', emoji: '🗞️' },
    { id: '5', text: '🧠 Discussion Forums / Feedback Polls', emoji: '🧠' },
    { id: '6', text: '🗣️ CEO / Ministerial Message Video', emoji: '🗣️' },
    { id: '7', text: '📈 Campaign Analytics Report', emoji: '📈' }
  ];

  // Correct answers for drag & drop
  const correctAnswers = {
    'social-media': ['1', '2'],  // Short Explainer Videos, Infographics
    'lms-platform': ['3', '5'],  // Course Modules, Discussion Forums
    'press-media': ['4', '6'],   // Press Releases, CEO Message Video
    'internal-stakeholder': ['7'] // Campaign Analytics Report
  };

  // Get items that haven't been placed yet
  const getAvailableItems = () => {
    const placedIds = Object.values(droppedItems).flat();
    return availableItems.filter(item => !placedIds.includes(item.id));
  };

  // Drag & Drop Handlers
  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, containerId) => {
    e.preventDefault();
    if (draggedItem) {
      // Remove item from previous container
      const newDroppedItems = { ...droppedItems };
      Object.keys(newDroppedItems).forEach(key => {
        newDroppedItems[key] = newDroppedItems[key].filter(id => id !== draggedItem.id);
      });
      
      // Add to new container
      newDroppedItems[containerId] = [...newDroppedItems[containerId], draggedItem.id];
      setDroppedItems(newDroppedItems);
      setDraggedItem(null);
    }
  };

  const handleRemoveItem = (containerId, itemId) => {
    const newDroppedItems = { ...droppedItems };
    newDroppedItems[containerId] = newDroppedItems[containerId].filter(id => id !== itemId);
    setDroppedItems(newDroppedItems);
  };

  // Sequence Handlers
  const handleSequenceDragStart = (e, item) => {
    setDraggedSequenceItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleSequenceDrop = (e, targetItem) => {
    e.preventDefault();
    if (draggedSequenceItem && draggedSequenceItem.id !== targetItem.id) {
      const newItems = [...sequenceItems];
      const draggedIndex = newItems.findIndex(item => item.id === draggedSequenceItem.id);
      const targetIndex = newItems.findIndex(item => item.id === targetItem.id);
      
      // Swap items
      [newItems[draggedIndex], newItems[targetIndex]] = [newItems[targetIndex], newItems[draggedIndex]];
      setSequenceItems(newItems);
      setDraggedSequenceItem(null);
    }
  };

  // Check if drag & drop answer is correct
  const checkDragDropAnswer = () => {
    let correct = true;
    Object.keys(correctAnswers).forEach(containerId => {
      const userAnswer = droppedItems[containerId].sort();
      const correctAnswer = correctAnswers[containerId].sort();
      if (JSON.stringify(userAnswer) !== JSON.stringify(correctAnswer)) {
        correct = false;
      }
    });
    return correct;
  };

  // Check if sequence is correct
  const checkSequenceAnswer = () => {
    // Correct order is already in the initial order (1, 2, 3, 4, 5)
    const correctOrder = [
      '🎯 Define Campaign Goals',
      '👥 Identify Target Audience',
      '📝 Create Content Strategy',
      '📢 Launch Campaign',
      '📊 Monitor & Analyze Results'
    ];
    const userOrder = sequenceItems.map(item => item.text);
    return JSON.stringify(userOrder) === JSON.stringify(correctOrder);
  };

  const handleSubmitQuestion = () => {
    if (currentQuestion === 1) {
      // Check drag & drop answer
      if (checkDragDropAnswer()) {
        setScore(score + 50);
      }
      setCurrentQuestion(2);
    } else if (currentQuestion === 2) {
      // Check sequence answer
      if (checkSequenceAnswer()) {
        setScore(score + 50);
      }
      setShowResults(true);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleRetake = () => {
    setCurrentQuestion(1);
    setScore(0);
    setShowResults(false);
    setDroppedItems({
      'social-media': [],
      'lms-platform': [],
      'press-media': [],
      'internal-stakeholder': []
    });
    setSequenceItems([
      { id: 1, text: '🎯 Define Campaign Goals', order: null },
      { id: 2, text: '👥 Identify Target Audience', order: null },
      { id: 3, text: '📝 Create Content Strategy', order: null },
      { id: 4, text: '📢 Launch Campaign', order: null },
      { id: 5, text: '📊 Monitor & Analyze Results', order: null }
    ]);
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-6 py-4">
            <Button onClick={handleBack} variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Assessments
            </Button>
          </div>
        </div>

        <div className="container mx-auto px-6 py-12">
          <div className="max-w-3xl mx-auto">
            <Card className="border-2 border-gray-200">
              <CardContent className="p-12 text-center">
                <div className="mb-6">
                  <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${score >= 70 ? 'bg-green-100' : 'bg-red-100'}`}>
                    {score >= 70 ? (
                      <Trophy className="h-12 w-12 text-green-600" />
                    ) : (
                      <X className="h-12 w-12 text-red-600" />
                    )}
                  </div>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {score >= 70 ? 'Congratulations!' : 'Keep Learning!'}
                </h1>
                
                <p className="text-xl text-gray-600 mb-8">
                  You scored <span className="font-bold text-gray-900">{score}%</span>
                </p>

                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <h3 className="font-semibold text-gray-900 mb-4">Quiz Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Question 1: Drag & Drop</span>
                      {checkDragDropAnswer() ? (
                        <Badge className="bg-green-100 text-green-800">Correct</Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800">Incorrect</Badge>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Question 2: Sequence Order</span>
                      {checkSequenceAnswer() ? (
                        <Badge className="bg-green-100 text-green-800">Correct</Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800">Incorrect</Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <Button 
                    onClick={handleRetake}
                    variant="outline"
                    className="px-8 py-6 text-lg"
                  >
                    Retake Quiz
                  </Button>
                  <Button 
                    onClick={handleBack}
                    className="bg-gray-900 hover:bg-gray-800 px-8 py-6 text-lg"
                  >
                    Return to Module
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button onClick={handleBack} variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Badge variant="outline" className="text-lg px-4 py-2">
              Question {currentQuestion} of 2
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          
          {currentQuestion === 1 && (
            <Card className="border-2 border-gray-200">
              <CardHeader className="bg-gray-900 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-3xl mb-2">Drag & Drop Assessment</CardTitle>
                    <p className="text-xl text-gray-300">"Designing a Digital Campaign"</p>
                  </div>
                  <Badge className="bg-white text-gray-900 text-lg px-4 py-2">
                    50 Points
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-8">
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
                  <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                    🎯 Objective:
                  </h3>
                  <p className="text-blue-800">
                    Match the correct communication content types to their appropriate digital channels in a labour reform awareness campaign.
                  </p>
                </div>

                {/* Available Items to Drag */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">📦 Drag Content Types:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {getAvailableItems().map(item => (
                      <div
                        key={item.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, item)}
                        className="bg-white border-2 border-gray-300 rounded-lg p-4 cursor-move hover:border-gray-900 hover:shadow-lg transition-all duration-200"
                      >
                        <p className="text-sm font-medium text-gray-900 text-center">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Drop Zones */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Social Media */}
                  <div
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'social-media')}
                    className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 min-h-[200px]"
                  >
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      📱 Social Media Campaigns
                    </h4>
                    <div className="space-y-2">
                      {droppedItems['social-media'].map(itemId => {
                        const item = availableItems.find(i => i.id === itemId);
                        return (
                          <div key={itemId} className="bg-white border border-gray-200 rounded-lg p-3 flex justify-between items-center">
                            <span className="text-sm text-gray-900">{item?.text}</span>
                            <button
                              onClick={() => handleRemoveItem('social-media', itemId)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        );
                      })}
                      {droppedItems['social-media'].length === 0 && (
                        <p className="text-gray-400 text-sm italic">Drop items here...</p>
                      )}
                    </div>
                  </div>

                  {/* LMS Platform */}
                  <div
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'lms-platform')}
                    className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 min-h-[200px]"
                  >
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      🎓 LMS Platform
                    </h4>
                    <div className="space-y-2">
                      {droppedItems['lms-platform'].map(itemId => {
                        const item = availableItems.find(i => i.id === itemId);
                        return (
                          <div key={itemId} className="bg-white border border-gray-200 rounded-lg p-3 flex justify-between items-center">
                            <span className="text-sm text-gray-900">{item?.text}</span>
                            <button
                              onClick={() => handleRemoveItem('lms-platform', itemId)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        );
                      })}
                      {droppedItems['lms-platform'].length === 0 && (
                        <p className="text-gray-400 text-sm italic">Drop items here...</p>
                      )}
                    </div>
                  </div>

                  {/* Press & Media */}
                  <div
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'press-media')}
                    className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 min-h-[200px]"
                  >
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      📰 Press & Media Outreach
                    </h4>
                    <div className="space-y-2">
                      {droppedItems['press-media'].map(itemId => {
                        const item = availableItems.find(i => i.id === itemId);
                        return (
                          <div key={itemId} className="bg-white border border-gray-200 rounded-lg p-3 flex justify-between items-center">
                            <span className="text-sm text-gray-900">{item?.text}</span>
                            <button
                              onClick={() => handleRemoveItem('press-media', itemId)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        );
                      })}
                      {droppedItems['press-media'].length === 0 && (
                        <p className="text-gray-400 text-sm italic">Drop items here...</p>
                      )}
                    </div>
                  </div>

                  {/* Internal Stakeholder */}
                  <div
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'internal-stakeholder')}
                    className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 min-h-[200px]"
                  >
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      👔 Internal Stakeholder Communication
                    </h4>
                    <div className="space-y-2">
                      {droppedItems['internal-stakeholder'].map(itemId => {
                        const item = availableItems.find(i => i.id === itemId);
                        return (
                          <div key={itemId} className="bg-white border border-gray-200 rounded-lg p-3 flex justify-between items-center">
                            <span className="text-sm text-gray-900">{item?.text}</span>
                            <button
                              onClick={() => handleRemoveItem('internal-stakeholder', itemId)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        );
                      })}
                      {droppedItems['internal-stakeholder'].length === 0 && (
                        <p className="text-gray-400 text-sm italic">Drop items here...</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <Button 
                    onClick={handleSubmitQuestion}
                    disabled={getAvailableItems().length > 0}
                    className="bg-gray-900 hover:bg-gray-800 px-8 py-6 text-lg"
                  >
                    Next Question →
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentQuestion === 2 && (
            <Card className="border-2 border-gray-200">
              <CardHeader className="bg-gray-900 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-3xl mb-2">Sequence Order Assessment</CardTitle>
                    <p className="text-xl text-gray-300">"Campaign Planning Process"</p>
                  </div>
                  <Badge className="bg-white text-gray-900 text-lg px-4 py-2">
                    50 Points
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-8">
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
                  <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                    🎯 Objective:
                  </h3>
                  <p className="text-blue-800">
                    Arrange the following campaign planning steps in the correct order by dragging and dropping them.
                  </p>
                </div>

                <div className="max-w-3xl mx-auto">
                  <div className="space-y-3">
                    {sequenceItems.map((item, index) => (
                      <div
                        key={item.id}
                        draggable
                        onDragStart={(e) => handleSequenceDragStart(e, item)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleSequenceDrop(e, item)}
                        className="bg-white border-2 border-gray-300 rounded-lg p-6 cursor-move hover:border-gray-900 hover:shadow-lg transition-all duration-200 flex items-center gap-4"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <GripVertical className="h-6 w-6 text-gray-400" />
                          <div className="bg-gray-900 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                          <span className="text-lg font-medium text-gray-900">{item.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <Button 
                    onClick={handleSubmitQuestion}
                    className="bg-gray-900 hover:bg-gray-800 px-8 py-6 text-lg"
                  >
                    Submit Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
};

export default QuizPage;

