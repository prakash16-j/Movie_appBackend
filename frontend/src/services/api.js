import axios from 'axios'

const api = axios.create({
  baseURL: 'https://movie-appbackend.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
  },
})

// 🔐 Attach token + disable cache per request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // 👇 THIS FIXES 304 ISSUE
  config.headers['If-None-Match'] = ''
  config.headers['If-Modified-Since'] = ''

  return config
})

export default api
