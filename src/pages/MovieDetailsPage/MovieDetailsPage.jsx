import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieDetails from '../../components/MovieDetails/MovieDetails';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import './MovieDetailsPage.css';

function MovieDetailsPage() {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      setIsLoading(true);
      setError(null);

      const apiKey = import.meta.env.VITE_OMDB_API_KEY;
      const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === 'False') {
          setError(data.Error);
        } else {
          setMovie(data);
        }
      } catch (err) {
        setError('Не удалось загрузить информацию о фильме');
      } finally {
        setIsLoading(false);
      }
    }

    if (imdbID) {
      fetchMovieDetails();
    }
  }, [imdbID]);

  return (
    <main className="movie-details-page">
      <div className="container">
        {isLoading && <Loader label="Загружаем информацию о фильме..." />}
        {!isLoading && error && <ErrorMessage message={error} />}
        {!isLoading && !error && movie && <MovieDetails movie={movie} />}
      </div>
    </main>
  );
}

export default MovieDetailsPage;