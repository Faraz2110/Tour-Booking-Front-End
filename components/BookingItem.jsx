import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPlaneDeparture, FaMoneyBillWave } from 'react-icons/fa';

const BookingItem = ({ booking }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-4 w-full sm:w-[48%] md:w-[30%] lg:w-[22%] flex flex-col justify-between border border-gray-100 min-h-[420px]">
      
      {/* imageUrl */}
      <div className="rounded-xl overflow-hidden">
        <img
          src={booking.imageUrlUrl || "https://via.placeholder.com/300x160"}
          alt="Booking"
          className="h-40 w-full object-cover transform hover:scale-105 transition duration-300"
        />
      </div>

      {/* Booking Details */}
      <div className="mt-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2 mb-4">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <FaMapMarkerAlt className="text-teal-600" />
            {booking.name}
          </h3>

          <p className="text-sm text-gray-700 flex items-center gap-2">
            <FaPlaneDeparture className="text-blue-600" />
            <span className="font-medium">Departure:</span> {booking.from}
          </p>

          <p className="text-sm text-gray-700 flex items-center gap-2">
            <FaMoneyBillWave className="text-green-600" />
            <span className="font-medium">Price:</span> {booking.price} PKR
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center mt-auto pt-4 border-t border-gray-200">
          <Link
            to={`/Detailslist/${booking._id}`}
            className="px-4 py-2 text-sm font-semibold rounded-lg text-blue-700 bg-blue-100 hover:bg-blue-200 transition"
          >
            View Details
          </Link>

          <button
            className="px-4 py-2 text-sm font-semibold rounded-lg  bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 transition"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingItem;
