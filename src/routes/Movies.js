import { useApolloClient, gql } from "@apollo/client";
import { useEffect } from "react";
import { useState } from "react";

const Movies = () => {
  const client = useApolloClient();
  const [movies, setMovies] = useState({});

  useEffect(() => {
    client
      .query({
        query: gql`
          {
            allMovies {
              items {
                snippet {
                  title
                }
                contentDetails {
                  videoId
                }
              }
            }
          }
        `,
      })
      .then((result) => setMovies(result.data.allMovies));
  }, []);

  return (
    <ul>
      {movies.items?.map((movie) => (
        <li key={movie.contentDetails.videoId}>{movie.snippet.title}</li>
      ))}
    </ul>
  );
};

export default Movies;
