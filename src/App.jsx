import "./App.css";
import "swiper/css";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Homepage from "./pages/Home/Homepage";
import MoviePage from "./pages/Movies/MoviePage";
import MovieDetailPage from "./pages/MovieDetail/MovieDetailPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Homepage />} />
        <Route path="movies">
          <Route index element={<MoviePage />} />
          <Route path=":id" element={<MovieDetailPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  );
}

export default App;
