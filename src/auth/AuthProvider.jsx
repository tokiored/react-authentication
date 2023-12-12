import { useEffect, createContext, useState } from 'react'
import { login } from '../api'
import { useLocation, useNavigate } from 'react-router-dom'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  // Initial processing state is true as
  // authentication tasks are always required on load
  const [isProcessing, setIsProcessing] = useState(true)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setIsProcessing(true)

    // Get user from localStorgage
    const localUser = localStorage.getItem('user')
    const localToken = localStorage.getItem('token')
    const isAuthenticated = JSON.parse(localUser)

    if (isAuthenticated) {
      // TODO: token is required for `useAuth` hook
      // combine the `user` and `token` data
      setToken(localToken)
      setUser(isAuthenticated)
    }
    setIsProcessing(false)
  }, [])

  const handleLogin = async (creds) => {
    setIsProcessing(true)

    const data = await login(creds)

    // Update state and save cookie...nom nom
    setUser(data.user)
    setToken(data.token)

    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))

    setIsProcessing(false)

    // Handle smart redirect
    // About page added to test behaviour
    const redirect = location.state?.from?.pathname || '/dashboard'
    navigate(redirect)
  }

  const handleLogout = () => {
    // Clear state and local storage
    setUser(null)
    setToken(null)
    localStorage.removeItem('user')
  }

  const value = {
    token,
    user,
    isProcessing,
    onLogin: handleLogin,
    onLogout: handleLogout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
