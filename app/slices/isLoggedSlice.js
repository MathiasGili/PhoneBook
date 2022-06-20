import { createSlice } from "@reduxjs/toolkit"


const initialStateIsLogged = false;

export const isLoggedSlice = createSlice({
    name: 'isLogged',
    initialState: initialStateIsLogged,
    reducers: {
        storeIsLogged: (state, action) => {
            localStorage.setItem("isLogged", true);
            return action.payload
        }
    }
})


export const { storeIsLogged } = isLoggedSlice.actions;
export default isLoggedSlice.reducer;
