import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { UIProvider } from './contexts/UIContext'
import { AuthProvider } from './contexts/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <UIProvider>
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
  </UIProvider>

)
