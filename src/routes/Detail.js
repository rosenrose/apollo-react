import { useParams, useLocation } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";

const GET_ITEM = gql`
  query getItem($id: String!, $isRequestThumbnail: Boolean) {
    item(id: $id, isRequestThumbnail: $isRequestThumbnail) {
      id
      title
      description
      date
      thumbnail
      isLiked @client
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
  width: 40%;
  margin-left: 1rem;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.h4`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Description = styled.pre`
  font-size: 1.3rem;
`;

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  width: 50%;
  height: 60%;
  background-size: cover;
  background-position: center center;
`;

const Loading = styled.div`
  font-size: 1.2rem;
  opacity: 0.5;
  font-weight: 500;
  margin-top: 1rem;
`;

const Anchor = styled.a`
  color: inherit;
`;

const Detail = () => {
  const { id } = useParams();
  const {
    state: { thumbnail },
  } = useLocation();

  const { loading, data, error } = useQuery(GET_ITEM, {
    variables: { id, isRequestThumbnail: !Boolean(thumbnail) },
  });
  // console.log(loading, data, error);
  const date = new Date(data?.item.date);

  return (
    <Container>
      <Column>
        {loading ? (
          <Loading>Loading...</Loading>
        ) : (
          <Title>
            {data.item.title} {data.item.isLiked ? "💝" : "🤍"}
          </Title>
        )}
        {data?.item && (
          <>
            <Subtitle>
              <Anchor href={`https://youtu.be/${id}`} target="_blank" rel="noreferrer">
                {id}
              </Anchor>{" "}
              | {`${date.getFullYear()}. ${date.getMonth()}. ${date.getDate()}.`}
            </Subtitle>
            <Description>{data.item.description}</Description>
          </>
        )}
      </Column>
      <Poster bg={thumbnail || data?.item.thumbnail} />
    </Container>
  );
};

export default Detail;
