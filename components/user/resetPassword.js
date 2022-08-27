import { useRouter } from "next/router";
import { Fragment, useRef, useState } from "react";

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
          route.push("/sign-in");
          setError();
        }
      })
      .catch();
  };

  return (
    <Fragment>
      <form>
        <h1>Enter Password</h1>
        {error && <p>{error}</p>}
        <div>
          <h3>Password</h3>
          <input ref={pass} type="password"></input>
        </div>
        <div>
          <h3>Confirm Password</h3>
          <input ref={con_pass} type="password"></input>
        </div>

        <button onClick={submitHandler}>Submit</button>
      </form>
    </Fragment>
  );
};

export default ResetPassword;
