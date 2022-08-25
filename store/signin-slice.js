import { createSlice } from "@reduxjs/toolkit";

let initialState;

if (typeof window !== "undefined") {
  initialState = {
    signedin: +new Date() < localStorage.getItem("logoutTime") ? true : false,
    token: localStorage.getItem("token"),
    logoutTime: localStorage.getItem("logoutTime"),
    userId: localStorage.getItem("userId"),
  };
} else {
  initialState = {
    signedin: false,
    token: null,
    logoutTime: null,
    userId: null,
  };
}

const SigninSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {
    login(state, action) {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("logoutTime", action.payload.logoutTime);
      localStorage.setItem("userId", action.payload.userId);
      state.signedin = true;
      state.token = localStorage.getItem("token");
      state.logoutTime = localStorage.getItem("expiresIn");
      state.userId = localStorage.getItem("userId");
    },
    logout(state, action) {
      localStorage.removeItem("token");
      localStorage.removeItem("logoutTime");
      localStorage.removeItem("userId");
      state.signedin = false;
      state.token = null;
      state.logoutTime = null;
      state.userId = null;
    },
  },
});

export const signedinAction = SigninSlice.actions;
export default SigninSlice.reducer;
