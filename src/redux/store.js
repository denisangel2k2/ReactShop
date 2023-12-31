import {configureStore} from "@reduxjs/toolkit";
import {productsReducer} from "./slices/products";
import {ordersApiSlice, productApiSlice, reviewsApiSlice} from "./apis";

export const store= configureStore({
    reducer: {
        products: productsReducer,
        [productApiSlice.reducerPath]: productApiSlice.reducer,
        [ordersApiSlice.reducerPath]: ordersApiSlice.reducer,
        [reviewsApiSlice.reducerPath]: reviewsApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(productApiSlice.middleware)
        .concat(ordersApiSlice.middleware)
        .concat(reviewsApiSlice.middleware)
});