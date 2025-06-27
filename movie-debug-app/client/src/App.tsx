import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link as MuiLink,
  Box,
  TextField,
  IconButton
} from '@mui/material';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Favorites from './pages/Favorites';
import SearchResults from './pages/SearchResults'; 

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <MuiLink component={Link} to="/" color="inherit" underline="none">
          MOVIE
            </MuiLink>
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Rechercher un film..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                input: { color: 'white' },
                fieldset: { borderColor: 'rgba(255, 255, 255, 0.7)' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
            />
            <IconButton color="inherit" onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </Box>
          <MuiLink
            component={Link}
            to="/favorites"
            color="inherit"
            underline="hover"
            sx={{ ml: 2 }}
          >
            Mes Favoris
          </MuiLink>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/search" element={<SearchResults />} /> {/* 👈 route de recherche */}
        </Routes>
      </Container>
    </>
  );
}

export default App;
