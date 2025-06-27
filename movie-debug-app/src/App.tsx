import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
import { Routes, Route, Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Favorites from './pages/Favorites';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  
  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    setSearchTerm(urlSearch);
  }, [searchParams]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}&page=1`);
    } else {
      navigate('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    navigate('/');
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <MuiLink component={Link} to="/" color="inherit" underline="none">
              Movie-Debug
            </MuiLink>
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ position: 'relative' }}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Rechercher un film..."
                value={searchTerm}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                sx={{
                  input: { color: 'white' },
                  fieldset: { borderColor: 'rgba(255, 255, 255, 0.7)' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' },
                }}
                InputProps={{
                  endAdornment: searchTerm && (
                    <IconButton
                      size="small"
                      onClick={clearSearch}
                      sx={{ color: 'rgba(255, 255, 255, 0.7)', p: 0.5 }}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  )
                }}
              />
            </Box>
            
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
        </Routes>
      </Container>
    </>
  );
}

export default App;