import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import classes from "./orderDetails.module.css";

const OrderDetail = () => {
  const [order, setOrder] = useState({});
  const route = useRouter();
  console.log(route.query.orderId);

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
          setError(returnObj.error.message);
          return;
        } else {
          setOrder(returnObj.order);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (route.query.orderId === undefined) return;
    fetchOrder();
  }, [route.query.orderId]);

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
    </div>
  );
};
export default OrderDetail;
