import React from "react";
import { useDispatch, useSelector } from "@/store/utils";
import { useFetchPostsQuery } from "@/features/posts/postsApi";
import {
  selectIsAddPostFormVisible,
  selectLatestPostId,
} from "@/features/posts/postsSelectors";
import { toggleAddPostFormVisibility } from "@/features/posts/postsSlice";

const PostsComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { data: posts, error, isLoading } = useFetchPostsQuery();
  const isAddPostFormVisible = useSelector(selectIsAddPostFormVisible);
  const latestPostId = useSelector(selectLatestPostId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred</div>;

  return (
    <div>
      <h2>Posts</h2>
      <button onClick={() => dispatch(toggleAddPostFormVisibility())}>
        {isAddPostFormVisible ? "Hide Add Post Form" : "Show Add Post Form"}
      </button>
      {isAddPostFormVisible && (
        <div>
          {/* Add Post Form Goes Here */}
          <p>Add Post Form Placeholder</p>
        </div>
      )}
      <div>
        {posts?.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
      <div>Latest Post ID: {latestPostId}</div>
    </div>
  );
};

export default PostsComponent;
