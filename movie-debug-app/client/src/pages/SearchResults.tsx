import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchResults.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery().get('query');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

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
        setTotalResults(data.total_results || 0);
      } catch (err) {
        console.error('Erreur lors de la recherche :', err);
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
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '10px' }}>
        Résultats pour : <span style={{ color: '#e50914' }}>{query}</span>
      </h2>

      {!loading && totalResults > 0 && (
        <p style={{ marginBottom: '20px', fontStyle: 'italic' }}>
          {totalResults} résultat{totalResults > 1 ? 's' : ''} trouvé{totalResults > 1 ? 's' : ''}
        </p>
      )}

      {loading ? (
        <p>Chargement...</p>
      ) : results.length > 0 ? (
        <>
          <div className="card-grid">
            {results.map((movie) => (
              <div key={movie.id} className="container-card">
                <img
                  className="container"
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                      : 'https://via.placeholder.com/200x300?text=No+Image'
                  }
                  alt={movie.title}
                />
                <p>{movie.title}</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div
            style={{
              marginTop: '30px',
              textAlign: 'center',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              justifyContent: 'center',
            }}
          >
            <button
              onClick={() => handlePageClick(page - 1)}
              disabled={page === 1}
              style={{
                backgroundColor: '#000',
                color: '#fff',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                opacity: page === 1 ? 0.5 : 1,
              }}
            >
              ◀ Précédent
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .slice(Math.max(0, page - 3), Math.min(totalPages, page + 2))
              .map((num) => (
                <button
                  key={num}
                  onClick={() => handlePageClick(num)}
                  style={{
                    backgroundColor: num === page ? '#e50914' : '#000',
                    color: '#fff',
                    fontWeight: 'bold',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  {num}
                </button>
              ))}

            <button
              onClick={() => handlePageClick(page + 1)}
              disabled={page === totalPages}
              style={{
                backgroundColor: '#000',
                color: '#fff',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                opacity: page === totalPages ? 0.5 : 1,
              }}
            >
              Suivant ▶
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
