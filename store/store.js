import { configureStore } from "@reduxjs/toolkit";
import signinReducer from "./signin-slice";
import cartReducer from "./cart-slice";

const Store = configureStore({
  reducer: { signin: signinReducer, cart: cartReducer },
});

export default Store;
