import { useEffect } from "react";
import { useRouter } from "next/router";
import EachCartItem from "./eachCartItem";
import Row from "../layout/row";
import classes from "./cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { FetchDataCart } from "../../store/cart-slice";
import { Popup } from "../../store/popup-slice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const error = useSelector((state) => state.cart.error);
  const route = useRouter();
  const dispatch = useDispatch();

  if (error !== null)
    dispatch(Popup({ error: true, message: returnObj.error.message }));

  useEffect(() => {
    dispatch(FetchDataCart());
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
          return dispatch(
            Popup({ error: true, message: returnObj.error.message })
          );
        } else {
          route.push("/order");
          dispatch(Popup({ error: false, message: "Order Accepted" }));
          dispatch(FetchDataCart());
        }
      })
      .catch();
  };

  let subTotal = 0;

  {
    cartItems.map((each) => (subTotal += each.total));
  }

  return (
    <div className={classes.cart}>
      <div id={classes.user}>
        {cartItems.length === 0 && <h2>You have no item in your cart</h2>}
        {cartItems[0] !== undefined && (
          <h2>{cartItems[0].userId.name} here is your cart</h2>
        )}
      </div>

      {cartItems.length !== 0 && (
        <Row>
          <h3>#id</h3>
          <h3>Product</h3>
          <h3>Price</h3>
          <h3>Quantity</h3>
          <div>
            <h1></h1>
            <p>Edit Quantity</p>
          </div>

          <h3>Total</h3>
        </Row>
      )}
      {cartItems.map((each, index) => (
        <EachCartItem
          key={each._id}
          id={each.productId._id}
          count={index + 1}
          title={each.productId.title}
          price={each.productId.price}
          quantity={each.quantity}
          total={each.total}
        />
      ))}
      {cartItems.length !== 0 && (
        <div id={classes.order}>
          <p>Bill {subTotal} tK</p>
          <button onClick={OrderHandaler}>Order Now</button>
        </div>
      )}
    </div>
  );
};
export default Cart;
