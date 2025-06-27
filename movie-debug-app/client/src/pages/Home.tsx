import { useEffect, useState } from "react";
import {
  CircularProgress,
  Container,
  Grid,
  Typography,
  Alert,
  Box,
  Button
} from "@mui/material";
import { MovieCard } from "../ui/components/MovieCard";

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

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
        );

        if (!response.ok) {
          throw new Error("Impossible de charger les films.");
        }

        const data = await response.json();
        setMovies(data.results || []);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error("Erreur de chargement des films :", err);
        setError("Une erreur est survenue lors du chargement des films.");
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, [page]);

  if (loading) return <CircularProgress sx={{ mt: 4, display: 'block', mx: 'auto' }} />;

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 4 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Films Populaires – Page {page}
      </Typography>

      <Grid container spacing={4}>
  {movies.map((movie) => (
    <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
      <MovieCard movie={movie} />
    </Grid>
  ))}
</Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 2 }}>
        <Button
          variant="outlined"
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >
          Précédent
        </Button>
        <Typography variant="body1" color="text.secondary">
          Page {page}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages}
        >
          Suivant
        </Button>
      </Box>
    </Container>
  );
}
