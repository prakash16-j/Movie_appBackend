import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../services/api'
import { Container, Typography } from '@mui/material'

export default function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    api.get(`/api/movies/${id}`).then(res => setMovie(res.data))
  }, [id])

  if (!movie) return <p>Loading...</p>

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">{movie.title}</Typography>
      <Typography>{movie.description}</Typography>
    </Container>
  )
}
