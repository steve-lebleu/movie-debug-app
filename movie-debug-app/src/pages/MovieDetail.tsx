import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import { CircularProgress, Container, Alert, Box, Typography, Link as MuiLink, CardMedia } from "@mui/material";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  tagline: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
};

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("ID du film manquant.");
      setLoading(false);
      return;
    }

    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.status_message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError('Erreur lors du chargement des détails du film: ' + (err as Error).message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;
  if (error) return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;
  if (!movie) return <Alert severity="info" sx={{ mt: 4 }}>Film non trouvé.</Alert>;

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        <CardMedia
          component="img"
          sx={{ width: { xs: '100%', md: 300 }, flexShrink: 0, objectFit: 'cover' }}
          image={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
        />
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            {movie.title}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {movie.tagline}
          </Typography>
          <Typography variant="body1" paragraph>
            {movie.overview}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Date de sortie : {movie.release_date}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Note moyenne : {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} ({movie.vote_count} votes)
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            <Button variant="contained">Favoris</Button>
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}>
        <MuiLink component={Link} to="/" color="primary" underline="hover">
          Retour à l'accueil
        </MuiLink>
      </Box>
    </Container>
  );
}