import { Fragment } from "react";

const ShowEachProduct = (props) => {
  return (
    <Fragment>
      <h3>Title: {props.title}</h3>
      <h3>Price: {props.price}</h3>
      <h3>Quantity: {props.quantity}</h3>
      <h3>Sub Total: {props.quantity * props.price}</h3>
    </Fragment>
  );
};

export default ShowEachProduct;
