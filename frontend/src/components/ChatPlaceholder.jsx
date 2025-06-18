// src/components/ChatPlaceholder.jsx
import React from 'react';
// Correctly import the chosen SVG from the 'chat-placeholder' folder
import chatPlaceholderImage from '../assets/chat-placeholder/chat-bot-rafiki.svg';

const ChatPlaceholder = () => {
  return (
    <div className="text-center flex flex-col items-center justify-center h-full text-gray-500">
      <img 
        src={chatPlaceholderImage} 
        alt="Chatbot illustration" 
        className="w-40 h-40 mb-6" // Added margin-bottom
      />
      <h3 className="font-semibold text-lg text-gray-700">Upload a document to activate the chat</h3>
      <p className="text-sm mt-1 max-w-xs">
        Chat functionality will be enabled once a document is uploaded and processed.
      </p>
    </div>
  );
};

export default ChatPlaceholder;