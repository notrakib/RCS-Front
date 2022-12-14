import "../styles/globals.css";
import React, { useState } from "react";
import { Provider } from "react-redux";
import Store from "../store/store";
import Navbar from "../components/navigation/navbar";
import Cart from "../components/cart/cart";
import Modal from "../components/layout/modal";

const MyApp = ({ Component, pageProps }) => {
  const [showCart, setCart] = useState(false);

  const changeCartState = () => {
    setCart(!showCart);
  };

  return (
    <Provider store={Store}>
      <Navbar onClick={changeCartState} />
      {showCart && (
        <Modal onClick={changeCartState}>
          <Cart />
        </Modal>
      )}
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
