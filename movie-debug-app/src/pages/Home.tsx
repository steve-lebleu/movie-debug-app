import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { 
  CircularProgress, 
  Container, 
  Grid, 
  Typography, 
  Alert, 
  Box,
  Pagination,
  Stack,
  Chip
} from "@mui/material";
import { MovieCard } from "../ui/components/MovieCard";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

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
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let url;
        if (searchQuery.trim()) {
          
          url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}&page=${currentPage}`;
        } else {
          
          url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${currentPage}`;
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Données reçues:', data);
        
        setMovies(data.results || []);
        setTotalPages(Math.min(data.total_pages || 0, 500));
        setTotalResults(data.total_results || 0);
      } catch (err) {
        setError('Erreur lors du chargement des films: ' + (err as Error).message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery, currentPage]);

  const handlePageChange = (event, value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', value.toString());
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearSearch = () => {
    setSearchParams({}); 
  };

  const getTitle = () => {
    if (searchQuery.trim()) {
      return `Résultats pour "${searchQuery}"`;
    }
    return 'Films Populaires';
  };

  const getResultsInfo = () => {
    if (searchQuery.trim()) {
      return `${totalResults} résultat${totalResults > 1 ? 's' : ''} trouvé${totalResults > 1 ? 's' : ''}`;
    }
    return null;
  };

  if (loading) {
    return (
      <Container sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {getTitle()}
        </Typography>
        
        {searchQuery.trim() && (
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Chip
              label={`Recherche: ${searchQuery}`}
              onDelete={clearSearch}
              color="primary"
              variant="outlined"
            />
            {getResultsInfo() && (
              <Typography variant="body2" color="text.secondary">
                {getResultsInfo()}
              </Typography>
            )}
          </Stack>
        )}
      </Box>

      {movies.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            {searchQuery.trim() 
              ? 'Aucun film trouvé pour cette recherche' 
              : 'Aucun film à afficher'
            }
          </Typography>
        </Box>
      ) : (
        <>
          <Grid container spacing={4}>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Stack spacing={2}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  showFirstButton
                  showLastButton
                  siblingCount={2}
                  boundaryCount={1}
                />
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  Page {currentPage} sur {totalPages}
                </Typography>
              </Stack>
            </Box>
          )}
        </>
      )}
    </Container>
  );
}