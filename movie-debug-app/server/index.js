const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = 3001;

app.use(cors());

app.get('/api/popular', async (req, res) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Erreur serveur TMDB :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur API en écoute sur http://localhost:${PORT}`);
});
