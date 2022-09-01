import React, { Fragment, useCallback, useRef } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Popup } from "../../store/popup-slice";
import classes from "./signup.module.css";

const Signup = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();
  const route = useRouter();
  const dispatch = useDispatch();

  const submitHandler = useCallback((event) => {
    event.preventDefault();

    if (passRef.current.value !== confirmPassRef.current.value) {
      return setError("Invalid Confirm Password");
    }

    fetch(`${process.env.URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passRef.current.value,
        confirm_password: confirmPassRef.current.value,
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
          nameRef.current.value = "";
          emailRef.current.value = "";
          passRef.current.value = "";
          confirmPassRef.current.value = "";
          route.push("/");
          dispatch(Popup({ error: false, message: "Account created" }));
        }
      })
      .catch();
  }, []);

  return (
    <Fragment>
      <form className={classes.signup}>
        <h1>Sign up</h1>

        <input placeholder="Name" ref={nameRef} type="text"></input>

        <input placeholder="Email" ref={emailRef} type="email"></input>

        <input placeholder="Password" ref={passRef} type="password"></input>

        <input
          placeholder="Confirm Password"
          ref={confirmPassRef}
          type="password"
        ></input>

        <button onClick={submitHandler}>Sign up</button>
      </form>
    </Fragment>
  );
};

export default React.memo(Signup);
