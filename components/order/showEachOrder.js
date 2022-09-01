import React, { useCallback, useEffect, useState } from "react";
import classes from "./showEachOrder.module.css";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Popup } from "../../store/popup-slice";

const ShowEachOrder = () => {
  const [orders, setOrders] = useState([]);
  const route = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = useCallback(() => {
    fetch(`${process.env.URL}/order`, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((returnObj) => {
        if (returnObj.error) {
          dispatch(Popup({ error: true, message: returnObj.error.message }));
          return;
        } else {
          setOrders(returnObj.orders);
        }
      })
      .catch((err) => console.log(err));
  }, [localStorage.getItem("token")]);

  return (
    <div className={classes.each}>
      {orders.length === 0 && <h3>You do not have any completed order</h3>}
      {orders[0] !== undefined && (
        <h3>{orders[0].userId.name} here is your completed order</h3>
      )}
      {orders.map((each) => (
        <div
          onClick={() => {
            route.push(`/order-details/${each._id}`);
          }}
          key={each._id}
        >
          <h2>#OrderID {each._id}</h2>
          <h2>Total {each.subTotal}tK</h2>
        </div>
      ))}
    </div>
  );
};
export default React.memo(ShowEachOrder);
