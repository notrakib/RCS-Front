import React, { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { FetchDataCart } from "../../store/cart-slice";
import Row from "../layout/row";
import { Popup } from "../../store/popup-slice";

const EachCartItem = (props) => {
  const edit = useRef();
  const dispatch = useDispatch();

  const EditHandaler = useCallback(() => {
    if (edit.current.value < -props.quantity) {
      return dispatch(
        Popup({
          error: true,
          message: "Qunatity cannot be less than " + -props.quantity,
        })
      );
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
          dispatch(Popup({ error: true, message: returnObj.error.message }));
        } else {
          edit.current.value = "";
          dispatch(FetchDataCart());
          dispatch(
            Popup({
              error: false,
              message: "Quantity has been edited successfully",
            })
          );
        }
      })
      .catch();
  }, [props, localStorage.getItem("token")]);

  return (
    <Row>
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

export default React.memo(EachCartItem);
