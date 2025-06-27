import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "./SearchResults.css";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery().get('query');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=${apiKey}`
        );
        const data = await res.json();
        setResults(data.results || []);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la recherche :", err);
        setLoading(false);
      }
    };

    fetchSearch();
  }, [query]);

  return (
    <div>
      <h2>Résultats pour : {query}</h2>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        results.length > 0 ? (
          results.map((movie) => (
            <div key={movie.id} className='container-card'>
              <img className='container'
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : ''}
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </div>
          ))
        ) : (
          <p>Aucun résultat</p>
        )
      )}
    </div>
  );
}

export default SearchResults;
