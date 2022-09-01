import React, { Fragment } from "react";
import classes from "./modal.module.css";

const Underlay = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick}></div>;
};

const Overlay = (props) => {
  return (
    <div className={classes.modal}>
      {props.children}
      <button onClick={props.onClick}>Close</button>
    </div>
  );
};

export const Modal = (props) => {
  return (
    <Fragment>
      <Underlay onClick={props.onClick}></Underlay>

      <Overlay errorMessage={props.errorMessage} onClick={props.onClick}>
        {props.children}
      </Overlay>
    </Fragment>
  );
};

export default React.memo(Modal);
