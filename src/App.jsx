// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Home from './pages/Home';
// import SignUp from './pages/Signup';
// import SignIn from './pages/SignIn';
// import NotFoundPage from './pages/NotFoundPage';
// import Layout from './pages/Layout';
// import AddTourBooking from '../components/AddTourBooking';
// import Detailslist from './pages/Detailslist';
// import BookingForm from './pages/BookingForm';
// import Profile from './pages/Profile';

// // ✅ Protected Route component
// const ProtectedRoute = ({ children }) => {
//   const isLoggedIn = localStorage.getItem('token');
//   return isLoggedIn ? children : <Navigate to="/SignIn" replace />;
// };

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/*  Routes with common layout (e.g., header, footer) */}
//         <Route element={<Layout />}>
//           {/* Public Routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/SignIn" element={<SignIn />} />
//           <Route path="/Profile" element={<Profile/>} />

//           {/*  Protected Route: Only for logged-in users */}
//           <Route
//             path="/AddTourBooking"
//             element={
//               <ProtectedRoute>
//                 <AddTourBooking />
//               </ProtectedRoute>
//             }
//           />

//           {/*  Public Route: Details page visible to all */}
//           <Route path="/detailslist/:id" element={<Detailslist />} />
//           <Route path="/BookingForm/:id" element={<BookingForm />} />
//         </Route>

//         {/* ❌ 404 Page */}
//         <Route path="*" element={<NotFoundPage />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// ✅ Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const SignUp = lazy(() => import('./pages/Signup'));
const SignIn = lazy(() => import('./pages/SignIn'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const Layout = lazy(() => import('./pages/Layout'));
const AddTourBooking = lazy(() => import('../components/AddTourBooking'));
const Detailslist = lazy(() => import('./pages/Detailslist'));
const BookingForm = lazy(() => import('./pages/BookingForm'));
const Profile = lazy(() => import('./pages/Profile'));

// ✅ Protected Route component
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('token');
  return isLoggedIn ? children : <Navigate to="/SignIn" replace />;
};

const App = () => {
  return (
    <Router>
      {/* Suspense will show fallback while the page is loading */}
      <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
        <Routes>
          {/* Routes with common layout */}
          <Route element={<Layout />}>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/Profile" element={<Profile />} />

            {/* Protected Route */}
            <Route
              path="/AddTourBooking"
              element={
                <ProtectedRoute>
                  <AddTourBooking />
                </ProtectedRoute>
              }
            />

            {/* Public Route */}
            <Route path="/detailslist/:id" element={<Detailslist />} />
            <Route path="/BookingForm/:id" element={<BookingForm />} />
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;

