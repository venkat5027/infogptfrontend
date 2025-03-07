import { configureStore } from "@reduxjs/toolkit";
import questionAndResponseSlice from "./questionAndResponseSlice";
import { apiSlice } from "../api/apiSlice";

const store = configureStore({
  reducer: {
    fieldData: questionAndResponseSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
