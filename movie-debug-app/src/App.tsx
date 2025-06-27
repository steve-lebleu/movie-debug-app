import { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Link as MuiLink, Box, TextField, IconButton } from '@mui/material';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Favorites from './pages/Favorites';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      if (location.pathname !== '/') {
        navigate('/');
      }
    }
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#5E548E' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <MuiLink component={Link} to="/" color="inherit" underline="none">
              Super Movie
            </MuiLink>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Rechercher un film..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
              sx={{
                input: { color: 'white' },
                fieldset: { borderColor: 'rgba(255, 255, 255, 0.7)' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' },
              }}
            />
            <IconButton color="inherit" onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </Box>
          <MuiLink component={Link} to="/favorites" color="inherit" underline="hover" sx={{ ml: 2 }}>
            Mes Favoris
          </MuiLink>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 10 }}>
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<Typography variant="h6" color="error">Oups ! Vous vous êtes égaré...</Typography>} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
