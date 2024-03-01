import { selector } from "@/store/utils";

export const selectIsAddPostFormVisible = selector(
  (state) => state.posts.isAddPostFormVisible,
);
export const selectLatestPostId = selector((state) => state.posts.latestPostId);
