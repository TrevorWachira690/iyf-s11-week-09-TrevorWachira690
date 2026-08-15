import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <div className="layout">
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>

      <main>
        <Outlet /> {/* Child routes render here */}
      </main>

      <footer>
        <p>&copy; 2026 CommunityHub</p>
      </footer>
    </div>
  );
}

export default Layout;
