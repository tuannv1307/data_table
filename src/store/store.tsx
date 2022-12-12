import { configureStore } from "@reduxjs/toolkit";
import tictactoeReducer from "./tictactoeReducer";

const store = configureStore({
  reducer: { tictactoe: tictactoeReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
