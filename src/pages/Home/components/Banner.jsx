import React from "react";
import { usePopularMoviesQuery } from "../../../hooks/usePopularMovies";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  console.log(data);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[40vh] md:h-[60vh] lg:h-[80vh]">
        <Spinner animation="border" role="status" variant="light">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div
      className="relative text-white flex items-center justify-center h-[80vh] !md:h-[60vh] lg:h-[80vh] xl:h-[90vh] bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `
    linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)),
    url(https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${data.results[0].poster_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="absolute bottom-4 left-4 right-4 md:left-10 md:bottom-10 md:right-auto z-10 max-w-full md:max-w-[50%]">
        <h1 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4 leading-tight ">
          {data.results[0].title}
        </h1>
        <p className="text-xs sm:text-sm md:text-base leading-snug ">
          {data.results[0].overview}
        </p>
      </div>
    </div>
  );
};

export default Banner;
