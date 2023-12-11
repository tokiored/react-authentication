import { useState } from 'react'
import useAuth from '../auth/hooks/useAuth'
import { useLocation } from 'react-router-dom'

// export default function Home() {
//   const { token, onLogin } = useAuth()

//   return (
//     <>
//       <h2>Login (Public)</h2>
//       {!token && (
//         <button type="button" onClick={onLogin}>
//           Log In
//         </button>
//       )}
//     </>
//   )
// }
export default function Login() {
  const { token, onLogin } = useAuth()
  const location = useLocation()

  const initiliseForm = { email: '', password: '' }
  const [loginFormData, setLoginFormData] = useState(initiliseForm)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)

  function handleChange(e) {
    const { name, value } = e.target
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    // TODO: Handle Form Validation
    // https://leanylabs.com/blog/form-validation-in-react/

    e.preventDefault()
    setStatus('submitting')

    try {
      const response = await onLogin(loginFormData)
    } catch (err) {
      setError(err)
      setStatus('Idle')
    }
  }
  return (
    <div className="login-container">
      {location.state?.message && (
        <h3 className="login-error">{location.state.message}</h3>
      )}
      <h1>Sign in to your account</h1>
      {error?.message && <h3 className="login-error">{error.message}</h3>}

      <form onSubmit={handleSubmit} className="login-form">
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email address"
          value={loginFormData.email}
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={loginFormData.password}
        />
        <button disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Logging in...' : 'Log in'}
        </button>
      </form>
    </div>
  )
}
