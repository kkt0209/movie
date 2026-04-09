import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useAppStore from "store/useAppStore";


const Search = ({ getGenreColor }) => {
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const [movie, setMovie] = useState(null);
    const [title, setTitle] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

   // const setSearchResults = useAppStore((state) => state.setSearchResults);


   const SearchMovie = () => {
        if (!title.trim()) return alert("검색어를 입력하세요!");
        
        setSearchParams({ query: title });
    };
    
    return (

        <div>

            <div id="searchbox">
                <div id="search-input-group">
                    <input value={title} onChange={(e) => setTitle(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && SearchMovie()} />
                    <input type='button' value='검색' onClick={SearchMovie} />
                </div>

                <Link to='/detailsearch' id="detail-search">상세검색🔍</Link>
            </div>

        </div>
    )


}

    export default Search;