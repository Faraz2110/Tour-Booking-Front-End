import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setEditing, deleteBooking } from '../../Redux/bookingSlice';

const Detailslist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

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

  const handleEdit = () => {
    dispatch(setEditing(booking));
    navigate('/AddTourBooking');
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this booking?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3001/api/bookings/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok) {
        // dispatch(deleteBooking(id)); // ✅ update Redux
        navigate('/'); // ✅ go back to home
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete booking');
    }
  };

  if (loading) return <p className="text-center text-lg text-gray-600 mt-10">Loading...</p>;
  if (!booking) return <p className="text-center text-lg text-red-500 mt-10">Booking not found.</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-2xl shadow-md mt-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-teal-600 hover:underline"
      >
        ← Go Back
      </button>

      {!token ? '' : <button
        onClick={handleEdit}
        className="mb-4 ml-4 text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-400"
      >
        Edit
      </button>}
      {!token ? '' :
        <button
          onClick={handleDelete}
          className="mb-4 ml-4 text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400"
        >
          Delete
        </button>}

      <img
        src={`http://localhost:3001/${booking.photo}` || "https://via.placeholder.com/600x300"}
        alt={booking.name}
        className="rounded-xl w-full h-60 object-cover mb-6"
      />

      <h2 className="text-2xl font-bold text-teal-700 mb-2">{booking.name}</h2>
      <p className="text-gray-600 mb-1"><span className="font-semibold">From:</span> {booking.from}</p>
      <p className="text-gray-600 mb-1"><span className="font-semibold">To:</span> {booking.to}</p>
      <p className="text-gray-800 font-semibold mb-4">Price: Rs. {booking.price}</p>

      <div className="mt-4 space-y-2">
        <p className="text-gray-700"><span className="font-semibold">Duration:</span> 3 Days, 2 Nights</p>
        <p className="text-gray-700"><span className="font-semibold">Travel Date:</span> 12th July 2025</p>
        <p className="text-gray-700"><span className="font-semibold">Description:</span> Enjoy a scenic tour through the hills with guided experiences, cozy stays, and local cuisine.</p>
        <p className="text-gray-700"><span className="font-semibold">Included:</span> Transport, Hotel, Meals, Tour Guide</p>
      </div>
    </div>
  );
};

export default Detailslist;
