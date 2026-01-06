import { useEffect, useState } from 'react'
import {
  Container,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  Typography,
  Skeleton,
  Pagination,
  Box,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { useUI } from '../contexts/UIContext'

const LIMIT = 6

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { search, genre } = useUI()

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    fetchMovies(page)
  }, [page])

  const fetchMovies = async (pageNumber) => {
    try {
      setLoading(true)
      const res = await api.get(
        `/api/movies?page=${pageNumber}&limit=${LIMIT}`
      )
      setMovies(res.data.data || [])
      setTotal(res.data.total || 0)
    } finally {
      setLoading(false)
    }
  }

  const filteredMovies = movies.filter((movie) => {
    const matchSearch =
      movie.title.toLowerCase().includes(search.toLowerCase()) ||
      movie.description.toLowerCase().includes(search.toLowerCase())

    const matchGenre = genre === 'All' || movie.genre === genre

    return matchSearch && matchGenre
  })

  const totalPages = Math.ceil(total / LIMIT)

  return (
    <Container maxWidth={false} sx={{ mt: 4, px: 4 }}>
      {/* TOTAL COUNT */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Total Movies: {total}
      </Typography>

      {/* 🎬 CARD GRID — CSS GRID (NOT MUI GRID) */}
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
        {/* 🔥 SKELETON */}
        {loading &&
          Array.from({ length: LIMIT }).map((_, i) => (
            <Card key={i} sx={{ height: 420, borderRadius: 3 }}>
              <Skeleton variant="rectangular" height={240} />
              <CardContent>
                <Skeleton width="80%" />
                <Skeleton width="60%" />
              </CardContent>
            </Card>
          ))}

        {/* ❌ EMPTY */}
        {!loading && filteredMovies.length === 0 && (
          <Typography>No movies found</Typography>
        )}

        {/* 🎬 MOVIES */}
        {!loading &&
          filteredMovies.map((movie) => (
            <Card
              key={movie._id}
              sx={{
                height: 420,
                width:400,
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: 6,
                },
              }}
            >
              {/* IMAGE */}
              <Box sx={{ height: 280, overflow: 'hidden' }}>
                <CardMedia
                  component="img"
                  image={
                    movie.poster ||
                    'https://via.placeholder.com/300x450?text=No+Image'
                  }
                  alt={movie.title}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'fill',
                  }}
                />
              </Box>

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" noWrap fontWeight={600}>
                  {movie.title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {movie.genre || 'N/A'} • ⭐ {movie.rating || 'N/A'}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {movie.description}
                </Typography>
              </CardContent>

              <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button
                  size="small"
                  onClick={() =>
                    navigate(`/admin/edit/${movie._id}`)
                  }
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() =>
                    api
                      .delete(`/api/movies/${movie._id}`)
                      .then(() => fetchMovies(page))
                  }
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))}
      </Box>

      {/* PAGINATION */}
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
  )
}
