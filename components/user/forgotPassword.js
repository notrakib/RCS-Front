import { useRouter } from "next/router";
import React, { Fragment, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { Popup } from "../../store/popup-slice";
import classes from "./forgotPassword.module.css";

const ForgotPassword = () => {
  const emailRef = useRef();
  const route = useRouter();
  const dispatch = useDispatch();

  const submitHandler = useCallback((event) => {
    event.preventDefault();

    fetch(`${process.env.URL}/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailRef.current.value,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((returnObj) => {
        if (returnObj.error) {
          dispatch(Popup({ error: true, message: returnObj.error.message }));
          return;
        } else {
          route.push(returnObj.link);
        }
      })
      .catch();
  }, []);

  return (
    <Fragment>
      <form className={classes.frgtpass}>
        <h1>Enter Email</h1>

        <input placeholder="Email" ref={emailRef} type="email"></input>

        <button onClick={submitHandler}>Submit</button>
      </form>
    </Fragment>
  );
};

export default React.memo(ForgotPassword);
