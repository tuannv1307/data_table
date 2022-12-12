import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

export type DataTables = {
  data?: [];
};

export type Actions = {
  getData: (state: any, action: any) => void;
};

const initialData: DataTables = {
  data: [],
};

export type TicTacToeActionPayload = {};

const dataTablesSlice = createSlice<DataTables, Actions>({
  name: "datatable",
  initialState: initialData as DataTables,
  reducers: {
    getData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: {},
});

export const { getData } = dataTablesSlice.actions;

export default dataTablesSlice.reducer;
