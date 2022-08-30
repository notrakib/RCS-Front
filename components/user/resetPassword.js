import { useRouter } from "next/router";
import { Fragment, useRef, useState } from "react";
import classes from "./resetPassword.module.css";

const ResetPassword = (props) => {
  const [error, setError] = useState();
  const pass = useRef();
  const con_pass = useRef();
  const route = useRouter();

  const submitHandler = (event) => {
    event.preventDefault();

    if (pass.current.value !== con_pass.current.value) {
      return setError("Invalid Confirm Password");
    }

    fetch(`${process.env.URL}/reset-password/` + route.query.token, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: pass.current.value,
        confirm_password: con_pass.current.value,
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
          route.push("/");
          setError();
        }
      })
      .catch();
  };

  return (
    <Fragment>
      <form className={classes.resetPass}>
        <h1>Enter Password</h1>
        {error && <p>{error}</p>}

        <input placeholder="Password" ref={pass} type="password"></input>

        <input
          placeholder="Confirm Password"
          ref={con_pass}
          type="password"
        ></input>

        <button onClick={submitHandler}>Submit</button>
      </form>
    </Fragment>
  );
};

export default ResetPassword;
