import { configureStore } from "@reduxjs/toolkit";
import signinReducer from "./signin-slice";

const Store = configureStore({ reducer: { signin: signinReducer } });

export default Store;
