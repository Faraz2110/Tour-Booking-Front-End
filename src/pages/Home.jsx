
import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

import { Link } from 'react-router-dom';
import {
  FaMapMarkerAlt,
  FaPlaneDeparture,
  FaMoneyBillWave,
  FaTrashAlt,
  FaEdit,
} from 'react-icons/fa';

const Home = () => {
  const [bookings, setBookings] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/bookings');
      const data = await response.json();
      if (response.ok) setBookings(data);
      else alert(data.error);
    } catch (err) {
      console.error('React fetch error:', err);
      alert('Failed to fetch bookings');
    }
  };

  const deleteBooking = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) return alert('You must be logged in to delete');

    if (!window.confirm('Are you sure you want to delete this booking?')) return;

    try {
      const res = await fetch(`http://localhost:3001/api/bookings/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b._id !== id));
      } else {
        alert(result.error || 'Failed to delete');
      }
    } catch (err) {
      alert('Error deleting booking');
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setCurrentUser(user);
    fetchBookings();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">All Tour Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-500 text-center">No bookings available.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="w-[300px] h-[330px] rounded-xl shadow-lg overflow-hidden flex-none relative transition-all transform hover:scale-105 hover:shadow-2xl hover:border-2 hover:border-emerald-500 duration-300"

            >


              <Link
                to={`/Detailslist/${booking._id}`}
                className="h-[180px] w-full overflow-hidden relative block"
              >
                <img
                  src={
                    booking.photo
                      ? `http://localhost:3001/${booking.photo}`
                      : 'https://via.placeholder.com/600x300'
                  }
                  alt={booking.name}
                  className="h-full w-full object-cover"
                />

              </Link>

              {/* Info */}
              <div className="bg-white p-4 rounded-xl shadow-md flex flex-col justify-between h-[150px]">
                <div className="text-sm text-gray-800 space-y-2">


                  <div className='flex justify-between'>
                    <h3 className="font-bold flex items-center gap-2 text-base truncate">
                      <FaMapMarkerAlt className="text-emerald-600" />
                      <span className="uppercase tracking-wide">{booking.name}</span>
                    </h3>
                    <div className="">
                      <p className="text-xs  bg-emerald-100 text-emerald-800 inline-block px-2 py-0.5 rounded-md font-medium shadow-sm">
                        Added by: {booking.company || 'Unknown'}
                      </p>
                    
                    </div>
                  </div>


                  <p className="flex items-center gap-2">
                    <FaPlaneDeparture className="text-sky-600" />
                    <span className="font-medium text-gray-600">Departure:</span>
                    <span className="text-gray-700">{booking.from}</span>
                  </p>

                  <p className="flex items-center gap-2">
                    <FaMoneyBillWave className="text-lime-600" />
                    <span className="font-medium text-gray-600">Price:</span>
                    <span className="text-gray-700">{booking.price} PKR</span>
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex justify-between items-center mt-2">
                  <Link
                    to={`/Detailslist/${booking._id}`}
                    className="text-sm font-medium text-sky-600 hover:underline"
                  >
                    View Details
                  </Link>

                  <Link
                    to={`/BookingForm/${booking._id}`}
                    className="text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-lime-500 px-4 py-1.5 rounded-lg hover:from-emerald-600 hover:to-lime-600 transition duration-200"
                  >
                    Book
                  </Link>
                </div>

                {/* Owner controls (Edit/Delete) */}
                {currentUser && booking.user === currentUser._id && (
                  <div className="flex justify-end items-center gap-3 mt-3">
                    <Link
                      to={`/BookingForm/${booking._id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => deleteBooking(booking._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrashAlt />
                    </button>

                  </div>

                )}

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Home;
