import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const GET_MOVIE = gql`
  query ($movieId: String!) {
    movie(id: $movieId) {
      items {
        thumbnailUrl
        snippet {
          title
          description
        }
      }
    }
  }
`;

const Movie = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_MOVIE, { variables: { movieId: id } });
  // console.log(data);

  return (
    <>
      {loading ? (
        <h1>loading</h1>
      ) : (
        <figure>
          <figcaption>{data.movie.items[0].snippet.title}</figcaption>
          <img src={data.movie.items[0].thumbnailUrl} alt={data.movie.items[0].thumbnailUrl} />
        </figure>
      )}
    </>
  );
};

export default Movie;
