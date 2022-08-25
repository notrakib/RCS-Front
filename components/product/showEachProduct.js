import { Fragment, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const ShowEachProduct = (props) => {
  const [error, setError] = useState();
  const userId = useSelector((state) => state.signin.userId);
  const qty = useRef();
  const route = useRouter();

  const AddToCartHandaler = (event) => {
    event.preventDefault();

    if (qty.current.value < 1) {
      return setError("Qunatity cannot be less than 1");
    }

    fetch("https://realistic-cart-system.herokuapp.com/add-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        productId: props.id,
        price: props.price,
        qty: qty.current.value,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((returnObj) => {
        if (returnObj.error) {
          setError(returnObj.error.message);
        } else {
          qty.current.value = "";
          setError();
        }
      })
      .catch();
  };

  const EditHandaler = (event) => {
    event.preventDefault();
    if (userId != "63077e2398cccf6458bc3336")
      return setError("Only Admin can edit");
    route.push("/edit-product/" + props.id);
  };

  return (
    <Fragment>
      <h3>Title: {props.title}</h3>
      <img
        src={"https://realistic-cart-system.herokuapp.com/" + props.image}
        alt="ok"
      ></img>
      <h3>Price: {props.price}</h3>
      <h3>Category: {props.category}</h3>
      <h3>Description: {props.description}</h3>
      <h3>Company: {props.company}</h3>
      {error && <p>{error}</p>}
      <input ref={qty} min="1" type="number"></input>
      <button onClick={AddToCartHandaler}>Add</button>
      <button onClick={EditHandaler}>Edit</button>
    </Fragment>
  );
};

export default ShowEachProduct;
