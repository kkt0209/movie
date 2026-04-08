import React, { useEffect, useState } from "react";

const ReviewSection = ({
  movieReviews = [],
  reviewContent,
  onChangeContent,
  onAddReview,
  onCheckLiked, liked,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const reviewsPerPage = 5;
  const totalPages = Math.ceil(movieReviews.length / reviewsPerPage);

  const startIndex = (currentPage - 1) * reviewsPerPage;
  const visibleReviews = movieReviews.slice(
    startIndex,
    startIndex + reviewsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [movieReviews]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="review-section">
      <h3 className="review-title">리뷰</h3>

      <div className="review-form">
        <textarea
          placeholder="리뷰를 입력하세요"
          value={reviewContent}
          onChange={onChangeContent}
          className="review-textarea"
        ></textarea>

        <div className="review-actions">
          <button type="button" className="ui-button">
            ★ 별점
          </button>
          <button type="button" className="ui-button" onClick={onCheckLiked}>
            {liked ? "❤️ 좋아요 취소" : "🤍 좋아요"}
          </button>
          <button
            type="button"
            className="submit-button"
            onClick={onAddReview}
          >
            등록
          </button>
        </div>
      </div>

      <div className="review-list">
        {movieReviews.length > 0 ? (
          visibleReviews.map((review) => (
            <div className="review-card" key={review.id}>
              <h4>
                {review.writer} {review.rating}점
              </h4>
              <p>{review.content}</p>
            </div>
          ))
        ) : (
          <p className="empty-review">등록된 리뷰가 아직 없습니다.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="review-pagination">
          <button
            type="button"
            className="review-page-button"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            ←
          </button>

          <span className="review-page-info">
            {currentPage} / {totalPages}
          </span>

          <button
            type="button"
            className="review-page-button"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;