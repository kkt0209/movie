import React from "react";
import { Link } from "react-router-dom";
import useAppStore from "store/useAppStore";

const UserLikes = () => {
    const loginUser = useAppStore((state) => state.currentUser);
    const likes = useAppStore((state) => state.likes).filter((like)=>(like?.uid === loginUser?.uid));
    
    return (
        <div>
            {likes.map((like) => (
                <Link to={`/movie/${like.movieId}`} key={like.movieId}>
                    <img
                        src={`https://image.tmdb.org/t/p/w200${like.poster_path}`}
                        alt={like.title}
                    />
                </Link>
            ))}
        </div>
    )
}

export default UserLikes;