import { useEffect, useState } from 'react'
import {
  Container,
  Typography,
  Skeleton,
  Pagination,
  Box,
} from '@mui/material'
import Navbar from '../components/Navbar'
import MovieCard from '../components/MovieCard'
import api from '../services/api'
import { useUI } from '../contexts/UIContext'

const LIMIT = 6

export default function Home() {
  const { search, genre } = useUI() // 🔥 FROM NAVBAR

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  // 🔽 Fetch movies once
  useEffect(() => {
    setLoading(true)
    api
      .get('/api/movies')
      .then((res) => {
        setMovies(res.data?.data || [])
      })
      .catch(() => setMovies([]))
      .finally(() => setLoading(false))
  }, [])

  // 🔍 FILTER BASED ON NAVBAR ONLY
  const filteredMovies = movies.filter((movie) => {
    const matchSearch =
      movie.title?.toLowerCase().includes(search.toLowerCase()) ||
      movie.description?.toLowerCase().includes(search.toLowerCase())

    const matchGenre =
      genre === 'All' ||
      movie.genre?.toLowerCase() === genre.toLowerCase()

    return matchSearch && matchGenre
  })

  // 📄 Pagination
  const start = (page - 1) * LIMIT
  const paginatedMovies = filteredMovies.slice(start, start + LIMIT)
  const totalPages = Math.ceil(filteredMovies.length / LIMIT)

  return (
    <>
      <Navbar />

      <Container sx={{ mt: 10 }}>
        {/* 🎬 MOVIE GRID */}
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
          {/* 🔥 LOADING SKELETON */}
          {loading &&
            Array.from({ length: LIMIT }).map((_, i) => (
              <Box key={i}>
                <Skeleton
                  variant="rectangular"
                  height={260}
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
              <MovieCard key={movie._id} movie={movie} />
            ))}
        </Box>

        {/* 📄 PAGINATION */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, v) => setPage(v)}
            />
          </Box>
        )}
      </Container>
    </>
  )
}
