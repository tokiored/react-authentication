import { NavLink } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container">
      <h2>404 Page not found...</h2>
      <NavLink className="link-button" to="/">
        Click here to go back to your dashboard
      </NavLink>
    </div>
  )
}
