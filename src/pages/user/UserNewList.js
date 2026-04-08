import axios from "axios";
import React, { useState } from "react";
import 'styles/pages/UserNewList.css';

const UserNewList = () => {
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const [searchTitle, setSearchTitle] = useState("");
    const [movies, setMovies] = useState([]);
    const [list, setList] = useState([])
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const searchMovies = async (query) => {
        const trimmedQuery = query.trim();
        if (!query.trim()) {
            setMovies([]);
            return;
        }

        try {
            const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko-KR&query=${trimmedQuery}`
            );
            setMovies(response.data.results || []);
        } catch (error) {
            console.error("영화 검색 실패", error);
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTitle(value);
        searchMovies(value);
    };

    return (
        <div>
            <h2>New List</h2>
            <hr/>
            <div>제목</div>
            <input value={title} onClick={(e)=>setTitle(e.target.value)}/>

            <div>설명</div>
            <textarea value={desc} onClick={(e)=>setDesc(e.target.value)}/>

            <div>영화 리스트</div>
            <ul>
                {list && 
                    list.map((movie) => {
                        <div>
                            <img
                                className="movie-search-poster"
                                src={`https://image.tmdb.org/t/p/w45${movie.poster_path}`}/>
                            <div className="movie-search-meta">
                                <div>{movie.title}</div>
                                <div>{movie.original_title}</div>
                                <div>{movie.release_date}</div>
                            </div>
                        </div>
                    })}
            </ul>

            <div>영화 추가</div>
            <input
                className="movie-search-input"
                value={searchTitle}
                onChange={handleSearchChange}
                placeholder="검색어 입력"
            />

            <ul className="movie-search-results">
                {movies.map((movie) => 
                    movie.poster_path && (
                    <li key={movie.id} className="movie-search-item"
                        onClick={()=>setList([...list, {movieId:movie.id, poster_path:movie.poster_path}])}>
                        <div className="movie-search-item-content">
                            <img
                                className="movie-search-poster"
                                src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}/>
                            <div className="movie-search-meta">
                                <div>{movie.title}</div>
                                <div>{movie.original_title}</div>
                                <div>{movie.release_date}</div>
                            </div>
                        </div>
                    </li>
                    )
                )}
            </ul>
        </div>
    )
}

export default UserNewList;
