import { useEffect, createContext, useState } from 'react'
import { login } from '../api'
import { useLocation, useNavigate } from 'react-router-dom'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null) // deprecated
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    console.log('Auth Proivde useEffect')
    // Get user from localStorgage
    const localUser = localStorage.getItem('user')
    const isAuthenticated = JSON.parse(localUser)

    // TODO: Validate token/user with the server
    if (isAuthenticated) {
      // TODO: token is required for all `useAuth` hooks imports
      // combine the `user` and `token` on authectication
      const localToken = localStorage.getItem('token')
      setToken(localToken)
      setUser(isAuthenticated)
    }
  }, [])

  const handleLogin = async (creds) => {
    console.log('handlling Login...')
    const data = await login(creds)

    // Update state and save cookie...nom nom
    setToken(data.token)
    setUser(data.user)
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(data.user))

    // Handle smart redirect
    // About page added to test behaviour
    const redirect = location.state?.from?.pathname || '/dashboard'
    navigate(redirect)
  }

  const handleLogout = () => {
    // Clear state and local storage
    setToken(null)
    setUser(null)
    localStorage.removeItem('user')
  }

  const value = {
    token,
    user,
    onLogin: handleLogin,
    onLogout: handleLogout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
