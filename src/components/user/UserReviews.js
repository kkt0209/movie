import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAppStore from "store/useAppStore";
import "./UserReviews.css";

const UserReviews = () => {
  const { id } = useParams();
  // const loginUser = useAppStore((state) => state.currentUser);
  const getUserReview = useAppStore((state) => state.getUserReview);
  const userReviews = useAppStore((state) => state.userReviews);

  useEffect(() => {
    if (id) {
      getUserReview(id);
    }
  }, [id, getUserReview]);

  if (!userReviews || userReviews.length === 0) {
    return (
      <div className="user-reviews-empty">
        <p>아직 작성한 리뷰가 없습니다.</p>
      </div>
    );
  }

  const groupedReviews = Object.values(
    userReviews.reduce((acc, review) => {
      const key = review.movieId;

      if (!acc[key]) {
        acc[key] = {
          movieId: review.movieId,
          poster_path: review.poster_path,
          title: review.title || "영화",
          reviews: [],
        };
      }

      acc[key].reviews.push(review);
      return acc;
    }, {})
  );

  return (
    <section className="user-reviews-section">
      <div className="user-reviews-header">
        <span className="user-reviews-count">
          {groupedReviews.length}편의 영화
        </span>
      </div>

      <div className="user-reviews-grid">
        {groupedReviews.map((movie) => (
          <article className="user-review-group-card" key={movie.movieId}>
            <Link
              to={`/movie/${movie.movieId}`}
              className="user-review-group-poster"
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
              />
            </Link>

            <div className="user-review-group-body">
              <div className="user-review-group-header">
                <h3 className="user-review-group-title">{movie.title}</h3>
                <span className="user-review-group-count">
                  리뷰 {movie.reviews.length}개
                </span>
              </div>

              <div className="user-review-preview-list">
                {movie.reviews.slice(0, 2).map((review) => (
                  <div className="user-review-preview-item" key={review.id}>
                    <p className="user-review-preview-text">{review.content}</p>
                    <span className="user-review-preview-rating">
                      {review.rating}점
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default UserReviews;