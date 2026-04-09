import React from "react";
import useAppStore from "store/useAppStore";
// import "./UserLists.css";
import { Link } from "react-router-dom";

const Lists = () => {
    const lists = useAppStore((state) => state.lists)

    const getListId = (list, index) =>
        list.id || `${list.uid}-${index}-${list.title}`;

    return (
        <div className="user-lists-grid">

          {lists.map((list, index) => (
            <article className="user-list-card" key={getListId(list, index)}>
              <div className="user-list-header">
                <span><Link to={'/user/profile/'+list.uid}>{list.writer}</Link></span>
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
    )
}

export default Lists;