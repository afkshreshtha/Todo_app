import React, { useContext } from 'react'
import { Context } from '../main'
import Loader from '../components/Loader'
import toast from 'react-hot-toast'
const Profile = () => {
  const { isAuthenticated, loading, user } = useContext(Context)
  if (!isAuthenticated)  toast.error('Login First to see your profile')
  return loading ? (
    <Loader />
  ) : (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  )
}

export default Profile
