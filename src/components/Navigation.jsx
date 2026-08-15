import { useNavigate, NavLink } from "react-router-dom";

function Navigation({ username, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <nav>
      {/* NavLink adds an active class automatically when the route matches */}
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        Home
      </NavLink>
      <NavLink to="/posts" className={({ isActive }) => (isActive ? "active" : "")}>
        Posts
      </NavLink>

      {username && (
        <>
          <span>Hi, {username}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
}

export default Navigation;
