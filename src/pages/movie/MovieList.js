import axios from "axios";
import Search from "components/common/Search";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

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

  return movieList.length > 0 ? (
    <div>
      <h2>영화 목록</h2>
      <Search/>
      <ul>
        <li style={{fontWeight: category === 'popular' ? 'bold' : 'normal'}} onClick={()=> handleClickCategory("popular")}>인기</li>
        <li style={{fontWeight: category === 'now_playing' ? 'bold' : 'normal'}} onClick={()=> handleClickCategory("now_playing")}>현재 상영 중</li>
        <li style={{fontWeight: category === 'top_rated' ? 'bold' : 'normal'}} onClick={()=> handleClickCategory("top_rated")}>높은 평점순</li>
        <li style={{fontWeight: category === 'upcoming' ? 'bold' : 'normal'}} onClick={()=> handleClickCategory("upcoming")}>개봉 예정</li>
      </ul>

      {movieList.map((movie) => (
        <Link to={`/movie/${movie.id}`} key={movie.id}>
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
          />
        </Link>
      ))}
    </div>
  ) : (
    <div>로딩중...</div>
  );
};

export default MovieList;