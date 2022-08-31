import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Popup } from "../../store/popup-slice";
import classes from "./orderDetails.module.css";

const OrderDetail = () => {
  const [order, setOrder] = useState({});
  const route = useRouter();
  const dispatch = useDispatch();

  const fetchOrder = () => {
    fetch(`${process.env.URL}/orderDetails/${route.query.orderId}`, {
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
          setOrder(returnObj.order);
        }
      })
      .catch();
  };

  useEffect(() => {
    if (route.query.orderId === undefined) return;
    fetchOrder();
  }, [route.query.orderId]);

  // const InvoiceHandaler = () => {
  //   fetch(`${process.env.URL}/order/${route.query.orderId}`, {
  //     headers: {
  //       Authorization: "bearer " + localStorage.getItem("token"),
  //       Accept: "application/pdf",
  //     },
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((returnObj) => {
  //       if (returnObj.error)
  //         dispatch(Popup({ error: true, message: returnObj.error.message }));

  //       return;
  //     })
  //     .catch();
  // };

  return (
    <div className={classes.orderD}>
      {order.orderedItems !== undefined &&
        order.orderedItems.map((each, index) => (
          <div key={each.productId._id}>
            <h3> Product #{index + 1}</h3>
            <h3> {each.productId.title}</h3>
            <h3> {each.productId.price} tK</h3>
            <h3>Quantity {each.quantity}</h3>
            <h3>{each.quantity * each.productId.price} tK</h3>
          </div>
        ))}
      <h2>Total: {order.subTotal}</h2>
      <button>Get Invoice</button>
    </div>
  );
};
export default OrderDetail;
