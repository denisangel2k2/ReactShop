import {createSlice} from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setProds: (state, action) => {
            // state.products = action.payload;
            // console.log(action.payload);
            state.splice(0, state.length, ...action.payload);
        }
    }
});

export const {setProds} = productsSlice.actions;
export const productsReducer = productsSlice.reducer;