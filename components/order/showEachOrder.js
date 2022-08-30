import { useEffect, useState } from "react";
import classes from "./showEachOrder.module.css";
import { useRouter } from "next/router";

const ShowEachOrder = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState();
  const route = useRouter();

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
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
          setError(returnObj.error.message);
          return;
        } else {
          setOrders(returnObj.orders);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.each}>
      {orders.length === 0 && <h3>You do not have any completed order</h3>}
      {orders[0] !== undefined && (
        <h3>{orders[0].userId.name} here is your completed order</h3>
      )}
      {orders.map((each) => (
        <div
          onClick={(event) => {
            event.preventDefault();
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
export default ShowEachOrder;
