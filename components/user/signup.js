import { Fragment, useRef, useState } from "react";
import { useRouter } from "next/router";
import classes from "./signup.module.css";

const Signup = () => {
  const [error, setError] = useState();
  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();
  const route = useRouter();

  const submitHandler = (event) => {
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
          setError(returnObj.error.message);
          return;
        } else {
          nameRef.current.value = "";
          emailRef.current.value = "";
          passRef.current.value = "";
          confirmPassRef.current.value = "";
          route.push("/sign-in");
          setError();
        }
      })
      .catch();
  };

  return (
    <Fragment>
      <form className={classes.signup}>
        <h1>Sign up</h1>
        {error && <p>{error}</p>}

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

export default Signup;
