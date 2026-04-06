import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import MovieHero from "components/movie/MovieHero";
import useAppStore from "store/useAppStore";

const MovieDetail = () => {
  // 기본값
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // state
  const loginUser = useAppStore((state) => state.currentUser);
  const addReview = useAppStore((state) => state.addReview);
  const [movie, setMovie] = useState(null);
  const reviews = useAppStore((state) => state.reviews);
  const movieReviews = reviews.filter((r) => String(r.movieId) === String(id));
  const [reviewContent, setReviewContent] = useState("");
  const [recommendIndex, setRecommendIndex] = useState(0);

  // 영화 상세 불러오기
  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ko-KR&include_image_language=ko-KR,null&append_to_response=credits,recommendations,videos,images`)
         .then((response) => {
         setMovie(response.data);
      })
         .catch((error) => {
         console.error("영화 상세 불러오기 실패", error);
      });
  }, [id, API_KEY]);

  // 영화가 바뀌면 추천 인덱스 초기화
  useEffect(() => {
    setRecommendIndex(0);
  }, [id]);

  // 화면에 사용할 데이터
  const trailer = movie?.videos?.results?.find(
    (video) => video.site === "YouTube" && video.type === "Trailer"
  );

  const recommendations = movie?.recommendations?.results || [];
  const visibleCount = 8;
  const maxIndex = Math.max(0, recommendations.length - visibleCount);

  const galleryImages =
  movie?.images?.backdrops?.length > 0
    ? movie.images.backdrops.slice(0, 6)
    : movie?.images?.posters?.slice(0, 6) || [];

  

  // 이벤트 함수
  const handleAddReview = (e) => {
    e.preventDefault();
    if (loginUser) {
      if (!reviewContent.trim()) return;

      const newReview = {
        id: Date.now(),
        movieId: id,
        writer: loginUser.id,
        content: reviewContent,
        rating: 1,
        createdAt: new Date().toLocaleDateString('ko-KR')
      };

      addReview(newReview);
      setReviewContent("");
    } else {
      alert('로그인 후에 작성해주세요.')
      navigate('/login', {state:{from:location}});
    }
  };

  const handlePrevRecommend = () => {
    setRecommendIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNextRecommend = () => {
    setRecommendIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  // 로딩 처리
  if (!movie) {
    return <div>로딩중...</div>;
  }

  // 화면 출력
  return (
    <>
      <MovieHero movie={movie} trailer={trailer} />

      <div className="detail-bottom">
        <div className="detail-bottom-inner">
          <div className="gallery-section">
            <h3 className="gallery-title">이미지 갤러리</h3>

            <div className="gallery-grid">
              {galleryImages.length > 0 ? (
                galleryImages.map((image, index) => (
                  <div className="gallery-item" key={image.file_path || index}>
                    <img
                      src={`https://image.tmdb.org/t/p/w780${image.file_path}`}
                      alt={`${movie.title} 스틸컷 ${index + 1}`}
                    />
                  </div>
                ))
              ) : (
                <p className="gallery-empty">표시할 이미지가 없습니다.</p>
              )}
            </div>
          </div>

          <div className="recommend-section">
            <div className="recommend-header">
              <h3>추천 영화</h3>

              <div className="recommend-buttons">
                <button
                  type="button"
                  className="recommend-nav-button"
                  onClick={handlePrevRecommend}
                  disabled={recommendIndex === 0}
                >
                  이전
                </button>

                <button
                  type="button"
                  className="recommend-nav-button"
                  onClick={handleNextRecommend}
                  disabled={recommendIndex >= maxIndex}
                >
                  다음
                </button>
              </div>
            </div>

            <div className="recommend-list">
              {recommendations
                .slice(recommendIndex, recommendIndex + visibleCount)
                .map((item) => (
                  <Link
                    to={`/movie/${item.id}`}
                    key={item.id}
                    className="recommend-item"
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

          <div className="review-section">
            <h3 className="review-title">리뷰</h3>
            <div className="review-list">
              {movieReviews.length > 0 ? (
                movieReviews.map((review) => (
                  <div className="review-card" key={review.id}>
                    <h4>{review.writer} 평점: {review.rating} 작성일: {review.createdAt}</h4>
                    <p>{review.content}</p>
                  </div>
                ))
              ) : (
                <p className="empty-review">등록된 리뷰가 아직 없습니다.</p>
              )}
            </div>

            <form onSubmit={handleAddReview} className="review-form">
              {/* <input
                type="text"
                placeholder="리뷰 제목"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                className="review-input"
              /> */}

              <textarea
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
                className="review-textarea"
                placeholder={loginUser ? "리뷰를 입력하세요" : "로그인 후 리뷰를 입력하세요"}
                readOnly={!loginUser}
              ></textarea>

              <div className="review-actions">
                <button type="button" className="ui-button">
                  ★ 별점
                </button>
                <button type="button" className="ui-button">
                  👍 좋아요
                </button>
                <button type="submit" className="submit-button">
                  등록
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;