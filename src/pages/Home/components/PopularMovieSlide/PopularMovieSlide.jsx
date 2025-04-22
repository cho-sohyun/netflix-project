import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import MovieCard from "../MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

const PopularMovieSlide = ({ onMovieClick }) => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[40vh] md:h-[60vh] lg:h-[80vh]">
        <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-500 text-white p-4 rounded text-center max-w-xl mx-auto">
        {error.message}
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h1 className="m-4 text-xl">현재 인기있는 영화</h1>

      <div className="overflow-visible">
        <Swiper
          slidesPerView={6}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          preventClicks={false}
          preventClicksPropagation={false}
          touchStartPreventDefault={false}
          className="mySwiper !overflow-visible z-10"
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            480: {
              slidesPerView: 2.2, // 작은 태블릿
            },
            768: {
              slidesPerView: 3.2, // 일반 태블릿
            },
            1024: {
              slidesPerView: 5, // 데스크탑
            },
            1280: {
              slidesPerView: 6, // 큰 데스크탑
            },
          }}
        >
          {data.results.map((movie, index) => (
            <SwiperSlide key={index}>
              <MovieCard movie={movie} onClick={() => onMovieClick(movie)} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PopularMovieSlide;
