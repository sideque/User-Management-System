import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user")) || null
}

const authSlice = createSlice({

    name: "auth", initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user || null;
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("role", action.payload.role);
            localStorage.setItem("user",
                JSON.stringify(action.payload.user));
        },

        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },

        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("user");
        }
    },
})

export const { setCredentials, logout, setUser } = authSlice.actions

export default authSlice.reducer