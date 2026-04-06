import { Link } from "react-router-dom";

const MovieHero = ({ movie, trailer }) => {
     const directors =
        movie.credits?.crew?.filter((person) => person.job === "Director") || [];
    return(
         <div className="hero">
      <div
        className="hero-bg"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      ></div>

      <div className="hero-vignette"></div>

      <div className="hero-content">
        <div className="hero-main">
          <div className="poster-box">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
          </div>

          <div className="info-box">
            <h1>{movie.title}</h1>
            <p className="movie-year">{movie.release_date?.slice(0, 4)}</p>
            <p className="movie-overview">{movie.overview}</p>

            <div className="video-section">
              {trailer ? (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noreferrer"
                  className="trailer-button"
                >
                  예고편 보기
                </a>
              ) : (
                <p className="no-trailer">예고편 없음</p>
              )}
            </div>

            <div className="genre-list">
                {movie.genres.map((genre) => (
                    <Link
                    to={`/movie/genre/${genre.id}`}
                    className="genre-chip"
                    key={genre.id}
                    >
                    {genre.name}
                    </Link>
                ))}
                </div>

              <div className="director-section">
                <h3 className="director-title">감독</h3>
                <div className="director-list">
                    {directors.length >0 ? (
                        directors.map((director)=>(
                            <Link
                                to={`/person/${director.id}`}
                                className="director-chip"
                                key={director.id}
                            >
                                {director.name}
                            </Link>
                        ))
                    ) :(
                        <span className="director-chip">정보없음</span>
                    )}
                </div>
              </div>

            <div className="cast-section">
              <h3 className="cast-title">출연진</h3>
              <div className="cast-list">
                {movie.credits?.cast?.slice(0, 10).map((actor) => (
                   <Link
                    to={`/person/${actor.id}`}
                    className="cast-chip"
                    key={actor.id}
                   >
                    {actor.name}
                   </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    )
}

export default MovieHero;