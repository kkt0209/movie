import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Search = () => {
    const [searchText, setSearchText] = useState();
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchText.trim() === "") {
        setSearchParams({});
        } else {
        setSearchParams({ query: searchText });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={searchText} onChange={(e)=>{setSearchText(e.target.value)}}
                   placeholder="검색어를 입력해주세요"/>
            <button>검색</button>
        </form>
    )
}

export default Search;