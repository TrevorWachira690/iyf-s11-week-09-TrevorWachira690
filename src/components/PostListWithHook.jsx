import useFetch from "../hooks/useFetch";

function PostCardSimple({ post }) {
  return (
    <article className="post-card">
      <h3>{post.title}</h3>
      <p>{post.body.slice(0, 100)}...</p>
    </article>
  );
}

function PostListWithHook() {
  const { data: posts, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {posts.map((post) => (
        <PostCardSimple key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostListWithHook;
