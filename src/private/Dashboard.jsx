import { useEffect, useState } from 'react'
import { getUsers } from '../api'

import useAuth from '../auth/hooks/useAuth'
import DashboardTable from './DashboardTable'

export default function Dashboard() {
  const { user } = useAuth()
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUserList = async () => {
      try {
        const data = await getUsers()
        setUsers(data)
      } catch (err) {
        console.log('Users list is missing')
      }
    }
    getUserList()
    // Gets called when the component unmounts
    return () => {}
  }, [])

  return (
    <>
      <h2>Dashboard (Protected)</h2>
      <h3>
        Hello {user.name}, your role is `{user.role}`. Welcome to your
        dashboard.
      </h3>

      {users && users.length ? (
        <DashboardTable data={users} />
      ) : (
        'Loading Users Table...'
      )}
    </>
  )
}
