import axios from "axios";
import Search from "components/common/Search";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useAppStore from "store/useAppStore";

const MovieList = () => {
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const navigate = useNavigate();

  const [movieList, setMovieList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const category = searchParams.get("category") || "popular";

  const handleClickCategory = (category) => {
    navigate(`/movie?category=${category}`);
  };

  useEffect(() => {
    axios
      .get(
        query ?
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko-KR&query=${query}`
        : `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=ko-KR&page=1`
      )
      .then((response) => {
        setMovieList(response.data.results);
      })
      .catch((error) => {
        console.error("영화 목록 불러오기 실패", error);
      });
  }, [query, category, API_KEY]);

  const searchResults = useAppStore((state) => state.searchResults);

  useEffect(() => {
      if (searchResults && searchResults.length > 0) {
          setMovieList(searchResults); // 검색 결과가 들어오면 기존 리스트를 덮어씀!
      }
  }, [searchResults]);

  const Sort = (e) => {
    const sel = e.target.value;

    const sortedList = [...movieList].sort((a, b) => {
      if (sel === 'release_date') {
        // 날짜순 (최신순)
        return new Date(b.release_date) - new Date(a.release_date);
      } else if (sel === 'vote_average') {
        // 평점순 (높은순)
        return b.vote_average - a.vote_average;
      } else {
        // 인기순 (높은순)
        return b.popularity - a.popularity;
      }
    });

    setMovieList(sortedList);
  };//Sort

  const getGenreColor = (genreId) => {
    if (!genreId) return "genre-default";
    switch (genreId) {
      case 28: return "genre-action";    // 액션
      case 35: return "genre-comedy";    // 코미디
      case 27: return "genre-horror";    // 공포
      case 10749: return "genre-romance"; // 로맨스
      case 878: return "genre-sf";        // SF 
      case 16: return "genre-animation";  // 애니메이션
      case 80: return "genre-crime";      // 범죄 
      default: return "genre-default";
    }
  };//color



  return movieList.length > 0 ? (
    <div id="movie-list-container">
      <div id="movie-header">
        <h2 id='list-title'>영화 목록</h2>


        <select id="selectbox" onChange={Sort}>
          <option value=''>정렬</option>
          <option value='popularity'>인기순</option>
          <option value='release_date'>최신순</option>
          <option value='vote_average'>평점순</option>
        </select>

        <Search getGenreColor={getGenreColor}/>

      </div>


      <div id="movie-grid">
       {movieList.map((movie) => (
          <div className={`movie-card ${getGenreColor(movie?.genre_ids?.[0])}`} key={movie.id}>
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />

              <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <div className="movie-details">
                  <span>⭐ {movie.vote_average}</span>
                  <br/>
                  <span>{movie.release_date}</span>
                </div>
              </div>
            </Link>
          </div>
        ))}


      </div>
    </div>
  ) : (
    <div>로딩중...</div>
  );
};

export default MovieList;