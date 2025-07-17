// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import SignUp from './pages/Signup';
// import SignIn from './pages/SignIn';
// import NotFoundPage from './pages/NotFoundPage';
// import Layout from './pages/Layout'; // Import the layout
// import AddTourBooking from '../components/AddTourBooking';
// import Detailslist from './pages/Detailslist';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* ✅ All routes inside Layout (Header will be shown) */}
//         <Route element={<Layout />}>
//           <Route path="/" element={<Home />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/SignIn" element={<SignIn />} />
//         </Route>

//         {/* ❌ This route will not show Header */}
//         <Route path="*" element={<NotFoundPage />} />
//         <Route path="/AddTourBooking" element={<AddTourBooking />} />
//         <Route path="/detailslist/:id" element={<Detailslist/>} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/Signup';
import SignIn from './pages/SignIn';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './pages/Layout';
import AddTourBooking from '../components/AddTourBooking';
import Detailslist from './pages/Detailslist';
import BookingForm from './pages/BookingForm';
import Profile from './pages/Profile';

// ✅ Protected Route component
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('token');
  return isLoggedIn ? children : <Navigate to="/SignIn" replace />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* ✅ Routes with common layout (e.g., header, footer) */}
        <Route element={<Layout />}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Profile" element={<Profile/>} />

          {/* 🔒 Protected Route: Only for logged-in users */}
          <Route
            path="/AddTourBooking"
            element={
              <ProtectedRoute>
                <AddTourBooking />
              </ProtectedRoute>
            }
          />

          {/* 🔓 Public Route: Details page visible to all */}
          <Route path="/detailslist/:id" element={<Detailslist />} />
          <Route path="/BookingForm/:id" element={<BookingForm />} />
        </Route>

        {/* ❌ 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
