import { Link, NavLink } from 'react-router-dom'


function Header({ currentUser, onLogout }) {
  return (
    <header className="site-header">
      <div className="header-content">
        <Link className="site-name" to="/">Campus Lost &amp; Found</Link>

        <nav aria-label="Main navigation">
          <NavLink to="/" end>Board</NavLink>
          <NavLink to="/post-item">Post Item</NavLink>
          <NavLink to="/my-posts">My Posts</NavLink>

          {currentUser ? (
            <>
              <span className="student-name">{currentUser.name}</span>
              <button type="button" onClick={onLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
