import React, { Fragment, useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./FilmPage.css";
import fakeposter from "../../img/fakeposter.png";

// COMPONENTS THAT DISPLAY IN THE BODY //
import { CastCard } from "../Cards/CastCard";
import { CrewCard } from "../Cards/CrewCard";
import SearchResult from "../SearchResult/SearchResult";
import { RecommendCard } from "../Cards/RecommendCard";
import { useParams } from "react-router-dom";

export const FilmPage = ({
  apiKey,
  movieResults,
  displayResults,
  setQuery,
}) => {
  // LOAD MOVIE //

  const params = useParams();
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleMovie = async () => {
      const movieUrl = `https://api.themoviedb.org/3/movie/${params.id}?api_key=${apiKey}&language=en-US`;
      const response = await fetch(movieUrl);
      const data = await response.json();

      data && setMovie(data);
    };

    handleMovie();
  }, [params.id, apiKey]);

  // LOAD CREDITS AND RECOMMENDED //

  const [credits, setCredits] = useState({});
  const [recommend, setRecommend] = useState([]);

  useEffect(() => {
    if (movie.id) {
      const loadCredits = async () => {
        const creditsUrl = `https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=${apiKey}&language=en-US`;
        const response = await fetch(creditsUrl);
        const data = await response.json();

        data && setCredits(data);
      };

      const loadRecommend = async () => {
        const recommendUrl = `https://api.themoviedb.org/3/movie/${params.id}/recommendations?api_key=${apiKey}&language=en-US&page=1`;
        const response = await fetch(recommendUrl);
        const data = await response.json();

        data && setRecommend(data.results);
      };

      loadCredits();
      loadRecommend();
    }
  }, [movie, params.id, apiKey]);

  return (
    <>
      <SearchResult
        displayResults={displayResults}
        movieResults={movieResults}
        setQuery={setQuery}
      />

      <div key={movie.id} className="film-wrap">
        <div className="film-backdrop-wrap">
          {movie.backdrop_path ? (
            <div className="film-backdrop">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={`${movie.title}`}
              ></img>
            </div>
          ) : (
            <div className="film-backrop-filler"></div>
          )}
        </div>
        <div className="film-details-wrap">
          {movie.poster_path ? (
            <div className="film-poster">
              <img
                className="real-poster-search"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={`${movie.title} Poster`}
              />
            </div>
          ) : (
            <div className="film-poster">
              <img
                className="filler-poster-search"
                src={fakeposter}
                alt="No Poster Found"
              />
            </div>
          )}
          <div>
            <div className="film-heading">
              <h1 className="film-title">{movie.title}</h1>

              {movie.release_date ? (
                <p className="film-year">
                  ({movie.release_date.substring(0, 4)})
                </p>
              ) : (
                <p className="film-year">
                  <i>(No Release Date)</i>
                </p>
              )}
            </div>
            <div className="film-director">
              <p>Directed by</p>
              {credits.crew &&
                credits.crew.map((crew) => (
                  <div>
                    {crew.job === "Director" ? (
                      <p>
                        <strong>{crew.name}</strong>
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="film-overview">
          <p>{movie.overview}</p>
        </div>

        <Tabs className="film-credits-wrap" forceRenderTabPanel={true}>
          <TabList className="film-credits-heading">
            <Tab>Cast</Tab>
            <Tab>Crew</Tab>
          </TabList>
          {credits.cast && credits.crew && (
            <div>
              <TabPanel>
                <CastCard credits={credits} />
              </TabPanel>
              <TabPanel>
                <CrewCard credits={credits} />
              </TabPanel>
            </div>
          )}
        </Tabs>
        <RecommendCard recommend={recommend} movie={movie} />
      </div>
    </>
  );
};
