import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import Login from './pages/Login'
import AdminAddMovie from './pages/AdminAddMovie'
import AdminEditMovie from './pages/AdminEditMovie'
import ProtectedRoute from './routes/ProtectedRoute'
import NotFound from './pages/NotFound'

const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/search', element: <Search /> },
    { path: '/login', element: <Login /> },
    {
        path: '/admin/add',
        element: (
            <ProtectedRoute role="admin">
                <AdminAddMovie />
            </ProtectedRoute>
        ),
    },
    {
        path: '/admin/edit/:id',
        element: (
            <ProtectedRoute role="admin">
                <AdminEditMovie />
            </ProtectedRoute>
        ),
    },
    { path: '*', element: <NotFound /> },
])

export default router
