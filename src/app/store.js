import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/service/apiSlice";
import authReducer from "../features/slice/authSlice";
import driverHiringReducer from "../features/driverHiring/driverHiringSlice";
import mlmReducer from "../features/Mlm/mlmSlice";
import userReducer from "../features/users/userSlice"
import adminReducer from "../features/users/adminSlice"
import serviceReducer from "../features/service/serviceSlice"
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user:userReducer,
     admin: adminReducer,
    auth: authReducer,
    driverHiring: driverHiringReducer,
    services: serviceReducer,
    mlm: mlmReducer, // Add MLM reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});