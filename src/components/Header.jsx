import { NavLink } from 'react-router-dom'
import useAuth from '../auth/hooks/useAuth'

export default function Navigation() {
  const { token, onLogout } = useAuth()

  return (
    <header>
      <NavLink className="site-logo" to="/">
        #tokiored
      </NavLink>
      {token && (
        <nav>
          {/* <NavLink to="/Profile">Profile</NavLink> */}
          {/* <NavLink to="/Login">Home</NavLink> */}
          {/* <NavLink to="/dashboard">Dashboard</NavLink> */}
          {/* <NavLink to="/">Go to your Dashboard</NavLink> */}
          <button type="button" className="logout-button" onClick={onLogout}>
            Log Out
          </button>
        </nav>
      )}
    </header>
  )
}
