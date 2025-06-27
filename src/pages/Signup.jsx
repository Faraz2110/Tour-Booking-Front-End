import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    try {
      const response = await fetch('http://localhost:3001/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const errorMessages = data.errors.map(err => err.msg);
          setErrors(errorMessages);
        } else {
          setErrors(["Signup failed. Try again."]);
        }
        return;
      }

      alert('Signup successful!');
      navigate('/login');
    } catch (err) {
      console.error('Signup error:', err);
      setErrors(["Network error. Please try again later."]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-teal-700 text-center mb-4">Create an Account</h2>

        {/* Errors */}
        {errors.length > 0 && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-lg text-sm">
            <ul className="list-disc list-inside space-y-1">
              {errors.map((err, idx) => <li key={idx}>{err}</li>)}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <div className="mt-1 flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-teal-400">
              <FiUser className="text-gray-500 mr-2" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full focus:outline-none"
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1 flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-teal-400">
              <FiMail className="text-gray-500 mr-2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full focus:outline-none"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1 flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-teal-400">
              <FiLock className="text-gray-500 mr-2" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full focus:outline-none"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-xl font-semibold hover:bg-teal-500 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-700">
          Already have an account?{' '}
          <Link to="/Login" className="text-teal-600 hover:text-teal-900 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
