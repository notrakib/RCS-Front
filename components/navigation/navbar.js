import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { signedinAction } from "../../store/signin-slice";
import Link from "next/link";
import classes from "../navigation/navbar.module.css";
import Slide from "../layout/slide";
import { popUpAction } from "../../store/popup-slice";

const Navbar = (props) => {
  const signedin = useSelector((state) => state.signin.signedin);
  const popup = useSelector((state) => state.popup);
  const dispatch = useDispatch();
  const route = useRouter();

  return (
    <Fragment>
      {popup.error !== null && (
        <Slide
          onClick={() => {
            dispatch(popUpAction.refresh());
          }}
          error={popup.error}
          message={popup.message}
        ></Slide>
      )}
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
          {signedin && (
            <p
              onClick={() => {
                props.onClick();
              }}
            >
              Cart
            </p>
          )}
          {signedin && (
            <p
              onClick={() => {
                dispatch(signedinAction.logout());
                route.push("/");
              }}
            >
              Logout
            </p>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default React.memo(Navbar);
