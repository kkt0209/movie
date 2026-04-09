import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import MovieHero from "components/movie/MovieHero";
import RecommendationSection from "components/movie/RecommendationSection";
import GallerySection from "components/movie/GallerySection";

import useAppStore from "store/useAppStore";

const MovieDetail = () => {
  // 기본값
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // state
  const loginUser = useAppStore((state) => state.currentUser);
  const loginUserInfo = useAppStore(state => state.currentUserInfo)
  const addReview = useAppStore((state) => state.addReview);
  const getMovieReview = useAppStore((state) => state.getMovieReview);
  const checkDBReviewLike = useAppStore((state) => state.checkReviewLike);
  const addReviewLiked = useAppStore((state) => state.addReviewLike);
  const [movie, setMovie] = useState(null);

  const movieReviews = useAppStore((state) => state.movieReviews);
  const [reviewContent, setReviewContent] = useState("");

  // const [reviewLiked, setReviewLiked] = useState(false);

  const reviewLiked = useAppStore((state) => state.reviewLiked);
  const setReviewLiked = useAppStore((state) => state.setReviewLiked);
  
  // const [reviews, setReviews] = useState([]);
  // const [reviewTitle, setReviewTitle] = useState("");
  // const [reviewText, setReviewText] = useState("");

  const [recommendIndex, setRecommendIndex] = useState(0);
  const [providers, setProviders] = useState([]);
  const [releaseInfo, setReleaseInfo] = useState([]);
  const [collection, setCollection] = useState(null);

  useEffect(() => {
  let isMounted = true;

  setMovie(null);
  setProviders([]);
  setReleaseInfo([]);
  setCollection(null);
  setRecommendIndex(0);
  setReviewContent("");
  window.scrollTo(0, 0);

  axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ko-KR&include_image_language=ko-KR,null&append_to_response=credits,recommendations,videos,images,reviews`
    )
    .then((response) => {
      if (isMounted) {
        setMovie(response.data);
      }
    })
    .catch((error) => {
      if (isMounted) {
        console.error("영화 상세 불러오기 실패", error);
      }
    });

  axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${API_KEY}`
    )
    .then((response) => {
      if (isMounted) {
        const kr = response.data.results?.KR;
        setProviders(kr?.flatrate || []);
      }
    })
    .catch((error) => {
      if (isMounted) {
        console.error("OTT 정보 불러오기 실패", error);
      }
    });

  axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${API_KEY}`
    )
    .then((response) => {
      if (isMounted) {
        setReleaseInfo(response.data.results || []);
      }
    })
    .catch((error) => {
      if (isMounted) {
        console.error("개봉정보 불러오기 실패", error);
      }
    });

  return () => {
    isMounted = false;
  };
}, [id, API_KEY]);

  // 영화가 바뀌면 추천 인덱스 초기화
  useEffect( () => {
    setRecommendIndex(0);
    
    // getDBReview(id); //리뷰 불러오기
    // setReviewTitle("");
    // setReviewText("");
    // setReviews([]);

    checkDBReviewLike(loginUser?.uid, id);
    getMovieReview(id); //리뷰 불러오기
  }, [id,loginUser]);

  // 화면에 사용할 데이터
  const trailer = movie?.videos?.results?.find(
    (video) => video.site === "YouTube" && video.type === "Trailer"
  );

  const collectionId = movie?.belongs_to_collection?.id;

  useEffect(() => {
    if (!collectionId) {
      setCollection(null);
      return;
    }

    axios.get(`https://api.themoviedb.org/3/collection/${collectionId}?api_key=${API_KEY}&language=ko-KR`)
          .then((response) => {
            console.log("collection", response.data);
            setCollection(response.data);
        })
          .catch((error) => {
            console.error("컬렉션 정보 불러오기 실패", error);
        });
  }, [collectionId, API_KEY]);

  const recommendations = movie?.recommendations?.results || [];

  const collectionMovies = collection?.parts || [];
  console.log("collectionMovies", collectionMovies);

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

      const alreadyReviewed = movieReviews.find(
        (review) => review.uid === loginUser.uid
      );

      if (alreadyReviewed) {
        alert("이미 이 영화에 리뷰를 작성했습니다.");
        return;
      }

      const newReview = {
        id: Date.now(),
        uid : loginUser.uid,
        movieId: id,
        poster_path: movie.poster_path,
        writer: loginUserInfo.name,
        content: reviewContent,
        rating: 1,
        createdAt: new Date().toLocaleDateString('ko-KR')
      };

      //데이터베이스에 등록
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

  const krRelease = releaseInfo.find((item) => item.iso_3166_1 === "KR");

  console.log("KR release", krRelease);
  console.log("KR release_dates", krRelease?.release_dates);

  const krReleaseDates = krRelease?.release_dates || [];

  const certificationItem = krReleaseDates.find(
    (item) => item.certification && item.certification.trim() !== ""
  );

  const certification = certificationItem?.certification || "정보 없음";

  let certificationLabel = "정보 없음";

  if (certification === "All") {
    certificationLabel = "전체관람가";
  } else if (certification === "12") {
    certificationLabel = "12세 이상 관람가";
  } else if (certification === "15") {
    certificationLabel = "15세 이상 관람가";
  } else if (certification === "18" || certification === "19") {
    certificationLabel = "청소년 관람불가";
  } else if (certification && certification !== "정보 없음") {
    certificationLabel = certification;
  }

  const releaseDateItem = krReleaseDates.find((item) => item.release_date);

  const releaseDate =
  releaseDateItem?.release_date?.slice(0, 10).replaceAll("-", ".") || "정보 없음";

  console.log("certification", certification);
  console.log("releaseDate", releaseDate);

  const tmdbReviews = movie?.reviews?.results || [];
  console.log("tmdbReviews", tmdbReviews)

  const reviewLikedCheck = () => { //좋아요 토글

    if(loginUser){
      setReviewLiked(prev => !prev);
      
        const liked = {
          uid : loginUser.uid,
          movieId : id,
          poster_path : movie.poster_path
        }

      addReviewLiked(reviewLiked, liked, loginUser.uid, id);
    }else{
      alert('로그인 후에 시도해주세요.')
      navigate('/login', {state:{from:location}});
    }
  }
  
  // 로딩 처리
  if (!movie) {
    return <div>로딩중...</div>;
  }

  // 화면 출력
  return (
    <>
      <MovieHero 
        movie={movie} 
        trailer={trailer} 
        providers={providers} 
        certification={certificationLabel} 
        releaseDate={releaseDate}
        // reviewTitle={reviewTitle}
        // reviewText={reviewText}
        // reviews={reviews}
        movieReviews={movieReviews}
        reviewContent={reviewContent}
        // onChangeTitle={(e) => setReviewTitle(e.target.value)}
        // onChangeText={(e) => setReviewText(e.target.value)}
        onChangeContent={(e) => setReviewContent(e.target.value)}
        onAddReview={handleAddReview}
        tmdbReviews={tmdbReviews}
        collection={collection}
        liked = {reviewLiked}
        onCheckLiked = {reviewLikedCheck}
        collectionMovies={collectionMovies}
      />

      <div className="detail-bottom">
        <div className="detail-bottom-inner">
          <GallerySection
            galleryImages={galleryImages}
            movieTitle={movie.title}
            
          />

          <RecommendationSection
            recommendations={recommendations}
            recommendIndex={recommendIndex}
            visibleCount={visibleCount}
            maxIndex={maxIndex}
            onPrev={handlePrevRecommend}
            onNext={handleNextRecommend}
          />
        </div>
      </div>
    </>
  );
};

export default MovieDetail;