import { createContext, useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

// ==========================================================
// Fake auth "context" — just stores a username in state.
// In a real app this would validate against a backend.
// ==========================================================
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("fake_username") || null;
  });

  const login = (name) => {
    setUsername(name);
    localStorage.setItem("fake_username", name);
  };

  const logout = () => {
    setUsername(null);
    localStorage.removeItem("fake_username");
  };

  return (
    <AuthContext.Provider value={{ username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

// ==========================================================
// Login form
// ==========================================================
export function LoginPage() {
  const [name, setName] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    login(name.trim());
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter a username"
      />
      <button type="submit">Log In</button>
    </form>
  );
}

// ==========================================================
// Protected route wrapper — redirects to /login if not "logged in"
// ==========================================================
export function ProtectedRoute({ children }) {
  const { username } = useAuth();

  if (!username) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// ==========================================================
// Header showing username + logout, when logged in
// ==========================================================
export function AuthHeader() {
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!username) return null;

  return (
    <div>
      <span>Logged in as {username}</span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

// ==========================================================
// Example protected page
// ==========================================================
export function Dashboard() {
  const { username } = useAuth();
  return <h1>Welcome to your dashboard, {username}!</h1>;
}

// ==========================================================
// USAGE (in App.jsx, wrapped in <AuthProvider> at the root):
//
// <AuthProvider>
//   <Routes>
//     <Route path="/login" element={<LoginPage />} />
//     <Route
//       path="/dashboard"
//       element={
//         <ProtectedRoute>
//           <Dashboard />
//         </ProtectedRoute>
//       }
//     />
//   </Routes>
// </AuthProvider>
// ==========================================================
