import { createSlice } from "@reduxjs/toolkit";

const authState = {
    isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")) || false,
}

export const authSlice = createSlice({
    name: "Authentication",
    initialState: authState,
    reducers: {
        userLogin: (state, action) => {
            state.isAuthenticated = true
            localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated));
        },

        userLogOut: (state, action) => {
            state.isAuthenticated = false
            localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated));
        },
    }
})

export const {userLogin, userLogOut} = authSlice.actions
export default authSlice.reducer

