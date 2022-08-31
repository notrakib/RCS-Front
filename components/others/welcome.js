import { useSelector } from "react-redux";
import Signin from "../user/signin";
import classes from "./welcome.module.css";
import Image from "next/image";
import pic from "./landing.png";

const Welcome = () => {
  const signedin = useSelector((state) => state.signin.signedin);
  return (
    <div className={classes.welcome}>
      <Image src={pic} layout="responsive"></Image>

      <div id={classes.div2}>{!signedin && <Signin></Signin>}</div>
    </div>
  );
};

export default Welcome;
