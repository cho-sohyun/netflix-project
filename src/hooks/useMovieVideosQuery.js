import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchVideoMovies = (movieId) => {
  return api.get(`/movie/${movieId}/videos`);
};

export const useMovieVideosQuery = (movieId) => {
  return useQuery({
    queryKey: ["movie-video", movieId],
    queryFn: () => fetchVideoMovies(movieId),
    select: (result) => {
      return result.data.results.find(
        (video) =>
          (video.type === "Trailer" || video.type === "Teaser") &&
          video.site === "YouTube"
      );
    },
  });
};
