import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useAppStore from "store/useAppStore";


const Search = ({ getGenreColor }) => {
    const [movie, setMovie] = useState(null);
    const [title, setTitle] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');

    const setSearchResults = useAppStore((state) => state.setSearchResults);


    const SearchMovie = () => {
        if (!title.trim()) return alert("검색어를 입력하세요!");
        //'검색어' 포함된 데이터를 새로 요청
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=f2c5d8cd2ecfdea28dfeb688d935b960&language=ko-KR&query=${title}`)
            .then(res => {
                const rawData = res.data.results;
                const filteredList = rawData.filter((movie) => new Date(movie.release_date) <= new Date());
                
                setSearchResults(filteredList);
            })
          .catch(err => {
            console.log(err);
        });
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