import { Fragment, useEffect, useState } from "react";
import ShowEachOrder from "../components/order/showEachOrder";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState();

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
    <Fragment>
      {error && <p>{error}</p>}
      {orders.length === 0 && <p>You do not have any completed order</p>}
      {orders[0] !== undefined && <h3>Name: {orders[0].userId.name || ""}</h3>}

      {!error &&
        orders.map((each) => <ShowEachOrder key={each._id} eachOrder={each} />)}
    </Fragment>
  );
};

export default OrderPage;
