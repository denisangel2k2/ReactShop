import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const productApiSlice = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001',
    }),
    endpoints: (builder) => ({
        getProductsForCategory: builder.query({
            query: ([category,skip,itemsPerPage,searchText]) => ({
                    url: searchText === '' ? (category==='' ? `/products?limit=${itemsPerPage}&skip=${skip}` : `/products/category/${category}?limit=${itemsPerPage}&skip=${skip}`) : `/products/title/${searchText}?limit=${itemsPerPage}&skip=${skip}`,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
            }),
        }),
    })
});

export const ordersApiSlice = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/orders',
    }),
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: (authKey) => ({
                url: `/`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "token": authKey
                },
            }),
        }),
    })
});

export const reviewsApiSlice = createApi({
    reducerPath: 'reviewsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/reviews',
    }),
    tagTypes: ['Reviews'],
    endpoints: (build) => ({
        getReviews: build.query({
            query: (productId) => ({
                url: `/product/${productId}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }),
            providesTags: ['Reviews']
        }),
        addReview: build.mutation({
            query: ([productId,rating,comment,title,token]) => ({
                url: `/add`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "token": JSON.parse(token)
                },
                body: {
                    productId: productId,
                    rating: rating,
                    comment: comment,
                    title: title,
                }
            }),
            invalidatesTags: ['Reviews']
        }),
    })
});

export const {useGetProductsForCategoryQuery} = productApiSlice;
export const {useGetOrdersQuery} = ordersApiSlice;
export const {useGetReviewsQuery,useAddReviewMutation} = reviewsApiSlice;
