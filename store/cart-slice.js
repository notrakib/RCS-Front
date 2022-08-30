import { createSlice } from "@reduxjs/toolkit";

const initialCartSlice = { cartItems: [], error: null };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartSlice,
  reducers: {
    replaceCart(state, action) {
      if (action.payload.errormsg) {
        state.error = action.payload.errormsg;
      } else state.cartItems = action.payload.cartItems;
    },
  },
});

export const FetchDataCart = () => {
  return (dispatch) => {
    const fetchCart = () => {
      fetch(`${process.env.URL}/all-cart`, {
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((returnObj) => {
          if (returnObj.error) {
            dispatch(
              cartAction.replaceCart({ errormsg: returnObj.error.message })
            );
            return;
          } else {
            dispatch(
              cartAction.replaceCart({ cartItems: returnObj.cartItems })
            );
          }
        })
        .catch();
    };

    fetchCart();
  };
};

export const cartAction = cartSlice.actions;
export default cartSlice.reducer;
