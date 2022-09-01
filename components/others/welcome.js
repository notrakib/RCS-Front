import { useSelector } from "react-redux";
import Signin from "../user/signin";
import classes from "./welcome.module.css";
import Image from "next/image";
import pic from "./landing.png";
import React from "react";

const Welcome = () => {
  const signedin = useSelector((state) => state.signin.signedin);
  return (
    <div className={classes.welcome}>
      <Image src={pic} priority layout="responsive"></Image>

      <div id={classes.div2}>{!signedin && <Signin></Signin>}</div>
    </div>
  );
};

export default React.memo(Welcome);
