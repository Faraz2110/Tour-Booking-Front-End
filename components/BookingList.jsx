import React from 'react';
import BookingItem from './BookingItem';
import { useDispatch, useSelector } from 'react-redux';
import { setEditing } from '../Redux/bookingSlice';
import { useNavigate } from 'react-router-dom';

const BookingList = () => {
  const booking = useSelector(state => state.booking.bookings);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = (item) => {
    dispatch(setEditing(item));
    navigate('/add');
  };

  return (
    <div className="p-6 top-3 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">All Tour Bookings</h1>
      <div className="h-[300px]">
        {booking.length === 0 ? (
          <p className="text-gray-500">No bookings available.</p>
        ) : (
          booking.map(item => (
            <BookingItem
              key={item._id}
              booking={item}
              onEdit={() => handleEdit(item)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default BookingList;