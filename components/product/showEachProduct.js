import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import classes from "./showEachProduct.module.css";

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
      <div className={classes.each}>
        <h3>{props.title}</h3>
        <h4>Category: {props.category}</h4>
        <h4>Price: {props.price} tK</h4>

        {error && <p>{error}</p>}
        <button onClick={DetailHandaler}>View Details</button>
      </div>
    </Fragment>
  );
};

export default ShowEachProduct;
