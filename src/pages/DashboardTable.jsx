import { useMemo } from 'react'
import useAuth from '../auth/hooks/useAuth'

import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'

export default function DashboardTable({ data }) {
  // Columns should be memoized or stable
  const { user } = useAuth()

  // Remove columns based on role
  const role = 'superadmin'
  const initialiseTableState = () => {
    if (user.role === 'user') {
      return {
        email: false,
        ip_address: false,
      }
    }
    if (role === 'admin') {
      return {}
    }
    if (role === 'superadmin') return { ip_address: false }
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: 'first_name', // access nested data with dot notation
        header: 'First Name',
        size: 150,
      },
      {
        accessorKey: 'last_name',
        header: 'Last Name',
        size: 150,
      },
      {
        accessorKey: 'email', //normal accessorKey
        header: 'Email',
        size: 200,
      },
      {
        accessorKey: 'gender',
        header: 'Gender',
        size: 150,
      },
      {
        accessorKey: 'ip_address',
        header: 'IP Addess',
        size: 150,
      },
    ],
    []
  )
  // Data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  const table = useMaterialReactTable({
    columns,
    data,
    enableHiding: false,
    initialState: {
      columnVisibility: initialiseTableState(),
    },
    muiTablePaperProps: {
      elevation: 0, //change the mui box shadow
      //customize paper styles
      sx: {
        borderRadius: '1',
        border: '1px solid #e0e0e0',
      },
    },
  })

  return <MaterialReactTable table={table} />
}
