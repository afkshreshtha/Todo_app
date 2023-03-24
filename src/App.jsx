import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import { Context, server } from './main'

import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'

function App() {
  const { setUser, setIsAuthenticated, setLoading } = useContext(Context)
  const fetchUserData = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(`${server}/users/me`, {
        withCredentials: true,
      })
      setUser(data.user)
      setIsAuthenticated(true)
    } catch (error) {
      setUser({})

      setIsAuthenticated(false)
    }
    setLoading(false)
  }
  useEffect(() => {
    fetchUserData()
  }, [])
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App
