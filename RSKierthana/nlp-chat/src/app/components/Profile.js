"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineUser, AiOutlineDashboard, AiOutlineLogout, AiOutlineBell } from 'react-icons/ai';

const Profile = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [subscriptionType, setSubscriptionType] = useState('');
  const [openAiModel, setOpenAiModel] = useState('');

  // Sample data for subscriptions and models (replace with actual data if needed)
  const subscriptionTypes = ['Free', 'Basic', 'Standard', 'Premium'];
  const openAiModels = ['GPT-3', 'GPT-4', 'DALL-E', 'Codex'];

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    console.log('Dropdown Open:', dropdownOpen);
  };

  return (
    <div className="relative p-6 ">
      {/* Notification Icon */}
      <div className="absolute top-4 right-[7%] cursor-pointer">
        <AiOutlineBell size={28} />
      </div>

      {/* Profile Avatar */}
      <div className="absolute top-4 right-5 flex items-center cursor-pointer" onClick={toggleDropdown}>
        <AiOutlineUser size={28} className="mr-2" />
      </div>

      {dropdownOpen && (
        <div className="absolute right-10 mt-9 w-48 bg-primary rounded shadow-lg">
          <div className="py-2 px-4 text-white">John Smith</div>
          <Link href="/dashboard" className="flex items-center py-2 px-4 text-white hover:bg-gray-700">
            <AiOutlineDashboard className="mr-2" />
            Dashboard
          </Link>
          <Link href="/logout" className="flex items-center py-2 px-4 text-white hover:bg-gray-700">
            <AiOutlineLogout className="mr-2" />
            Logout
          </Link>
        </div>
      )}

      {/* Subscription Type Dropdown */}
      <div className="absolute top-4 right-[25%]">
        {/* <label className="text-white">Subscription Type:</label> */}
        <select
          value={subscriptionType}
          onChange={(e) => setSubscriptionType(e.target.value)}
          className="bg-secondary text-white rounded p-2 ml-2"
        >
          <option value="">Select Subscription</option>
          {subscriptionTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* OpenAI Model Dropdown */}
      <div className="absolute top-4 right-[11%]">
        {/* <label className="text-white">OpenAI Model:</label> */}
        <select
          value={openAiModel}
          onChange={(e) => setOpenAiModel(e.target.value)}
          className="bg-secondary text-white rounded p-2 ml-2"
        >
          <option value="">Select Model</option>
          {openAiModels.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Profile;
