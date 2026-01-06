import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  MenuItem,
  Box,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useUI } from '../contexts/UIContext'

const GENRES = ['All', 'Action', 'Drama', 'Comedy', 'Thriller', 'Sci-Fi']

export default function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { search, setSearch, genre, setGenre } = useUI()

  return (
    <AppBar position="fixed" sx={{ zIndex: 1300 }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          🎬 Movie App
        </Typography>

        {/* 🔍 SEARCH */}
        <TextField
          size="small"
          placeholder="Search movies..."
          sx={{ bgcolor: 'white', borderRadius: 1, mr: 2 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* 🎭 GENRE */}
        <TextField
          select
          size="small"
          sx={{ bgcolor: 'white', borderRadius: 1, mr: 2 }}
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          {GENRES.map((g) => (
            <MenuItem key={g} value={g}>
              {g}
            </MenuItem>
          ))}
        </TextField>

        {user?.role === 'admin' && (
          <Button
            variant="contained"
            color="success"
            sx={{ mr: 2 }}
            onClick={() => navigate('/admin/add')}
          >
            + Add Movie
          </Button>
        )}

        {!user ? (
          <>
            <Button color="inherit" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate('/register')}>
              Register
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}
