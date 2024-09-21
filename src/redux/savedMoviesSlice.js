import { createSlice } from '@reduxjs/toolkit';

const savedMoviesSlice = createSlice({
  name: 'savedMovies',
  initialState: {
    savedMovies: [],
  },
  reducers: {
    addMovie: (state, action) => {
      state.savedMovies.push(action.payload);
    },
    removeMovie: (state, action) => {
      state.savedMovies = state.savedMovies.filter(movie => movie.id !== action.payload);
    },
    setSavedMovies: (state, action) => {
      state.savedMovies = action.payload;
    }
  },
});

export const { addMovie, removeMovie, setSavedMovies } = savedMoviesSlice.actions;
export default savedMoviesSlice.reducer;