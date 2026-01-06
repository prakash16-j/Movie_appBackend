import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

// Layout
import Layout from './components/Layout'

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
  {
    path: '/',
    element: <Layout><Home /></Layout>,
  },
  {
    path: '/search',
    element: <Layout><Search /></Layout>,
  },
  {
    path: '/login',
    element: <Layout><Login /></Layout>,
  },
  {
    path: '/register',
    element: <Layout><Register /></Layout>,
  },
  {
    path: '/movie/:id',
    element: (
      <Layout>
        <ProtectedRoute>
          <MovieDetails />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/admin/dashboard',
    element: (
      <Layout>
        <ProtectedRoute role="admin">
          <AdminDashboard />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/admin/add',
    element: (
      <Layout>
        <ProtectedRoute role="admin">
          <AdminAddMovie />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/admin/edit/:id',
    element: (
      <Layout>
        <ProtectedRoute role="admin">
          <AdminEditMovie />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '*',
    element: <Layout><NotFound /></Layout>,
  },
])

export default router
