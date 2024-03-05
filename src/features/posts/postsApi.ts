import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "./postsTypes";

// Mock endpoint URL
const BASE_URL = "https://jsonplaceholder.typicode.com/posts";
export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    fetchPosts: builder.query<Post[], void>({
      query: () => "",
    }),
    // Add more endpoints as needed
  }),
});

export const { useFetchPostsQuery } = postsApi;
