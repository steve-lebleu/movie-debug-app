import { Container, Typography, Box, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";

export default function Favorites() {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Mes Films Favoris
      </Typography>
      <Typography variant="body1">
        (Placeholder: Liste des films favoris ici)
      </Typography>
      <Box sx={{ mt: 4 }}>
        <MuiLink component={Link} to="/" color="primary" underline="hover">
          Retour à l'accueil
        </MuiLink>
      </Box>
    </Container>
  );
}
