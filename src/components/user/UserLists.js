import React from "react";
import { Link } from "react-router-dom";
import useAppStore from "store/useAppStore";

const UserLists = () => {
    const loginUser = useAppStore((state) => state.currentUser);
    const lists = useAppStore((state) => state.lists).filter((list)=>(list?.uid === loginUser?.uid));
    
    return (
        <div style={{display:"flex"}}>
            {lists.map((list) => (
                <div style={{border:'1px solid gray'}}>
                    <div><strong>{list.name}</strong></div>
                    <div>{list.description}</div>

                    {list.lists.map((movie) => (
                        <Link to={`/movie/${movie.movieId}`} key={movie.movieId}>
                            <img
                                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                alt={movie.title}
                            />
                        </Link>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default UserLists;