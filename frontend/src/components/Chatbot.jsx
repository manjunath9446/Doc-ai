import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Send, Loader2 } from 'lucide-react';
import './components.css';

// const API_URL = 'http://localhost:8000';

const Chatbot = ({ documentContext, getToken }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatLogRef = React.useRef(null);

  useEffect(() => {
    if (documentContext) {
      setMessages([{ text: 'Document loaded. Ask me anything about its content!', sender: 'bot' }]);
    }
  }, [documentContext]);

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !documentContext || isLoading) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const token = await getToken();
      const response = await axios.post(`${API_URL}/chat`, {
          question: input,
          context: documentContext,
        },{
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      const botMessage = { text: response.data.answer, sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Sorry, I encountered an error.';
      const botErrorMessage = { text: errorMessage, sender: 'bot' };
      setMessages((prev) => [...prev, botErrorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-log" ref={chatLogRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message-bubble-wrapper ${msg.sender === 'user' ? 'user' : 'bot'}`}>
            <div className={`message-bubble ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message-bubble-wrapper bot">
            <div className="message-bubble bot-message">
              <Loader2 className="animate-spin" />
            </div>
          </div>
        )}
      </div>
      <form className="chat-form" onSubmit={handleSend}>
        <input
          type="text"
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          disabled={isLoading}
        />
        <button type="submit" className="chat-send-button" disabled={isLoading || !input.trim()}>
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default Chatbot;