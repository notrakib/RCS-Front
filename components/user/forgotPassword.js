import { useRouter } from "next/router";
import { Fragment, useRef, useState } from "react";

const ForgotPassword = () => {
  const [error, setError] = useState();
  const emailRef = useRef();
  const route = useRouter();

  const submitHandler = (event) => {
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
          setError(returnObj.error.message);
          return;
        } else {
          route.push(returnObj.link);
          setError();
        }
      })
      .catch();
  };

  return (
    <Fragment>
      <form>
        <h1>Enter Email</h1>
        {error && <p>{error}</p>}
        <div>
          <h3>Email</h3>
          <input ref={emailRef} type="email"></input>
        </div>

        <button onClick={submitHandler}>Submit</button>
      </form>
    </Fragment>
  );
};

export default ForgotPassword;
