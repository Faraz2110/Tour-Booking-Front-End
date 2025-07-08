// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { FaMapMarkerAlt, FaPlaneDeparture, FaMoneyBillWave } from 'react-icons/fa';

// const BookingList = () => {
//   const bookings = useSelector(state => state.booking.bookings);

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">All Tour Bookings</h1>

//       {bookings.length === 0 ? (
//         <p className="text-gray-500">No bookings available.</p>
//       ) : (
//         <div className="flex flex-wrap gap-6 justify-center">
//           {bookings.map((booking) => (
//             <div
//               key={booking._id}
//               className="w-[300px] h-[300px] rounded-xl shadow-lg overflow-hidden flex-none"
//             >
//               {/* Image section */}
//               <div className="h-[180px] w-full overflow-hidden">
//                 <img
//                   src={
//                     booking.photo
//                       ? `http://localhost:3001/${booking.photo}`
//                       : 'https://via.placeholder.com/600x300'
//                   }
//                   alt={booking.name}
//                   className="h-full w-full object-cover"
//                 />
//               </div>

//               {/* Bottom info section */}
//               <div className="bg-yellow-500 p-3 flex flex-col justify-between h-[120px]">
//                 <div className="text-sm text-gray-900 space-y-1">
//                   <h3 className="font-bold flex items-center gap-2 text-base truncate">
//                     <FaMapMarkerAlt className="text-teal-700" />
//                     {booking.name}
//                   </h3>
//                   <p className="flex items-center gap-2">
//                     <FaPlaneDeparture className="text-blue-700" />
//                     <span className="font-medium">Departure:</span> {booking.from}
//                   </p>
//                   <p className="flex items-center gap-2">
//                     <FaMoneyBillWave className="text-green-700" />
//                     <span className="font-medium">Price:</span> {booking.price} PKR
//                   </p>
//                 </div>

//                 {/* Buttons */}
//                 <div className="flex justify-between items-center pt-2">
//                   <Link
//                     to={`/Detailslist/${booking._id}`}
//                     className="text-sm font-semibold text-blue-700 hover:underline"
//                   >
//                     View
//                   </Link>
//                   <button className="text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-green-500 px-3 py-1 rounded-md hover:from-teal-600 hover:to-green-600 transition">
//                     Book
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookingList;
