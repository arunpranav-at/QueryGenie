// src/Components/Sidebar.js
"use client"
import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineRobot, AiOutlinePlus } from 'react-icons/ai';

const Sidebar = () => {
  const [activeChatId, setActiveChatId] = useState(null);
  
  const historyItems = [
    { id: '1', title: "Greetings Exchange" },
    { id: '2', title: "Database 1" },
    { id: '3', title: "Database 2" },
    { id: '4', title: "Database 3" },
    { id: '5', title: "Database 4" },
    { id: '6', title: "Database 5" },
    // Add more items as needed
  ];
  


  // Update the active chat id based on routing
  const handleChatClick = (id) => {
    setActiveChatId(id);
  };

  return (
    <div className="h-screen w-64 bg-secondary text-white fixed flex flex-col justify-between">
      <div className="p-6">
        {/* Logo and New Chat Icon */}
        <div className="text-2xl font-bold mb-10 flex items-center justify-between">
          <div className="flex items-center">
            <AiOutlineRobot size={28} className="mr-2" />
            ChatBot
          </div>
          {/* Link to New Chat */}
          <Link href="/" className="hover:bg-gray-700 p-2 rounded-full">
            <AiOutlinePlus size={24} />
          </Link>
        </div>
        
        {/* Dynamic Menu */}
        <nav>
          <ul>
            {historyItems.map((item) => (
              <li key={item.id} className="mb-4">
                <Link href={`/chat/${item.id}`} className={`hover:bg-gray-700 p-2 block rounded ${activeChatId === item.id ? 'bg-secondary-100' : ''}`} onClick={() => handleChatClick(item.id)}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
     
      {/* <div className="p-6">
        <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded">
          Upgrade plan
        </button>
      </div> */}
    </div>
  );
};

export default Sidebar;
