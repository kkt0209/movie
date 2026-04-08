import React from "react";

const ReviewSection = ({
  // reviewTitle,
  // reviewText,
  // reviews,
  // onChangeTitle,
  // onChangeText,
  movieReviews,
  reviewContet,
  onChangeContent,
  onAddReview,
  onCheckLiked, liked,
}) => {
  return (
    <div className="review-section">
      <h3 className="review-title">리뷰</h3>

      <div className="review-form">
        {/* <input
          type="text"
          placeholder="리뷰 제목"
          value={reviewTitle}
          onChange={onChangeTitle}
          className="review-input"
        /> */}

        <textarea
          placeholder="리뷰를 입력하세요"
          value={reviewContet}
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
          movieReviews.map((review) => (
            <div className="review-card" key={review.id}>
              <h4>{review.writer} {review.rating}점</h4>
              <p>{review.content}</p>
            </div>
          ))
        ) : (
          <p className="empty-review">등록된 리뷰가 아직 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;