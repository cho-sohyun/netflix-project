import React from "react";
import { usePopularMoviesQuery } from "../../../hooks/usePopularMovies";
import { useMovieVideosQuery } from "../../../hooks/useMovieVideosQuery";
import ReactPlayer from "react-player";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  const movie = data?.results[0];

  const { data: videoData } = useMovieVideosQuery(movie?.id);

  if (isLoading || !movie) {
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
    <div className="relative h-[60vh] md:h-[80vh] xl:h-[90vh] overflow-hidden">
      {videoData ? (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoData.key}`}
          playing
          muted
          loop
          width="100%"
          height="100%"
          className="absolute top-0 left-0 z-0"
        />
      ) : (
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
          style={{
            backgroundImage: `url(https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${movie.backdrop_path})`,
          }}
        ></div>
      )}
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
