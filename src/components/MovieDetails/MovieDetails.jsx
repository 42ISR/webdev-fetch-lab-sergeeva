import { useNavigate } from 'react-router-dom';
import LikeButton from '../LikeButton/LikeButton';
import RatingBadge from '../RatingBadge/RatingBadge';
import './MovieDetails.css';

function MovieDetails({ movie }) {
  const navigate = useNavigate();

  if (!movie) return null;

  const hasPoster = movie.Poster && movie.Poster !== 'N/A';

  return (
    <article className="movie-details">
      <button type="button" className="movie-details__back" onClick={() => navigate(-1)}>
        ← Назад
      </button>

      <div className="movie-details__layout">
        <div className="movie-details__poster-col">
          {hasPoster ? (
            <img className="movie-details__poster" src={movie.Poster} alt={movie.Title} />
          ) : (
            <div className="movie-details__poster" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: 'var(--color-surface-raised)', minHeight: '300px' }}>
              Постер отсутствует
            </div>
          )}
        </div>

        <div className="movie-details__main">
          <div className="movie-details__heading">
            <div>
              <h1 className="movie-details__title">{movie.Title}</h1>
              <p className="movie-details__meta">
                {movie.Year} {movie.Rated !== 'N/A' && `· ${movie.Rated}`} {movie.Runtime !== 'N/A' && `· ${movie.Runtime}`}
              </p>
            </div>
            <LikeButton />
          </div>

          {movie.Genre && <p className="movie-details__genre">{movie.Genre}</p>}
          {movie.Plot && <p className="movie-details__plot">{movie.Plot}</p>}

          {movie.Ratings && movie.Ratings.length > 0 && (
            <div className="movie-details__ratings">
              {movie.Ratings.map((rating) => (
                <RatingBadge key={rating.Source} source={rating.Source} value={rating.Value} />
              ))}
            </div>
          )}

          <dl className="movie-details__facts">
            {movie.Director && movie.Director !== 'N/A' && (
              <div className="movie-details__fact"><dt>Режиссёр</dt><dd>{movie.Director}</dd></div>
            )}
            {movie.Writer && movie.Writer !== 'N/A' && (
              <div className="movie-details__fact"><dt>Сценарий</dt><dd>{movie.Writer}</dd></div>
            )}
            {movie.Actors && movie.Actors !== 'N/A' && (
              <div className="movie-details__fact"><dt>В ролях</dt><dd>{movie.Actors}</dd></div>
            )}
            {movie.Released && movie.Released !== 'N/A' && (
              <div className="movie-details__fact"><dt>Дата выхода</dt><dd>{movie.Released}</dd></div>
            )}
            {movie.Language && movie.Language !== 'N/A' && (
              <div className="movie-details__fact"><dt>Язык</dt><dd>{movie.Language}</dd></div>
            )}
            {movie.Country && movie.Country !== 'N/A' && (
              <div className="movie-details__fact"><dt>Страна</dt><dd>{movie.Country}</dd></div>
            )}
            {movie.Awards && movie.Awards !== 'N/A' && (
              <div className="movie-details__fact"><dt>Награды</dt><dd>{movie.Awards}</dd></div>
            )}
            {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
              <div className="movie-details__fact"><dt>Сборы</dt><dd>{movie.BoxOffice}</dd></div>
            )}
          </dl>
        </div>
      </div>
    </article>
  );
}

export default MovieDetails;