import { useEffect, useState, useContext } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  TextField,
  MenuItem,
  Box,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { AuthContext } from '../contexts/AuthContext'

const GENRES = ['All', 'Action', 'Drama', 'Comedy', 'Thriller', 'Sci-Fi']

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext)

  // ✅ MUST be array
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('All')

  // 🔹 Fetch movies
  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    try {
      const res = await api.get('/api/movies')

      // 🔥 FIX: backend returns { data: [...] }
      setMovies(res.data.data || [])
    } catch (err) {
      console.error(err)
      alert('Failed to load movies')
    }
  }

  // 🔹 Delete movie
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this movie?')) return

    try {
      await api.delete(`/api/movies/${id}`)
      fetchMovies()
    } catch (err) {
      console.error(err)
      alert('Failed to delete movie')
    }
  }

  // 🔹 Search + Genre filter
  const filteredMovies = movies.filter((movie) => {
    const matchSearch =
      movie.title.toLowerCase().includes(search.toLowerCase()) ||
      movie.description.toLowerCase().includes(search.toLowerCase())

    const matchGenre =
      genre === 'All' || movie.genre === genre

    return matchSearch && matchGenre
  })

  return (
    <>
      {/* 🔝 NAVBAR */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            🎬 Admin Dashboard
          </Typography>

          <TextField
            size="small"
            placeholder="Search movies..."
            sx={{ bgcolor: 'white', borderRadius: 1, mr: 2 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

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

          <Button
            variant="contained"
            color="success"
            sx={{ mr: 2 }}
            onClick={() => navigate('/admin/add')}
          >
            + Add Movie
          </Button>

          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* 🎬 MOVIES GRID */}
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {filteredMovies.length === 0 && (
            <Typography sx={{ m: 2 }}>No movies found</Typography>
          )}

          {filteredMovies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie._id}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={
                    movie.poster ||
                    'https://via.placeholder.com/300x450?text=No+Image'
                  }
                  alt={movie.title}
                />

                <CardContent>
                  <Typography variant="h6" noWrap>
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {movie.genre || 'N/A'} • ⭐ {movie.rating || 'N/A'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {movie.duration || 'N/A'}
                  </Typography>
                </CardContent>

                <CardActions sx={{ justifyContent: 'space-between' }}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() =>
                      navigate(`/admin/edit/${movie._id}`)
                    }
                  >
                    Edit
                  </Button>

                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={() => handleDelete(movie._id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}
