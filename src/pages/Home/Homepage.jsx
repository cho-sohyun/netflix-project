import React, { useState } from "react";
import Banner from "./components/Banner";
import PopularMovieSlide from "./components/PopularMovieSlide/PopularMovieSlide";
import TopRatedMovieSlide from "./components/TopRatedMovieSlide/TopRatedMovieSlide";
import UpComingMovieSlide from "./components/UpcomingMovieSlide/UpcomingMovieSlide";
import MovieDetailpage from "../MovieDetail/MovieDetailPage";

// 배너 -> 인기 영화 목록중 첫번 째 아이템을 배너로!
// 인기 영화 목록
// 인기 상승 영화 목록
// 공개 예정 영화 목록

const Homepage = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };
  return (
    <div>
      <Banner />
      <div className="px-4 md:px-6 lg:px-12">
        <PopularMovieSlide onMovieClick={openModal} />
        <TopRatedMovieSlide onMovieClick={openModal} />
        <UpComingMovieSlide onMovieClick={openModal} />

        {isModalOpen && selectedMovie && (
          <MovieDetailpage movie={selectedMovie} onClose={closeModal} />
        )}
      </div>
    </div>
  );
};

export default Homepage;
