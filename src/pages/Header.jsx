import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { clearEditing, setSearchTerm, setsortType } from '../../Redux/bookingSlice.js';
import { useDispatch, useSelector } from 'react-redux';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const [menuOpen, setMenuOpen] = useState(false);

  // Get current search and sort values from Redux
  const searchTerm = useSelector((state) => state.booking.searchTerm);
  const sortType = useSelector((state) => state.booking.sortType);

  // Local states for input controls (to debounce before dispatch)
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const [localSort, setLocalSort] = useState(sortType);

  // Refs to hold debounce timers
  const searchTimeoutRef = useRef(null);
  const sortTimeoutRef = useRef(null);

  // Handle local search input change
  const handleSearchChange = (e) => {
    setLocalSearch(e.target.value);

    // Clear previous timer if exists
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    // Set new debounce timer
    searchTimeoutRef.current = setTimeout(() => {
      dispatch(setSearchTerm(e.target.value));
    }, 500);
  };

  // Handle local sort change
  const handlesortChange = (e) => {
    setLocalSort(e.target.value);

    if (sortTimeoutRef.current) clearTimeout(sortTimeoutRef.current);

    sortTimeoutRef.current = setTimeout(() => {
      dispatch(setsortType(e.target.value));
    }, 500);
  };

  // Keep local state synced if redux state changes externally
  useEffect(() => {
    setLocalSearch(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    setLocalSort(sortType);
  }, [sortType]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/SignIn');
  };

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [menuOpen]);

  useEffect(() => {
  if (token) {
    // Start a 10 second timer after login
    const logoutTimer = setTimeout(() => {
      handleLogout();
    }, 1800*1000); // 

    return () => clearTimeout(logoutTimer); // Cleanup on unmount
  }
}, [token]);
  return (
    <header className="top-0 left-0 right-0 z-50 bg-black backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        
        {/* Logo */}
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo3.png"
              alt="Logo"
              className="h-10 w-10 rounded-full object-cover shadow-md"
            />
            <span className="text-white font-extrabold text-2xl tracking-wide">TourMate</span>
          
          </Link>
  
          {/* Mobile menu toggle */}
          <div className="lg:hidden text-white">
            <button onClick={() => setMenuOpen(true)}>
              <HiMenu size={28} />
            </button>
          </div>
        </div>

        {/* Search and sorts */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <input
            type="text"
            value={localSearch}
            onChange={handleSearchChange}
            placeholder="Search tours..."
            className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:border-teal-400 w-full sm:w-64"
          />
          <select
            value={localSort}
            onChange={handlesortChange}
            className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:border-teal-400"
          >
            <option value="">sort by</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
            <option value="dateNewest">Date: Newest First</option>
            <option value="dateOldest">Date: Oldest First</option>
          </select>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-white font-medium">
          <Link to="/" className="hover:text-teal-400 transition">Home</Link>
          <Link to="/experiences" className="hover:text-teal-400 transition">Experiences</Link>
          <Link to="/services" className="hover:text-teal-400 transition">Services</Link>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          {!token ? (
            <Link to="/SignIn" className="bg-teal-500 hover:bg-teal-400 text-white px-4 py-2 rounded-full text-sm font-semibold transition">
              Sign In
            </Link>
          ) : (
            <>
              <Link
                to="/Profile"
                className="bg-cyan-500 hover:bg-cyan-400 text-white px-4 py-2 rounded-full text-sm font-semibold transition"
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  dispatch(clearEditing());
                  navigate('/AddTourBooking');
                }}
                className="bg-cyan-500 hover:bg-cyan-400 text-white px-4 py-2 rounded-full text-sm font-semibold transition"
              >
                Add Booking
              </button>
              <button
                onClick={handleLogout}
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 w-screen h-screen bg-slate-900/95 backdrop-blur-md z-50 flex flex-col justify-center items-center p-6">
          <div className="absolute top-4 right-4">
            <button onClick={() => setMenuOpen(false)} className="text-white">
              <HiX size={28} />
            </button>
          </div>

          {/* Search + sorts in Mobile Menu */}
          <div className="flex flex-col gap-3 w-full max-w-sm mb-6">
            <input
              type="text"
              value={localSearch}
              onChange={handleSearchChange}
              placeholder="Search tours..."
              className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:border-teal-400"
            />
            <select
              value={localSort}
              onChange={handlesortChange}
              className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:border-teal-400"
            >
              <option value="">sort by</option>
              <option value="priceLowHigh">Price: Low to High</option>
              <option value="priceHighLow">Price: High to Low</option>
              <option value="dateNewest">Date: Newest First</option>
              <option value="dateOldest">Date: Oldest First</option>
            </select>
          </div>

          <nav className="flex flex-col items-center gap-8 text-white font-semibold text-2xl">
            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-teal-400">Home</Link>
            <Link to="/experiences" onClick={() => setMenuOpen(false)} className="hover:text-teal-400">Experiences</Link>
            <Link to="/services" onClick={() => setMenuOpen(false)} className="hover:text-teal-400">Services</Link>

            {!token ? (
              <Link
                to="/SignIn"
                onClick={() => setMenuOpen(false)}
                className="bg-teal-500 hover:bg-teal-400 text-[#ffdb00] px-6 py-2 rounded-full"
              >
                Sign In
              </Link>
            ) : (
              <>
                <button
                  onClick={() => {
                    dispatch(clearEditing());
                    navigate('/AddTourBooking');
                    setMenuOpen(false);
                  }}
                  className="bg-cyan-500 hover:bg-cyan-400 text-[#ffdb00] px-6 py-2 rounded-full"
                >
                  + Add Booking
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-full"
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
