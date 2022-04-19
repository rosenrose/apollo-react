import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import Item from "../components/Item";

const GET_ITEMS = gql`
  query {
    items(max: 20) {
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
  grid-gap: 1.5rem;
  position: relative;
  top: -3rem;
`;

const Home = () => {
  const { loading, data, error } = useQuery(GET_ITEMS);
  // console.log(loading, data, error);

  return (
    <Container>
      <Header>
        <Title>Apollo React</Title>
        <Subtitle>with GragphQL</Subtitle>
      </Header>
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
