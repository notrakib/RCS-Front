import { Fragment } from "react";
import { useSelector } from "react-redux";
import Signin from "../user/signin";

const Welcome = () => {
  const signedin = useSelector((state) => state.signin.signedin);
  return (
    <Fragment>
      <h1>Welcome</h1>
      {!signedin && <Signin></Signin>}
    </Fragment>
  );
};

export default Welcome;
