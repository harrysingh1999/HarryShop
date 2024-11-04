import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsAPI = createApi({
  reducerPath: "productsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => "products/categories",
      keepUnusedDataFor: 180,
      
    }),
    getCategoryProducts: builder.query({
      query: (category) => `products/category/${category}`,
    }),
    getBannerDetails: builder.query({
      query: (data) => `products/category/${data}`,
      keepUnusedDataFor: 180,
    }),
    getProductDetails: builder.query({
      query: (productid) => `products/${productid}`,
    }),
    getSearchDetails: builder.query({
      query: (input) => `products/search?q=${input}`,
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryProductsQuery,
  useGetBannerDetailsQuery,
  useGetProductDetailsQuery,
  useGetSearchDetailsQuery,
} = productsAPI;
