import { Fragment, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { signedinAction } from "../../store/signin-slice";
import Link from "next/link";

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
      .catch((err) => console.log(err));
  };

  return (
    <Fragment>
      <form>
        <h1>Sign in</h1>
        {error && <p>{error}</p>}
        <div>
          <h3>Email</h3>
          <input ref={emailRef} type="email"></input>
        </div>
        <div>
          <h3>Password</h3>
          <input ref={passRef} type="password"></input>
        </div>
        <Link href="/forgot-password">
          <p>Forgot password?</p>
        </Link>
        <button onClick={submitHandler}>Sign in</button>
      </form>
    </Fragment>
  );
};

export default Signin;
