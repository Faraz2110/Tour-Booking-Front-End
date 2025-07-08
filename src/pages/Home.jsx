import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPlaneDeparture, FaMoneyBillWave } from 'react-icons/fa';

const Home = () => {
  const [bookings, setBookings] = useState([]);

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

  useEffect(() => {
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
              className="w-[300px] h-[310px] rounded-xl shadow-lg overflow-hidden flex-none"
            >
              {/* Image */}
              <div className="h-[180px] w-full overflow-hidden">
                <img
                  src={
                    booking.photo
                      ? `http://localhost:3001/${booking.photo}`
                      : 'https://via.placeholder.com/600x300'
                  }
                  alt={booking.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="bg-white p-4 rounded-xl shadow-md flex flex-col justify-between h-[140px]">
                <div className="text-sm text-gray-800 space-y-2">
                  <h3 className="font-bold flex items-center gap-2 text-base truncate">
                    <FaMapMarkerAlt className="text-emerald-600" />
                    <span className="uppercase tracking-wide">{booking.name}</span>
                  </h3>

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
                <div className="flex justify-between items-center">
                  <Link
                    to={`/Detailslist/${booking._id}`}
                    className="text-sm font-medium text-sky-600 hover:underline"
                  >
                    View
                  </Link>
                  <Link
                    to={`/BookingForm/${booking._id}`}
                    className="text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-lime-500 px-4 py-1.5 rounded-lg hover:from-emerald-600 hover:to-lime-600 transition duration-200"
                  >
                    Book
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
