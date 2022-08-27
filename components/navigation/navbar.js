import { Fragment } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { signedinAction } from "../../store/signin-slice";
import Link from "next/link";

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
    route.push("/sign-in");
  };

  return (
    <Fragment>
      <ul>
        <li>
          <Link href="/">Welcome</Link>
        </li>
        {signedin && (
          <li>
            <Link href="/add-product">Add Products</Link>
          </li>
        )}
        <li>
          <Link href="/products/?page=1">Products</Link>
        </li>
        {signedin && (
          <li>
            <Link href="/order">Orders</Link>
          </li>
        )}
        {signedin && (
          <li>
            <button onClick={submitHandler}>Cart</button>
          </li>
        )}
        {!signedin && (
          <li>
            <Link href="/sign-up">Sign up</Link>
          </li>
        )}
        {!signedin && (
          <li>
            <Link href="/sign-in">Sign in</Link>
          </li>
        )}
        {signedin && (
          <li>
            <button onClick={LogoutHandaler}>Logout</button>
          </li>
        )}
      </ul>
    </Fragment>
  );
};

export default Navbar;
