import { useEffect, useState } from "react";
import {
  CircularProgress,
  Container,
  Grid,
  Typography,
  Alert,
  Box,
  Pagination,
} from "@mui/material";

import { MovieCard } from "../ui/components/MovieCard";

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

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
  // Const pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
        const data = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError('Erreur lors du chargement des films: ' + (err as Error).message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPopularMovies();
  }, [page]);

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;
  if (error) return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Films Populaires
      </Typography>
      <Grid container spacing={4}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
        // Limite de la pagination à 100 pages max
          count={Math.min(totalPages, 100)}
          page={page}
          onChange={(_e, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Container>
  );
}
