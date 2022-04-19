import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const GET_ITEM = gql`
  query getItem($id: String!) {
    item(id: $id) {
      id
      title
      description
      date
      thumbnail
    }
  }
`;

const Detail = () => {
  const { id } = useParams();
  const { loading, data, error } = useQuery(GET_ITEM, {
    variables: { id },
  });
  // console.log(loading, data, error);

  return <>{loading ? "Loading..." : data?.item.title}</>;
};
export default Detail;
