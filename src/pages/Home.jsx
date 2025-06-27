

// import React, { useEffect, useState } from 'react';
// import AddTourBooking from '../../components/AddTourBooking';
// import BookingList from '../../components/BookingList';

// const Home = () => {
//   const [bookings, setBookings] = useState([]);
//   const [editing, setEditing] = useState(null);

//   const fetchBookings = async () => {
//   try {
//     const response = await fetch('http://localhost:3001/api/bookings');
//     const data = await response.json();

//     console.log('Data received in React:', data); // 👈 ADD THIS

//     if (response.ok) setBookings(data);
//     else alert(data.error);
//   } catch (err) {
//     console.error('React fetch error:', err);
//     alert('Failed to fetch bookings');
//   }
// };


//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const handleEdit = (booking) => setEditing(booking);

//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/bookings/${id}`, {
//         method: 'DELETE',
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setBookings(prev => prev.filter(b => b._id !== id));
//       } else {
//         alert(data.error);
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Failed to delete booking');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 ">
//       <div className="max-w-4xl mx-auto">
//         <BookingList
//           booking={bookings}
//           onEdit={handleEdit}
//           onDelete={handleDelete}
//         />
//       </div>
//     </div>
//   );
// };

// export default Home;


import React, { useEffect } from 'react';
import BookingList from '../../components/BookingList';
import { useDispatch } from 'react-redux';
import { setBookings, deleteBooking } from '../../Redux/bookingSlice';

const Home = () => {
  const dispatch = useDispatch();

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/bookings');
      const data = await response.json();
      console.log('Data received in React:', data);
      if (response.ok) dispatch(setBookings(data));
      else alert(data.error);
    } catch (err) {
      console.error('React fetch error:', err);
      alert('Failed to fetch bookings');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // const handleDelete = async (id) => {
  //   try {
  //     const response = await fetch(`http://localhost:3001/api/bookings/${id}`, {
  //       method: 'DELETE',
  //     });
  //     const data = await response.json();
  //     if (response.ok) {
  //       dispatch(deleteBooking(id));
  //     } else {
  //       alert(data.error);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert('Failed to delete booking');
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto">
        <BookingList />
      </div>
    </div>
  );
};

export default Home;
