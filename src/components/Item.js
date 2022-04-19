import { Link } from "react-router-dom";

const Item = ({ id }) => (
  <div>
    <Link to={`/${id}`}>{id}</Link>
  </div>
);
export default Item;
