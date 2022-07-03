import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ALL_MOVIES = gql`
  query getMovies($playlistId: String!) {
    allMovies(id: $playlistId) {
      id
      thumbnailUrl
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Header = styled.header`
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  height: 45vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Loading = styled.div`
  font-size: 1.2rem;
  opacity: 0.5;
  font-weight: 500;
  margin-top: 1rem;
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1.5rem;
  width: 80%;
  position: relative;
  top: -50px;
`;

const PosterContainer = styled.div`
  height: 15rem;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: transparent;
`;

const PosterBg = styled.div`
  background-image: url(${(props) => props.background});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
  border-radius: 0.5rem;
`;

const playlists = ["UUyWiQldYO_-yeLJC0j5oq2g", "PLtYQ7DpMMg-I22iICgrMNC1ln3ZT4FxUj"];

const Movies = () => {
  const [id, setId] = useState(playlists[0]);
  const onChange = (event) => {
    const value = event.target.value;
    if (value.length) {
      setId(value);
    }
  };

  const { data, loading } = useQuery(ALL_MOVIES, { variables: { playlistId: id } });
  // console.log(data);

  return (
    <Container>
      <Header>
        <Title>Apollo Movies</Title>
        <input type="text" onChange={onChange} list="playlists" style={{ width: "20rem" }} />
        <datalist id="playlists">
          {playlists.map((id) => (
            <option value={id} />
          ))}
        </datalist>
      </Header>
      {loading ? (
        <Loading>Loading...</Loading>
      ) : (
        <MoviesGrid>
          {data.allMovies.map((movie) => (
            <PosterContainer key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                <PosterBg background={movie.thumbnailUrl} />
              </Link>
            </PosterContainer>
          ))}
        </MoviesGrid>
      )}
    </Container>
  );
};

export default Movies;
