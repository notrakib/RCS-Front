import classes from "./slide.module.css";
import styles from "./slide-err.module.css";
import React from "react";

const Slide = (props) => {
  return (
    <div className={props.error ? styles.slide : classes.slide}>
      <div>
        {props.error && <h2>Attention!</h2>}
        {!props.error && <h2>Successful</h2>}
        <button
          onClick={() => {
            props.onClick();
          }}
        >
          X
        </button>
      </div>

      <p>{props.message}</p>
    </div>
  );
};

export default React.memo(Slide);
