"use client"
// src/app/page.js

import React, { useState, useEffect } from 'react';
import Profile from './components/Profile';
import DatabasePopup from './components/DatabasePopup';
import DatabaseList from './components/DatabaseList';
import axios from 'axios';

export default function HomePage() {
  const [message, setMessage] = useState('');
  const [chatData, setChatData] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [databaseDetails, setDatabaseDetails] = useState([]);
  const chatId = '1'; // Hardcoded chatId for now
  const [subscriptionType, setSubscriptionType] = useState('');
  const [openAiModel, setOpenAiModel] = useState('');

  useEffect(() => {
    // Open the popup when the component mounts
    setIsPopupOpen(true);
  }, []);

  const handleMessageSend = async () => {
    if (message.trim()) { // Ensure message is not just whitespace
      setChatData(prevChatData => ({
        ...prevChatData,
        [chatId]: [...(prevChatData[chatId] || []), message]
      }));
      const backend_url = process.env.NEXT_APP_BACKEND_URL;
      const data = await axios.get(`http://localhost:8000/test`);
      console.log(data)
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
    <div className=" bg-secondary-400 text-white min-h-screen overflow-y-auto relative">
      <Profile  subscriptionType={subscriptionType} setSubscriptionType={setSubscriptionType} openAiModel={openAiModel} setOpenAiModel={setOpenAiModel}/>
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
      <DatabaseList databaseDetails={databaseDetails}  setDatabaseDetails={setDatabaseDetails}/>
     

      {/* Show Database Popup */}
      {isPopupOpen && (
        <DatabasePopup onClose={() => setIsPopupOpen(false)} onSubmit={handleDatabaseSubmit} />
      )}
    </div>
    <div className="absolute bottom-2 left-[-2%] w-full p-4">
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
