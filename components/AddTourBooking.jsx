// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   clearEditing,
//   updateBooking,
//   addBooking
// } from '../Redux/bookingSlice';

// const AddTourBooking = () => {
//   const editing = useSelector(state => state.booking.editing);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: '',
//     from: '',
//     price: '',
//     company: '',
//     photo: null
//   });

//   // ✅ Clear editing state if component is mounted without editing data
//   useEffect(() => {
//     if (!editing) {
//       dispatch(clearEditing());
//     }
//   }, [dispatch, editing]);

//   // ✅ Set form data when editing is available
//   useEffect(() => {
//     if (editing) {
//       setFormData({
//         name: editing.name || '',
//         from: editing.from || '',
//         price: editing.price || '',
//         company: editing.company || '',
//         photo: null
//       });
//     } else {
//       setFormData({
//         name: '',
//         from: '',
//         price: '',
//         company: '',
//         photo: null
//       });
//     }
//   }, [editing]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'photo') {
//       setFormData((prev) => ({
//         ...prev,
//         photo: files[0]
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const form = new FormData();
//     form.append('name', formData.name);
//     form.append('from', formData.from);
//     form.append('to', formData.to);
//     form.append('price', formData.price);
//     form.append('company', formData.company);
//     if (formData.photo) {
//       form.append('photo', formData.photo);
//     }

//     try {
//       const token = localStorage.getItem('token');
//       console.log('📦 Token being sent:', token);

//       const response = await fetch(
//         editing
//           ? `http://tour-booking-back-end-production.up.railway.app:3001/api/bookings/${editing._id}`
//           : 'http://tour-booking-back-end-production.up.railway.app:3001/api/bookings',
//         {
//           method: editing ? 'PUT' : 'POST',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: 'application/json'
//             // ❌ DO NOT set Content-Type manually when using FormData
//           },
//           body: form
//         }
//       );

//       if (!response.ok) {
//         const errorResponse = await response.json();
//         throw new Error(errorResponse.error || 'Failed to save booking');
//       }

//       const result = await response.json();

//       if (editing) {
//         dispatch(updateBooking(result.booking));
//         alert('Booking updated!');
//       } else {
//         dispatch(addBooking(result.booking));
//         alert('Booking added!');
//       }

//       dispatch(clearEditing());
//       navigate('/');
//     } catch (err) {
//       console.error('🚨 Submission error:', err);
//       alert('Something went wrong!');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold text-teal-700 text-center mb-6">
//           {editing ? 'Edit Tour Booking' : 'Add Tour Booking'}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Name of Place</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               maxLength={15}
//               required
//               className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
//               placeholder="e.g. Murree Hills"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">From</label>
//             <input
//               type="text"
//               name="from"
//               value={formData.from}
//               onChange={handleChange}
//               required
//               className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
//               placeholder="e.g. Lahore"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Price</label>
//             <input
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               required
//               className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
//               placeholder="e.g. 2500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Company</label>
//             <input
//               type="text"
//               name="company"
//               value={formData.company}
//               onChange={handleChange}
//               className="mt-1 w-full px-4 py-2 border rounded-xl"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Upload Photo</label>
//             <input
//               type="file"
//               name="photo"
//               accept="image/*"
//               onChange={handleChange}
//               className="mt-1 w-full px-4 py-2 border rounded-xl"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-teal-600 text-white py-2 rounded-xl font-semibold hover:bg-teal-500 transition duration-200"
//           >
//             {editing ? 'Update Booking' : 'Submit Booking'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddTourBooking;


import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearEditing, updateBooking, addBooking } from "../Redux/bookingSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { signInSchema } from "./ValidationSchemas";


// ✅ Yup schema for validation
const bookingSchema = Yup.object().shape({
  name: Yup.string().max(15, "Max 15 characters").required("Name is required"),
  from: Yup.string().required("Departure location is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  company: Yup.string().nullable(),
  photo: Yup.mixed().nullable(),
});

const AddTourBooking = () => {
  const editing = useSelector((state) => state.booking.editing);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Formik setup
  const formik = useFormik({
    initialValues: {
      name: editing?.name || "",
      from: editing?.from || "",
      price: editing?.price || "",
      company: editing?.company || "",
      photo: null,
    },
    validationSchema: bookingSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const form = new FormData();
      form.append("name", values.name);
      form.append("from", values.from);
      form.append("price", values.price);
      form.append("company", values.company || "");
      if (values.photo) {
        form.append("photo", values.photo);
      }

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("You must be logged in to create or edit a booking");
          return;
        }

        const response = await fetch(
          editing
            ? `http://tour-booking-back-end-production.up.railway.app:3001/api/bookings/${editing._id}`
            : "http://tour-booking-back-end-production.up.railway.app:3001/api/bookings",
          {
            method: editing ? "PUT" : "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
            body: form,
          }
        );

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.error || "Failed to save booking");
        }

        const result = await response.json();

        if (editing) {
          dispatch(updateBooking(result.booking));
          alert("Booking updated!");
        } else {
          dispatch(addBooking(result.booking));
          alert("Booking added!");
        }

        dispatch(clearEditing());
        resetForm();
        navigate("/");
      } catch (err) {
        console.error("🚨 Submission error:", err);
        alert("Something went wrong!");
      } finally {
        setSubmitting(false);
      }
    },
  });

  // ✅ Clear editing state if no editing data
  useEffect(() => {
    if (!editing) {
      dispatch(clearEditing());
    }
  }, [dispatch, editing]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-teal-700 text-center mb-6">
          {editing ? "Edit Tour Booking" : "Add Tour Booking"}
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name of Place
            </label>
            <input
              type="text"
              name="name"
              maxLength={15}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${
                formik.errors.name && formik.touched.name
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-teal-400"
              }`}
              placeholder="e.g. Murree Hills"
            />
            {formik.errors.name && formik.touched.name && (
              <p className="text-red-500 text-sm">{formik.errors.name}</p>
            )}
          </div>

          {/* From */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              From
            </label>
            <input
              type="text"
              name="from"
              value={formik.values.from}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${
                formik.errors.from && formik.touched.from
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-teal-400"
              }`}
              placeholder="e.g. Lahore"
            />
            {formik.errors.from && formik.touched.from && (
              <p className="text-red-500 text-sm">{formik.errors.from}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${
                formik.errors.price && formik.touched.price
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-teal-400"
              }`}
              placeholder="e.g. 2500"
            />
            {formik.errors.price && formik.touched.price && (
              <p className="text-red-500 text-sm">{formik.errors.price}</p>
            )}
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company
            </label>
            <input
              type="text"
              name="company"
              value={formik.values.company}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 w-full px-4 py-2 border rounded-xl"
            />
          </div>

          {/* Photo */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Photo
            </label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={(event) => {
                formik.setFieldValue("photo", event.currentTarget.files[0]);
              }}
              className="mt-1 w-full px-4 py-2 border rounded-xl"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-teal-600 text-white py-2 rounded-xl font-semibold hover:bg-teal-500 transition duration-200"
          >
            {formik.isSubmitting
              ? "Submitting..."
              : editing
              ? "Update Booking"
              : "Submit Booking"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTourBooking;
