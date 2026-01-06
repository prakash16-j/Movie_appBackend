import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../services/api'
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Skeleton,
} from '@mui/material'

export default function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get(`/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <Skeleton variant="rectangular" height={300} />
        <Skeleton height={40} />
        <Skeleton height={40} />
      </Container>
    )
  }

  if (!movie) return null

  return (
    <Container sx={{ mt: 4 }}>
      {/* 🔝 TOP SECTION */}
      <Grid container spacing={4}>
        {/* 🎬 LEFT IMAGE */}
        <Grid item xs={12} md={5}>
          <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
            <CardMedia
              component="img"
              height="420"
              image={
                movie.poster ||
                'https://via.placeholder.com/400x600?text=No+Image'
              }
              alt={movie.title}
              sx={{ objectFit: 'cover' }}
            />
          </Card>
        </Grid>

        {/* 📄 RIGHT DETAILS */}
        <Grid item xs={12} md={7}>
          <Card sx={{ height: '100%', borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                {movie.title}
              </Typography>

              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                <Chip label={movie.genre} color="primary" />
                <Chip
                  label={`⭐ ${movie.rating || 'N/A'}`}
                  color="success"
                />
                <Chip
                  label={`⏱ ${movie.duration || 'N/A'}`}
                  variant="outlined"
                />
              </Box>

              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Release Date:</strong>{' '}
                {movie.releaseDate
                  ? new Date(movie.releaseDate).toDateString()
                  : 'N/A'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* 📄 DESCRIPTION — FULL WIDTH */}
      <Box sx={{ mt: 4 }}>
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {movie.description || 'No description available'}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}
