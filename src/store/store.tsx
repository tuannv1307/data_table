import { configureStore } from "@reduxjs/toolkit";
import datatableReducer from "./datatableReducer";

const store = configureStore({
  reducer: { datatable: datatableReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
