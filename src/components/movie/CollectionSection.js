import React from "react";
import { Link } from "react-router-dom";

const CollectionSection = ({ collection, collectionMovies }) => {
  if (!collection || collectionMovies.length === 0) {
    return null;
  }

  return (
    <div className="collection-section">
      <h3 className="collection-title">{collection.name}</h3>

      <div className="collection-list">
        {collectionMovies.map((item) => (
          <Link
            to={`/movie/${item.id}`}
            key={item.id}
            className="collection-item"
          >
            <img
              src={
                item.poster_path
                  ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                  : "https://via.placeholder.com/200x300?text=No+Image"
              }
              alt={item.title}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CollectionSection;