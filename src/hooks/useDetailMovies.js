import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchDetailMovies = (movieId) => {
  return api.get(`/movie/${movieId}?language=ko-KR`);
};

export const useDetailMoviesQuery = (movieId) => {
  return useQuery({
    queryKey: ["movie-Detail", movieId],
    queryFn: () => fetchDetailMovies(movieId),
    select: (result) => result.data,
  });
};
