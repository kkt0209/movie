import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DetailSearch from "./DetailSearch";


const Search = ({ query, onSearchChange }) => {
    const [title, setTitle] = useState(query);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        setTitle(query);
    }, [query]);

   // const setSearchResults = useAppStore((state) => state.setSearchResults);


   const handleChange = (e) => {
        const value = e.target.value;
        setTitle(value);
        onSearchChange?.(value);

        const nextParams = new URLSearchParams(searchParams);
        if (value.trim()) {
            nextParams.set("query", value);
        } else {
            nextParams.delete("query");
        }
        setSearchParams(nextParams);
    };
    
    return (

        <div id="searchbox">
            <label htmlFor="movie-search-input" className="sr-only">영화 검색</label>
            <div className="search-shell">
                <div id="search-input-group">
                    <input
                        id="movie-search-input"
                        className="search-input"
                        type="text"
                        placeholder="영화 제목 검색"
                        value={title}
                        onChange={handleChange} />
                </div>
            </div>

            {/*} <span 
                    id="detail-search" 
                    onClick={() => setIsFilterOpen(true)}
                    style={{ cursor: 'pointer' }}
                >
                    상세검색🔍
                </span>*/}

            {isFilterOpen && (
                <DetailSearch onClose={() => setIsFilterOpen(false)} />
            )}
        </div>
        
    )


}

    export default Search;
