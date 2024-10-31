"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineUser, AiOutlineDashboard, AiOutlineLogout } from 'react-icons/ai';

const Profile = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div>
      {/* Profile Avatar - fixed to top right */}
      <div className="relative p-6">
        <div 
          className="flex items-center cursor-pointer absolute top-4 right-5"
          onClick={toggleDropdown}
        >
          <AiOutlineUser size={28} className="mr-2" />
          {/* <span>User Name</span> */}
        </div>
        {dropdownOpen && (
          <div className="absolute right-10 mt-5 w-48 bg-primary rounded shadow-lg">
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
      </div>
    </div>
  );
}

export default Profile;
