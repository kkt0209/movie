import React from "react";
import { Link } from "react-router-dom";
import useAppStore from "store/useAppStore";

const UserWatchList = () => {
    const loginUser = useAppStore((state) => state.currentUser);
    const watchList = useAppStore((state) => state.watchList).find((watch)=>(watch?.uid === loginUser?.uid));
    
    return (
        <div>
            {watchList?.watchList.map((watch) => (
                <Link to={`/movie/${watch.movieId}`} key={watch.movieId}>
                    <img
                        src={`https://image.tmdb.org/t/p/w200${watch.poster_path}`}
                        alt={watch.title}
                    />
                </Link>
            ))}
        </div>
    )
}

export default UserWatchList;