import Choices from "./components/Choices"
import LandingPage from "./components/landingPage"
import "./App.css";
import Result from "./components/Result";
import { BrowserRouter, Route, Routes } from "react-router"
import { useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<LandingPage />} />
          <Route path="choices" element={<Choices setMovies={setMovies}/>} />
          <Route path="result" element={<Result movies={movies} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App