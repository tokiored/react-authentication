import useAuth from '../auth/hooks/useAuth'

export default function Dashboard() {
  const { token } = useAuth()

  return (
    <>
      <h2>Dashboard (Protected)</h2>
      <div>Authenticated as {token}</div>
    </>
  )
}
