import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import EachCartItem from "./eachCartItem";

const Cart = () => {
  const [cartitems, setCartitems] = useState([]);
  const [error, setError] = useState();
  const route = useRouter();

  useEffect(() => {
    fetchCartitems();
  }, []);

  const OrderHandaler = async () => {
    fetch(`${process.env.URL}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((returnObj) => {
        if (returnObj.error) {
          return setError(returnObj.error.message);
        } else {
          route.push("/order");
          setCartitems([]);
          setError();
        }
      })
      .catch();
  };

  const fetchCartitems = async () => {
    fetch(`${process.env.URL}/all-cart`, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((returnObj) => {
        if (returnObj.error) {
          setError(returnObj.error.message);
          return;
        } else {
          setCartitems(returnObj.cartItems);
        }
      })
      .catch();
  };

  let subTotal = 0;

  cartitems.map((each) => (subTotal += each.total));

  return (
    <Fragment>
      {error && <p>{error}</p>}
      {cartitems.length === 0 && <p>You have no item in your cart</p>}
      {cartitems[0] !== undefined && <h3>Name: {cartitems[0].userId.name}</h3>}
      {!error &&
        cartitems.map((each) => (
          <EachCartItem
            key={each._id}
            id={each.productId._id}
            title={each.productId.title}
            price={each.productId.price}
            quantity={each.quantity}
            total={each.total}
          />
        ))}
      {cartitems.length !== 0 && (
        <Fragment>
          <h2>Pay: {subTotal}</h2>
          <button onClick={OrderHandaler}>Order</button>
        </Fragment>
      )}
    </Fragment>
  );
};
export default Cart;
