"use client"
// src/app/page.js

import React, { useState, useEffect } from 'react';
import Profile from './components/profile';
import DatabasePopup from './components/DatabasePopup';
import DatabaseList from './components/DatabaseList';

export default function HomePage() {
  const [message, setMessage] = useState('');
  const [chatData, setChatData] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [databaseDetails, setDatabaseDetails] = useState([]);
  const chatId = '1'; // Hardcoded chatId for now

  useEffect(() => {
    // Open the popup when the component mounts
    setIsPopupOpen(true);
  }, []);

  const handleMessageSend = () => {
    if (message.trim()) { // Ensure message is not just whitespace
      setChatData(prevChatData => ({
        ...prevChatData,
        [chatId]: [...(prevChatData[chatId] || []), message]
      }));
      console.log("Sending message:", message);
      setMessage(''); // Clear the input after sending
    }
  };

  const handleDatabaseSubmit = (dbDetails) => {
    console.log("Database Details Submitted:", dbDetails);
    setDatabaseDetails(dbDetails); // Directly set to the submitted details
    setIsPopupOpen(false); // Close the popup after submission
  };

  return (
    <div className='flex flex-col max-h-screen relative ml-64 mr-64'>
      <Profile />
    <div className=" bg-secondary-400 text-white min-h-screen overflow-y-auto relative">
      {!chatData[chatId] ? (
        <>
          <h1 className="text-3xl font-bold p-6">Start a New Chat</h1>
          <p className="p-6">Send a message to start a conversation.</p>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold p-6">Chat {chatId}</h1>
          <div className="p-4 rounded-lg space-y-3 w-[50%]">
            {chatData[chatId].map((msg, index) => (
              <p key={index} className="bg-primary p-2 rounded">
                {msg}
              </p>
            ))}
          </div>
        </>
      )}
      <DatabaseList databaseDetails={databaseDetails} />
     

      {/* Show Database Popup */}
      {isPopupOpen && (
        <DatabasePopup onClose={() => setIsPopupOpen(false)} onSubmit={handleDatabaseSubmit} />
      )}
    </div>
    <div className="absolute bottom-5 left-0 w-full bg-secondary-400 p-4">
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
