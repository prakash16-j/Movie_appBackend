import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Box,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function MovieCard({ movie, isAdmin = false, onDelete }) {
  const navigate = useNavigate()

  return (
    <Card
      onClick={() => navigate(`/movie/${movie._id}`)}
      sx={{
        height: 420,
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: '0.3s',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: 6,
        },
      }}
    >
      {/* 🎬 IMAGE */}
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
            objectFit: 'cover',
          }}
        />
      </Box>

      {/* 📄 CONTENT */}
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

      {/* 🛠 ADMIN ACTIONS */}
      {isAdmin && (
        <CardActions
          sx={{ justifyContent: 'space-between' }}
          onClick={(e) => e.stopPropagation()} // 🔥 PREVENT CARD CLICK
        >
          <Button
            size="small"
            onClick={() => navigate(`/admin/edit/${movie._id}`)}
          >
            Edit
          </Button>
          <Button
            size="small"
            color="error"
            onClick={() => onDelete(movie._id)}
          >
            Delete
          </Button>
        </CardActions>
      )}
    </Card>
  )
}
