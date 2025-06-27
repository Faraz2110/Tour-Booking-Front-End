// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   clearEditing,
//   updateBooking,
//   addBooking,
//   setBookings
// } from '../Redux/bookingSlice';

// const AddTourBooking = () => {
//   const editing = useSelector(state => state.booking.editing);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: '', from: '', to: '', price: '', imageUrlUrl: ''
//   });

//   useEffect(() => {
//     if (editing) {
//       setFormData(editing);
//     } else {
//       setFormData({ name: '', from: '', to: '', price: '', imageUrlUrl: '' });
//     }
//   }, [editing]);

//   const handleChange = e => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     const payload = { ...formData, price: Number(formData.price) };

//     try {
//       let response;
//       if (editing) {
//         response = await fetch(`http://localhost:3001/api/bookings/${editing._id}`, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(payload),
//         });
//       } else {
//         response = await fetch('http://localhost:3001/api/bookings', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(payload),
//         });
//       }

//       if (!response.ok) throw new Error('Failed to save booking');

//       const result = await response.json();
//       alert(editing ? 'Booking updated!' : 'Booking added!');

//       if (editing) {
//         dispatch(updateBooking(result));
//       } else {
//         dispatch(addBooking(result));
//       }

//       dispatch(clearEditing());
//       navigate('/');
//     } catch (err) {
//       console.error(err.message);
//       alert('Error occurred');
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
//             <label className="block text-sm font-medium text-gray-700">To</label>
//             <input
//               type="text"
//               name="to"
//               value={formData.to}
//               onChange={handleChange}
//               required
//               className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
//               placeholder="e.g. Islamabad"
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
//             <label className="block text-sm font-medium text-gray-700">imageUrl URL</label>
//             <input
//               type="text"
//               name="imageUrlUrl"
//               value={formData.imageUrlUrl}
//               onChange={handleChange}
//               className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
//               placeholder="e.g. https://example.com/imageUrl.jpg"
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

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearEditing,
  updateBooking,
  addBooking
} from '../Redux/bookingSlice';

const AddTourBooking = () => {
  const editing = useSelector(state => state.booking.editing);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    from: '',
    to: '',
    price: '',
    imageUrl: null
  });

  useEffect(() => {
    if (editing) {
      setFormData({
        name: editing.name || '',
        from: editing.from || '',
        to: editing.to || '',
        price: editing.price || '',
        imageUrl: null // user can upload new imageUrl while editing
      });
    } else {
      setFormData({
        name: '',
        from: '',
        to: '',
        price: '',
        imageUrl: null
      });
    }
  }, [editing]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageUrl') {
      setFormData((prev) => ({
        ...prev,
        imageUrl: files[0]
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', formData.name);
    form.append('from', formData.from);
    form.append('to', formData.to);
    form.append('price', formData.price);
    if (formData.imageUrlUrl) {
      form.append('imageUrl', formData.imageUrlUrl);
    }

    try {
      const response = await fetch(
        editing
          ? `http://localhost:3001/api/bookings/${editing._id}`
          : 'http://localhost:3001/api/bookings',
        {
          method: editing ? 'PUT' : 'POST',
          body: form
        }
      );

      if (!response.ok) throw new Error('Failed to save booking');
      const result = await response.json();

      if (editing) {
        dispatch(updateBooking(result));
        alert('Booking updated!');
      } else {
        dispatch(addBooking(result));
        alert('Booking added!');
      }

      dispatch(clearEditing());
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-teal-700 text-center mb-6">
          {editing ? 'Edit Tour Booking' : 'Add Tour Booking'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name of Place</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="e.g. Murree Hills"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">From</label>
            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="e.g. Lahore"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
             
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="e.g. 2500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Upload imageUrl</label>
            <input
              type="file"
              name="imageUrlUrl"
              accept="imageUrl/*"
              enctype='multipart/form-data'
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-xl"
            />

          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-xl font-semibold hover:bg-teal-500 transition duration-200"
          >
            {editing ? 'Update Booking' : 'Submit Booking'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTourBooking;

