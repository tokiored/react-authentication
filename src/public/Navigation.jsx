import { NavLink } from 'react-router-dom'
import useAuth from '../auth/hooks/useAuth'
export default function Navigation() {
  const { token, onLogout } = useAuth()

  return (
    <header>
      <nav>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/Profile">Profile</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>

        {token && (
          <button type="button" onClick={onLogout}>
            Log Out
          </button>
        )}
      </nav>
    </header>
  )
}
