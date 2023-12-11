import { useEffect, createContext, useState } from 'react'
import { login } from '../api'
import { useLocation, useNavigate } from 'react-router-dom'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // TODO: Get token from localStorgage
    // TODO: Validate token with the server
    // const token = localStorage.getItem('token')
    // setToken(token)
  }, [])

  const handleLogin = async (creds) => {
    console.log('handlling Login...')
    const data = await login(creds)
    // localStorage.setItem('loggedin', true)
    setToken(data.token)

    // Handle smart redirect
    // About page added to test behaviour
    const redirect = location.state?.from?.pathname || '/dashboard'
    navigate(redirect)
  }

  const handleLogout = () => {
    // TODO: Clear local storage data
    // localStorage.removeItem('token');
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
