"use client"
// src/app/page.js

import React, { useState } from 'react';
import Profile from './components/profile';
export default function HomePage() {
  const [message, setMessage] = useState('');

  const handleMessageSend = () => {
    // Handle sending the message here (currently, it just clears the input)
    console.log("Sending message:", message);
    setMessage(''); // Clear the input after sending
  };

  return (
    <div className="flex flex-col ml-64 bg-secondary-400 text-white min-h-screen relative">
        <Profile/>
      <h1 className="text-3xl font-bold p-6">Start a New Chat</h1>
      <p className="p-6">Send a message to start a conversation.</p>

      {/* Input Box Fixed at the Bottom */}
      <div className="absolute bottom-10 left-0 w-full bg-secondary-400 p-4">
        <div className="flex ">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-3 bg-secondary text-white rounded-l-lg outline-none"
          />
          <button
            onClick={handleMessageSend}
            className="bg-primary p-3 rounded-r-lg hover:bg-secondary-100 text-white"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
