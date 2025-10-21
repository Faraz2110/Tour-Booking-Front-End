import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBookings, deleteBooking as deleteBookingAction, selectBookings } from '../../Redux/bookingSlice';
import { FaMapMarkerAlt, FaPlaneDeparture, FaMoneyBillWave, FaTrashAlt, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Carousel from './Carousel';

const Home = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(state => state.booking.searchTerm);
  const sortType = useSelector(state => state.booking.sortType);
  const bookings = useSelector(selectBookings);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const params = new URLSearchParams();

        if (searchTerm) params.append('search', searchTerm);

        let backendSort = "";
        switch (sortType) {
          case "priceLowHigh":
            backendSort = "priceAsc";
            break;
          case "priceHighLow":
            backendSort = "priceDesc";
            break;
          case "dateNewest":
            backendSort = "dateDesc";
            break;
          case "dateOldest":
            backendSort = "dateAsc";
            break;
          default:
            backendSort = "";
        }

        if (backendSort) params.append('sort', backendSort);

        const response = await fetch(`http://tour-booking-back-end-production.up.railway.app:3001/api/bookings?${params.toString()}`);
        const data = await response.json();

        if (response.ok) {
          dispatch(setBookings(data));
        } else {
          alert(data.error || 'Failed to fetch bookings');
        }
      } catch (err) {
        alert('Error fetching bookings');
      }
    };

    fetchBookings();

    const user = JSON.parse(localStorage.getItem('user'));
    setCurrentUser(user);
  }, [dispatch, searchTerm, sortType]);

  // Delete handler kept same
  const deleteBooking = (id) => {
    dispatch(deleteBookingAction(id));
  };

  return (
    <div className="bg-black min-h-screen"> {/* p-6 → p-7 */}
      <div className="flex">
        <Carousel />
      </div>

      <h1 className="text-3xl font-bold text-[#ffdb00] mb-7 text-center"> {/* text-2xl → text-3xl, mb-6 → mb-7 */}
        All Tour Bookings
      </h1>

      {bookings.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">No bookings available.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-7 pb-5"> {/* gap-6 → gap-7 */}
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="w-[340px] h-[370px] shadow-xl overflow-hidden flex-none relative transition-all transform hover:scale-110 hover:shadow-2xl hover:border-[2.5px] hover:border-emerald-500 duration-300"
            >
              <Link
                to={`/Detailslist/${booking._id}`}
                className="h-[200px] w-full overflow-hidden relative block"
              >
                <img
                  src={booking.photo || 'https://via.placeholder.com/600x300'}
                  alt={booking.name}
                  className="h-full w-full object-cover"
                />
              </Link>

              <div className="bg-white p-5  shadow-md flex flex-col justify-between h-[170px]">
                <div className="text-base text-gray-800 space-y-3">
                  <div className="flex justify-between">
                    <h3 className="font-bold flex items-center gap-3 text-lg truncate">
                      <FaMapMarkerAlt className="text-emerald-600" />
                      <span className="uppercase tracking-wide">{booking.name}</span>
                    </h3>
                    <p className="text-sm bg-emerald-100 text-emerald-800 inline-block px-3 py-1 rounded-lg font-medium shadow-sm">
                      Added by: {booking.company || 'Unknown'}
                    </p>
                  </div>

                  <p className="flex items-center gap-3">
                    <FaPlaneDeparture className="text-sky-600 text-lg" />
                    <span className="font-medium text-gray-600">Departure:</span>
                    <span className="text-gray-700">{booking.from}</span>
                  </p>

                  <p className="flex items-center gap-3">
                    <FaMoneyBillWave className="text-lime-600 text-lg" />
                    <span className="font-medium text-gray-600">Price:</span>
                    <span className="text-gray-700">{booking.price} PKR</span>
                  </p>
                </div>

                <div className="flex justify-between items-center mt-1">
                  <Link
                    to={`/Detailslist/${booking._id}`}
                    className="text-base font-medium text-sky-600 hover:underline"
                  >
                    View Details
                  </Link>

                  <Link
                    to={`/BookingForm/${booking._id}`}
                    className="text-base font-semibold text-white bg-gradient-to-r from-emerald-500 to-lime-500 px-5 py-2 rounded-xl hover:from-emerald-600 hover:to-lime-600 transition duration-200"
                  >
                    Book
                  </Link>
                </div>

                {currentUser && booking.user === currentUser._id && (
                  <div className="flex justify-end items-center gap-4 mt-4">
                    <Link
                      to={`/BookingForm/${booking._id}`}
                      className="text-blue-600 hover:text-blue-800 text-lg"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => deleteBooking(booking._id)}
                      className="text-red-600 hover:text-red-800 text-lg"
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
