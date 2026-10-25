import { Link, NavLink } from 'react-router-dom'


function Header() {
  return (
    <header className="site-header">
      <div className="header-content">
        <Link className="site-name" to="/">Campus Lost &amp; Found</Link>

        <nav aria-label="Main navigation">
          <NavLink to="/" end>Board</NavLink>
          <NavLink to="/post-item">Post Item</NavLink>
          <NavLink to="/my-posts">My Posts</NavLink>

          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header
