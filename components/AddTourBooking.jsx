import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearEditing,
  updateBooking,
  addBooking
} from '../Redux/bookingSlice';

const AddTourBooking = () => {
  const editing = useSelector(state => state.booking.editing);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    from: '',
    to: '',
    price: '',
    photo: null
  });

  useEffect(() => {
    if (editing) {
      setFormData({
        name: editing.name || '',
        from: editing.from || '',
        to: editing.to || '',
        price: editing.price || '',
        photo: null
      });
    } else {
      setFormData({
        name: '',
        from: '',
        price: '',
        company: '',
        photo: null
      });
    }
  }, [editing]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setFormData((prev) => ({
        ...prev,
        photo: files[0]
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', formData.name);
    form.append('from', formData.from);
    form.append('price', formData.price);
    form.append('company', formData.company);
    if (formData.photo) {
      form.append('photo', formData.photo);
    }

    try {
      const token = localStorage.getItem('token');
      console.log('📦 Token being sent:', token);

      const response = await fetch(
        editing
          ? `http://localhost:3001/api/bookings/${editing._id}`
          : 'http://localhost:3001/api/bookings',
        {
          method: editing ? 'PUT' : 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json' // ✅ do not set Content-Type for FormData
          },
          body: form
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Failed to save booking');
      }

      const result = await response.json();

      if (editing) {
        dispatch(updateBooking(result.booking));
        alert('Booking updated!');
      } else {
        dispatch(addBooking(result.booking));
        alert('Booking added!');
      }

      dispatch(clearEditing());
      navigate('/');
    } catch (err) {
      console.error('🚨 Submission error:', err);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-teal-700 text-center mb-6">
          {editing ? 'Edit Tour Booking' : 'Add Tour Booking'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name of Place</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="e.g. Murree Hills"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">From</label>
            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="e.g. Lahore"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="e.g. 2500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700"> Company </label>
            <input
              type="text"
              value={formData.company}
              name="company"
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-xl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Upload photo</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-xl"
            />
          </div>


          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-xl font-semibold hover:bg-teal-500 transition duration-200"
          >
            {editing ? 'Update Booking' : 'Submit Booking'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTourBooking;
