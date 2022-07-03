import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";

const GET_MOVIE = gql`
  query ($movieId: String!) {
    movie(id: $movieId) {
      id
      thumbnailUrl
      snippet {
        title
        description
      }
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 1rem;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.7rem;
`;

const Image = styled.div`
  width: 40%;
  height: 50%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  border-radius: 0.5rem;
`;

const Movie = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_MOVIE, { variables: { movieId: id } });
  // console.log(data);

  return (
    <Container>
      {loading ? (
        "Loading..."
      ) : (
        <>
          <Column>
            <Title>{data.movie.snippet.title}</Title>
            <Description>{data.movie.snippet.description}</Description>
          </Column>
          <Image bg={data.movie.thumbnailUrl} />
        </>
      )}
    </Container>
  );
};

export default Movie;
