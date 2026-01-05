import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const MovieCard = ({ movie }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    const token = localStorage.getItem('token')
    if (!token) navigate('/login')
    else navigate(`/movie/${movie._id}`)
  }

  return (
    <Card
      sx={{ height: '100%', cursor: 'pointer' }}
      onClick={handleClick}
    >
      {/* 🎥 MOVIE POSTER */}
      <CardMedia
        component="img"
        height="280"
        image={
          movie.poster ||
          'https://via.placeholder.com/300x450?text=No+Image'
        }
        alt={movie.title}
      />

      <CardContent>
        {/* 🎬 TITLE */}
        <Typography variant="h6" noWrap>
          {movie.title}
        </Typography>

        {/* 🎭 GENRE */}
        <Typography variant="body2" color="text.secondary">
          Genre: {movie.genre || 'N/A'}
        </Typography>

        {/* ⭐ RATING */}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Rating
            value={Number(movie.rating) || 0}
            precision={0.1}
            readOnly
            max={10}
          />
          <Typography sx={{ ml: 1 }}>
            {movie.rating || 'N/A'}
          </Typography>
        </Box>

        {/* 📅 RELEASE DATE */}
        <Typography variant="body2" color="text.secondary">
          Release: {movie.releaseDate?.slice(0, 10) || 'N/A'}
        </Typography>

        {/* ⏱ DURATION */}
        <Typography variant="body2" color="text.secondary">
          Duration: {movie.duration || 'N/A'}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default MovieCard
