import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'

export default function Profile() {
    const {user}=useAuth0()
  return (
    <div>
        <h2>User Info</h2>
        {user?.name}
        {user?.profile}
        {user?.email}
    </div>
  )
}
