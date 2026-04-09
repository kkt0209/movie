import React from "react";
import { Link } from "react-router-dom";
import useAppStore from "store/useAppStore";
import "./UserLikes.css";

const UserLikes = () => {
  const loginUser = useAppStore((state) => state.currentUser);
  const likes = useAppStore((state) => state.likes).filter(
    (like) => like?.uid === loginUser?.uid
  );

  return (
    <section className="user-likes-section">
      <div className="user-likes-topbar">
        <span className="user-likes-count">{likes.length}개</span>
      </div>

      {likes.length === 0 ? (
        <div className="user-likes-empty">
          <p>아직 좋아요한 영화가 없습니다.</p>
        </div>
      ) : (
        <div className="user-likes-grid">
          {likes.map((like) => (
            <article className="user-like-card" key={like.movieId}>
              <Link
                to={`/movie/${like.movieId}`}
                className="user-like-poster-link"
              >
                <img
                  className="user-like-poster"
                  src={`https://image.tmdb.org/t/p/w200${like.poster_path}`}
                  alt={like.title}
                />
              </Link>

              <div className="user-like-meta">
                <p className="user-like-title">{like.title}</p>
                {like.release_date && (
                  <span className="user-like-year">
                    {like.release_date.slice(0, 4)}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default UserLikes;