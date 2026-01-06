import { useEffect, useState } from 'react'
import {
  Container,
  Typography,
  Skeleton,
  Pagination,
  Box,
  TextField,
  Select,
  MenuItem,
} from '@mui/material'
import Navbar from '../components/Navbar'
import MovieCard from '../components/MovieCard'
import api from '../services/api'

const LIMIT = 6

const GENRES = [
  'All',
  'Action',
  'Drama',
  'Comedy',
  'Thriller',
  'Sci-Fi',
  'Romance',
]

export default function Home() {
  const [movies, setMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('All')
  const [page, setPage] = useState(1)

  // 🔽 FETCH MOVIES
  useEffect(() => {
    setLoading(true)
    api
      .get('/api/movies')
      .then((res) => {
        const data = res.data?.data || []
        setMovies(data)
        setFilteredMovies(data)
      })
      .catch(() => {
        setMovies([])
        setFilteredMovies([])
      })
      .finally(() => setLoading(false))
  }, [])

  // 🔍 SEARCH + FILTER
  useEffect(() => {
    let data = [...movies]

    if (search.trim()) {
      const keyword = search.toLowerCase()
      data = data.filter(
        (m) =>
          m.title?.toLowerCase().includes(keyword) ||
          m.description?.toLowerCase().includes(keyword)
      )
    }

    if (genre !== 'All') {
      data = data.filter((m) => m.genre === genre)
    }

    setFilteredMovies(data)
    setPage(1)
  }, [search, genre, movies])

  // 📄 PAGINATION
  const startIndex = (page - 1) * LIMIT
  const paginatedMovies = filteredMovies.slice(
    startIndex,
    startIndex + LIMIT
  )
  const totalPages = Math.ceil(filteredMovies.length / LIMIT)

  return (
    <>
      <Navbar />

      <Container maxWidth={false} sx={{ mt: 4, px: 4 }}>
        {/* 🔍 SEARCH + GENRE */}
        {/* <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <TextField
            label="Search movies"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
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
        </Box> */}

        {/* 🎬 SAME GRID AS ADMIN */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '1fr 1fr 1fr',
            },
            gap: 5,
          }}
        >
          {/* 🔥 SHIMMER */}
          {loading &&
            Array.from({ length: LIMIT }).map((_, i) => (
              <Box key={i}>
                <Skeleton
                  variant="rectangular"
                  height={280}
                  sx={{ borderRadius: 3 }}
                />
                <Skeleton width="80%" />
                <Skeleton width="60%" />
              </Box>
            ))}

          {/* ❌ EMPTY */}
          {!loading && filteredMovies.length === 0 && (
            <Typography>No movies found</Typography>
          )}

          {/* 🎥 MOVIES */}
          {!loading &&
            paginatedMovies.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
              />
            ))}
        </Box>

        {/* 📄 PAGINATION */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
            />
          </Box>
        )}
      </Container>
    </>
  )
}
