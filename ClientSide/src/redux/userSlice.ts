import { createSlice } from "@reduxjs/toolkit";

const userInit = {
    isLogged: false,
    name: null,
    role: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState: userInit,
    reducers: {
        changeIsLogged: (state, action) => {
            state.isLogged = action.payload.isLogged;
        },
        setName: (state, action) => {
            state.name = action.payload.name;
        },
        setRole: (state, action) => {
            state.role = action.payload.role;
        }
    }
})
export const { changeIsLogged, setName, setRole } = userSlice.actions;
export default userSlice.reducer;