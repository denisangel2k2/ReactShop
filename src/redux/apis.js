import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const productApiSlice = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://dummyjson.com',
    }),
    endpoints: (builder) => ({
        getProductsForCategory: builder.query({
            query: ([category,skip,itemsPerPage,authKey]) => ({
                    url: category === '' ? `/products?limit=${itemsPerPage}&skip=${skip}` : `/products/category/${category}?limit=${itemsPerPage}&skip=${skip}`,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Internship-Auth': authKey
                    }
            }),
        }),
    })
});

export const {useGetProductsForCategoryQuery} = productApiSlice;
