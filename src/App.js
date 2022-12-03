import React, { useState } from "react";
import "./App.css";
import { Row, Container, Spinner, Col, Button } from "react-bootstrap";
import axios from "axios";

function App() {
  const url =
    "https://api.themoviedb.org/3/movie/popular?api_key=b3d14d59ff301f4b23020e6c4e70ce18&language=en-US&page=1";
  const [popular, setPopular] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPopularMovies = async () => {
    setIsLoading(true);
    const response = await axios.get(url);
    setPopular(response.data.results);
    setIsLoading(false);
  };

  return (
    <>
      <Container className="mt-5">
        <span>
          <img
            src="https://raw.githubusercontent.com/crane-cloud/frontend/develop/public/favicon.png"
            width="50"
            alt=""
          />
        </span>
        <h1 className="mt-4 mb-4">Crane Cloud React Application</h1>

        <Col md={4}>
          <Button
            variant="primary"
            size="lg"
            onClick={() => fetchPopularMovies()}
          >
            Fetch Popular Movies
          </Button>
        </Col>

        {isLoading && (
          <Spinner animation="border" variant="info" role="status">
            <span className="visually-hidden">Fetching movies...</span>
          </Spinner>
        )}

        {!isLoading && (
          <Row className="mt-5">
            <div className="popular-movies">
              {popular?.map((movie) => {
                return (
                  <>
                    <Row>
                      <h5>{movie.title}</h5>
                      <img
                        className="movie-image"
                        src={
                          "https://image.tmdb.org/t/p/w500" +
                          movie.backdrop_path
                        }
                        alt={movie.path}
                      />
                    </Row>
                  </>
                );
              })}
            </div>
          </Row>
        )}

        <Row className="mb-5">
          <small className="mt-4">Made with love by Crane Cloud</small>
        </Row>
      </Container>
    </>
  );
}

export default App;
