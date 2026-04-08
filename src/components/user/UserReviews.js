import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useAppStore from "store/useAppStore";

const UserReviews = () => {
    const getUserReview = useAppStore((state) => state.getUserReview);
    const loginUser = useAppStore((state) => state.currentUser);
    const userReviews = useAppStore((state) => state.userReviews);
    
    useEffect(() => {
        getUserReview(loginUser?.uid); //리뷰 불러오기
    }, [loginUser?.uid, getUserReview]);

    return (
        <div style={{display:"flex"}}>
            {userReviews?.map((review) => (
                <div style={{border:'1px solid gray'}}>
                    <Link to={`/movie/${review.movieId}`} key={review.movieId}>
                        <img
                            src={`https://image.tmdb.org/t/p/w200${review.poster_path}`}
                            alt={review.title}
                        />
                    </Link>

                    <div>{review.content}</div>
                    <div>{review.rating}점</div>
                </div>

            ))}
        </div>
    )
}

export default UserReviews;