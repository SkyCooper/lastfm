import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  artist: [],
  loading: false,
  error: false,
  darkMode: false,
};

const FetchSlice = createSlice({
  name: "lastfm",
  initialState,
  reducers: {
    fetchStart: (state, { payload }) => {
      state.loading = true;
    },
    fetchSuccess: (state, { payload }) => {
      state.loading = false;
      state.artist = payload;
      // console.log(payload);
      // içine ne geldi kontrol etmek için
    },
    fetchError: (state, { payload }) => {
      state.error = true;
      state.loading = false;
    },
    setdarkMode: (state, { payload }) => {
      state.darkMode = payload;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchError, setdarkMode } =
  FetchSlice.actions;

export default FetchSlice.reducer;
