import { createSlice } from "@reduxjs/toolkit";
import { postsApi } from "./postsApi";

export interface PostsState {
  isAddPostFormVisible: boolean;
  latestPostId: string | null;
}

const initialState: PostsState = {
  isAddPostFormVisible: false,
  latestPostId: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    toggleAddPostFormVisibility(state) {
      state.isAddPostFormVisible = !state.isAddPostFormVisible;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      postsApi.endpoints.fetchPosts.matchFulfilled,
      (state, { payload }) => {
        state.latestPostId = payload[payload.length - 1]?.id || null;
      },
    );
  },
});

export const { toggleAddPostFormVisibility } = postsSlice.actions;
export default postsSlice.reducer;
