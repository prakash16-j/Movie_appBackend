import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

// Public pages
import Home from './pages/Home'
import Search from './pages/Search'
import Login from './pages/Login'
import Register from './pages/Register'
import MovieDetails from './pages/MovieDetails'
import NotFound from './pages/NotFound'

// Admin pages
import AdminDashboard from './pages/AdminDashboard'
import AdminAddMovie from './pages/AdminAddMovie'
import AdminEditMovie from './pages/AdminEditMovie'

// Route guard
import ProtectedRoute from './routes/ProtectedRoute'

const router = createBrowserRouter([
  // 🌍 Public routes
  { path: '/', element: <Home /> },
  { path: '/search', element: <Search /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },

  // 🎬 Movie details (login required)
  {
    path: '/movie/:id',
    element: (
      <ProtectedRoute>
        <MovieDetails />
      </ProtectedRoute>
    ),
  },

  // 🛠 Admin routes
  {
    path: '/admin/dashboard',
    element: (
      <ProtectedRoute role="admin">
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
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

  // ❌ Fallback
  { path: '*', element: <NotFound /> },
])

export default router
