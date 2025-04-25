import React, { useState, useEffect } from "react";
import { useSearchMoviesQuery } from "../../hooks/useSearchMovies";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../Home/components/MovieCard";
import ReactPaginate from "react-paginate";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import MovieDetailpage from "../MovieDetail/MovieDetailPage";

// 경로1. nav바에서 클릭한 경우 -> 인기 영화 목록을 보여줌
// 경로2. 키워드를 입력해서 검색한 경우 -> 키워드와 관련된 영화 목록을 보여줌
// 장르 드롭다운 버튼 -> 선택한 장르 이름을 보여줌
// 장르를 선택한 경우 -> 장르에 맞는 영화 목록 필터링
// sort 인기순 정렬

const MoviePage = () => {
  const [query] = useSearchParams();
  const keyword = query.get("q");
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");

  const { data: genres, isLoading: isGenreLoading } = useMovieGenreQuery();

  useEffect(() => {
    setPage(1);
  }, [keyword, selectedGenre]);

  const { data, isLoading, isError, error } = useSearchMoviesQuery({
    keyword,
    page,
    genre: selectedGenre,
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const sortedMovies = [...(data?.results || [])].sort((a, b) => {
    return sortOrder === "desc"
      ? b.popularity - a.popularity
      : a.popularity - b.popularity;
  });

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    setIsDropdownOpen(false);
  };

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const pageRangeDisplayed = window.innerWidth <= 768 ? 5 : 10;

  const selectedGenreName =
    genres?.find((genre) => genre.id === selectedGenre)?.name || "장르";

  if (isGenreLoading || isLoading) {
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
    <div className="px-4 md:px-6 lg:px-10">
      <div className="flex justify-between items-center mt-4 mb-2">
        <div className="relative inline-block text-left">
          <button
            type="button"
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
            id="menu-button"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
            onClick={toggleDropdown}
          >
            {selectedGenreName}
            <svg
              className="-mr-1 size-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {isDropdownOpen && (
          <div
            class="absolute left-0 z-[999] mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabindex="-1"
          >
            <div className="py-1" role="none">
              <button
                className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                  selectedGenre === "" ? "bg-indigo-100 font-semibold" : ""
                }`}
                onClick={() => handleGenreChange("")}
              >
                전체 보기
              </button>
              {genres?.map((genre) => (
                <button
                  key={genre.id}
                  className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                    selectedGenre === genre.id
                      ? "bg-indigo-100 font-semibold"
                      : ""
                  }`}
                  onClick={() => handleGenreChange(genre.id)}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end items-center gap-2">
          <button
            onClick={() => setSortOrder("desc")}
            className={`px-3 py-1 rounded-md text-xs border ${
              sortOrder === "desc"
                ? "bg-indigo-600 text-white "
                : "bg-white text-gray-700 "
            }`}
          >
            높은순
          </button>
          <button
            onClick={() => setSortOrder("asc")}
            className={`px-3 py-1 rounded-md text-xs border ${
              sortOrder === "asc"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            낮은순
          </button>
        </div>
      </div>

      {data?.results.length === 0 && (
        <div className="text-center text-gray-500 my-6">
          검색 결과가 없습니다.
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mt-4 ">
        {sortedMovies.map((movie, index) => (
          <div key={index} onClick={() => setSelectedMovie(movie)}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-6 mb-6">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={pageRangeDisplayed}
          marginPagesDisplayed={0}
          pageCount={data?.total_pages}
          previousLabel="<"
          renderOnZeroPageCount={null}
          forcePage={page - 1}
          containerClassName="cursor-pointer flex flex-wrap items-center space-x-2 text-sm"
          pageClassName="px-2 py-1 rounded-md border border-gray-300 hover:bg-gray-200 hover:text-black transition"
          activeClassName="bg-indigo-600 text-white"
          previousClassName="px-2 py-1 rounded-md border border-gray-300 hover:bg-gray-200"
          nextClassName="px-2 py-1 rounded-md border border-gray-300 hover:bg-gray-200"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      </div>

      {selectedMovie && (
        <MovieDetailpage
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default MoviePage;
