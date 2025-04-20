import React from "react";
import { usePopularMoviesQuery } from "../../../hooks/usePopularMovies";

// 부트스트랩 제거

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  console.log(data);

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
    <div
      className="relative text-white flex items-center justify-center h-[40vh] md:h-[60vh] lg:h-[80vh] xl:h-[90vh] bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)),
          url(https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${data.results[0].poster_path})`,
      }}
    >
      <div className="absolute bottom-6 left-6 md:left-10 md:bottom-10 z-10 max-w-full md:max-w-[50%] space-y-4">
        <h1 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold">
          {data.results[0].title}
        </h1>
        <p className="text-xs sm:text-sm md:text-base leading-snug">
          {data.results[0].overview}
        </p>
      </div>
    </div>
  );
};

export default Banner;
