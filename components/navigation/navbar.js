import { Fragment } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { signedinAction } from "../../store/signin-slice";
import Link from "next/link";
import classes from "../navigation/navbar.module.css";

const Navbar = (props) => {
  const signedin = useSelector((state) => state.signin.signedin);
  const dispatch = useDispatch();
  const route = useRouter();

  const submitHandler = (event) => {
    event.preventDefault();
    props.onClick();
  };

  const LogoutHandaler = (event) => {
    event.preventDefault();
    dispatch(signedinAction.logout());
    route.push("/");
  };

  return (
    <Fragment>
      <div className={classes.nav}>
        <div id={classes.navLeft}>
          <p>
            <Link href="/">Welcome</Link>
          </p>
          <p>
            <Link href="/products/?page=1">Products</Link>
          </p>

          {signedin && (
            <p>
              <Link href="/add-product">Add Product</Link>
            </p>
          )}
          {signedin && (
            <p>
              <Link href="/order">Orders</Link>
            </p>
          )}
        </div>

        <div id={classes.navRight}>
          {!signedin && (
            <p>
              <Link href="/sign-up">Sign up</Link>
            </p>
          )}
          {signedin && <p onClick={submitHandler}>Cart</p>}
          {signedin && <p onClick={LogoutHandaler}>Logout</p>}
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
