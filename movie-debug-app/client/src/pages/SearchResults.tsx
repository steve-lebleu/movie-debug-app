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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        setLoading(true);
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&page=${page}&api_key=${apiKey}`
        );
        const data = await res.json();
        setResults(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (err) {
        console.error("Erreur lors de la recherche :", err);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearch();
    }
  }, [query, page]);

  const handlePageClick = (num: number) => {
    if (num >= 1 && num <= totalPages) {
      setPage(num);
    }
  };

  return (
    <div>
      <h2>Résultats pour : {query}</h2>

      {loading ? (
        <p>Chargement...</p>
      ) : results.length > 0 ? (
        <>
          <div className="card-grid">
            {results.map((movie) => (
              <div key={movie.id} className='container-card'>
                <img
                  className='container'
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : ''}
                  alt={movie.title}
                />
                <p>{movie.title}</p>
              </div>
            ))}
          </div>

          {/* Pagination complète */}
          <div style={{ marginTop: "30px", textAlign: "center" }}>
            <button disabled={page === 1} onClick={() => handlePageClick(page - 1)}>
              Précédent
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .slice(Math.max(0, page - 3), Math.min(page + 2, totalPages))
              .map((num) => (
                <button
                  key={num}
                  onClick={() => handlePageClick(num)}
                  style={{
                    fontWeight: num === page ? 'bold' : 'normal',
                    margin: '0 5px'
                  }}
                >
                  {num}
                </button>
              ))}

            <button disabled={page === totalPages} onClick={() => handlePageClick(page + 1)}>
              Suivant
            </button>
          </div>
        </>
      ) : (
        <p>Aucun résultat</p>
      )}
    </div>
  );
}

export default SearchResults;
