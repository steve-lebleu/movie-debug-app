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

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1); // 👈 page actuelle
  const [totalPages, setTotalPages] = useState(1); // 👈 total de pages (si tu veux le gérer)

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`
        );

        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }

        const data = await response.json();
        setMovies(data.results || []);
        setTotalPages(data.total_pages); // utile pour désactiver le bouton "Suivant"
      } catch (err) {
        setError(
          "Erreur lors du chargement des films: " + (err as Error).message
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, [page]);

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;
  if (error)
    return (
      <Alert severity="error" sx={{ mt: 4 }}>
        {error}
      </Alert>
    );

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Films Populaires – Page {page}
      </Typography>
      <Grid container spacing={4}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Grid>

      {/* PAGINATION */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4, gap: 2 }}>
        <Button
          variant="outlined"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Précédent
        </Button>
        <Typography variant="body1" color="text.secondary">
          Page {page}
        </Typography>
        <Button
          variant="outlined"
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Suivant
        </Button>
      </Box>
    </Container>
  );
}
