import React, { useState } from "react";

// 수정 예정
// 데스크탑 : 호버 -> 간단 정보, 클릭 -> 모달로 세부 정보
// 모바일 : 클릭 시 모달로 정보

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-[180px] h-[300px] 
    sm:w-[200px] sm:h-[320px] 
    md:w-[220px] md:h-[350px] transition-all duration-300 ${
      isHovered ? "z-[9999]" : "z-10"
    }`}
    >
      {/* 카드 이미지 */}
      <div
        className="w-full h-full bg-cover bg-center rounded"
        style={{
          backgroundImage: `url(https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path})`,
        }}
      ></div>

      {/* 호버 시 나오는 팝업 박스 */}
      <div
        className={`absolute top-0 left-1/2 
     w-[180px] h-[300px] 
    sm:w-[200px] sm:h-[320px] 
    md:w-[320px] md:h-[350px]
    bg-neutral-900 text-white rounded-xl shadow-2xl p-3 
    transition-all duration-300 ease-in-out z-50
    transform -translate-x-1/2
    ${
      isHovered
        ? "scale-105 opacity-100 pointer-events-auto"
        : "scale-95 opacity-0 pointer-events-none"
    }`}
      >
        {/* 팝업 이미지 상단 */}
        <div
          className="w-full h-[120px] sm:h-[160px] md:h-[180px] bg-cover bg-center rounded-md mb-3"
          style={{
            backgroundImage: `url(https://media.themoviedb.org/t/p/w600_and_h900_bestv2${
              movie.backdrop_path || movie.poster_path
            })`,
          }}
        ></div>

        {/* 액션 버튼 */}
        <div className="flex items-center gap-2 sm:gap-2 mb-2 px-1">
          <button className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-sm">
            ▶
          </button>
          <button className="w-6 h-6 border border-gray-400 rounded-full flex items-center justify-center text-sm">
            ＋
          </button>
          <button className="w-6 h-6 border border-gray-400 rounded-full flex items-center justify-center text-sm">
            👍
          </button>
        </div>

        {/* 정보 */}
        <div className="text-sm text-gray-300 px-2">
          <p className="mb-1 font-semibold truncate">{movie.title}</p>
          <p className="text-xs text-gray-400 mb-1">
            ⭐ {movie.vote_average} / 🔥 {Math.floor(movie.popularity)} /{" "}
            {movie.adult ? "🔞" : "✅"}
          </p>
          <p className="text-xs sm:line-clamp-3 line-clamp-4">
            {movie.overview || "설명이 없습니다."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
