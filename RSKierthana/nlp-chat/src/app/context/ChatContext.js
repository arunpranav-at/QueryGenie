// src/app/context/ChatContext.js
"use client";
import React, { createContext, useState, useContext } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chatHistory, setChatHistory] = useState([
    { id: '1', title: "Greetings Exchange" },
    { id: '2', title: "Database 1" },
    { id: '3', title: "Database 2" },
    { id: '4', title: "Database 3" },
    { id: '5', title: "Database 4" },
  ]);

  const addChat = (title) => {
    const newChat = { id: String(chatHistory.length + 1), title };
    setChatHistory((prevChats) => [...prevChats, newChat]);
  };

  return (
    <ChatContext.Provider value={{ chatHistory, addChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
