import { Fragment, useRef, useState } from "react";
import { useRouter } from "next/router";

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
      <form>
        <h1>Create an Account</h1>
        {error && <p>{error}</p>}
        <div>
          <h3>Name</h3>
          <input ref={nameRef} type="text"></input>
        </div>
        <div>
          <h3>Email</h3>
          <input ref={emailRef} type="email"></input>
        </div>
        <div>
          <h3>Password</h3>
          <input ref={passRef} type="password"></input>
        </div>
        <div>
          <h3>Confirm Password</h3>
          <input ref={confirmPassRef} type="password"></input>
        </div>
        <button onClick={submitHandler}>Sign up</button>
      </form>
    </Fragment>
  );
};

export default Signup;
