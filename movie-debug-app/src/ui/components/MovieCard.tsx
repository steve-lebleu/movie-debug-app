import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Link as MuiLink,
  IconButton,
  Box,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
};

export function MovieCard({ movie }: { movie: Movie }) {
  const imageUrl = `${IMAGE_BASE_URL}${movie.poster_path}`;
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Image du film */}
      <CardMedia
        component="img"
        sx={{
          height: 350,
          objectFit: 'cover',
        }}
        image={imageUrl}
        alt={movie.title}
      />

      {/* Icône Favoris */}
      <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
        <IconButton onClick={handleToggleFavorite} color="error">
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>

      {/* Contenu texte */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="div" sx={{ mb: 1 }}>
          <MuiLink component={Link} to={`/movie/${movie.id}`} color="inherit" underline="hover">
            {movie.title}
          </MuiLink>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Note: {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
        </Typography>
      </CardContent>
    </Card>
  );
}
