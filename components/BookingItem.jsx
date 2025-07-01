import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPlaneDeparture, FaMoneyBillWave } from 'react-icons/fa';

const BookingItem = ({ booking }) => {
  return (
    <div className='flex h-[300px]'>
     
        <div className=" h-[300px] rounded-xl">
          <img
            src={`http://localhost:3001/${booking.photo}` || "https://via.placeholder.com/300x160"}
            alt="Booking"
            className=" transform hover:scale-105 transition duration-300"
          />
      </div>
    </div>
  )
};

export default BookingItem;
