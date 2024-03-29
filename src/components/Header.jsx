import axios from 'axios'
import React, { useContext } from 'react'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { Context, server } from '../main'
import logo from '../assets/logo.png'
const Header = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    loading,
    setLoading,
  } = useContext(Context)

  const logoutHandler = async () => {
    setLoading(true)
    try {
      await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      })

      toast.success('Logged out successfully')
      setIsAuthenticated(false)
      setLoading(false)
    } catch (error) {
      toast.error(error.response.data.message)
      setIsAuthenticated(true)
      setLoading(false)
    }
  }

  return (
    <nav className="header">
      <div>
        <img src={logo} alt="logo" width={60} />
      </div>
      <article>
        <Link to={'/'}>Home</Link>
        <Link to={'/profile'}>Profile</Link>
        {isAuthenticated ? (
          <button className="btn" onClick={logoutHandler} disabled={loading}>
            Logout
          </button>
        ) : (
          <Link to={'/login'}>Login</Link>
        )}
      </article>
    </nav>
  )
}

export default Header
