
import { configureStore } from "@reduxjs/toolkit";
import sitesReducer from "../api/sitesSlice";

export const store = configureStore({
  reducer: {
    sites: sitesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
