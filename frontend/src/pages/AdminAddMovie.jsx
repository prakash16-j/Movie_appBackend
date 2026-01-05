import { useState } from 'react'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const GENRES = [
  'Action',
  'Drama',
  'Comedy',
  'Thriller',
  'Sci-Fi',
]

export default function AdminAddMovie() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: '',
    description: '',
    genre: '',
    rating: '',
    releaseDate: '',
    duration: '',
    poster: '',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // 🔗 API INTEGRATION
      await api.post('/api/movies', {
        title: form.title,
        description: form.description,
        genre: form.genre,
        rating: Number(form.rating),
        releaseDate: form.releaseDate,
        duration: form.duration,
        poster: form.poster,
      })

      alert('Movie added successfully 🎉')
      navigate('/admin/dashboard')
    } catch (err) {
      console.error(err)
      alert(err.response?.data?.message || 'Failed to add movie')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admin – Add Movie
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            fullWidth
            required
            margin="normal"
            value={form.title}
            onChange={handleChange}
          />

          <TextField
            label="Description"
            name="description"
            fullWidth
            required
            multiline
            rows={3}
            margin="normal"
            value={form.description}
            onChange={handleChange}
          />

          <TextField
            select
            label="Genre"
            name="genre"
            fullWidth
            required
            margin="normal"
            value={form.genre}
            onChange={handleChange}
          >
            {GENRES.map((g) => (
              <MenuItem key={g} value={g}>
                {g}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Rating"
            name="rating"
            type="number"
            fullWidth
            margin="normal"
            inputProps={{ min: 0, max: 10, step: 0.1 }}
            value={form.rating}
            onChange={handleChange}
          />

          <TextField
            label="Release Date"
            name="releaseDate"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={form.releaseDate}
            onChange={handleChange}
          />

          <TextField
            label="Duration (e.g. 2h 30m)"
            name="duration"
            fullWidth
            margin="normal"
            value={form.duration}
            onChange={handleChange}
          />

          <TextField
            label="Poster URL"
            name="poster"
            fullWidth
            margin="normal"
            value={form.poster}
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? 'Adding Movie...' : 'Add Movie'}
          </Button>
        </form>
      </Box>
    </Container>
  )
}
