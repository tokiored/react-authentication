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
    <div className="container">
      <h1>Hello {user.name}, welcome to your dashboard.</h1>
      <div className="label">Your role is: {user.role}</div>

      {users && users.length ? (
        <DashboardTable data={users} />
      ) : (
        <h3>Loading Users Table...</h3>
      )}
    </div>
  )
}
