import { createSlice } from "@reduxjs/toolkit";

const initialState = { users: [] };

const userSlice = createSlice({
  name: "user-slice",
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.users = payload;
    },
    removeUser(state, { payload }) {
      state.users = state.users.filter((user) => user.id !== payload);
    },
  },
});

const userReducer = userSlice.reducer;

export default userReducer;

export const { setUser, removeUser } = userSlice.actions;
