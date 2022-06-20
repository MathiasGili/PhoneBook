import { createSlice } from "@reduxjs/toolkit"


const initialStateToken = '';

export const tokenSlice = createSlice({
    name: 'token',
    initialState: initialStateToken,
    reducers: {
        storeToken: (state, action) => {
            localStorage.setItem("token", JSON.stringify(action.payload))
            return action.payload
        }
    }
})


export const { storeToken } = tokenSlice.actions;
export default tokenSlice.reducer;
