import React, { useEffect, useState } from 'react';
import { FaUser, FaEnvelope } from 'react-icons/fa';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 to-purple-100">
        <p className="text-gray-600 text-lg">Loading user...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-96 text-center">
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
            {user.name?.[0]?.toUpperCase() || 'U'}
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-1">{user.name}</h2>
        <p className="text-gray-500 text-sm mb-4">Welcome back 👋</p>

        <div className="text-left space-y-4">
          <div className="flex items-center gap-3">
            <FaUser className="text-blue-500" />
            <span className="text-gray-700">{user.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <FaEnvelope className="text-purple-500" />
            <span className="text-gray-700">{user.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
