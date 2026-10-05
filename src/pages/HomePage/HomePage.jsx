import { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import './HomePage.css';

function HomePage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setError(null);
    setIsLoading(true);

    const apiKey = import.meta.env.VITE_OMDB_API_KEY;
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.Response === 'False') {
        setMovies(null);
        setError(data.Error);
      } else {
        setMovies(data.Search);
      }
    } catch (err) {
      setMovies(null);
      setError('Не удалось связаться с сервером');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="home-page">
      <div className="container home-page__inner">
        <SearchBar
          query={query}
          onChangeQuery={setQuery}
          onSubmitSearch={handleSearch}
        />

        <section className="home-page__section">
          <h2 className="home-page__section-title">Результат поиска</h2>
          
          {isLoading && <Loader label="Ищем фильмы..." />}
          {!isLoading && error && <ErrorMessage message={error} />}
          {!isLoading && !error && movies && <MovieList movies={movies} />}
          {!isLoading && !error && !movies && (
            <p style={{ color: 'var(--color-text-muted)', marginTop: '16px' }}>
              Введите название фильма и нажмите «Искать».
            </p>
          )}
        </section>
      </div>
    </main>
  );
}

export default HomePage;