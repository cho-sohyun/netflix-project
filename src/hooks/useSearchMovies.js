import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovies = ({ keyword, page, genre }) => {
  if (keyword) {
    return api.get(`/search/movie?query=${keyword}&page=${page}`);
  } else if (genre) {
    return api.get(`/discover/movie?with_genres=${genre}&page=${page}`);
  } else {
    return api.get(`/movie/popular?page=${page}`);
  }
};
export const useSearchMoviesQuery = ({ keyword, page, genre }) => {
  return useQuery({
    queryKey: ["movie-search", { keyword, page, genre }],
    queryFn: () => fetchSearchMovies({ keyword, page, genre }),
    select: (result) => result.data,
    keepPreviousData: true,
  });
};
