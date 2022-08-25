import { Fragment } from "react";
import ShowEachProduct from "./showEachProduct";

const ShowEachOrder = (props) => {
  const order = props.eachOrder;

  return (
    <Fragment>
      {order.orderedItems.map((each) => (
        <ShowEachProduct
          key={each.productId._id}
          title={each.productId.title}
          price={each.productId.price}
          quantity={each.quantity}
          total={each.quantity * each.price}
        />
      ))}
      <h2>Total: {order.subTotal}</h2>
    </Fragment>
  );
};
export default ShowEachOrder;
