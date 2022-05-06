import { Link } from "react-router-dom";
import styled from "styled-components";
import { gql, useMutation } from "@apollo/client";

const TOGGLE_LIKE = gql`
  mutation toggle($id: String!) {
    toggleLike(id: $id) @client
  }
`;

const Container = styled.div`
  width: 100%;
`;

const Poster = styled.img`
  max-width: 100%;
  border-radius: 0.5rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const Item = ({ id, thumbnail, isLiked }) => {
  // const onClick = ();
  const [toggleLike] = useMutation(TOGGLE_LIKE, {
    variables: { id },
  });

  return (
    <Container>
      <Link to={`/${id}`} state={{ thumbnail }}>
        <Poster src={thumbnail} />
      </Link>
      <button onClick={toggleLike}>{isLiked ? "Unlike" : "Like"}</button>
    </Container>
  );
};
export default Item;
