import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { FetchDataCart } from "../../store/cart-slice";
import Row from "../layout/row";

const EachCartItem = (props) => {
  const [error, setError] = useState();
  const edit = useRef();
  const dispatch = useDispatch();

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
          dispatch(FetchDataCart());
          setError();
        }
      })
      .catch();
  };
  return (
    <Row>
      {error && <p>{error}</p>}
      <h3>#{props.count}</h3>
      <h3>{props.title}</h3>
      <h3>{props.price} tK</h3>
      <h3>{props.quantity}</h3>
      <div>
        <input type="number" ref={edit}></input>
        <button onClick={EditHandaler}>Edit</button>
      </div>
      <h3>{props.quantity * props.price} tK</h3>
    </Row>
  );
};

export default EachCartItem;
