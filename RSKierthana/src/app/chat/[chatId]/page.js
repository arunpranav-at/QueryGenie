"use client"
import React from 'react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function ChatPage() {
//   const router = useRouter();
  const { chatId } = useParams(); // Get chatId from the URL
  const [message, setMessage] = useState('');

  const handleMessageSend = () => {
    // Handle sending the message here (currently, it just clears the input)
    console.log("Sending message:", message);
    setMessage(''); // Clear the input after sending
  };
  // Simulate fetching messages based on chatId
  const chatData = {
    '1': ["Hello!", "How can I help you?"],
    '2': ["Here's some advice on tech stack..."],
    '3': ["Let's calculate the distance..."],
    '4': ["Your marks for technical writing are..."],
    '5': ["Service learning involves..."],
    '6': ["Calculating max factor score..."]
  };

  const messages = chatData[chatId] || ["No messages found for this chat."];

  return (
    <div className="flex flex-col ml-64 bg-secondary-400 text-white min-h-screen relative">
      <h1 className="text-3xl font-bold p-6">Chat {chatId}</h1>
      <div className=" p-4 rounded-lg space-y-3 w-[50%]">
        {messages.map((message, index) => (
          <p key={index} className="bg-primary p-2 rounded">
            {message}
          </p>
        ))}
      </div>
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
