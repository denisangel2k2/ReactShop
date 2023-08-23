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

export const {useGetProductsForCategoryQuery} = productApiSlice;
