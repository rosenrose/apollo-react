import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const ALL_MOVIES = gql`
  query getMovies {
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
`;

const Movies = () => {
  const { data, loading } = useQuery(ALL_MOVIES);
  // console.log(data);

  return (
    <>
      {loading ? (
        <h1>loading</h1>
      ) : (
        <ul>
          {data.allMovies.items.map((movie) => (
            <li key={movie.contentDetails.videoId}>
              <Link to={`/movie/${movie.contentDetails.videoId}`}>{movie.snippet.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Movies;
