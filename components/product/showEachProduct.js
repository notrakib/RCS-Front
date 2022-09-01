import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Popup } from "../../store/popup-slice";
import classes from "./showEachProduct.module.css";

const ShowEachProduct = (props) => {
  const signedin = useSelector((state) => state.signin.signedin);
  const route = useRouter();
  const dispatch = useDispatch();

  return (
    <Fragment>
      <div className={classes.each}>
        <h3>{props.title}</h3>
        <h4>Category: {props.category}</h4>
        <h4>Price: {props.price} tK</h4>

        <button
          onClick={() => {
            if (!signedin)
              return dispatch(Popup({ error: true, message: "Please sigin" }));
            route.push(`/product-detail/${props.id}`);
          }}
        >
          View Details
        </button>
      </div>
    </Fragment>
  );
};

export default React.memo(ShowEachProduct);
