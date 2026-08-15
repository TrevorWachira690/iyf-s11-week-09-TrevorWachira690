import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../shared/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../shared/ErrorMessage/ErrorMessage";
import PostCard from "./PostCard";

function PostList() {
  const { data: posts, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (loading) return <LoadingSpinner text="Loading posts..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!posts || posts.length === 0) return <p>No posts found.</p>;

  return (
    <div className="post-list">
      {posts.slice(0, 10).map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;
