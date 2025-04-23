import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useDetailMoviesQuery } from "../../hooks/useDetailMovies";
import { AiOutlineClose } from "react-icons/ai";
import { useMovieReviewsQuery } from "../../hooks/useMovieReviews";
import { useSimilarMoviesQuery } from "../../hooks/useSimilarMovies";

// 상세 정보
// 리뷰 보여주기 -> 더보기, 접기 추가
// 추천 영화 보여주기
// 예고편 보여주기 -> 유튜브 말고 티저 영상 스트리밍 가능한지 확인 (라이브러리 ?) -> 배너, 상세페이지 상단 이미지 영역
const MovieDetailpage = ({ movie, onClose }) => {
  const { data: detailMovie, isLoading } = useDetailMoviesQuery(movie.id);
  const { data: reviews, isLoading: isLoadingReview } = useMovieReviewsQuery(
    movie.id
  );
  const { data: similarMovies, isLoading: isLoadingSimilar } =
    useSimilarMoviesQuery(movie.id);

  const [expandedReviewId, setExpandedReviewId] = useState(null);

  const toggleReview = (id) => {
    setExpandedReviewId((prev) => (prev === id ? null : id));
  };

  if (!detailMovie || isLoading)
    return ReactDOM.createPortal(
      <div className="fixed top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center z-[99999]">
        <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
      </div>,
      document.body
    );

  const formatNumber = (num) => num?.toLocaleString();

  return ReactDOM.createPortal(
    <div
      className="fixed top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center z-[11000]"
      onClick={onClose}
    >
      <div
        className="bg-black/60 rounded-lg overflow-y-auto max-h-[90vh] w-[90%] max-w-2xl relative shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-2xl hover:text-red-500 z-10"
        >
          <AiOutlineClose />
        </button>

        {/* 이미지 영역 */}
        <div
          className="w-full h-[400px] bg-cover bg-center rounded-t-lg"
          style={{
            backgroundImage: `url(https://media.themoviedb.org/t/p/w780${
              detailMovie.backdrop_path || detailMovie.poster_path
            })`,
          }}
        ></div>

        {/* 내용 영역 */}
        <div className="p-6">
          {/* 제목 */}
          <h2 className="text-2xl font-bold mb-2">{detailMovie.title}</h2>

          {detailMovie.runtime && (
            <p className="text-lg text-gray-400 mb-4">
              {Math.floor(detailMovie.runtime / 60)}시간{" "}
              {detailMovie.runtime % 60}분
            </p>
          )}

          {/* 상세 리스트 */}
          <ul className="text-sm text-white mb-4 space-y-1">
            <li>
              <span className="text-gray-400">개봉일 :</span>{" "}
              {detailMovie.release_date}
            </li>
            <li>
              <span className="text-gray-400">인기도 :</span>{" "}
              {Math.floor(detailMovie.popularity)}
            </li>
            <li>
              <span className="text-gray-400">예산 :</span> $
              {formatNumber(detailMovie.budget)}
            </li>
            <li>
              <span className="text-gray-400">장르 :</span>{" "}
              {detailMovie.genres?.map((genre, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-1 text-md text-white  text-center"
                >
                  {genre.name}
                </span>
              ))}
            </li>
          </ul>

          {/* 줄거리 */}
          <p className="text-sm text-white leading-relaxed">
            {detailMovie.overview}
          </p>
        </div>

        {/* 리뷰 */}
        <div className="p-6 pt-0">
          <h3 className="text-xl font-bold mb-4">리뷰</h3>
          {isLoadingReview ? (
            <p className="text-gray-400">리뷰 불러오는 중...</p>
          ) : reviews?.results?.length ? (
            <ul className="space-y-4 max-h-60 overflow-y-auto pr-2">
              {reviews.results.map((review) => {
                const isExpanded = expandedReviewId === review.id;
                return (
                  <li key={review.id} className="bg-white/10 p-3 rounded-lg">
                    <p className="text-sm text-white mb-1">
                      <span className="font-semibold">{review.author}</span> :
                    </p>
                    <p
                      className={`text-sm text-gray-300 ${
                        isExpanded ? "" : "line-clamp-3"
                      }`}
                    >
                      {review.content}
                    </p>
                    {review.content.length > 100 && (
                      <button
                        onClick={() => toggleReview(review.id)}
                        className="text-blue-400 text-xs mt-1 hover:underline"
                      >
                        {isExpanded ? "접기" : "더보기"}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-400">작성된 리뷰가 없습니다.</p>
          )}
        </div>

        {/* 추천 영화 */}
        <div className="p-6 pt-0">
          <h3 className="text-xl font-bold mb-4">함께 시청된 콘텐츠</h3>
          {isLoadingSimilar ? (
            <p className="text-gray-400">추천 콘텐츠 불러오는 중...</p>
          ) : similarMovies?.results?.length ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {similarMovies.results.slice(0, 6).map((similar) => (
                <div
                  key={similar.id}
                  className="bg-white/10 rounded-lg overflow-hidden"
                >
                  <img
                    src={
                      similar.poster_path
                        ? `https://image.tmdb.org/t/p/w300${similar.poster_path}`
                        : "/images/default-image.jpg"
                    }
                    alt={similar.title}
                    className="w-full h-44 object-cover"
                  />
                  <p className="text-sm text-white text-center px-2 py-2 truncate">
                    {similar.title}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">비슷한 콘텐츠가 없습니다.</p>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default MovieDetailpage;
