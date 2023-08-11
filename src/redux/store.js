import {configureStore} from "@reduxjs/toolkit";
import {productsReducer} from "./slices/products";
import {productApiSlice} from "./apis";

export const store= configureStore({
    reducer: {
        products: productsReducer,
        [productApiSlice.reducerPath]: productApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApiSlice.middleware)
});