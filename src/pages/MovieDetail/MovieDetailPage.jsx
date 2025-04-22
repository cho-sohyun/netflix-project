import React from "react";
import ReactDOM from "react-dom";
import { useDetailMoviesQuery } from "../../hooks/useDetailMovies";
import { AiOutlineClose } from "react-icons/ai";

// 상세 정보
// 리뷰 보여주기 -> 더보기, 접기 추가
// 추천 영화 보여주기
// 예고편 보여주기
const MovieDetailpage = ({ movie, onClose }) => {
  const { data: detailMovie, isLoading } = useDetailMoviesQuery(movie.id);

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
      </div>
    </div>,
    document.body
  );
};

export default MovieDetailpage;
