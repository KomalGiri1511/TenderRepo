import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  ChatBubbleIcon
} from '@radix-ui/react-icons';
import { useChatbot } from '../../contexts/ChatbotContext';

const FloatingChatbot = () => {
  const { 
    hasCompletedAssessment, 
    startAssessment 
  } = useChatbot();

  // Auto-open behavior handled centrally in ChatbotContext using sessionStorage

  return (
    <>
      {/* Floating Chat Button - Always visible */}
      <div className="fixed bottom-6 right-6 z-[9999]">
        <div className="relative">
          <Button
            onClick={() => {
              startAssessment();
            }}
            size="lg"
            className="w-16 h-16 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105"
          >
            <ChatBubbleIcon className="w-7 h-7 text-white" />
          </Button>
        </div>
      </div>

    </>
  );
};

export default FloatingChatbot;
