import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const ShowEachProduct = (props) => {
  const [error, setError] = useState();
  const signedin = useSelector((state) => state.signin.signedin);
  const route = useRouter();

  const DetailHandaler = (event) => {
    event.preventDefault();

    if (!signedin) return setError("Please sign in");
    route.push(`/product-detail/${props.id}`);
  };

  return (
    <Fragment>
      <h3>Title: {props.title}</h3>
      <h3>Price: {props.price}</h3>
      {error && <p>{error}</p>}
      <button onClick={DetailHandaler}>Detail</button>
    </Fragment>
  );
};

export default ShowEachProduct;
