import { Fragment, useRef, useState } from "react";

const EachCartItem = (props) => {
  const [error, setError] = useState();
  const edit = useRef();

  const EditHandaler = (event) => {
    event.preventDefault();

    if (edit.current.value < -props.quantity) {
      return setError("Qunatity cannot be less than " + -props.quantity);
    }

    fetch(`${process.env.URL}/add-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        productId: props.id,
        price: props.price,
        edit: edit.current.value,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((returnObj) => {
        if (returnObj.error) {
          setError(returnObj.error.message);
        } else {
          edit.current.value = "";
          setError();
        }
      })
      .catch();
  };
  return (
    <Fragment>
      <h3>Title: {props.title}</h3>
      <h3>Price: {props.price}</h3>
      <h3>Quantity: {props.quantity}</h3>
      {error && <p>{error}</p>}
      <input type="number" ref={edit}></input>
      <button onClick={EditHandaler}>Edit</button>
      <h3>Total: {props.quantity * props.price}</h3>
    </Fragment>
  );
};

export default EachCartItem;
