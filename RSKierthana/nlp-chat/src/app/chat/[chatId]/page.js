"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import DatabaseList from '../../components/DatabaseList';
import Profile from '@/app/components/Profile';
export default function ChatPage() {
  const { chatId } = useParams(); // Get chatId from the URL
  const [message, setMessage] = useState('');
  const [chatData, setChatData] = useState({});
  const [databaseDetails, setDatabaseDetails] = useState([]);


  useEffect(() => {
    // Simulate fetching messages based on chatId
    setChatData({
      '1': ["Hello!", "How can I help you?"],
      '2': ["Here's some advice on tech stack..."],
      '3': ["Let's calculate the distance..."],
      '4': ["Your marks for technical writing are..."],
      '5': ["Service learning involves..."],
      '6': ["Calculating max factor score..."]
    });
  }, []); // Empty dependency array ensures this runs only once when the component mounts

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

  const messages = chatData[chatId] || ["No messages found for this chat."];

  return (
    <div className="flex flex-col ml-64 bg-secondary-400 text-white min-h-screen relative">
       <Profile />
      <h1 className="text-3xl font-bold p-6">Chat {chatId}</h1>
      <div className="p-4 rounded-lg space-y-3 w-[50%]">
        {messages.map((msg, index) => (
          <p key={index} className="bg-primary p-2 rounded">
            {msg}
          </p>
        ))}
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
      {/* <DatabaseList databaseDetails={databaseDetails} setDatabaseDetails={setDatabaseDetails} /> */}
    </div>
  );
}
