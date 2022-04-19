import { gql, useQuery } from "@apollo/client";
import { Fragment } from "react/cjs/react.production.min";

const GET_ITEMS = gql`
  {
    items(max: 50) {
      id
      thumbnail
    }
  }
`;
console.log(GET_ITEMS);

const Home = () => {
  const { loading, data, error } = useQuery(GET_ITEMS);
  console.log(loading, data, error);

  if (loading) {
    return "loading...";
  }
  if (data?.items) {
    return data.items.map((item) => (
      <Fragment key={item.id}>
        <h1>{item.id}</h1>
        <img src={item.thumbnail} alt={item.title} />
      </Fragment>
    ));
  }
};
export default Home;
