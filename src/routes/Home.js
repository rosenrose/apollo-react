import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import Item from "../components/Item";

const GET_ITEMS = gql`
  query getItems($id: String!) {
    items(id: $id, max: 20) {
      id
      thumbnail
      isLiked @client
    }
  }
`;
// console.log(GET_ITEMS);

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

const Subtitle = styled.h3`
  font-size: 2rem;
`;

const Loading = styled.div`
  font-size: 1.2rem;
  opacity: 0.5;
  font-weight: 500;
  margin-top: 1rem;
`;

const Items = styled.div`
  width: 95%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  align-items: flex-end;
  grid-gap: 1.5rem;
  margin-top: 3rem;
`;

const IdInput = styled.input`
  width: 20rem;
`;

const initPlaylistId = "UUyWiQldYO_-yeLJC0j5oq2g";

const Home = () => {
  const [playlistId, setPlaylistId] = useState(initPlaylistId);
  const { loading, data, error } = useQuery(GET_ITEMS, {
    variables: { id: playlistId },
  });
  // console.log(loading, data, error);

  const onChange = (event) => {
    setPlaylistId(event.target.value);
  };

  return (
    <Container>
      <Header>
        <Title>Apollo React</Title>
        <Subtitle>with GragphQL</Subtitle>
      </Header>
      <IdInput type="text" onChange={onChange} list="playlists" />
      <datalist id="playlists">
        <option value={initPlaylistId} />
        <option value="PLtYQ7DpMMg-I22iICgrMNC1ln3ZT4FxUj" />
      </datalist>
      {loading ? (
        <Loading>Loading...</Loading>
      ) : (
        <Items>
          {data?.items.map((item) => (
            <Item key={item.id} {...item} />
          ))}
        </Items>
      )}
    </Container>
  );
};
export default Home;
