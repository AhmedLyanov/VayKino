import { BrowserRouter, Routes, Route } from "react-router-dom"
import Main from "./pages/Main/Main";
import MoviePage from "./pages/MoviePage/MoviePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/MoviePage" element={<MoviePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;