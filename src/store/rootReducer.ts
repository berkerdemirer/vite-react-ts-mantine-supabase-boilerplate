import { combineReducers } from "@reduxjs/toolkit";
import postsReducer from "@/features/posts/postsSlice";
import { postsApi } from "@/features/posts/postsApi";

const rootReducer = combineReducers({
  posts: postsReducer,
  [postsApi.reducerPath]: postsApi.reducer,
});

export default rootReducer;
