import { configureStore } from "@reduxjs/toolkit";
import fetchSlice from "../features/FetchSlice";
const store = configureStore({
  reducer: {
    lastfm: fetchSlice,
  },
});
export default store;
