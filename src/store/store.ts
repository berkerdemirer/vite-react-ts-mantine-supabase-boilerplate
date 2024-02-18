import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "@/store/rootReducer";
import { postsApi } from "@/features/posts/postsApi";

const apiMiddlewares = [postsApi.middleware];

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...apiMiddlewares),
});

export type RootState = ReturnType<typeof store.getState>;
