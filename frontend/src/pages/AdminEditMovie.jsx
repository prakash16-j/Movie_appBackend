import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  CircularProgress,
} from '@mui/material'
import api from '../services/api'

const GENRES = ['Action', 'Drama', 'Comedy', 'Thriller', 'Sci-Fi']

export default function AdminEditMovie() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // 🔹 Fetch movie by ID (FIXED)
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await api.get(`/api/movies/${id}`)

        // 🔥 FIX: backend returns { data: movie }
        const movie = res.data.data

        setForm({
          title: movie.title || '',
          description: movie.description || '',
          genre: movie.genre || '',
          rating: movie.rating || '',
          releaseDate: movie.releaseDate
            ? movie.releaseDate.split('T')[0]
            : '',
          duration: movie.duration || '',
          poster: movie.poster || '',
        })
      } catch (err) {
        console.error(err)
        alert('Failed to load movie')
        navigate('/admin/dashboard')
      } finally {
        setLoading(false)
      }
    }

    fetchMovie()
  }, [id, navigate])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // 🔹 Update movie
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      await api.put(`/api/movies/${id}`, {
        ...form,
        rating: Number(form.rating),
      })

      alert('Movie updated successfully 🎉')
      navigate('/admin/dashboard')
    } catch (err) {
      console.error(err)
      alert('Failed to update movie')
    } finally {
      setSaving(false)
    }
  }

  if (loading || !form) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admin – Edit Movie
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
            label="Duration"
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
            disabled={saving}
          >
            {saving ? 'Updating...' : 'Update Movie'}
          </Button>
        </form>
      </Box>
    </Container>
  )
}
