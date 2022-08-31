import { configureStore } from "@reduxjs/toolkit";
import signinReducer from "./signin-slice";
import cartReducer from "./cart-slice";
import popupReducer from "./popup-slice";

const Store = configureStore({
  reducer: { signin: signinReducer, cart: cartReducer, popup: popupReducer },
});

export default Store;
