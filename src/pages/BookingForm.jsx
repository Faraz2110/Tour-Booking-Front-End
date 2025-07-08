import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';

const BookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/api/bookings/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBooking(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching booking:', err);
        setLoading(false);
      });
  }, [id]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setFormData({ name: '', email: '', contact: '' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-teal-700 text-center mb-6">Book Your Trip</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email (optional)</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              placeholder="03XX-XXXXXXX"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-500 to-lime-500 text-white py-2.5 rounded-xl font-semibold hover:from-emerald-600 hover:to-lime-600 transition duration-200"
          >
            Book Trip
          </button>
        </form>

        {showSuccess && booking && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full text-center relative">
              <div className="flex justify-center mb-4">
                <div className="bg-emerald-100 text-emerald-700 p-4 rounded-full shadow-md">
                  <FaMapMarkerAlt className="text-3xl" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-emerald-700 mb-2">Trip Booked Successfully!</h3>
              <p className="text-gray-700 text-base mb-4">
                Destination:
                <span className="inline-block bg-lime-100 text-lime-800 px-3 py-1 rounded-xl font-semibold uppercase ml-2">
                  {booking.name}
                </span>
              </p>
              <p className="text-sm text-gray-600 mb-6">
                Thank you for booking. We'll contact you soon.
              </p>
              <button
                onClick={() => {
                  setShowSuccess(false);
                  navigate('/');
                }}
                className="bg-emerald-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-emerald-500 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
