import { useEffect, useState } from 'react'
import {
  Grid,
  Container,
  Typography,
  CircularProgress,
  TextField,
  Select,
  MenuItem,
  Box,
} from '@mui/material'
import Navbar from '../components/Navbar'
import MovieCard from '../components/MovieCard'
import api from '../services/api'

const GENRES = [
  'All',
  'Action',
  'Drama',
  'Comedy',
  'Thriller',
  'Sci-Fi',
]

export default function Home() {
  const [movies, setMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('All')

  // 🔽 Fetch movies from backend (SAFE)
  useEffect(() => {
    api
      .get('/api/movies')
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.movies || []

        setMovies(data)
        setFilteredMovies(data)
      })
      .catch((err) => {
        console.error('Failed to fetch movies', err)
        setMovies([])
        setFilteredMovies([])
      })
      .finally(() => setLoading(false))
  }, [])

  // 🔍 SEARCH + GENRE FILTER (DOCUMENT COMPLIANT)
  useEffect(() => {
    let data = [...movies]

    // Search by title OR description
    if (search.trim()) {
      const keyword = search.toLowerCase()
      data = data.filter(
        (movie) =>
          movie.title?.toLowerCase().includes(keyword) ||
          movie.description?.toLowerCase().includes(keyword)
      )
    }

    // Filter by genre
    if (genre !== 'All') {
      data = data.filter(
        (movie) => movie.genre === genre
      )
    }

    setFilteredMovies(data)
  }, [search, genre, movies])

  return (
    <>
      <Navbar />

      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Movies
        </Typography>

        {/* 🔎 Search & Genre Filter */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mb: 3,
            flexWrap: 'wrap',
          }}
        >
          <TextField
            label="Search by name or description"
            variant="outlined"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            sx={{ minWidth: 200 }}
          >
            {GENRES.map((g) => (
              <MenuItem key={g} value={g}>
                {g}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* 🎬 Movie Cards */}
        {loading ? (
          <CircularProgress />
        ) : filteredMovies.length === 0 ? (
          <Typography>No movies found</Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredMovies.map((movie) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={movie._id}
              >
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  )
}
