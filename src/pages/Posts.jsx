import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import LoadingSpinner from "../components/shared/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../components/shared/ErrorMessage/ErrorMessage";

function Posts() {
  const { data: posts, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (loading) return <LoadingSpinner text="Loading posts..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h1>All Posts</h1>
      <div className="post-list">
        {posts.slice(0, 10).map((post) => (
          <article key={post.id} className="post-card">
            <h3>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </h3>
            <p>{post.body.slice(0, 100)}...</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Posts;
