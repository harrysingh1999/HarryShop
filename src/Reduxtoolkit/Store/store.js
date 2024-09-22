import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../cartSlice/cartSlice";
import authReducer from "../authSlice/authSlice";
import { productsAPI } from "../apiSlice/apiSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    [productsAPI.reducerPath]: productsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsAPI.middleware),
});