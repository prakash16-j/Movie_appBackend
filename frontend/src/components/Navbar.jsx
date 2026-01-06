import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Menu,
  Box,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useUI } from '../contexts/UIContext'
import { useState } from 'react'

const GENRES = [
  'All',
  'Action',
  'Drama',
  'Comedy',
  'Thriller',
  'Sci-Fi',
  'Romance',
]

export default function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { search, setSearch, genre, setGenre } = useUI()

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget)
  const handleMenuClose = () => setAnchorEl(null)

  return (
    <AppBar position="fixed" sx={{ zIndex: 1300 }}>
      <Toolbar sx={{ gap: 2 }}>
        {/* LOGO */}
        <Typography
          variant="h6"
          sx={{ cursor: 'pointer', fontWeight: 600 }}
          onClick={() => navigate('/')}
        >
          🎬 MovieApp
        </Typography>

        {/* DESKTOP SEARCH + GENRE */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            gap: 2,
            flexGrow: 1,
          }}
        >
          <TextField
            size="small"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ bgcolor: 'white', borderRadius: 1, minWidth: 220 }}
          />

          <Select
            size="small"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            sx={{ bgcolor: 'white', borderRadius: 1, minWidth: 140 }}
          >
            {GENRES.map((g) => (
              <MenuItem key={g} value={g}>
                {g}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* DESKTOP AUTH BUTTONS */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
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
            <>
              {user.role === 'admin' && (
                <Button
                  color="inherit"
                  onClick={() => navigate('/admin/dashboard')}
                >
                  Admin
                </Button>
              )}
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </>
          )}
        </Box>

        {/* MOBILE MENU ICON */}
        <IconButton
          color="inherit"
          sx={{ display: { xs: 'block', md: 'none' } }}
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>

        {/* MOBILE MENU */}
        <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
          {/* SEARCH */}
          <MenuItem disableRipple>
            <TextField
              size="small"
              fullWidth
              placeholder="Search movies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </MenuItem>

          {/* GENRE */}
          <MenuItem disableRipple>
            <Select
              fullWidth
              size="small"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              {GENRES.map((g) => (
                <MenuItem key={g} value={g}>
                  {g}
                </MenuItem>
              ))}
            </Select>
          </MenuItem>

          {!user ? (
            <>
              <MenuItem onClick={() => navigate('/login')}>Login</MenuItem>
              <MenuItem onClick={() => navigate('/register')}>
                Register
              </MenuItem>
            </>
          ) : (
            <>
              {user.role === 'admin' && (
                <MenuItem
                  onClick={() => navigate('/admin/dashboard')}
                >
                  Admin Dashboard
                </MenuItem>
              )}
              <MenuItem onClick={logout}>Logout</MenuItem>
            </>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  )
}
