import { useState, useEffect } from "react";

function ApiSearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounce: wait 400ms after the user stops typing before
  // updating debouncedQuery, which is what actually triggers the fetch.
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();

      const filtered = data.filter((user) =>
        user.name.toLowerCase().includes(debouncedQuery.toLowerCase())
      );

      setUsers(filtered);
      setLoading(false);
    }

    fetchUsers();
  }, [debouncedQuery]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users..."
      />

      {loading && <p>Loading...</p>}

      {!loading && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ApiSearch;
