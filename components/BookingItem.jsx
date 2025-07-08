// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaMapMarkerAlt, FaPlaneDeparture, FaMoneyBillWave } from 'react-icons/fa';

// const BookingItem = ({ booking }) => {
//   return (
//     <div className=" bg-yellow-500 w-[300px] h-[300px] flex-none rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col justify-between border border-gray-100">
//       <div className="w-full h-[100px] overflow-hidden  mb-2">
//         <img
//           src={booking.photo ? `http://localhost:3001/${booking.photo}` : "https://via.placeholder.com/600x300"}
//           alt={booking.name}
//           className="h-full object-contain"
//         />
//       </div>

//       {/* Booking Details */}
//       <div className="flex flex-col gap-1 text-gray-800 text-sm">
//         <h3 className="font-bold flex items-center gap-2 text-base">
//           <FaMapMarkerAlt className="text-teal-600" />
//           {booking.name}
//         </h3>

//         <p className="flex items-center gap-2">
//           <FaPlaneDeparture className="text-blue-600" />
//           <span className="font-medium">Departure:</span> {booking.from}
//         </p>

//         <p className="flex items-center gap-2">
//           <FaMoneyBillWave className="text-green-600" />
//           <span className="font-medium">Price:</span> {booking.price} PKR
//         </p>
//       </div>

//       {/* Buttons */}
//       <div className="flex justify-between items-center pt-2 border-t border-gray-200 mt-2">
//         <Link
//           to={`/Detailslist/${booking._id}`}
//           className="px-3 py-1 text-sm font-semibold rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 transition"
//         >
//           View
//         </Link>
//         <button className="px-3 py-1 text-sm font-semibold rounded-md bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white transition">
//           Book
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BookingItem;
