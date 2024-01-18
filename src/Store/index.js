import { configureStore } from "@reduxjs/toolkit";
import groupReducer from "./Slices/group";

const store = configureStore({
  reducer: {
    group: groupReducer,
  },
});

export default store;
