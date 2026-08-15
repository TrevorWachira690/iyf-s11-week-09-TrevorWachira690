import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <article className="post-card">
      <h3>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h3>
      <p>{post.body.slice(0, 100)}...</p>
    </article>
  );
}

export default PostCard;
