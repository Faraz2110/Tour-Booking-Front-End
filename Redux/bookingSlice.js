
import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    editing: null,
    bookings: [],
  },
  reducers: {
    setEditing(state, action) {
      state.editing = action.payload;
    },
    clearEditing(state) {
      state.editing = null;
    },
    setBookings(state, action) {
      state.bookings = action.payload;
    },
    addBooking(state, action) {
      state.bookings.push(action.payload);
    },
    updateBooking(state, action) {
      const index = state.bookings.findIndex(b => b._id === action.payload._id);
      if (index !== -1) {
        state.bookings[index] = action.payload;
      }
    },
    deleteBooking(state, action) {
      state.bookings = state.bookings.filter(b => b._id !== action.payload);
    },
  },
});

export const {
  setEditing,
  clearEditing,
  setBookings,
  addBooking,
  updateBooking,
  deleteBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
