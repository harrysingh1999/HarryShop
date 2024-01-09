import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../cartSlice/cartSlice";
import authReducer from "../authSlice/authSlice";
    
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
    }
})