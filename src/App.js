import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movie from "./routes/Movie";
import Movies from "./routes/Movies";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/movie/:id" element={<Movie />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
