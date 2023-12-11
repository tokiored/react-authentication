import { createContext, useState } from 'react'
import { fakeLogin } from '../api'
import { useLocation, useNavigate } from 'react-router-dom'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogin = async () => {
    const token = await fakeLogin()
    setToken(token)
    /*
     * Handle smart redirect
     * About page added to test behaviour
     */
    const redirect = location.state?.from?.pathname || '/dashboard'
    navigate(redirect)
  }

  const handleLogout = () => {
    setToken(null)
  }

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
