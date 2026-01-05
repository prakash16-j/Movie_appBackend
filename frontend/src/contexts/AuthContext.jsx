import { createContext, useContext, useState } from 'react'
import api from '../services/api'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user'))
  )

  // 🔐 LOGIN (API INTEGRATED)
  const login = async (email, password) => {
    const res = await api.post('/api/auth/login', { email, password })

    localStorage.setItem('token', res.data.token)
    localStorage.setItem('user', JSON.stringify(res.data.user))
    setUser(res.data.user)

    return res.data.user // 👈 REQUIRED
  }

  // ✅ SET USER AFTER REGISTER
  const setAuthFromRegister = (token, userData) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, setAuthFromRegister }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
