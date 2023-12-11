import useAuth from '../auth/hooks/useAuth'

export default function Home() {
  const { token, onLogin } = useAuth()

  return (
    <>
      <h2>Login (Public)</h2>
      {!token && (
        <button type="button" onClick={onLogin}>
          Log In
        </button>
      )}
    </>
  )
}
