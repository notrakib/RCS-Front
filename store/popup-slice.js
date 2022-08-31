import { createSlice } from "@reduxjs/toolkit";

const initialState = { error: null, message: null };

const PopUpSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    popupHandaler(state, action) {
      state.error = action.payload.error;
      state.message = action.payload.message;
    },
    refresh(state, action) {
      state.error = null;
      state.message = null;
    },
  },
});

export const Popup = (data) => {
  return (dispatch) => {
    dispatch(popUpAction.popupHandaler(data));

    setTimeout(() => {
      dispatch(popUpAction.refresh());
    }, 4000);
  };
};

export const popUpAction = PopUpSlice.actions;
export default PopUpSlice.reducer;
