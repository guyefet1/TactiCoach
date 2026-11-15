import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header className="site-header">
      <NavLink className="brand" to="/">
        TactiCoach
      </NavLink>
      <nav className="navigation" aria-label="Main navigation">
        <NavLink to="/" end>
          Squad
        </NavLink>
        <NavLink to="/tactics">Tactics</NavLink>
        <NavLink to="/opponents">Opponents</NavLink>
      </nav>
    </header>
  )
}

export default Navbar
