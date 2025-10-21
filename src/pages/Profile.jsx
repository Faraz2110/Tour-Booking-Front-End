import React, { useEffect, useState } from 'react';
import { FaUser, FaEnvelope } from 'react-icons/fa';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      if (parsedUser.photo) {
        setPreview(`http://tour-booking-back-end-production.up.railway.app:3001/${parsedUser.photo}`);
      }
    }
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('photo', file);

    try {
      setUploading(true);
      const token = localStorage.getItem('token');

      const xhr = new XMLHttpRequest();
      xhr.open('PUT', 'http://tour-booking-back-end-production.up.railway.app:3001/api/profile-photo', true);
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setProgress(percent);
        }
      };

      xhr.onload = () => {
        setUploading(false);
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          const updatedUser = { ...user, photo: data.photo };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setUser(updatedUser);
          setPreview(`http://tour-booking-back-end-production.up.railway.app:3001/${data.photo}`);
          setProgress(0);
        } else {
          alert('Upload failed');
        }
      };

      xhr.onerror = () => {
        setUploading(false);
        alert('Upload error');
      };

      xhr.send(formData);
    } catch (err) {
      setUploading(false);
      alert('Error uploading photo');
    }
  };

  const handleView = () => {
    if (preview) {
      window.open(preview, '_blank');
    } else {
      alert('No profile image available to view.');
    }
  };

  const triggerFileInput = () => {
    document.getElementById('profile-file').click();
  };

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
        <div className="relative w-24 h-24 mx-auto group mb-4">
          <img
            src={
              preview ||
              `https://ui-avatars.com/api/?name=${user.name || 'U'}&background=4f46e5&color=fff`
            }
            alt="Profile"
            className="w-full h-full object-cover rounded-full border shadow"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity  gap-4">
            <button
              onClick={handleView}
              className="text-xs text-white bg-blue-600 px-2 py-1 rounded hover:bg-blue-700"
            >
              View
            </button>
            <button
              onClick={triggerFileInput}
              className="text-xs text-white bg-green-600 px-2 py-1 rounded hover:bg-green-700"
            >
              Change
            </button>
          </div>
          <input
            id="profile-file"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {uploading && (
          <div className="mb-4 w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-blue-500 h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

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
