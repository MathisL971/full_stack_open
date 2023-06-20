import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    voteNotification(state, action) {
      const content = action.payload;
      state = `You vote for: '${content}'`;
      return state;
    },
    newAnecdoteNotification(state, action) {
      const content = action.payload;
      state = `You created the anecdote: '${content}'`;
      return state;
    },
    removeNotification(state, action) {
      state = "";
      return state;
    },
  },
});

export default notificationSlice.reducer;
export const { voteNotification, newAnecdoteNotification, removeNotification } =
  notificationSlice.actions;
