import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    displayNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      state = "";
      return state;
    },
  },
});

export const { displayNotification, removeNotification } =
  notificationSlice.actions;

export const setNotification = (notification, timer) => {
  return async (dispatch) => {
    dispatch(displayNotification(notification));
    setTimeout(() => {
      dispatch(removeNotification());
    }, timer * 1000);
  };
};

export default notificationSlice.reducer;
