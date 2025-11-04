import React, { useState } from 'react';
import ChatAssessment from './ChatAssessment';
import ChatResults from './ChatResults';

const AthenaChatbot = ({ onComplete, onClose }) => {
  const [showAssessment, setShowAssessment] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [assessmentData, setAssessmentData] = useState(null);

  const handleAssessmentComplete = (learningStyle, scores) => {
    setAssessmentData({ learningStyle, scores });
    setShowAssessment(false);
    setShowResults(true);
  };

  const handleResultsComplete = () => {
    if (onComplete && assessmentData) {
      onComplete(assessmentData.learningStyle, assessmentData.scores);
    }
    setShowResults(false);
  };

  const handleRestart = () => {
    setShowAssessment(true);
    setShowResults(false);
    setAssessmentData(null);
  };

  if (showAssessment) {
    return (
      <ChatAssessment 
        onComplete={handleAssessmentComplete}
        onClose={onClose}
      />
    );
  }

  if (showResults && assessmentData) {
    return (
      <ChatResults
        learningStyle={assessmentData.learningStyle}
        scores={assessmentData.scores}
        onRestart={handleRestart}
        onClose={handleResultsComplete}
      />
    );
  }

  return null;
};

export default AthenaChatbot;
