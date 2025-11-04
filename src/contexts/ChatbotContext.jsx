import React, { createContext, useContext, useState, useEffect } from 'react';

const ChatbotContext = createContext();

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};

export const ChatbotProvider = ({ children }) => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false);
  const [learningStyle, setLearningStyle] = useState(null);
  const [learningScores, setLearningScores] = useState(null);

  // Check if user has completed assessment on mount
  useEffect(() => {
    const completed = localStorage.getItem('athena-assessment-completed');
    const style = localStorage.getItem('athena-learning-style');
    const scores = localStorage.getItem('athena-learning-scores');
    
    if (completed === 'true') {
      setHasCompletedAssessment(true);
      setLearningStyle(style);
      setLearningScores(scores ? JSON.parse(scores) : null);
    } else {
      // Auto-open only once per page load
      const openedThisSession = sessionStorage.getItem('athena-opened-this-session');
      if (!openedThisSession) {
        const timer = setTimeout(() => {
          setShowChatbot(true);
          sessionStorage.setItem('athena-opened-this-session', 'true');
        }, 2000); // Show after 2 seconds
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const startAssessment = () => {
    setShowChatbot(true);
  };

  const completeAssessment = (style, scores) => {
    setLearningStyle(style);
    setLearningScores(scores);
    setHasCompletedAssessment(true);
    // Keep chatbot open to show results
    // setShowChatbot(false);
    
    // Save to localStorage
    localStorage.setItem('athena-assessment-completed', 'true');
    localStorage.setItem('athena-learning-style', style);
    localStorage.setItem('athena-learning-scores', JSON.stringify(scores));
  };

  const closeChatbot = () => {
    setShowChatbot(false);
  };

  const resetAssessment = () => {
    setHasCompletedAssessment(false);
    setLearningStyle(null);
    setLearningScores(null);
    setShowChatbot(false);
    
    // Clear from localStorage
    localStorage.removeItem('athena-assessment-completed');
    localStorage.removeItem('athena-learning-style');
    localStorage.removeItem('athena-learning-scores');
  };

  const value = {
    showChatbot,
    hasCompletedAssessment,
    learningStyle,
    learningScores,
    startAssessment,
    completeAssessment,
    closeChatbot,
    resetAssessment
  };

  return (
    <ChatbotContext.Provider value={value}>
      {children}
    </ChatbotContext.Provider>
  );
};
