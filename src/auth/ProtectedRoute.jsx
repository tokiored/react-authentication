import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from './hooks/useAuth'

const ProtectedRoute = ({ children }) => {
  const { token, isProcessing } = useAuth()
  const location = useLocation()
  /*
   * Handle smart redirect -
   * add protected route to state
   */
  if (token && !isProcessing) {
    return <Outlet />
  } else if (!token && !isProcessing) {
    return <Navigate to="/login" replace state={{ from: location }} />
  } else console.log('Waiting for `useAuth` processes to complete')
}
export default ProtectedRoute
