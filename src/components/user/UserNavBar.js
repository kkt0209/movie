import React from "react";
import { NavLink } from "react-router-dom";
import useAppStore from "store/useAppStore";
import "./UserNavBar.css";

const UserNavbar = () => {
  const loginUser = useAppStore((state) => state.currentUser);
  const loginUserInfo = useAppStore((state) => state.currentUserInfo);

  const films = useAppStore((state) => state.films).filter(
    (film) => film?.uid === loginUser?.uid
  );

  const likes = useAppStore((state) => state.likes).filter(
    (like) => like?.uid === loginUser?.uid
  );

  const lists = useAppStore((state) => state.lists).filter(
    (list) => list?.uid === loginUser?.uid
  );

  const watchListItem = useAppStore((state) => state.watchList).find(
    (watch) => watch?.uid === loginUser?.uid
  );

  const watchCount = watchListItem?.watchList?.length || 0;

  const navItems = [
    { to: "profile", label: "PROFILE" },
    { to: "films", label: "FILMS" },
    { to: "reviews", label: "REVIEWS" },
    { to: "watchlist", label: "WATCHLIST" },
    { to: "lists", label: "LISTS" },
    { to: "likes", label: "LIKES" },
  ];

  const userInitial =
    loginUserInfo?.name?.slice(0, 1) ||
    loginUser?.email?.slice(0, 1)?.toUpperCase() ||
    "U";

  return (
    <div className="user-navbar">
      <div className="user-navbar-hero">
        <div className="user-navbar-left">
          <div className="user-avatar">{userInitial}</div>

          <div className="user-meta">
            <h1 className="user-name">
              {loginUserInfo?.name || "USER"}
            </h1>
            <p className="user-email">{loginUser?.email}</p>
          </div>
        </div>

        <div className="user-stats">
          <div className="user-stat-box">
            <strong>{films.length}</strong>
            <span>FILMS</span>
          </div>

          <div className="user-stat-box">
            <strong>{watchCount}</strong>
            <span>WATCHLIST</span>
          </div>

          <div className="user-stat-box">
            <strong>{lists.length}</strong>
            <span>LISTS</span>
          </div>

          <div className="user-stat-box">
            <strong>{likes.length}</strong>
            <span>LIKES</span>
          </div>
        </div>
      </div>

      <div className="user-nav-menu">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? "user-nav-link active" : "user-nav-link"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default UserNavbar;