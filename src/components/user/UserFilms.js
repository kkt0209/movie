import React from "react";
import { Link } from "react-router-dom";
import useAppStore from "store/useAppStore";

const UserFilms = () => {
    const loginUser = useAppStore((state) => state.currentUser);
    const flims = useAppStore((state) => state.films).filter((film)=>(film?.uid === loginUser?.uid));
    
    return (
        <div>
            {flims.map((film) => (
                <Link to={`/movie/${film.movieId}`} key={film.movieId}>
                    <img
                        src={`https://image.tmdb.org/t/p/w200${film.poster_path}`}
                        alt={film.title}
                    />
                </Link>
            ))}
        </div>
    )
}

export default UserFilms;