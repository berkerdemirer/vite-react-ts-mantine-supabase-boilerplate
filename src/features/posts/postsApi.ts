import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "./postsTypes";

// Mock endpoint URL
const BASE_URL = "https://myapi.com/posts";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    fetchPosts: builder.query<Post[], void>({
      query: () => "",
    }),
    // Add more endpoints as needed
  }),
});

export const { useFetchPostsQuery } = postsApi;