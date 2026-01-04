import React, { createContext, useState, useEffect } from 'react'
import api from '../services/api'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const raw = localStorage.getItem('user')
            return raw ? JSON.parse(raw) : null
        } catch {
            return null
        }
    })

    useEffect(() => {
        if (user && user.token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            delete api.defaults.headers.common['Authorization']
            localStorage.removeItem('user')
        }
    }, [user])

    const login = (userData) => setUser(userData)
    const logout = () => setUser(null)

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
