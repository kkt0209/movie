import React from "react";
import { Link } from "react-router-dom";
import useAppStore from "store/useAppStore";
import "./UserLists.css";

const UserLists = () => {
  const loginUser = useAppStore((state) => state.currentUser);
  const lists = useAppStore((state) => state.lists).filter(
    (list) => list?.uid === loginUser?.uid
  );

  const getListId = (list, index) =>
    list.id || `${list.uid}-${index}-${list.title}`;

  return (
    <section className="user-lists-section">
      <div className="user-lists-topbar">
        <Link to="/list/new" className="user-lists-create-link">
          리스트 작성
        </Link>

        <span className="user-lists-count">{lists.length}개 리스트</span>
      </div>

      {lists.length === 0 ? (
        <div className="user-lists-empty">
          <p>아직 만든 리스트가 없습니다.</p>
        </div>
      ) : (
        <div className="user-lists-grid">
          {lists.map((list, index) => (
            <article className="user-list-card" key={getListId(list, index)}>
              <div className="user-list-header">
                <h3 className="user-list-title">{list.title}</h3>
                <p className="user-list-desc">{list.desc}</p>
              </div>

              <div className="user-list-meta">
                <span>{list.lists?.length || 0}편 수록</span>
                {list.lists?.length > 4 && (
                  <span className="user-list-more-count">
                    +{list.lists.length - 4} more
                  </span>
                )}
              </div>

              <div className="user-list-posters">
                {list.lists?.slice(0, 4).map((movie) => (
                  <Link
                    to={`/movie/${movie.movieId}`}
                    key={movie.movieId}
                    className="user-list-poster-link"
                  >
                    <img
                      className="user-list-poster"
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title || "movie poster"}
                    />
                  </Link>
                ))}
              </div>

              <div className="user-list-actions">
                <Link
                  to={`/list/${getListId(list, index)}`}
                  className="user-list-detail-link"
                >
                  전체보기
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default UserLists;