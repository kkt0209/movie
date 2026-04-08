import React from "react";

const GallerySection = ({ galleryImages, movieTitle }) => {
  return (
    <div className="gallery-section">
      <h3 className="gallery-title">이미지 갤러리</h3>

      <div className="gallery-grid">
        {galleryImages.length > 0 ? (
          galleryImages.map((image, index) => (
            <div className="gallery-item" key={image.file_path || index}>
              <img
                src={`https://image.tmdb.org/t/p/w780${image.file_path}`}
                alt={`${movieTitle} 스틸컷 ${index + 1}`}
              />
            </div>
          ))
        ) : (
          <p className="gallery-empty">표시할 이미지가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default GallerySection;