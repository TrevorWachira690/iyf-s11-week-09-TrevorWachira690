import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PostCard from "../components/Post/PostCard";

function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [postId]);

  if (!post) return <p>Loading...</p>;

  return (
    <article>
      <Link to="/posts">&larr; Back to Posts</Link>
      <PostCard post={post} />
    </article>
  );
}

export default PostDetail;
