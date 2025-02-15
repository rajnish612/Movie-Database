import { Card, CardMedia, CardContent, CardActions, Typography, Button, Box } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Info as InfoIcon } from '@mui/icons-material';
import { Link } from "wouter";
import type { MovieDocument } from "@shared/schema";

interface MovieCardProps {
  movie: MovieDocument;
  onDelete: (id: string) => void;
}

export default function MovieCard({ movie, onDelete }: MovieCardProps) {
  return (
    <Card 
      elevation={2}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <CardMedia
        component="img"
        height="300"
        image={movie.imageUrl}
        alt={movie.title}
        sx={{
          objectFit: 'cover',
        }}
      />

      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography variant="h6" gutterBottom component="h3" noWrap>
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {movie.director} • {movie.releaseYear}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {movie.genre}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {movie.description}
        </Typography>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
          <Button
            component={Link}
            href={`/movies/${movie._id}`}
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<InfoIcon />}
            sx={{ textTransform: 'none' }}
          >
            Details
          </Button>
          <Button
            component={Link}
            href={`/movies/edit/${movie._id}`}
            variant="outlined"
            color="primary"
            sx={{ minWidth: 'auto' }}
          >
            <EditIcon />
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => onDelete(movie._id.toString())}
            sx={{ minWidth: 'auto' }}
          >
            <DeleteIcon />
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}