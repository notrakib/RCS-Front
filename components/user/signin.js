import { Fragment, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { signedinAction } from "../../store/signin-slice";
import Link from "next/link";
import classes from "./signin.module.css";

const Signin = () => {
  const [error, setError] = useState();
  const emailRef = useRef();
  const passRef = useRef();
  const route = useRouter();
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();

    fetch(`${process.env.URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passRef.current.value,
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
          emailRef.current.value = "";
          passRef.current.value = "";
          const signInfo = {
            token: returnObj.token,
            logoutTime: returnObj.userInfo.logoutTime,
            userId: returnObj.userInfo.userId,
          };

          dispatch(signedinAction.login(signInfo));

          setTimeout(() => {
            dispatch(signedinAction.logout());
          }, returnObj.userInfo.logoutTime - +new Date());

          route.push("/products?page=1");
        }
      })
      .catch();
  };

  return (
    <Fragment>
      <form className={classes.signin}>
        <h1>Sign in</h1>
        {error && <p>{error}</p>}
        <input placeholder="Email" ref={emailRef} type="email"></input>
        <input placeholder="Password" ref={passRef} type="password"></input>
        <p id={classes.forgot}>
          <Link id={classes.forgot} href="/forgot-password">
            Forgot password?
          </Link>
        </p>
        <button onClick={submitHandler} type="submit">
          Sign in
        </button>
      </form>
    </Fragment>
  );
};

export default Signin;
