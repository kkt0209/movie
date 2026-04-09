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

  // 추가: 현재 페이지 상태 (기본값 1)
  const [page, setPage] = useState(1);
  // 추가: 전체 페이지 수 저장
  const [totalPages, setTotalPages] = useState(1);



  const [selectedGenre, setSelectedGenre] = useState(null);

  const GENRES = [
    { id: 28, name: "액션" },
    { id: 35, name: "코미디" },
    { id: 27, name: "호러" },
    { id: 10749, name: "로맨스" },
    { id: 878, name: "SF" },
  ];

  useEffect(() => {

    let url = "";

    // 1. URL 구성 (오타 수정: &page= 연결 확인)
    if (query && query.trim() !== "") {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko-KR&query=${query}&page=${page}`;
      if (selectedGenre) setSelectedGenre(null);
    } else if (selectedGenre) {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=ko-KR&with_genres=${selectedGenre}&page=${page}`;
    } else {
      url = `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=ko-KR&page=${page}`;
    }

    axios.get(url)
      .then((response) => {
        setMovieList(response.data.results);
        setTotalPages(response.data.total_pages);
      })
      .catch((error) => console.error("데이터 로드 실패:", error));

    window.scrollTo(0, 0);

    // 의존성 배열에 page를 넣어야 페이지 클릭 시 API가 다시 호출됩니다.
  }, [query, category, selectedGenre, API_KEY, page]);

  // 검색어나 장르가 바뀌면 페이지를 1로 리셋
  useEffect(() => {
    setPage(1);
  }, [query, category, selectedGenre]);

  const Sort = (e) => {
    const sel = e.target.value;
    const sortedList = [...movieList].sort((a, b) => {
      if (sel === 'release_date') return new Date(b.release_date) - new Date(a.release_date);
      if (sel === 'vote_average') return b.vote_average - a.vote_average;
      return b.popularity - a.popularity;
    });
    setMovieList(sortedList);
  };

  const getGenreColor = (genreId) => {
    switch (genreId) {
      case 28: return "genre-action";
      case 35: return "genre-comedy";
      case 27: return "genre-horror";
      case 10749: return "genre-romance";
      case 878: return "genre-sf";
      default: return "genre-default";
    }
  };

  return (
    <div id="outer">
      {movieList.length > 0 ? (
        <div id="movie-list-container">
          <div id="movie-header">
            <h1 id='list-title'>영화 목록</h1>
            <select id="selectbox" onChange={Sort}>
              <option value=''>정렬</option>
              <option value='popularity'>인기순</option>
              <option value='release_date'>최신순</option>
              <option value='vote_average'>평점순</option>
            </select>
            <Search getGenreColor={getGenreColor}/>
          </div>

          <div id="genre-text-links">
            <span onClick={() => setSelectedGenre(null)} className={!selectedGenre ? "active" : ""}>전체</span>
            {GENRES.map((g) => (
              <span key={g.id} onClick={() => setSelectedGenre(g.id)} className={selectedGenre === g.id ? "active" : ""}>
                {g.name}
              </span>
            ))}
          </div>

          <hr id="genre-divider" />

          <div id="movie-grid">
            {movieList.map((movie) => (
              <div className={`movie-card ${getGenreColor(movie?.genre_ids?.[0])}`} key={movie.id}>
                <Link to={`/movie/${movie.id}`}>
                  <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                </Link>
                <div className="movie-info">
                  <h3 className="movie-title">{movie.title}</h3>
                  <div className="movie-details">
                    <span>⭐ {movie.vote_average}</span>
                    <span>{movie.release_date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 페이지네이션 버튼 위치: movie-grid 밖으로 뺌 */}
          <div id="pagination">
            <button disabled={page <= 1} onClick={() => setPage(prev => prev - 1)}>이전</button>
            <span>{page} / {totalPages > 500 ? 500 : totalPages}</span>
            <button disabled={page >= totalPages || page >= 500} onClick={() => setPage(prev => prev + 1)}>다음</button>
          </div>
        </div>
      ) : (
        <div>로딩중...</div>
      )}
    </div>
  );
}

export default MovieList;