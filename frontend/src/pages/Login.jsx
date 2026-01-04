import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import api from '../services/api'

export default function Login() {
    const { login } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await api.post('/auth/login', { email, password })
            login(data)
            navigate('/')
        } catch (err) {
            console.error(err)
            alert('Login failed')
        }
    }

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input className="w-full p-2 border" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input className="w-full p-2 border" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button className="px-4 py-2 bg-blue-600 text-white">Login</button>
            </form>
        </div>
    )
}
