import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CircularProgress, Container, Alert, Box, Typography, Link as MuiLink, CardMedia } from "@mui/material";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
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

    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);

    if (!response.ok) {
      let errorMessage = `Erreur HTTP ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.status_message || errorMessage;
      } catch (_) {
        // ignore JSON parsing error
      }
      console.error("Détail technique :", errorMessage); // 👈 visible en console
      throw new Error("Impossible de charger les informations du film.");
    }

    const data = await response.json();
    setMovie(data);
  } catch (err) {
    console.error('Erreur de chargement (détail dev) :', err); // 👈 log complet
    setError("Une erreur est survenue lors du chargement du film. Veuillez réessayer.");
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
            (Placeholder: Bouton Ajouter aux Favoris)
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