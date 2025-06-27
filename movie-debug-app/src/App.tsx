import { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Link as MuiLink, Box, TextField, IconButton } from '@mui/material';
import { Routes, Route, Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Favorites from './pages/Favorites';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Recherche pour:', searchTerm);
  };

  return (
    <>
      <AppBar position="fixed">
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
      <Container maxWidth="lg">
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