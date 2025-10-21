import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    editing: null,
    bookings: [],
    searchTerm: '',
    sortType: '',
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
      state.bookings = state.bookings.sort(b => b._id !== action.payload);
    },

    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setsortType(state, action) {
      state.sortType = action.payload;
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
  setSearchTerm,
  setsortType,
} = bookingSlice.actions;

export const selectBookings = (state) => state.booking.bookings;
export const selectSearchTerm = (state) => state.booking.searchTerm;
export const selectsortType = (state) => state.booking.sortType;

export default bookingSlice.reducer;
