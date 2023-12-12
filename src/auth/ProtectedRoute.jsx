import { Navigate, useLocation } from 'react-router-dom'
import useAuth from './hooks/useAuth'

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth()
  const location = useLocation()
  /*
   * Handle smart redirect -
   * add protected route to state
   */
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}
export default ProtectedRoute
