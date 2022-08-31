import { useRouter } from "next/router";
import { Fragment, useRef } from "react";
import { useDispatch } from "react-redux";
import { Popup } from "../../store/popup-slice";
import classes from "./resetPassword.module.css";

const ResetPassword = (props) => {
  const pass = useRef();
  const con_pass = useRef();
  const route = useRouter();
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();

    if (pass.current.value !== con_pass.current.value) {
      return dispatch(
        Popup({ error: true, message: "Invalid Confirm Password" })
      );
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
          dispatch(Popup({ error: true, message: returnObj.error.message }));
          return;
        } else {
          route.push("/");
          dispatch(
            Popup({ error: false, message: "Password changed succeussfully" })
          );
        }
      })
      .catch();
  };

  return (
    <Fragment>
      <form className={classes.resetPass}>
        <h1>Enter Password</h1>

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
