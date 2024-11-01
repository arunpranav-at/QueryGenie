"use client";
// src/app/page.js

import React, { useState, useEffect } from 'react';
import Profile from './components/Profile';
import DatabasePopup from './components/DatabasePopup';
import DatabaseList from './components/DatabaseList';
import axios from './_axios';
import { details } from './userDetails';

export default function HomePage() {
  const [message, setMessage] = useState('');
  const [chatData, setChatData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [databaseDetails, setDatabaseDetails] = useState([]);
  const [isWaitingForBot, setIsWaitingForBot] = useState(false);
  const [subscriptionType, setSubscriptionType] = useState('');
  const [openAiModel, setOpenAiModel] = useState('');
  const [session_id, setSession_id] = useState('');

  useEffect(() => {
    setIsPopupOpen(true); // Open popup on mount
  }, []);

  const handleMessageSend = async () => {
    if (message.trim()) {
      // Append user message to chatData and reset message input
      const userMessage = { sender: 'user', text: message };
      setChatData(prevChatData => [...prevChatData, userMessage]);
      setMessage(''); // Clear the input field
      setIsWaitingForBot(true); // Set loading state for bot response

      const body = {
        prompt: message,
        user_id: details.id,
        session_id: session_id,
        structure: databaseDetails,
        history: false,
        model: openAiModel,
      };

      try {
        const response = await axios.post(`/bot`, body);
        const botMessage = { sender: 'bot', text: response.data.response };
        setChatData(prevChatData => [...prevChatData, botMessage]);
        setSession_id(response.data.session_id);
      } catch (error) {
        console.error("Error fetching bot response:", error);
      } finally {
        setIsWaitingForBot(false); // Reset loading state
      }
    }
  };

  const handleDatabaseSubmit = (dbDetails) => {
    setDatabaseDetails(dbDetails);
    setIsPopupOpen(false);
  };

  return (
    <div className='flex flex-col max-h-screen relative ml-64 mr-64'>
      <div className="bg-secondary-400 text-white min-h-screen overflow-y-auto p-6">
        <Profile subscriptionType={subscriptionType} setSubscriptionType={setSubscriptionType} openAiModel={openAiModel} setOpenAiModel={setOpenAiModel} />
        
        <h1 className="text-3xl font-bold mb-6">Chat Interface</h1>
        
        {/* Chat Display */}
        <div className="p-4 rounded-lg space-y-4 bg-gray-800 text-white max-w-2xl mx-auto">
          {chatData.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                msg.sender === 'user' ? 'bg-blue-600 self-end text-right' : 'bg-green-600 self-start text-left'
              }`}
            >
              {msg.text}
            </div>
          ))}
          {/* Bot loading indicator */}
          {isWaitingForBot && (
            <div className="self-start text-left bg-green-600 p-3 rounded-lg animate-pulse">
              Bot is typing...
            </div>
          )}
        </div>

        {/* Database List */}
        <DatabaseList databaseDetails={databaseDetails} setDatabaseDetails={setDatabaseDetails} />

        {/* Database Popup */}
        {isPopupOpen && <DatabasePopup onClose={() => setIsPopupOpen(false)} onSubmit={handleDatabaseSubmit} />}
      </div>

      {/* Input Section */}
      <div className="absolute bottom-2 left-0 w-full p-4">
        <div className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-3 bg-gray-700 text-white rounded-l-lg outline-none"
          />
          <button
            onClick={handleMessageSend}
            className="bg-blue-600 p-3 rounded-r-lg hover:bg-blue-700 text-white"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
