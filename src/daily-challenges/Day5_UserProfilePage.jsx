import { useState, useEffect } from "react";
import Tabs from "./Day3_Tabs";

function UserProfilePage({ userId = 1 }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAll() {
      try {
        setLoading(true);
        setError(null);

        const [userRes, postsRes, todosRes] = await Promise.all([
          fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
          fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`),
          fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`),
        ]);

        if (!userRes.ok || !postsRes.ok || !todosRes.ok) {
          throw new Error("Failed to load profile data");
        }

        const [userData, postsData, todosData] = await Promise.all([
          userRes.json(),
          postsRes.json(),
          todosRes.json(),
        ]);

        setUser(userData);
        setPosts(postsData);
        setTodos(todosData);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, [userId]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return null;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <p>{user.company?.name}</p>

      <Tabs
        tabs={[
          {
            label: "Info",
            content: (
              <div>
                <p>Phone: {user.phone}</p>
                <p>Website: {user.website}</p>
                <p>
                  Address: {user.address?.street}, {user.address?.city}
                </p>
              </div>
            ),
          },
          {
            label: `Posts (${posts.length})`,
            content: (
              <ul>
                {posts.map((post) => (
                  <li key={post.id}>{post.title}</li>
                ))}
              </ul>
            ),
          },
          {
            label: `Todos (${todos.length})`,
            content: (
              <ul>
                {todos.map((todo) => (
                  <li
                    key={todo.id}
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                    }}
                  >
                    {todo.title}
                  </li>
                ))}
              </ul>
            ),
          },
        ]}
      />
    </div>
  );
}

export default UserProfilePage;
