import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./Header/Header";
import HomePage from "./HomePage/HomePage";
import { Footer } from "./Footer/Footer";
import { FilmPage } from "./FilmPage/FilmPage";
import { CreateAccountPage } from "./CreateAccountPage/CreateAccountPage";

const Body = () => {
  const apiKey = "f1206acdc6dd0ff0374585c4b4b936a1";
  const [query, setQuery] = useState("");
  const [movieResults, setMovieResults] = useState([]);

  useEffect(() => {
    if (query !== "") {
      handleSearch([]);
    } else {
      setMovieResults([]);
    }
  }, [query]);

  // FUNCTIONS AND LOGIC
  const handleSearch = async (e) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${query}`
    );

    const data = await response.json();

    data && !!data.results.length && setMovieResults(data.results);
  };

  return (
    <div>
      <Header setQuery={setQuery} query={query} />
      <Routes>
        <Route
          exact
          path="/dissolvd"
          element={
            <HomePage
              displayResults={!!movieResults.length && query !== ""}
              movieResults={movieResults}
              setQuery={setQuery}
            />
          }
        />
        <Route
          exact
          path="/dissolvd/movie/:id"
          element={
            <FilmPage
              displayResults={!!movieResults.length && query !== ""}
              movieResults={movieResults}
              setQuery={setQuery}
              apiKey={apiKey}
              query={query}
            />
          }
        />
        <Route
          exact
          path="/dissolvd/about"
          element={
            <CreateAccountPage
              displayResults={!!movieResults.length && query !== ""}
              movieResults={movieResults}
              setQuery={setQuery}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default Body;
