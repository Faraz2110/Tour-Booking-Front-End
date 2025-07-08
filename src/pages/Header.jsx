import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Prevent background scroll
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [menuOpen]);

  return (
    <header className="top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/logo3.png"
            alt="Logo"
            className="h-10 w-10 rounded-full object-cover shadow-md"
          />
          <span className="text-white font-extrabold text-2xl tracking-wide">TourMate</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-white font-medium">
          <Link to="/" className="hover:text-teal-400 transition">Home</Link>
          <Link to="/experiences" className="hover:text-teal-400 transition">Experiences</Link>
          <Link to="/services" className="hover:text-teal-400 transition">Services</Link>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          {!token ? (
            <Link to="/login" className="bg-teal-500 hover:bg-teal-400 text-white px-4 py-2 rounded-full text-sm font-semibold transition">
              Sign In
            </Link>
          ) : (
            <>
              <span className="text-white font-semibold upp">Hi, <span className='uppercase'>{user?.name}</span></span>
              <Link
                to="/AddTourBooking"
                className="bg-cyan-500 hover:bg-cyan-400 text-white px-4 py-2 rounded-full text-sm font-semibold transition"
              >
                Add Booking
              </Link>
              <button
                onClick={handleLogout}
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden text-white">
          <button onClick={() => setMenuOpen(true)}>
            <HiMenu size={28} />
          </button>
        </div>
      </div>

      {/* Fullscreen Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 w-screen h-screen bg-slate-900/95 backdrop-blur-md z-50 flex flex-col justify-center items-center p-6">
          <div className="absolute top-4 right-4">
            <button onClick={() => setMenuOpen(false)} className="text-white">
              <HiX size={28} />
            </button>
          </div>

          <nav className="flex flex-col items-center gap-8 text-white font-semibold text-2xl">
            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-teal-400">Home</Link>
            <Link to="/experiences" onClick={() => setMenuOpen(false)} className="hover:text-teal-400">Experiences</Link>
            <Link to="/services" onClick={() => setMenuOpen(false)} className="hover:text-teal-400">Services</Link>

            {!token ? (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="bg-teal-500 hover:bg-teal-400 text-white px-6 py-2 rounded-full"
              >
                Sign In
              </Link>
            ) : (
              <>
                <span className="text-white text-xl">Hi, {user?.name}</span>
                <Link
                  to="/AddTourBooking"
                  onClick={() => setMenuOpen(false)}
                  className="bg-cyan-500 hover:bg-cyan-400 text-white px-6 py-2 rounded-full"
                >
                  Add Booking
                </Link>
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
