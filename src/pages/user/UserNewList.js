import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAppStore from "store/useAppStore";
import 'styles/pages/UserNewList.css';

const UserNewList = () => {
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const navigate = useNavigate();

    const loginUser = useAppStore((state) => state.currentUser);
    const addList = useAppStore((state) => (state.addList));
    const [searchTitle, setSearchTitle] = useState("");
    const [movies, setMovies] = useState([]);
    const [userLists, setUserLists] = useState([]);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const searchMovies = async (query) => {
        if (!query.trim()) {
            setMovies([]);
            return;
        }

        try {
            const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko-KR&query=${query}`
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

    const handleResultClick = (movie) => {
        const foundResult = userLists.find((m) => m.movieId === movie.id);

        if (foundResult) return;
        setUserLists([...userLists, {movieId: movie.id, poster_path: movie.poster_path}])
    };

    const handleAddList = (e) => {
        e.preventDefault();
        if (loginUser) {
            if (!title.trim() || !desc.trim()) return;

            const newList = {
                uid: loginUser.uid,
                title: title,
                desc: desc,
                lists: userLists,
            }

            addList(newList);
            navigate('/user/'+loginUser.uid+'/lists')
        };
    }

    return (
        <form onSubmit={handleAddList}>
            <h2>New List</h2>
            <hr/>
            <div>제목</div>
            <input value={title} onChange={(e)=>setTitle(e.target.value)}/>

            <div>설명</div>
            <textarea value={desc} onChange={(e)=>setDesc(e.target.value)}/>

            <div>영화 리스트</div>
            <div>
                {userLists && 
                    userLists.map((movie) => (
                        <img src={`https://image.tmdb.org/t/p/w45${movie.poster_path}`}/>
                    ))}
            </div>

            <div>영화 검색</div>
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
                        onClick={() => handleResultClick(movie)}>
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

            <button>리스트 추가</button>
        </form>
    )
}

export default UserNewList;
